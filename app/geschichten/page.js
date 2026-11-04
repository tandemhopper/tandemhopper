import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {getArticles,sanityClient} from '../../lib/sanity'
import {imageUrl} from '../../lib/imageUrl'

export const metadata={
  title:'Geschichten',
  description:'Spielberichte, Kurzmeldungen und Fußballreisen von Tandemhopper.',
  alternates:{canonical:'/geschichten'},
  openGraph:{
    type:'website',
    locale:'de_DE',
    url:'/geschichten',
    siteName:'Tandemhopper',
    title:'Geschichten | Tandemhopper',
    description:'Spielberichte, Kurzmeldungen und Fußballreisen von Tandemhopper.',
    images:[{url:'/assets/fankultur-pyro.jpg',alt:'Fankultur bei Tandemhopper'}],
  },
  twitter:{
    card:'summary_large_image',
    title:'Geschichten | Tandemhopper',
    description:'Spielberichte, Kurzmeldungen und Fußballreisen von Tandemhopper.',
    images:['/assets/fankultur-pyro.jpg'],
  },
}
export const revalidate = 60

const filters=[
  {key:'',label:'ALLE'},
  {key:'spielbericht',label:'SPIELBERICHTE'},
  {key:'fankultur',label:'KURZMELDUNGEN'},
  {key:'reisen',label:'REISEN'}
]

export default async function Stories({searchParams}){
  const sp=await searchParams
  const filter=(sp?.filter||'').toLowerCase()
  const articles=await getArticles()
  const list=filter?articles.filter(a=>a.categoryKey===filter):articles
  const pageSize=24
  const requestedPage=Number(sp?.page)
  const page=Number.isSafeInteger(requestedPage)&&requestedPage>0?requestedPage:1
  const totalPages=Math.max(1,Math.ceil(list.length/pageSize))
  const visible=list.slice((page-1)*pageSize,page*pageSize)
  const showFlightRoutes = (filter === '' || filter === 'fankultur') && page === 1
  let flightRoutesImage = null
  if (showFlightRoutes) {
    try {
      const settings = await sanityClient.fetch(
        '*[_id == "flightRoutesSettings" && _type == "flightRoutesSettings"][0]{"url":heroImage.asset->url,"alt":heroImage.alt}',
        {},
        {next:{revalidate:60}}
      )
      flightRoutesImage = settings?.url ? settings : null
    } catch {}
  }
  const pageHref=(number)=>`/geschichten?${new URLSearchParams({...(filter ? {filter} : {}),page:String(number)}).toString()}`

  return <><Header/><main className="archive">
    <div className="archive-head">
      <p className="eyebrow">TANDEMHOPPER ARCHIV</p>
      <h1>GESCHICHTEN</h1>
      <p>Spielberichte, Kurzmeldungen und Reisen. Nicht alles muss groß sein – nur interessant genug, um genauer hinzuschauen.</p>
      <div className="filterbar">{filters.map(item=><Link className={filter===item.key?'active':''} key={item.key||'all'} href={item.key?`/geschichten?filter=${item.key}`:'/geschichten'}>{item.label}</Link>)}</div>
    </div>
    {(visible.length>0 || showFlightRoutes) ? <div className="archive-grid">
      {showFlightRoutes&&<Link className="archive-card" href="/flugrouten" key="flugrouten-special">
        {flightRoutesImage?.url
          ? <img src={flightRoutesImage.url} alt={flightRoutesImage.alt||'Flugzeug'} loading="lazy" decoding="async"/>
          : <div style={{height:300,background:'#1b1d20',color:'#fff',display:'flex',alignItems:'flex-end',padding:24,marginBottom:15}}><strong style={{fontFamily:'Barlow Condensed,Arial,sans-serif',fontSize:54,lineHeight:.9}}>NEUE FLÜGE.<br/>NEUE GROUNDS.</strong></div>}
        <span className="tag">KURZMELDUNGEN</span>
        <h2>Ryanair schimpft. Und fliegt trotzdem.</h2>
        <p>Neue Direktverbindungen nach England, Marokko und Italien: Welche Strecken sich für Groundhopper lohnen, zeigt unsere interaktive Karte.</p>
        <time>04.11.2026</time>
      </Link>}
      {visible.map(a=><Link className="archive-card" href={'/geschichten/'+a.slug} key={a.slug}>{a.hero&&<img src={imageUrl(a.hero,720,80)} srcSet={`${imageUrl(a.hero,360,76)} 360w, ${imageUrl(a.hero,720,80)} 720w, ${imageUrl(a.hero,900,80)} 900w`} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw" alt={a.heroAlt} loading="lazy" decoding="async"/>}<span className="tag">{a.tag.toUpperCase()}</span><h2>{a.title}</h2><p>{a.teaser}</p><time>{a.displayDate || a.dateDisplay}</time></Link>)}</div> : <div className="archive-empty">In diesem Bereich liegt gerade noch nichts. Das dürfte sich ändern.</div>}
    {totalPages>1&&<nav aria-label="Archivseiten" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:16,margin:'32px auto',flexWrap:'wrap'}}>{page>1&&<Link href={pageHref(page-1)}>← Neuere Artikel</Link>}<span>Seite {page} von {totalPages}</span>{page<totalPages&&<Link href={pageHref(page+1)}>Ältere Artikel →</Link>}</nav>}
  </main><Footer/></>
}
