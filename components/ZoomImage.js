'use client'

import {useEffect, useState} from 'react'

export default function ZoomImage({src, fullSrc, alt = '', className = ''}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = event => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return <>
    <button type="button" className={`zoom-image ${className}`} onClick={() => setOpen(true)} aria-label="Bild vergrößern">
      <img src={src} alt={alt} loading="lazy" decoding="async"/>
    </button>
    {open && <div className="lightbox single-lightbox" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Vergrößertes Bild">
      <button type="button" className="lightbox-close" onClick={() => setOpen(false)} aria-label="Lightbox schließen">×</button>
      <img onClick={event => event.stopPropagation()} src={fullSrc || src} alt={alt}/>
    </div>}
  </>
}
