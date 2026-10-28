'use client'

import {useEffect, useState} from 'react'

const CONSENT_KEY = 'tandemhopper-social-embeds-v1'
const CONSENT_EVENT = 'tandemhopper-social-consent-change'
const sources = {instagram:'Instagram',facebook:'Facebook',youtube:'YouTube'}

function consentGroup(provider) {
  return provider === 'youtube' ? 'youtube' : 'meta'
}

function readConsent() {
  try {
    const value = JSON.parse(window.localStorage.getItem(CONSENT_KEY) || '{}')
    return {meta:value.meta === true, youtube:value.youtube === true}
  } catch {
    return {meta:false,youtube:false}
  }
}

function saveConsent(group, accepted) {
  const next = {...readConsent(), [group]:accepted}
  try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next)) } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

export default function SocialEmbed({provider, url, title, id, start = 0}) {
  const [consent, setConsent] = useState({meta:false,youtube:false})
  const group = consentGroup(provider)
  const source = sources[provider]

  useEffect(() => {
    const sync = () => setConsent(readConsent())
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (!source || !/^https:\/\//.test(url)) return null

  let embedUrl
  if (provider === 'instagram') embedUrl = `https://www.instagram.com/p/${encodeURIComponent(id)}/embed/`
  if (provider === 'facebook') embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`
  if (provider === 'youtube') embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?start=${Number(start) || 0}&rel=0`

  const accepted = consent[group]
  const providerLabel = group === 'meta' ? 'Instagram und Facebook (Meta)' : 'YouTube'

  return <figure style={{margin:'2rem auto',width:'100%',maxWidth:provider === 'instagram' ? 540 : 640}}>
    {!accepted ? <div style={{background:'#f7f7f7',border:'1px solid #dedede',borderRadius:8,padding:'20px 16px',textAlign:'center',color:'#242424'}}>
      <strong style={{display:'block',fontSize:16,marginBottom:8}}>{title}</strong>
      <p style={{margin:'0 0 12px',fontSize:13,lineHeight:1.5}}>Externer Inhalt von {source}. Wenn du zustimmst, werden Inhalte von {providerLabel} auch in anderen Tandemhopper-Artikeln geladen. Dabei können Daten an den Anbieter übertragen werden.</p>
      <button type="button" onClick={() => saveConsent(group,true)} style={{background:'#202020',color:'white',border:0,borderRadius:5,padding:'10px 15px',cursor:'pointer',fontWeight:600}}>Alle {providerLabel}-Beiträge anzeigen</button>
    </div> : <>
      <iframe title={title} src={embedUrl} loading="lazy" allowFullScreen allow="encrypted-media; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" style={{display:'block',width:'100%',border:0,borderRadius:6,background:'#f3f3f3',height:provider === 'instagram'?660:provider === 'youtube'?360:420}} />
      <div style={{textAlign:'center',marginTop:6}}><button type="button" onClick={() => saveConsent(group,false)} style={{border:0,background:'none',color:'#555',textDecoration:'underline',cursor:'pointer',fontSize:12}}>Einwilligung für {providerLabel} widerrufen</button></div>
    </>}
    <figcaption style={{fontSize:13,textAlign:'center',marginTop:8}}><a href={url} target="_blank" rel="noopener noreferrer">Originalbeitrag auf {source} öffnen</a></figcaption>
  </figure>
}
