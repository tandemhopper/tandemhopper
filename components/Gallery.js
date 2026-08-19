'use client';
import { useState } from 'react';
export default function Gallery({images=[]}){
 const [open,setOpen]=useState(null);
 if(!images.length) return null;
 return <><section className="gallery"><div className="section-head"><h2>FOTOSTRECKE</h2><span>{images.length} BILDER</span></div><div className="gallery-grid">{images.map((img,i)=><button key={img.src+i} onClick={()=>setOpen(i)}><img src={img.src} alt={img.alt||''}/></button>)}</div></section>{open!==null&&<div className="lightbox" onClick={()=>setOpen(null)}><button className="lightbox-close" onClick={()=>setOpen(null)}>×</button><button className="lightbox-prev" onClick={(e)=>{e.stopPropagation();setOpen((open-1+images.length)%images.length)}}>‹</button><img onClick={e=>e.stopPropagation()} src={images[open].src} alt={images[open].alt||''}/><button className="lightbox-next" onClick={(e)=>{e.stopPropagation();setOpen((open+1)%images.length)}}>›</button></div>}</>
}
