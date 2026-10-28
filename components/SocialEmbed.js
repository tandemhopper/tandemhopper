'use client'

import {useState} from 'react'

const sources = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
}

export default function SocialEmbed({provider, url, title, id, start = 0}) {
  const [allowed, setAllowed] = useState(false)
  const source = sources[provider]
  if (!source || !/^https:\/\//.test(url)) return null

  let embedUrl
  if (provider === 'instagram') embedUrl = `https://www.instagram.com/p/${encodeURIComponent(id)}/embed/`
  if (provider === 'facebook') embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`
  if (provider === 'youtube') embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?start=${Number(start) || 0}&rel=0`

  return <figure style={{margin:'2rem auto',width:'100%',maxWidth:provider === 'instagram' ? 540 : 640}}>
    {!allowed ? <div style={{background:'#f3f3f3',border:'1px solid #d6d6d6',borderRadius:8,padding:'26px 20px',textAlign:'center',color:'#242424'}}>
      <strong style={{display:'block',marginBottom:10}}>{title}</strong>
      <p style={{margin:'0 0 14px',fontSize:14,lineHeight:1.5}}>Dieser Beitrag wird von {source} geladen. Beim Anzeigen können Daten an {source} übertragen werden.</p>
      <button type="button" onClick={() => setAllowed(true)} style={{background:'#202020',color:'white',border:0,borderRadius:5,padding:'11px 17px',cursor:'pointer',fontWeight:600}}>Beitrag anzeigen</button>
    </div> : <iframe title={title} src={embedUrl} loading="lazy" allowFullScreen allow="encrypted-media; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" style={{display:'block',width:'100%',border:0,borderRadius:6,background:'#f3f3f3',height:provider === 'instagram'?660:provider === 'youtube'?360:420}} />}
    <figcaption style={{fontSize:13,textAlign:'center',marginTop:8}}><a href={url} target="_blank" rel="noopener noreferrer">Originalbeitrag auf {source} öffnen</a></figcaption>
  </figure>
}
