import fs from 'node:fs'
import path from 'node:path'
import {createClient} from 'next-sanity'

const projectId = process.env.SANITY_PROJECT_ID || '90kx3kio'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN
const importDir = path.resolve(process.cwd(), 'content/calendar-imports')

if (!token) {
  console.log('SANITY_WRITE_TOKEN fehlt – Kalender-Import wird übersprungen.')
  process.exit(0)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-31',
  useCdn: false,
  token,
  perspective: 'raw',
})

function safeId(value) {
  return String(value).replace(/[^a-zA-Z0-9_.-]/g, '-')
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

async function importFile(filePath) {
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const {id, type, data} = payload

  if (!id || !['calendarMatch', 'calendarCompetition'].includes(type) || !data) {
    throw new Error(`${path.basename(filePath)}: id, type und data sind Pflicht.`)
  }

  const draftId = `drafts.${safeId(id)}`
  const document = {
    ...data,
    _id: draftId,
    _type: type,
  }

  await client.createOrReplace(document)
  console.log(`✓ ${path.basename(filePath)} → ${draftId}`)
}

const suppliedFiles = process.argv.slice(2)
const files = suppliedFiles.length
  ? suppliedFiles.map((value) => path.resolve(process.cwd(), value))
  : findJsonFiles(importDir)

if (!files.length) {
  console.log('Keine Kalender-Importdateien gefunden.')
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
