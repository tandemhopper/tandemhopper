import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {getArticles} from '../../lib/sanity'
import {imageUrl} from '../../lib/imageUrl'

export const metadata={title:'Geschichten'}
export const revalidate = 60

export default async function Stories({searchParams}){
  const sp=await searchParams
  const filter=(sp?.filter||'').toLowerCase()
  const articles=await getArticles()
  const list=filter?articles.filter(a=>a.categoryKey===filter):articles

  return <><Header/><main className="archive">
    <div className="archive-head">
      <p className="eyebrow">TANDEMHOPPER ARCHIV</p>
      <h1>GESCHICHTEN</h1>
      <p>Spielberichte, Fankultur, Grounds und Reisen. Nicht alles muss groß sein – nur interessant genug, um genauer hinzuschauen.</p>
      <div className="filterbar"><Link href="/geschichten">ALLE</Link><Link href="/geschichten?filter=spielbericht">SPIELBERICHTE</Link><Link href="/geschichten?filter=fankultur">FANKULTUR</Link><Link href="/geschichten?filter=grounds">GROUNDS</Link><Link href="/geschichten?filter=reisen">REISEN</Link></div>
    </div>
    <div className="archive-grid">{list.map(a=><Link className="archive-card" href={'/geschichten/'+a.slug} key={a.slug}><img src={imageUrl(a.hero,900,80)} alt={a.heroAlt} loading="lazy" decoding="async"/><span className="tag">{a.tag.toUpperCase()}</span><h2>{a.title}</h2><p>{a.teaser}</p><time>{a.displayDate || a.dateDisplay}</time></Link>)}</div>
  </main><Footer/></>
}
