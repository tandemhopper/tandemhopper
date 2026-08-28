'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'

export default function HeroRotator({items}){
  const [index,setIndex]=useState(0)
  const [paused,setPaused]=useState(false)
  const count=items?.length||0

  useEffect(()=>{
    if(count<2||paused) return
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const delay=window.matchMedia('(max-width: 760px)').matches?10000:8000
    const timer=window.setInterval(()=>setIndex(current=>(current+1)%count),delay)
    return ()=>window.clearInterval(timer)
  },[count,paused])

  useEffect(()=>{
    if(count<2) return
    const next=items[(index+1)%count]
    if(next?.image){
      const preload=new Image()
      preload.src=next.image
    }
  },[index,count,items])

  if(!count) return null
  const item=items[index]
  const showMatch=item.shortTitle&&item.shortTitle.trim().toLowerCase()!==item.title.trim().toLowerCase()
  const move=(step)=>setIndex(current=>(current+step+count)%count)

  return <section
    className={item.image?'hero hero-rotator':'hero hero-no-image hero-rotator'}
    onMouseEnter={()=>setPaused(true)}
    onMouseLeave={()=>setPaused(false)}
    onFocusCapture={()=>setPaused(true)}
    onBlurCapture={()=>setPaused(false)}
  >
    <div className="hero-copy hero-swap" key={'copy-'+item.slug}>
      <p className="eyebrow">IM FOKUS</p>
      <h1>{item.title.toUpperCase()}</h1>
      {showMatch&&<p className="match">{item.shortTitle.toUpperCase()}</p>}
      <div className="red-rule"></div>
      <p className="meta">{item.meta}</p>
      <Link className="text-link" href={item.href}>BERICHT LESEN <span>→</span></Link>
      {count>1&&<div className="hero-controls" aria-label="Weitere ausgewählte Geschichten">
        <button type="button" onClick={()=>move(-1)} aria-label="Vorherige Geschichte">←</button>
        <span>{String(index+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</span>
        <button type="button" onClick={()=>move(1)} aria-label="Nächste Geschichte">→</button>
      </div>}
    </div>
    {item.image&&<Link className="hero-image hero-swap" key={'image-'+item.slug} href={item.href}>
      <img src={item.image} alt={item.alt||item.title} fetchPriority={index===0?'high':'auto'} decoding="async"/>
    </Link>}
  </section>
}
