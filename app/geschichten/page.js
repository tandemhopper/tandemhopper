import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {getArticles} from '../../lib/sanity'
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

  return <><Header/><main className="archive">
    <div className="archive-head">
      <p className="eyebrow">TANDEMHOPPER ARCHIV</p>
      <h1>GESCHICHTEN</h1>
      <p>Spielberichte, Kurzmeldungen und Reisen. Nicht alles muss groß sein – nur interessant genug, um genauer hinzuschauen.</p>
      <div className="filterbar">{filters.map(item=><Link className={filter===item.key?'active':''} key={item.key||'all'} href={item.key?`/geschichten?filter=${item.key}`:'/geschichten'}>{item.label}</Link>)}</div>
    </div>
    {list.length>0 ? <div className="archive-grid">{list.map(a=><Link className="archive-card" href={'/geschichten/'+a.slug} key={a.slug}>{a.hero&&<img src={imageUrl(a.hero,900,80)} alt={a.heroAlt} loading="lazy" decoding="async"/>}<span className="tag">{a.tag.toUpperCase()}</span><h2>{a.title}</h2><p>{a.teaser}</p><time>{a.displayDate || a.dateDisplay}</time></Link>)}</div> : <div className="archive-empty">In diesem Bereich liegt gerade noch nichts. Das dürfte sich ändern.</div>}
  </main><Footer/></>
}
