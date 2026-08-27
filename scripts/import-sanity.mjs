import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {createClient} from 'next-sanity'

const projectId = process.env.SANITY_PROJECT_ID || '90kx3kio'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN
const importDir = path.resolve(process.cwd(), 'content/imports')

if (!token) {
  console.log('SANITY_WRITE_TOKEN fehlt – Sanity-Import wird übersprungen.')
  process.exit(0)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-20',
  useCdn: false,
  token,
  perspective: 'raw',
})

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function key(seed) {
  return crypto.createHash('sha1').update(seed).digest('hex').slice(0, 12)
}

function safeId(slug) {
  return `article-${slug}`.replace(/[^a-zA-Z0-9_.-]/g, '-')
}

function textBlock(style, text, seed) {
  return {
    _type: 'block',
    _key: key(seed),
    style,
    markDefs: [],
    children: [{
      _type: 'span',
      _key: key(`${seed}:span`),
      text: String(text || ''),
      marks: [],
    }],
  }
}

function resolveImportPath(relativePath) {
  if (!relativePath) throw new Error('Bildpfad fehlt.')
  const absolute = path.resolve(process.cwd(), relativePath)
  const root = path.resolve(process.cwd()) + path.sep
  if (!absolute.startsWith(root)) throw new Error(`Ungültiger Bildpfad: ${relativePath}`)
  if (!fs.existsSync(absolute)) throw new Error(`Bild nicht gefunden: ${relativePath}`)
  return absolute
}

function getImageSource(spec, seed) {
  if (spec?.base64Path) {
    const absolute = resolveImportPath(spec.base64Path)
    const encoded = fs.readFileSync(absolute, 'utf8').replace(/\s+/g, '')
    if (!encoded) throw new Error(`Leere Base64-Datei bei ${seed}`)

    const filename = spec.filename || path.basename(absolute, '.b64')
    return {
      source: Buffer.from(encoded, 'base64'),
      filename,
    }
  }

  if (spec?.path) {
    const absolute = resolveImportPath(spec.path)
    return {
      source: fs.createReadStream(absolute),
      filename: spec.filename || path.basename(absolute),
    }
  }

  throw new Error(`Bildquelle fehlt bei ${seed}`)
}

async function uploadImage(spec, seed, includePresentation = true) {
  const {source, filename} = getImageSource(spec, seed)
  const asset = await client.assets.upload('image', source, {filename})

  const image = {
    _type: 'image',
    _key: key(seed),
    asset: {_type: 'reference', _ref: asset._id},
  }

  if (spec.alt) image.alt = spec.alt
  if (spec.caption) image.caption = spec.caption
  if (includePresentation && spec.width) image.width = spec.width
  return image
}

async function safeUploadImage(spec, seed, includePresentation = true) {
  try {
    return await uploadImage(spec, seed, includePresentation)
  } catch (error) {
    console.warn(`⚠ ${seed}: Bild übersprungen (${error.message})`)
    return null
  }
}

function collectImageSpecs(article) {
  const specs = []
  if (article.heroImage) specs.push(article.heroImage)

  for (const node of article.body || []) {
    if (!node?.type) continue
    if (node.type === 'image') specs.push(node)
    if (node.type === 'imagePair') {
      if (node.left) specs.push(node.left)
      if (node.right) specs.push(node.right)
    }
    if (node.type === 'gallery') specs.push(...(node.images || []))
  }

  return specs
}

function sourceFingerprint(spec) {
  const relativePath = spec?.base64Path || spec?.path
  if (!relativePath) return 'missing-source'
  try {
    const absolute = resolveImportPath(relativePath)
    return `${relativePath}:${hash(fs.readFileSync(absolute))}`
  } catch (error) {
    return `${relativePath}:missing`
  }
}

