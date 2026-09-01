import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroRotator from '../components/HeroRotator'
import {getArticles} from '../lib/sanity'
import {imageUrl} from '../lib/imageUrl'
import {absoluteUrl} from '../lib/site'

export const revalidate = 60

function selectHeroArticles(articles){
  const featured=articles
    .filter(article=>article.featured && article.hero)
    .sort((a,b)=>{
      const orderA=Number.isFinite(a.featuredOrder)?a.featuredOrder:99
      const orderB=Number.isFinite(b.featuredOrder)?b.featuredOrder:99
      if(orderA!==orderB) return orderA-orderB
      return new Date(b.date||0).getTime()-new Date(a.date||0).getTime()
    })
    .slice(0,6)

  const selected=[...featured]
  const selectedSlugs=new Set(selected.map(article=>article.slug))
  for(const article of articles){
    if(selected.length>=5) break
    if(article.hero && !selectedSlugs.has(article.slug)){
      selected.push(article)
      selectedSlugs.add(article.slug)
    }
  }
  return selected.slice(0,6)
}

export async function generateMetadata(){
  const articles = await getArticles()
  const lead = selectHeroArticles(articles)[0] || articles[0]
  const image = lead?.hero ? absoluteUrl(imageUrl(lead.hero,1600,84)) : null
  const description = 'Groundhopping, Fankultur, Stadien, Fanszenen und Fußballreisen – mit Berichten direkt aus den Kurven und von den Plätzen.'

  return {
    title: 'Tandemhopper – Groundhopping & Fankultur',
    description,
    alternates:{canonical:'/'},
    openGraph:{
      type:'website',
      locale:'de_DE',
      url:'/',
      siteName:'Tandemhopper',
      title:'Tandemhopper – Groundhopping & Fankultur',
      description,
      images:image?[{url:image,alt:lead?.heroAlt||lead?.title||'Tandemhopper'}]:undefined,
    },
    twitter:{
      card:'summary_large_image',
      title:'Tandemhopper – Groundhopping & Fankultur',
      description,
      images:image?[image]:undefined,
    },
  }
}

export default async function Home(){
  const articles = await getArticles()
  const heroArticles = selectHeroArticles(articles)
  const heroSlugs = new Set(heroArticles.map(article=>article.slug))
  const latest = articles.filter(article => !heroSlugs.has(article.slug)).slice(0,4)
  const heroItems = heroArticles.map(article=>({
    slug:article.slug,
    title:article.title,
    shortTitle:article.shortTitle,
    teaser:article.teaser,
    href:'/geschichten/'+article.slug,
    image:article.hero?imageUrl(article.hero,1800,84):null,
    alt:article.heroAlt,
  }))

  return <><Header/><main>
    <HeroRotator items={heroItems}/>

    <section className="category-grid">
      <Link className="category-card" href="/geschichten?filter=fankultur"><img src="/assets/fankultur-pyro.jpg" alt="Kurzmeldungen aus Fankultur und Groundhopping" loading="lazy" decoding="async"/><span className="shade"></span><div><h2>KURZMELDUNGEN</h2><p>Fanszenen, Groundhopping<br/>&amp; aktuelle Entwicklungen.</p><strong>→</strong></div></Link>
      <Link className="category-card" href="/kalender"><img src="/assets/grounds-oldschool.jpg" alt="Groundhopper-Kalender" loading="lazy" decoding="async"/><span className="shade"></span><div><h2>KALENDER</h2><p>Derbys, Jubiläen, Europa<br/>&amp; besondere Termine.</p><strong>→</strong></div></Link>
      <Link className="category-card" href="/geschichten?filter=reisen"><img src="/assets/unterwegs.jpg" alt="Fußballreisen" loading="lazy" decoding="async"/><span className="shade"></span><div><h2>REISEN</h2><p>Länder, Wege &amp; Fußball<br/>aus Groundhoppersicht.</p><strong>→</strong></div></Link>
    </section>

    <section className="latest">
      <div className="section-head"><h2>NEUESTE GESCHICHTEN</h2><Link href="/geschichten">ALLE BERICHTE ANSEHEN →</Link></div>
      <div className="story-grid">{latest.map(a=>{
        const facts=[a.result,a.attendance?`${a.attendance} ZUSCHAUER`:null].filter(Boolean).join(' · ')
        return <Link className="story-card" href={'/geschichten/'+a.slug} key={a.slug}>{a.hero && <img src={imageUrl(a.hero,720,80)} alt={a.heroAlt} loading="lazy" decoding="async"/>}<div><span className="tag">{a.tag.toUpperCase()}</span><h3>{a.shortTitle.toUpperCase()}</h3>{facts&&<p className="story-facts">{facts}</p>}<time>{a.displayDate || a.dateDisplay}</time></div></Link>
      })}</div>
    </section>
  </main><Footer/></>
}
