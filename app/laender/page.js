import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {getCountryGuides} from '../../lib/countryGuides'
import {imageUrl} from '../../lib/imageUrl'
import '../laenderkompass.css'

export const revalidate = 300
export const metadata = {
  title: 'Länderkompass – Groundhopping weltweit',
  description: 'Tickets, Fanszenen, Anreise und praktische Tipps für deinen nächsten Länderpunkt. Der Tandemhopper Länderkompass.',
  alternates: {canonical:'/laender'},
}

const continents = [
  ['europa','Europa'],['asien','Asien'],['afrika','Afrika'],
  ['nordamerika','Nordamerika'],['suedamerika','Südamerika'],['ozeanien','Ozeanien'],
]

export default async function Countries() {
  const guides = await getCountryGuides()
  return <><Header/><main className="country-index">
    <div className="country-intro">
      <p className="eyebrow">TANDEMHOPPER · DIE FUSSBALLWELT ENTDECKEN</p>
      <h1>LÄNDERKOMPASS</h1>
      <p>Von der Ticketbeschaffung über Fanszenen bis zur Anreise: Hier findest du praktische Informationen für deinen nächsten Länderpunkt. Mit eigenen Erfahrungen, hilfreichen Quellen und Tipps aus der Groundhopping-Szene.</p>
    </div>
    {continents.map(([key,label]) => {
      const countries = guides.filter(g=>g.continent===key)
      if (!countries.length) return null
      return <section className="country-continent" key={key} aria-labelledby={key}>
        <h2 id={key}>{label}</h2>
        <div className="country-grid">{countries.map(country=><Link href={'/laender/'+country.slug} className="country-tile" key={country._id}>
          {country.tile&&<img src={imageUrl(country.tile,900,80)} alt="" loading="lazy" decoding="async"/>}
          <span className="country-tile-shade"/>
          <span className="country-tile-content"><strong>{country.flag&&<span aria-hidden="true">{country.flag} </span>}{country.title}</strong><small>{country.teaser||'Groundhopping-Guide entdecken'}</small><span className="country-arrow" aria-hidden="true">→</span></span>
        </Link>)}</div>
      </section>
    })}
    {!guides.length&&<div className="country-empty"><h2>DER LÄNDERKOMPASS ENTSTEHT.</h2><p>Die ersten Guides sind in Vorbereitung. Hier findest du bald praktische Informationen für deinen nächsten Länderpunkt.</p><Link href="/geschichten">Bis dahin: unsere Geschichten entdecken →</Link></div>}
  </main><Footer/></>
}
