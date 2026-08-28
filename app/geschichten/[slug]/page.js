import {notFound} from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Gallery from '../../../components/Gallery'
import ArticleBody from '../../../components/ArticleBody'
import {getArticleBySlug} from '../../../lib/sanity'
import {imageUrl} from '../../../lib/imageUrl'
import {absoluteUrl, siteUrl} from '../../../lib/site'

export const revalidate = 60

export async function generateMetadata({params}){
  const {slug}=await params
  const a=await getArticleBySlug(slug)
  if(!a) return {}

  const description=a.seoDescription||a.teaser
  const canonical=`/geschichten/${slug}`
  const socialImage=a.hero ? absoluteUrl(imageUrl(a.hero,1600,84)) : null

  return {
    title:a.title,
    description,
    alternates:{canonical},
    openGraph:{
      type:'article',
      locale:'de_DE',
      url:canonical,
      siteName:'Tandemhopper',
      title:a.title,
      description,
      publishedTime:a.date||undefined,
      images:socialImage?[{url:socialImage,alt:a.heroAlt||a.title}]:undefined,
    },
    twitter:{
      card:'summary_large_image',
      title:a.title,
      description,
      images:socialImage?[socialImage]:undefined,
    },
  }
}

export default async function Article({params}){
  const {slug}=await params
  const a=await getArticleBySlug(slug)
  if(!a) notFound()

  const canonical=`${siteUrl}/geschichten/${slug}`
  const jsonLd={
    '@context':'https://schema.org',
    '@type':'Article',
    headline:a.title,
    description:a.seoDescription||a.teaser,
    datePublished:a.date||undefined,
    mainEntityOfPage:canonical,
    image:a.hero?[absoluteUrl(a.hero)]:undefined,
    author:{'@type':'Organization',name:'Tandemhopper',url:siteUrl},
    publisher:{'@type':'Organization',name:'Tandemhopper',url:siteUrl},
  }

  return <><Header/><article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
    <header className="article-head">
      <Link href="/geschichten" className="back">← ALLE GESCHICHTEN</Link>
      <p className="eyebrow">{a.tag.toUpperCase()}</p>
      <h1>{a.title.toUpperCase()}</h1>
      <p className="deck">{a.teaser}</p>
    </header>

    {a.competition&&<div className="match-grid">
      <div><span>SPIEL</span><strong>{a.shortTitle}</strong></div>
      <div><span>WETTBEWERB</span><strong>{a.competition}</strong></div>
      <div><span>DATUM</span><strong>{a.matchDateDisplay || a.displayDate || '–'}</strong></div>
      <div><span>STADION</span><strong>{a.stadium||'–'}</strong></div>
      <div><span>ZUSCHAUER</span><strong>{a.attendance||'–'}</strong></div>
      <div><span>ERGEBNIS</span><strong>{a.result||'–'}</strong></div>
    </div>}

    {a.hero&&<figure className="article-hero"><img src={imageUrl(a.hero,2000,85)} alt={a.heroAlt} fetchPriority="high" decoding="async"/>{a.heroCaption&&<figcaption>{a.heroCaption}</figcaption>}</figure>}

    {a.body?.length
      ? <div className="article-layout"><div className="article-body"><ArticleBody blocks={a.body}/></div></div>
      : <><div className="article-layout"><div className="article-body"><p className="lead">{a.lead}</p>{a.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</div></div>{a.galleryPlacement&&<Gallery images={a.gallery}/>}</>}
  </article><Footer/></>
}
