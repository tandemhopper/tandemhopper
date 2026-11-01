/**
 * Import the prepared Macau guide into Sanity.
 * Usage: SANITY_API_TOKEN=... node scripts/import-macau.mjs
 * Optional: MACAU_IMAGES_DIR=/absolute/path/to/photos
 *
 * Requires an editor token. Never commit tokens to Git.
 */
import {createClient} from '@sanity/client'
import {readFile, access} from 'node:fs/promises'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {dirname} from 'node:path'

const root=join(dirname(fileURLToPath(import.meta.url)),'..')
const token=process.env.SANITY_API_TOKEN
if(!token) throw new Error('SANITY_API_TOKEN fehlt. Der Import benötigt einen Sanity-Schreibzugang.')
const client=createClient({projectId:'90kx3kio',dataset:'production',apiVersion:'2026-08-20',token,useCdn:false})
const doc=JSON.parse(await readFile(join(root,'content/laenderkompass/macau-sanity-document.json'),'utf8'))
const imagesDir=process.env.MACAU_IMAGES_DIR
const imageFiles=[
  ['heroImage','olympic-sports-centre-galaxy.jpg','Olympic Sports Centre mit Galaxy Casino im Hintergrund'],
  ['tileImage','macau-tile.jpg','Macau – Stadion und Stadt'],
]
if(imagesDir){
  for(const [field,file,alt] of imageFiles){
    try {
      const path=join(imagesDir,file)
      await access(path)
      const asset=await client.assets.upload('image',await readFile(path),{filename:file})
      doc[field]={_type:'image',asset:{_type:'reference',_ref:asset._id},...(field==='heroImage'?{alt}:{})}
      process.stdout.write('Bild hochgeladen: '+file+'\n')
    }catch(e){process.stdout.write('Bild ausgelassen: '+file+' ('+e.message+')\n')}
  }
}
const existing=await client.getDocument(doc._id)
if(existing?.heroImage&&!doc.heroImage) doc.heroImage=existing.heroImage
if(existing?.tileImage&&!doc.tileImage) doc.tileImage=existing.tileImage
await client.createOrReplace({...doc,_type:'countryGuide'})
process.stdout.write('Macau wurde in Sanity gespeichert. Bilder und Angaben vor Veröffentlichung prüfen.\n')
