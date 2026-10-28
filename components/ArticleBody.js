import React from 'react'
import Gallery from './Gallery'
import ZoomImage from './ZoomImage'
import ClubMarks from './ClubMarks'
import SocialEmbed from './SocialEmbed'
import {imageUrl} from '../lib/imageUrl'

function renderMarkedSpan(span, index) {
  let node = span.text
  const marks = span.marks || []
  if (marks.includes('strong')) node = <strong>{node}</strong>
  if (marks.includes('em')) node = <em>{node}</em>
  if (marks.includes('underline')) node = <u>{node}</u>
  if (marks.includes('strike-through')) node = <s>{node}</s>
  if (marks.includes('code')) node = <code>{node}</code>
  return <React.Fragment key={span._key || index}>{node}</React.Fragment>
}

function isEmptyTextBlock(block) {
  if (block?._type !== 'block') return false
  return !(block.children || []).some(child => typeof child?.text === 'string' && child.text.trim().length > 0)
}

function blockText(block) {
  return (block?.children || []).map((child) => child?.text || '').join('').trim()
}

function rankedMatch(block) {
  if (block?.style !== 'h2') return null
  const match = blockText(block).match(/^\s*(\d+)\.\s+(.+?)\s+[–—]\s+(.+?)\s*$/)
  if (!match) return null
  return {rank: Number(match[1]), homeTeam: match[2].trim(), awayTeam: match[3].trim()}
}

function TextBlock({block}) {
  const children = (block.children || []).map(renderMarkedSpan)
  if (block.listItem === 'bullet') return <ul><li>{children}</li></ul>
  if (block.listItem === 'number') return <ol><li>{children}</li></ol>
  if (block.style === 'h2') {
    const fixture = rankedMatch(block)
    if (fixture) {
      return <div className="cms-ranked-match-heading">
        <h2>{children}</h2>
        <ClubMarks
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          variant="article"
          priority={fixture.rank <= 5}
        />
      </div>
    }
    return <h2>{children}</h2>
  }
  if (block.style === 'h3') return <h3>{children}</h3>
  if (block.style === 'blockquote') return <blockquote>{children}</blockquote>
  return <p>{children}</p>
}

const cafEmbeds = [
  {match:'Für ein algerisch-marokkanisches Fantreffen',provider:'instagram',id:'DemvWdTu9Ia',title:'Raja- und Mouloudia-Fans treffen sich in Nigeria',url:'https://www.instagram.com/p/DemvWdTu9Ia/'},
  {match:'Rund hundert MCA-Fans machen die Reise',provider:'facebook',id:'',title:'Raja-Fans in Nigeria',url:'https://www.facebook.com/reel/1691906612658112/'},
  {match:'Bei MC Alger bleibt es allerdings nicht',provider:'facebook',id:'',title:'Mouloudia-Fans im Kabinentrakt',url:'https://www.facebook.com/reel/1918690009502489/'},
  {match:'Schon vor Espérance Tunis gegen',provider:'instagram',id:'De4cTgINeps',title:'Ärger beim Aufwärmen vor Espérance Tunis',url:'https://www.instagram.com/p/De4cTgINeps/'},
  {match:'Auf Videos ist zu sehen, wie ein Mitglied',provider:'instagram',id:'De7JbB3NGtw',title:'Zwischenfall vor Club Africain gegen TP Mazembe',url:'https://www.instagram.com/p/De7JbB3NGtw/'},
]

function extractSocialMedia(url) {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '')
    if (parsed.protocol !== 'https:') return null
    if (host === 'instagram.com') {
      const match = parsed.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
      return match ? {provider:'instagram',id:match[2]} : null
    }
    if (host === 'facebook.com' || host === 'fb.watch') return {provider:'facebook'}
    if (host === 'youtube.com' || host === 'youtu.be') {
      const id = host === 'youtu.be' ? parsed.pathname.split('/')[1] : parsed.pathname.startsWith('/shorts/') ? parsed.pathname.split('/')[2] : parsed.searchParams.get('v')
      if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null
      const time = parsed.searchParams.get('t') || parsed.searchParams.get('start') || '0'
      const start = /^\d+$/.test(time) ? Number(time) : (/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.test(time) ? (Number(time.match(/(\d+)h/)?.[1] || 0)*3600 + Number(time.match(/(\d+)m/)?.[1] || 0)*60 + Number(time.match(/(\d+)s/)?.[1] || 0)) : 0)
      return {provider:'youtube',id,start}
    }
  } catch {}
  return null
}

export default function ArticleBody({blocks = [], slug}) {
  const visibleBlocks = blocks.filter(block => !isEmptyTextBlock(block))

  return <div className="cms-body">
    {visibleBlocks.flatMap((block, index) => {
      if (slug === 'so-verrueckt-war-die-qualifikation-fuer-afrikas-klubwettbewerbe' && block._type === 'block' && blockText(block).startsWith('Für die Gruppenphase musste Scottland')) {
        return [block, {_type:'socialEmbed',_key:'professor-video',provider:'youtube',id:'b-4X-o4KidI',start:854,title:'Der deutsche Groundhopper „Professor“ bei Scottland FC (ab 14:14)',url:'https://www.youtube.com/watch?v=b-4X-o4KidI&t=854s'}]
      }
      const matched = slug === 'so-verrueckt-war-die-qualifikation-fuer-afrikas-klubwettbewerbe'
        ? cafEmbeds.find(entry => block._type === 'block' && blockText(block).startsWith(entry.match))
        : null
      return matched ? [block, {...matched, _type:'socialEmbed', _key:`social-${index}`}] : [block]
    }).map((block, index) => {
      const key = block._key || index
      if (block._type === 'block') return <TextBlock key={key} block={block}/>
      if (block._type === 'socialEmbed') {
        const details = block.provider ? {provider:block.provider,id:block.id,start:block.start} : extractSocialMedia(block.url)
        return details ? <SocialEmbed key={key} {...block} {...details} title={block.title || 'Social-Media-Beitrag'}/> : null
      }
      if (block._type === 'image' && block.src) {
        const width = block.width === 'text' ? 1100 : 1600
        return <figure key={key} className={`cms-image ${block.width === 'text' ? 'cms-image-text' : 'cms-image-wide'}`}>
          <ZoomImage src={imageUrl(block.src, width)} fullSrc={block.src} alt={block.alt || ''}/>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      }
      if (block._type === 'imagePair') {
        return <figure key={key} className="cms-image-pair">
          <div>
            {block.left?.src && <ZoomImage src={imageUrl(block.left.src, 900)} fullSrc={block.left.src} alt={block.left.alt || ''}/>} 
            {block.right?.src && <ZoomImage src={imageUrl(block.right.src, 900)} fullSrc={block.right.src} alt={block.right.alt || ''}/>} 
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      }
      if (block._type === 'gallery') {
        const images = (block.images || []).filter(image => image.src).map(image => ({src: image.src, alt: image.alt || ''}))
        return <div key={key} className="cms-gallery"><Gallery images={images}/></div>
      }
      if (block._type === 'fixtureList') {
        return <div key={key} className="cms-fixture-list">
          <ol>{(block.matches || []).map((fixture, fixtureIndex) =>
            <li key={fixtureIndex}>{fixture}</li>
          )}</ol>
        </div>
      }
      if (block._type === 'factBox') {
        return <aside key={key} className="cms-factbox">
          {block.title && <h3>{block.title}</h3>}
          <dl>{(block.items || []).map((item, itemIndex) => <div key={item._key || itemIndex}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
        </aside>
      }
      return null
    })}
  </div>
}
