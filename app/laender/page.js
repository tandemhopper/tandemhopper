import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {getCountryGuides} from '../../lib/countryGuides'
import {getMacauEditorialSettings} from '../../lib/macauEditorialSettings'
import {imageUrl} from '../../lib/imageUrl'
import '../macau-editorial.css'

export const revalidate = 60
export const metadata = {
  title:'Länderkompass – Fußballreisen & Groundhopping',
  description:'Groundhopping weltweit: Stadien, Fußballspiele, Einreise, Tickets und Tipps aus eigener Erfahrung. Der Tandemhopper Länderkompass.',
  alternates:{canonical:'/laender'},
}

const continents=[['europa','Europa'],['asien','Asien'],['afrika','Afrika'],['nordamerika','Nordamerika'],['suedamerika','Südamerika'],['ozeanien','Ozeanien']]

export default async function CountriesPage(){
  const [guides,macauSettings]=await Promise.all([getCountryGuides(),getMacauEditorialSettings()])
  const imageOverride=macauSettings?.images?.find(image=>image.slot==='tile'&&image.url)?.url
  const countryTile=country=>country.slug==='macau'&&imageOverride?imageOverride:country.tile
  return <><Header/><main className="th-countries">
    <header className="th-countries-head">
      <div><p className="th-eyebrow">TANDEMHOPPER · LÄNDERKOMPASS</p><h1>FUSSBALL.<br/>WELTWEIT<span>.</span></h1></div>
      <p>Welche Stadien lohnen sich? Wie kommt man an Tickets? Und welche Stolperfallen sollte man vor dem Länderpunkt kennen? Ein Reiseführer für Fußballfans – mit konkreten Tipps statt austauschbarer Länderporträts.</p>
    </header>
    {continents.map(([key,label],ci)=>{
      const countries=guides.filter(g=>g.continent===key)
      if(!countries.length)return null
      const featured=countries.length===1?countries[0]:null
      return <section className="th-continent" key={key} aria-labelledby={'continent-'+key}>
        <div className="th-continent-head"><span>{String(ci+1).padStart(2,'0')}</span><h2 id={'continent-'+key}>{label.toUpperCase()}</h2><small>{countries.length} {countries.length===1?'LÄNDERGUIDE':'LÄNDERGUIDES'}</small></div>
        {featured?<Link className="th-country-feature" href={'/laender/'+featured.slug}>
          <div className="th-country-feature-photo">{countryTile(featured)&&<img src={imageUrl(countryTile(featured),1200,84)} alt={featured.title+' – Groundhopping'} loading="eager"/>}</div>
          <div className="th-country-feature-copy"><span>LÄNDERGUIDE · {featured.region?.toUpperCase()||label.toUpperCase()}</span><h3>{featured.title.toUpperCase()}</h3><p>{featured.teaser||'Stadien, Fußball & Reiseplanung'}</p><strong>GUIDE ANSEHEN ↗</strong></div>
        </Link>:<div className="th-country-list">{countries.map(country=><Link href={'/laender/'+country.slug} key={country._id}>
          <div className="th-country-list-photo">{countryTile(country)&&<img src={imageUrl(countryTile(country),850,82)} alt={country.title+' – Groundhopping'} loading="lazy"/>}</div>
          <strong>{country.title.toUpperCase()}</strong><p>{country.teaser}</p>
        </Link>)}</div>}
      </section>
    })}
    {!guides.length&&<div className="th-upcoming"><strong>DIE ERSTEN GUIDES ENTSTEHEN.</strong><p>Hier findest du demnächst praktische Informationen für deine nächsten Länderpunkte.</p></div>}
    {guides.length>0&&<aside className="th-upcoming"><strong>WEITERE LÄNDER FOLGEN.</strong><p>Als Nächstes geplant: Hongkong und China. Die Guides wachsen mit den Reisen und den Rückmeldungen aus der Szene.</p></aside>}
  </main><Footer/></>
}