'use client'

import {useEffect, useMemo, useState} from 'react'
import Link from 'next/link'

export default function HeroRotator({items}){
  const count=items?.length||0
  const [index,setIndex]=useState(0)
  const initialLoaded=useMemo(()=>{
    const values=new Set()
    if(count>0) values.add(0)
    if(count>1){
      values.add(1)
      values.add(count-1)
    }
    return values
  },[count])
  const [loadedImages,setLoadedImages]=useState(initialLoaded)

  useEffect(()=>{
    setLoadedImages(previous=>{
      const next=new Set(previous)
      if(count>0) next.add(index)
      if(count>1){
        next.add((index+1)%count)
        next.add((index-1+count)%count)
      }
      return next
    })
  },[index,count])

  useEffect(()=>{
    if(count<2) return
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const delay=window.matchMedia('(max-width: 760px)').matches?9000:7500
    const timer=window.setTimeout(()=>setIndex(current=>(current+1)%count),delay)
    return ()=>window.clearTimeout(timer)
  },[index,count])

  if(!count) return null
  const current=items[index]
  const move=(step)=>setIndex(currentIndex=>(currentIndex+step+count)%count)

  return <section className={current.image?'hero hero-rotator':'hero hero-no-image hero-rotator'}>
    <div className="hero-copy">
      <div className="hero-copy-stack">
        {items.map((item,itemIndex)=>{
          const active=itemIndex===index
          const showMatch=item.shortTitle&&item.shortTitle.trim().toLowerCase()!==item.title.trim().toLowerCase()
          return <div className={`hero-copy-slide${active?' is-active':''}`} aria-hidden={!active} key={item.slug}>
            <p className="eyebrow">IM FOKUS</p>
            <h1>{item.title.toUpperCase()}</h1>
            {showMatch&&<p className="match">{item.shortTitle.toUpperCase()}</p>}
            <div className="red-rule"></div>
            <p className="hero-teaser">{item.teaser}</p>
            <Link className="text-link" href={item.href} tabIndex={active?0:-1}>BERICHT LESEN <span>→</span></Link>
          </div>
        })}
      </div>
      {count>1&&<div className="hero-controls" aria-label="Weitere ausgewählte Geschichten">
        <button type="button" onClick={()=>move(-1)} aria-label="Vorherige Geschichte">←</button>
        <span>{String(index+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</span>
        <button type="button" onClick={()=>move(1)} aria-label="Nächste Geschichte">→</button>
      </div>}
    </div>

    {current.image&&<div className="hero-image-stage">
      {items.map((item,itemIndex)=>loadedImages.has(itemIndex)&&item.image?<Link
        className={`hero-image-slide${itemIndex===index?' is-active':''}`}
        key={item.slug}
        href={item.href}
        tabIndex={itemIndex===index?0:-1}
        aria-hidden={itemIndex!==index}
      >
        <img src={item.image} alt={item.alt||item.title} fetchPriority={itemIndex===0?'high':'auto'} decoding="async"/>
      </Link>:null)}
    </div>}
  </section>
}
