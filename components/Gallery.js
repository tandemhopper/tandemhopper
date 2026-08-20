'use client'
import {useEffect, useState} from 'react'
import {imageUrl} from '../lib/imageUrl'

export default function Gallery({images=[]}){
 const [open,setOpen]=useState(null)

 useEffect(()=>{
  if(open===null) return
  const onKey=(event)=>{
   if(event.key==='Escape') setOpen(null)
   if(event.key==='ArrowLeft') setOpen(current=>(current-1+images.length)%images.length)
   if(event.key==='ArrowRight') setOpen(current=>(current+1)%images.length)
  }
  document.addEventListener('keydown',onKey)
  document.body.style.overflow='hidden'
  return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=''}
 },[open,images.length])

 if(!images.length) return null
 return <><section className="gallery"><div className="section-head"><h2>FOTOSTRECKE</h2><span>{images.length} BILDER</span></div><div className="gallery-grid">{images.map((img,i)=><button type="button" key={img.src+i} onClick={()=>setOpen(i)} aria-label={`Bild ${i+1} vergrößern`}><img src={imageUrl(img.src,720,78)} alt={img.alt||''} loading="lazy" decoding="async"/></button>)}</div></section>{open!==null&&<div className="lightbox" onClick={()=>setOpen(null)} role="dialog" aria-modal="true" aria-label="Fotostrecke"><button type="button" className="lightbox-close" onClick={()=>setOpen(null)} aria-label="Lightbox schließen">×</button><button type="button" className="lightbox-prev" onClick={(e)=>{e.stopPropagation();setOpen((open-1+images.length)%images.length)}} aria-label="Vorheriges Bild">‹</button><img onClick={e=>e.stopPropagation()} src={images[open].src} alt={images[open].alt||''}/><button type="button" className="lightbox-next" onClick={(e)=>{e.stopPropagation();setOpen((open+1)%images.length)}} aria-label="Nächstes Bild">›</button></div>}</>
}
