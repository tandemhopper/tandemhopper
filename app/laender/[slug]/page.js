import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import {getCountryGuide} from '../../../lib/countryGuides'
import {getArticles} from '../../../lib/sanity'
import {imageUrl} from '../../../lib/imageUrl'
import MacauEditorialPage from '../../../components/MacauEditorialPage'
import {getMacauEditorialSettings} from '../../../lib/macauEditorialSettings'
import '../../macau-editorial.css'
import '../../laenderkompass.css'

export const revalidate = 60
const topics = {tickets:['🎟️','Fußball & Tickets'],fanszenen:['🔥','Fanszenen & Spiele'],einreise:['✈️','Anreise & Einreise'],verkehr:['🚆','Verkehr vor Ort'],tipps:['💡','Tipps & Tricks'],weiteres:['📌','Weitere Informationen']}
const portableComponents = {types:{image:({value})=>value?.src?<figure className="country-inline-image"><img src={imageUrl(value.src,1400,82)} alt={value.alt||''} loading="lazy"/>{value.caption&&<figcaption>{value.caption}</figcaption>}</figure>:null}}

export async function generateMetadata({params}) {
  const {slug}=await params
  const country=await getCountryGuide(slug)
  if(!country) return {title:'Land nicht gefunden'}
  const settings = slug==='macau' ? await getMacauEditorialSettings() : null
  const photo = settings?.images?.find(image=>image.slot==='hero'&&image.url)
  const hero = photo?.url||country.hero
  return {title:country.title+' – Länderkompass',description:country.teaser||'Groundhopping-Guide für '+country.title,alternates:{canonical:'/laender/'+slug},openGraph:{images:hero?[{url:imageUrl(hero,1200,80),alt:photo?.alt||country.heroAlt||country.title}]:undefined}}
}

export default async function CountryPage({params}) {
  const {slug}=await params
  const country=await getCountryGuide(slug)
  if(!country) notFound()
  if(slug === 'macau') {
    const settings = await getMacauEditorialSettings()
    return <MacauEditorialPage settings={settings}/>
  }
  const articles=await getArticles()
  const related=articles.filter(a=>a.place?.country?.toLocaleLowerCase('de')===country.title.toLocaleLowerCase('de')).slice(0,6)
  const sections=(country.sections||[]).filter(s=>s.topic&&(s.content?.length||s.tip||s.sources?.length||s.notice?.text))
  return <><Header/><main className="country-guide">
    <div className="country-hero">
      {country.hero&&<img src={imageUrl(country.hero,2000,85)} alt={country.heroAlt||''} fetchPriority="high"/>}
      <div className="country-hero-shade"/>
      <div className="country-hero-content"><Link href="/laender">← ALLE LÄNDER</Link><p className="eyebrow">TANDEMHOPPER LÄNDERKOMPASS</p><h1>{country.flag&&<span aria-hidden="true">{country.flag} </span>}{country.title}</h1><p>{country.teaser}</p></div>
    </div>
    <div className="country-guide-inner">
      {country.fifaRanking&&<div className="country-fifa-strip"><div><span>FIFA-WELTRANGLISTE · MÄNNER</span><strong>#{country.fifaRanking}</strong></div><p>Stand: {country.fifaRankingDate ? new Intl.DateTimeFormat('de-DE').format(new Date(country.fifaRankingDate)) : 'siehe FIFA'}</p><a href="https://inside.fifa.com/fifa-rankings/world-ranking/MAC" target="_blank" rel="noopener noreferrer">Offizielle Rangliste ↗</a></div>}
      {country.intro?.length>0&&<div className="country-guide-intro"><PortableText value={country.intro} components={portableComponents}/></div>}
      {country.essentials?.length>0&&<section className="country-essentials"><h2>AUF EINEN BLICK</h2><ul>{country.essentials.map((item,i)=><li key={i}>{item}</li>)}</ul></section>}
      {sections.length>0&&<nav className="country-topic-nav" aria-label="Themen"><strong>DIREKT ZUM THEMA</strong><div>{sections.map((s,i)=><a href={'#thema-'+i} key={i}>{topics[s.topic]?.[0]||'•'} {s.heading||topics[s.topic]?.[1]||'Mehr erfahren'} ↓</a>)}</div></nav>}
      <div className="country-section-grid">{sections.map((section,i)=>{
        const accordion=section.presentation==='accordion'
        const inner=<><div className="country-topic-body">
          {section.notice?.text&&<aside className={'country-notice country-notice-'+(section.notice.level||'info')}><strong>{section.notice.title||'WICHTIG ZU WISSEN'}</strong><p>{section.notice.text}</p></aside>}
          {section.content?.length>0&&<PortableText value={section.content} components={portableComponents}/>}
          {section.tip&&<aside className="country-tip"><strong>💡 TANDEMHOPPER-TIPP</strong><p>{section.tip}</p></aside>}
          {section.sources?.some(s=>s.url)&&<div className="country-sources"><strong>QUELLEN & LINKS</strong><ul>{section.sources.filter(s=>s.url).map((s,j)=><li key={j}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label||'Quelle ansehen'} ↗</a></li>)}</ul></div>}
        </div></>
        const heading=<><span aria-hidden="true">{topics[section.topic]?.[0]||'📌'}</span><h2>{section.heading||topics[section.topic]?.[1]||'Wissenswertes'}</h2></>
        return accordion?<details id={'thema-'+i} className="country-topic country-topic-accordion" key={section._key||i}><summary className="country-topic-title">{heading}<span className="country-expand" aria-hidden="true">+</span></summary>{inner}</details>:<section id={'thema-'+i} className={'country-topic '+(section.presentation==='card'?'country-topic-card':'')} key={section._key||i}><div className="country-topic-title">{heading}</div>{inner}</section>
      })}</div>
      {country.checkedAt&&<p className="country-updated">Zuletzt überprüft: {new Intl.DateTimeFormat('de-DE').format(new Date(country.checkedAt))}. Bitte aktuelle Ticket- und Einreiseregeln vor der Reise nochmals prüfen.</p>}
      {related.length>0&&<section className="country-related"><h2>UNSERE GESCHICHTEN AUS {country.title.toLocaleUpperCase('de')}</h2><div>{related.map(a=><Link key={a.slug} href={'/geschichten/'+a.slug}>{a.hero&&<img src={imageUrl(a.hero,600,78)} alt="" loading="lazy"/>}<strong>{a.title}</strong><span>WEITERLESEN →</span></Link>)}</div></section>}
    </div>
  </main><Footer/></>
}
