import React from 'react'
import Gallery from './Gallery'
import ZoomImage from './ZoomImage'
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

function TextBlock({block}) {
  const children = (block.children || []).map(renderMarkedSpan)
  if (block.listItem === 'bullet') return <ul><li>{children}</li></ul>
  if (block.listItem === 'number') return <ol><li>{children}</li></ol>
  if (block.style === 'h2') return <h2>{children}</h2>
  if (block.style === 'h3') return <h3>{children}</h3>
  if (block.style === 'blockquote') return <blockquote>{children}</blockquote>
  return <p>{children}</p>
}

export default function ArticleBody({blocks = []}) {
  const visibleBlocks = blocks.filter(block => !isEmptyTextBlock(block))

  return <div className="cms-body">
    {visibleBlocks.map((block, index) => {
      const key = block._key || index
      if (block._type === 'block') return <TextBlock key={key} block={block}/>
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