async function convertBody(nodes = [], slug) {
  const body = []

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    const seed = `${slug}:body:${index}`
    if (!node?.type) continue

    if (['p', 'h2', 'h3', 'blockquote'].includes(node.type)) {
      body.push(textBlock(node.type === 'p' ? 'normal' : node.type, node.text, seed))
      continue
    }

    if (node.type === 'image') {
      const image = await safeUploadImage(node, seed, true)
      if (image) body.push(image)
      continue
    }

    if (node.type === 'imagePair') {
      const left = await safeUploadImage(node.left, `${seed}:left`, false)
      const right = await safeUploadImage(node.right, `${seed}:right`, false)

      if (left && right) {
        body.push({
          _type: 'imagePair',
          _key: key(seed),
          left: {_type: 'image', asset: left.asset, ...(node.left?.alt ? {alt: node.left.alt} : {})},
          right: {_type: 'image', asset: right.asset, ...(node.right?.alt ? {alt: node.right.alt} : {})},
          ...(node.caption ? {caption: node.caption} : {}),
        })
      } else if (left || right) {
        body.push(left || right)
      }
      continue
    }

    if (node.type === 'gallery') {
      const images = []
      for (let imageIndex = 0; imageIndex < (node.images || []).length; imageIndex += 1) {
        const image = await safeUploadImage(node.images[imageIndex], `${seed}:gallery:${imageIndex}`, false)
        if (image) images.push(image)
      }
      if (images.length) {
        body.push({
          _type: 'gallery',
          _key: key(seed),
          title: node.title || 'Fotostrecke',
          images,
        })
      }
      continue
    }

    if (node.type === 'factBox') {
      body.push({
        _type: 'factBox',
        _key: key(seed),
        ...(node.title ? {title: node.title} : {}),
        items: (node.items || []).map((item, itemIndex) => ({
          _type: 'object',
          _key: key(`${seed}:fact:${itemIndex}`),
          label: item.label || '',
          value: item.value || '',
        })),
      })
      continue
    }

    throw new Error(`Unbekannter Body-Typ "${node.type}" in ${slug}`)
  }

  return body
}

async function importFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const payload = JSON.parse(raw)
  const article = payload.article || payload

  if (!article.title || !article.slug || !article.category || !article.teaser) {
    throw new Error(`${path.basename(filePath)}: title, slug, category und teaser sind Pflicht.`)
  }

  const assetFingerprint = collectImageSpecs(article).map(sourceFingerprint).join('\n')
  const importHash = hash(`${raw}\n${assetFingerprint}`)
  const baseId = safeId(article.slug)
  const draftId = `drafts.${baseId}`
  const markerId = `import-marker-${baseId}`
  const marker = await client.getDocument(markerId)
  const existingDraft = await client.getDocument(draftId)
  const existingPublished = await client.getDocument(baseId)

  if (marker?.hash === importHash && (existingDraft || existingPublished)) {
    console.log(`↷ ${article.slug}: unverändert, übersprungen.`)
    return
  }

  console.log(`→ ${article.slug}: Entwurf bauen …`)

  const hasHeroSource = article.heroImage?.path || article.heroImage?.base64Path
  const heroImage = hasHeroSource
    ? await safeUploadImage(article.heroImage, `${article.slug}:hero`, false)
    : null
  const body = await convertBody(article.body || [], article.slug)

  const document = {
    _id: draftId,
    _type: 'article',
    title: article.title,
    slug: {_type: 'slug', current: article.slug},
    category: article.category,
    tag: article.tag || '',
    teaser: article.teaser,
    publishedAt: article.publishedAt || new Date().toISOString(),
    featured: Boolean(article.featured),
    body,
    tags: Array.isArray(article.tags) ? article.tags : [],
    seoDescription: article.seoDescription || '',
  }

  if (heroImage) document.heroImage = heroImage
  if (article.match) document.match = article.match
  if (article.place) document.place = article.place

  await client.createOrReplace(document)
  await client.createOrReplace({
    _id: markerId,
    _type: 'tandemhopperImportMarker',
    articleId: baseId,
    slug: article.slug,
    hash: importHash,
    sourceFile: path.relative(process.cwd(), filePath),
    updatedAt: new Date().toISOString(),
  })

  console.log(`✓ ${article.slug}: Sanity-Entwurf erstellt/aktualisiert.`)
}

function findJsonFiles(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, {withFileTypes: true})
    .flatMap((entry) => {
      const full = path.join(directory, entry.name)
      if (entry.isDirectory()) return findJsonFiles(full)
      return entry.isFile() && entry.name.endsWith('.json') ? [full] : []
    })
    .sort()
}

const files = process.argv.slice(2).length
  ? process.argv.slice(2).map((value) => path.resolve(process.cwd(), value))
  : findJsonFiles(importDir)

if (!files.length) {
  console.log('Keine Importdateien gefunden.')
  process.exit(0)
}

let failed = false
for (const file of files) {
  try {
    await importFile(file)
  } catch (error) {
    failed = true
    console.error(`✗ ${path.relative(process.cwd(), file)}: ${error.message}`)
  }
}

if (failed) process.exit(1)
