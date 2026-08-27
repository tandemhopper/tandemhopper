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
    children: [
      {
        _type: 'span',
        _key: key(`${seed}:span`),
        text: String(text || ''),
        marks: [],
      },
    ],
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

async function uploadImage(spec, seed, includePresentation = true) {
  if (!spec?.path) throw new Error(`Bildpfad fehlt bei ${seed}`)
  const absolute = resolveImportPath(spec.path)
  const asset = await client.assets.upload('image', fs.createReadStream(absolute), {
    filename: spec.filename || path.basename(absolute),
  })

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

async function convertBody(nodes = [], slug) {
  const body = []

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    const seed = `${slug}:body:${index}`

    if (!node?.type) continue

    if (['p', 'h2', 'h3', 'blockquote'].includes(node.type)) {
      const style = node.type === 'p' ? 'normal' : node.type
      body.push(textBlock(style, node.text, seed))
      continue
    }

    if (node.type === 'image') {
      body.push(await uploadImage(node, seed, true))
      continue
    }

    if (node.type === 'imagePair') {
      const left = await uploadImage(node.left, `${seed}:left`, false)
      const right = await uploadImage(node.right, `${seed}:right`, false)
      body.push({
        _type: 'imagePair',
        _key: key(seed),
        left: {_type: 'image', asset: left.asset},
        right: {_type: 'image', asset: right.asset},
        ...(node.caption ? {caption: node.caption} : {}),
      })
      continue
    }

    if (node.type === 'gallery') {
      const images = []
      for (let imageIndex = 0; imageIndex < (node.images || []).length; imageIndex += 1) {
        images.push(await uploadImage(node.images[imageIndex], `${seed}:gallery:${imageIndex}`, false))
      }
      body.push({
        _type: 'gallery',
        _key: key(seed),
        title: node.title || 'Fotostrecke',
        images,
      })
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

  if (!article.heroImage?.path) {
    throw new Error(`${path.basename(filePath)}: heroImage.path fehlt.`)
  }

  const importHash = hash(raw)
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

  console.log(`→ ${article.slug}: Bilder hochladen und Entwurf bauen …`)

  const heroImage = await uploadImage(article.heroImage, `${article.slug}:hero`, false)
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
    heroImage,
    body,
    tags: Array.isArray(article.tags) ? article.tags : [],
    seoDescription: article.seoDescription || '',
  }

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
