'use client'

import {useCallback,useEffect,useState} from 'react'

const TOPICS=[
  {value:'tipp',label:'Ergänzung oder Reisetipp'},
  {value:'korrektur',label:'Fehler oder Ungenauigkeit'},
  {value:'frage',label:'Frage'},
  {value:'fussball',label:'Stadion oder Spielplanung'},
  {value:'sonstiges',label:'Sonstiges'},
]
const TOPIC_LABELS=Object.fromEntries(TOPICS.map(item=>[item.value,item.label]))
function dateLabel(date){
  if(!date)return ''
  const d=new Date(date)
  return Number.isNaN(d.getTime())?'':new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}).format(d)
}

export default function CountryCommunity({country,asChapter=false}){
  const [comments,setComments]=useState([])
  const [total,setTotal]=useState(0)
  const [nextOffset,setNextOffset]=useState(null)
  const [challenge,setChallenge]=useState('')
  const [enabled,setEnabled]=useState(false)
  const [loading,setLoading]=useState(true)
  const [loadingMore,setLoadingMore]=useState(false)
  const [listError,setListError]=useState('')
  const [name,setName]=useState('')
  const [category,setCategory]=useState('tipp')
  const [message,setMessage]=useState('')
  const [website,setWebsite]=useState('')
  const [consent,setConsent]=useState(false)
  const [sending,setSending]=useState(false)
  const [submitStatus,setSubmitStatus]=useState('')
  const [submitError,setSubmitError]=useState('')

  const load=useCallback(async(offset=0)=>{
    if(offset===0)setLoading(true)
    else setLoadingMore(true)
    try{
      const response=await fetch('/api/country-comments?country='+encodeURIComponent(country)+'&offset='+offset,{cache:'no-store'})
      const data=await response.json()
      if(!response.ok)throw new Error(data.error||'Kommentare können gerade nicht geladen werden.')
      setComments(prev=>offset===0?data.comments||[]:[...prev,...(data.comments||[])])
      setTotal(data.total||0)
      setNextOffset(data.nextOffset??null)
      setChallenge(data.challenge||'')
      setEnabled(Boolean(data.enabled))
      setListError('')
    }catch(error){setListError(error.message||'Kommentare können gerade nicht geladen werden.')}
    finally{setLoading(false);setLoadingMore(false)}
  },[country])

  useEffect(()=>{load(0)},[load])

  async function submit(event){
    event.preventDefault()
    if(!enabled||!challenge||sending)return
    setSubmitError('')
    setSubmitStatus('')
    setSending(true)
    try{
      const response=await fetch('/api/country-comments',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({country,author:name,category,message,website,consent,challenge}),
      })
      const data=await response.json()
      if(!response.ok)throw new Error(data.error||'Das Absenden hat leider nicht funktioniert.')
      setSubmitStatus(data.message||'Vielen Dank! Dein Kommentar wird geprüft.')
      setName('')
      setMessage('')
      setWebsite('')
      setConsent(false)
      // Get a new anti-spam challenge in case a second contribution is sent later.
      load(0)
    }catch(error){setSubmitError(error.message||'Bitte versuche es später noch einmal.')}
    finally{setSending(false)}
  }

  return <section className={'th-community'+(asChapter?' th-community-chapter':'')} id="community" aria-labelledby="community-heading">
    <div className="th-community-heading">
      <span className="th-chapter-number">06 / COMMUNITY</span>
      <h2 id="community-heading">WAS WEISST DU NOCH?</h2>
      <p>Warst du selbst dort? Ist ein Spielort inzwischen geändert, ein Tipp veraltet oder fehlt etwas Wichtiges? Ergänze deine Erfahrungen, stelle eine Frage oder weise uns auf Fehler hin. Genau davon lebt ein brauchbarer Länderführer.</p>
    </div>
    <div className="th-community-grid">
      <div className="th-community-form-area">
        <p className="th-community-eyebrow">DEIN BEITRAG</p>
        <h3>KOMMENTIERE SELBST.</h3>
        <p className="th-community-form-intro">Tipps, Korrekturen, Fragen oder konkrete Ergänzungen – alles willkommen. Beiträge werden vor der Veröffentlichung geprüft.</p>
        {!enabled?
          <div className="th-community-unavailable" role="status">
            <strong>Kommentarfunktion in Vorbereitung</strong>
            <p>Lesen ist bereits möglich. Das Absenden wird freigeschaltet, sobald die sichere Verbindung zum Redaktionsstudio eingerichtet ist.</p>
          </div>
          :<form onSubmit={submit} className="th-community-form">
            <label htmlFor={'community-name-'+country}>DEIN NAME ODER PSEUDONYM</label>
            <input id={'community-name-'+country} type="text" autoComplete="nickname" maxLength={60} minLength={2} value={name} onChange={e=>setName(e.target.value)} placeholder="Wie sollen wir dich nennen?" required/>
            <label htmlFor={'community-topic-'+country}>WORUM GEHT ES?</label>
            <select id={'community-topic-'+country} value={category} onChange={e=>setCategory(e.target.value)}>
              {TOPICS.map(topic=><option key={topic.value} value={topic.value}>{topic.label}</option>)}
            </select>
            <label htmlFor={'community-message-'+country}>DEIN KOMMENTAR</label>
            <textarea id={'community-message-'+country} rows={6} maxLength={1800} minLength={10} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Was sollten andere Groundhopper wissen?" required/>
            <div className="th-community-counter">{message.length} / 1800 Zeichen</div>
            <div className="th-community-honeypot" aria-hidden="true"><label htmlFor={'community-website-'+country}>Website (leer lassen)</label><input id={'community-website-'+country} type="text" value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off"/></div>
            <label className="th-community-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>Ich bin damit einverstanden, dass mein Name/Pseudonym und Kommentar nach redaktioneller Freigabe öffentlich erscheinen. Keine E-Mail-Adresse erforderlich. <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzhinweise</a></span></label>
            <button type="submit" disabled={sending||!message.trim()||!name.trim()||!consent}>{sending?'WIRD GESENDET …':'KOMMENTAR EINREICHEN ↗'}</button>
            <p className="th-community-privacy">Dein Beitrag erscheint erst nach Prüfung. Persönliche Kontaktdaten bitte nicht im Text veröffentlichen.</p>
          </form>}
        {submitStatus&&<p className="th-community-success" role="status">{submitStatus}</p>}
        {submitError&&<p className="th-community-error" role="alert">{submitError}</p>}
      </div>
      <div className="th-community-threads">
        <div className="th-community-threads-head"><h3>STIMMEN AUS DER COMMUNITY</h3><span>{loading?'…':total} {total===1?'BEITRAG':'BEITRÄGE'}</span></div>
        {listError&&<div className="th-community-error" role="alert"><p>{listError}</p><button type="button" onClick={()=>load(0)}>ERNEUT LADEN</button></div>}
        {loading?<p className="th-community-empty">Kommentare werden geladen …</p>
          :!comments.length&&!listError?<p className="th-community-empty">Hier ist noch Platz für die ersten Erfahrungen, Fragen und Ergänzungen.</p>
          :<div className="th-community-list">{comments.map(item=><article className="th-community-thread" key={item._id}>
            <header><div><strong>{item.author}</strong><span>{TOPIC_LABELS[item.category]||'Community'}</span></div><time dateTime={item.submittedAt}>{dateLabel(item.submittedAt)}</time></header>
            <p className="th-community-message">{item.message}</p>
            {item.editorReply&&<div className="th-community-reply">
              <div className="th-community-reply-head"><strong>TANDEMHOPPER ANTWORTET</strong>{item.editorReplyUpdatedAt&&<time dateTime={item.editorReplyUpdatedAt}>{dateLabel(item.editorReplyUpdatedAt)}</time>}</div>
              <p>{item.editorReply}</p>
            </div>}
          </article>)}</div>}
        {nextOffset!==null&&<button className="th-community-more" type="button" disabled={loadingMore} onClick={()=>load(nextOffset)}>{loadingMore?'LÄDT …':'WEITERE KOMMENTARE ANZEIGEN ↓'}</button>}
      </div>
    </div>
  </section>
}
