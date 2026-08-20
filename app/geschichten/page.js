import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {getArticles} from '../../lib/sanity'
import {imageUrl} from '../../lib/imageUrl'

export const metadata={title:'Geschichten'}
export const revalidate = 60

const filters=[
  {key:'',label:'ALLE'},
  {key:'spielbericht',label:'SPIELBERICHTE'},
  {key:'fankultur',label:'FANKULTUR'},
  {key:'grounds',label:'GROUNDS'},
  {key:'reisen',label:'REISEN'}
]

export default async function Stories({searchParams}){
  const sp=await searchParams
  const filter=(sp?.filter||'').toLowerCase()
  const articles=await getArticles()
  const list=filter?articles.filter(a=>a.categoryKey===filter):articles

  return <><Header/><main className="archive editorial-archive">
    <div className="archive-head">
      <div className="archive-title-row"><div><p className="eyebrow">TANDEMHOPPER ARCHIV</p><h1>GESCHICHTEN</h1></div><span className="archive-count">{String(list.length).padStart(2,'0')}<small>BEITRÄGE</small></span></div>
      <p>Spielberichte, Fankultur, Grounds und Reisen. Nicht alles muss groß sein – nur interessant genug, um genauer hinzuschauen.</p>
      <div className="filterbar">{filters.map(item=><Link className={filter===item.key?'active':''} key={item.key||'all'} href={item.key?`/geschichten?filter=${item.key}`:'/geschichten'}>{item.label}</Link>)}</div>
    </div>
    {list.length>0 ? <div className="archive-grid editorial-archive-grid">{list.map((a,i)=><Link className={`archive-card ${i===0?'archive-card-lead':''}`} href={'/geschichten/'+a.slug} key={a.slug}><div className="archive-image"><img src={imageUrl(a.hero,i===0?1400:900,80)} alt={a.heroAlt} loading={i===0?'eager':'lazy'} decoding="async"/></div><div className="archive-card-copy"><div className="archive-meta"><span className="tag">{a.tag.toUpperCase()}</span><time>{a.displayDate || a.dateDisplay}</time></div><h2>{a.title}</h2><p>{a.teaser}</p><span className="archive-read">LESEN →</span></div></Link>)}</div> : <div className="archive-empty">In diesem Bereich liegt gerade noch nichts. Das dürfte sich ändern.</div>}
  </main><Footer/></>
}
