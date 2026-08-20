import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {getArticles} from '../lib/sanity'
import {imageUrl} from '../lib/imageUrl'

export const revalidate = 60

export default async function Home(){
  const articles = await getArticles()
  const lead = articles.find(a => a.featured) || articles[0]
  const metaParts = [lead.competition || lead.tag, lead.displayDate || lead.dateDisplay, lead.attendance ? `${lead.attendance} ZUSCHAUER` : '', lead.result].filter(Boolean)
  const latest = articles.filter(article => article.slug !== lead.slug).slice(0,4)
  const showMatch = lead.shortTitle && lead.shortTitle.trim().toLowerCase() !== lead.title.trim().toLowerCase()

  return <><Header/><main>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">NEUESTER BERICHT</p>
        <h1>{lead.title.toUpperCase()}</h1>
        {showMatch && <p className="match">{lead.shortTitle.toUpperCase()}</p>}
        <div className="red-rule"></div>
        <p className="meta">{metaParts.join('  ·  ')}</p>
        <Link className="text-link" href={'/geschichten/'+lead.slug}>BERICHT LESEN <span>→</span></Link>
      </div>
      <Link className="hero-image" href={'/geschichten/'+lead.slug}><img src={imageUrl(lead.hero,1800,84)} alt={lead.heroAlt} fetchPriority="high" decoding="async"/></Link>
    </section>

    <section className="category-grid">
      <Link className="category-card" href="/geschichten?filter=fankultur"><img src="/assets/fankultur-pyro.jpg" alt="Fankultur" loading="lazy" decoding="async"/><span className="shade"></span><div><h2>FANKULTUR</h2><p>Ultras, Fanszenen,<br/>Choreos &amp; Pyro.</p><strong>→</strong></div></Link>
      <Link className="category-card" href="/geschichten?filter=grounds"><img src="/assets/grounds-oldschool.jpg" alt="Grounds" loading="lazy" decoding="async"/><span className="shade"></span><div><h2>GROUNDS</h2><p>Stadien, Sportplätze<br/>&amp; ihre Geschichten.</p><strong>→</strong></div></Link>
      <Link className="category-card" href="/geschichten?filter=reisen"><img src="/assets/unterwegs.jpg" alt="Unterwegs" loading="lazy" decoding="async"/><span className="shade"></span><div><h2>UNTERWEGS</h2><p>Fußballreisen in Europa<br/>&amp; darüber hinaus.</p><strong>→</strong></div></Link>
    </section>

    <section className="latest">
      <div className="section-head"><h2>NEUESTE GESCHICHTEN</h2><Link href="/geschichten">ALLE BERICHTE ANSEHEN →</Link></div>
      <div className="story-grid">{latest.map(a=><Link className="story-card" href={'/geschichten/'+a.slug} key={a.slug}><img src={imageUrl(a.hero,720,80)} alt={a.heroAlt} loading="lazy" decoding="async"/><div><span className="tag">{a.tag.toUpperCase()}</span><h3>{a.shortTitle.toUpperCase()}</h3><p>{a.teaser}</p><time>{a.displayDate || a.dateDisplay}</time></div></Link>)}</div>
    </section>
  </main><Footer/></>
}
