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
    <section className="hero editorial-hero">
      <div className="hero-copy">
        <div className="hero-topline"><p className="eyebrow">NEUESTER BERICHT</p><span>01</span></div>
        <h1>{lead.title.toUpperCase()}</h1>
        {showMatch && <p className="match">{lead.shortTitle.toUpperCase()}</p>}
        <p className="hero-teaser">{lead.teaser}</p>
        <div className="red-rule"></div>
        <p className="meta">{metaParts.join('  ·  ')}</p>
        <Link className="text-link" href={'/geschichten/'+lead.slug}>BERICHT LESEN <span>→</span></Link>
      </div>
      <Link className="hero-image" href={'/geschichten/'+lead.slug}><img src={imageUrl(lead.hero,1800,84)} alt={lead.heroAlt} fetchPriority="high" decoding="async"/></Link>
    </section>

    <section className="home-manifesto">
      <strong>GEHT’S RAUS, SCHAUT’S FUSSBALL.</strong>
      <p>Grounds sammeln. Hinschauen, was rundherum passiert. Geschichten mitnehmen, die auf der Anzeigetafel nicht auftauchen.</p>
    </section>

    <section className="category-grid editorial-categories">
      <Link className="category-card" href="/geschichten?filter=fankultur"><img src="/assets/fankultur-pyro.jpg" alt="Fankultur" loading="lazy" decoding="async"/><span className="shade"></span><span className="category-no">01</span><div><h2>FANKULTUR</h2><p>Ultras, Fanszenen,<br/>Choreos &amp; Pyro.</p><strong>→</strong></div></Link>
      <Link className="category-card" href="/geschichten?filter=grounds"><img src="/assets/grounds-oldschool.jpg" alt="Grounds" loading="lazy" decoding="async"/><span className="shade"></span><span className="category-no">02</span><div><h2>GROUNDS</h2><p>Stadien, Sportplätze<br/>&amp; ihre Geschichten.</p><strong>→</strong></div></Link>
      <Link className="category-card" href="/geschichten?filter=reisen"><img src="/assets/unterwegs.jpg" alt="Unterwegs" loading="lazy" decoding="async"/><span className="shade"></span><span className="category-no">03</span><div><h2>UNTERWEGS</h2><p>Fußballreisen in Europa<br/>&amp; darüber hinaus.</p><strong>→</strong></div></Link>
    </section>

    <section className="latest editorial-latest">
      <div className="section-head"><div><span className="section-kicker">ZULETZT VERÖFFENTLICHT</span><h2>NEUE GESCHICHTEN</h2></div><Link href="/geschichten">ZUM GESAMTEN ARCHIV →</Link></div>
      <div className="story-grid editorial-story-grid">{latest.map((a,i)=><Link className={`story-card ${i===0?'story-card-featured':''}`} href={'/geschichten/'+a.slug} key={a.slug}><img src={imageUrl(a.hero,i===0?1100:620,80)} alt={a.heroAlt} loading="lazy" decoding="async"/><div><span className="tag">{a.tag.toUpperCase()}</span><h3>{a.shortTitle.toUpperCase()}</h3><p>{a.teaser}</p><time>{a.displayDate || a.dateDisplay}</time></div></Link>)}</div>
    </section>
  </main><Footer/></>
}
