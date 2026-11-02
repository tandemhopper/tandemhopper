import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import LeagueSeasonCalendar from './LeagueSeasonCalendar'
import CountryCommunity from './CountryCommunity'
import {defaultHongkongTexts,defaultHongkongTextMap,defaultHongkongImages,defaultHongkongMatches,defaultHongkongTips,defaultHongkongSources,defaultHongkongLeagueSeason} from '../lib/hongkongEditableDefaults'

const imagePath='/assets/laender/hongkong/'
const photoFiles={
 hero:'kai-tak-hong-kong-fans',
 tile:'kai-tak-hong-kong-fans',
 'kai-tak-fans':'kai-tak-hong-kong-fans',
}
function Chapter({id,number,label,title,children}){
 return <section className="th-chapter hk-chapter" id={id}>
   <span className="th-chapter-number">{number} / {label}</span><h2>{title}</h2>{children}
 </section>
}
function External({href,children,className='th-source-link'}){
 return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true"> ↗</span></a>
}
function DateText({value}){
 if(!value)return null
 const [y,m,d]=value.split('-')
 return <>{d}.{m}.{y}</>
}

export default function HongkongEditorialPage({settings,communityEnabled=false}){
 const copy=[...(settings?.introTexts||[]),...(settings?.footballTexts||[]),...(settings?.groundsTexts||[]),...(settings?.fansTexts||[]),...(settings?.travelTexts||[]),...(settings?.cityTexts||[]),...(settings?.tipsTexts||[]),...(settings?.sourcesTexts||[])]
 const changedCopy=new Map(copy.map(item=>[item.key,item.value]))
 const t=key=>changedCopy.has(key)?changedCopy.get(key):(defaultHongkongTextMap[key]||'')
 const images=new Map((settings?.images||[]).map(item=>[item.slot,item]))
 const defaultImages=new Map(defaultHongkongImages.map(image=>[image.slot,image]))
 const Photo=({name,wide=false,extraClass='',priority=false})=>{
  const photo=defaultImages.get(name)
  const edited=images.get(name)
  const filename=photoFiles[name]||name
  const url=edited?.url||imagePath+filename+'.webp'
  const alt=edited?.alt||photo?.alt||''
  const caption=edited?.caption??photo?.caption
  return <figure className={'th-photo'+(wide?' th-photo-wide':'')+(extraClass?' '+extraClass:'')}>
    <img src={url} alt={alt} loading={priority?'eager':'lazy'} decoding="async" fetchPriority={priority?'high':undefined}/>
    {caption&&<figcaption>{caption}</figcaption>}
  </figure>
 }
 const changedLinks=new Map((settings?.sourceLinks||[]).map(item=>[item.originalUrl,item]))
 const TLink=({href,children,className})=>{
  const override=changedLinks.get(href)
  const orig=defaultHongkongSources.find(item=>item.originalUrl===href)
  const label=override&&orig&&override.label!==orig.label?override.label:children
  return <External href={override?.url||href} className={className}>{label}</External>
 }
 const season={...defaultHongkongLeagueSeason,...(settings?.leagueSeason||{})}
 const tips=Array.isArray(settings?.tips)?settings.tips:defaultHongkongTips
 const matches=Array.isArray(settings?.matches)?settings.matches:defaultHongkongMatches
 const links=Array.isArray(settings?.sourceLinks)?settings.sourceLinks:defaultHongkongSources
 const hero=images.get('hero')
 const updated=settings?.lastReviewed?new Intl.DateTimeFormat('de-DE').format(new Date(settings.lastReviewed)):'02.11.2026'
 return <><Header/><main className="th-country hk-country">
  <nav className="th-breadcrumb" aria-label="Brotkrumennavigation"><Link href="/laender">LÄNDERKOMPASS</Link><span>/</span><span>ASIEN</span><span>/</span><strong>HONGKONG</strong><i/><span>GUIDE 02</span></nav>
  <header className="th-hero hk-hero">
   <div className="th-hero-copy">
    <p className="th-eyebrow">{t('hero-eyebrow')}</p>
    <h1>HONGKONG<span>.</span></h1>
    <p className="th-hero-deck">{t('hero-deck')}</p>
    <div className="th-hero-meta"><span>GROUNDHOPPING-GUIDE</span><span>STAND {updated}</span></div>
   </div>
   <figure className="th-hero-photo hk-hero-photo">
    <img src={hero?.url||imagePath+'kai-tak-hong-kong-fans.webp'} alt={hero?.alt||defaultImages.get('hero')?.alt} fetchPriority="high" decoding="async"/>
    <figcaption>{hero?.caption??defaultImages.get('hero')?.caption}</figcaption>
   </figure>
  </header>
  <div className="th-facts" aria-label="Hongkong auf einen Blick">
   <div><span>FIFA-RANGLISTE · MÄNNER</span><strong>153. Platz</strong><small>Stand: 07.10.2026</small></div>
   <div><span>FUSSBALLVERBAND</span><strong>HKFA</strong><small>Eigenständiges FIFA-Mitglied</small></div>
   <div><span>WÄHRUNG</span><strong>Hongkong-Dollar</strong><small>HKD · Octopus hilft im Alltag</small></div>
   <div><span>LIGA · SPIELMONATE</span><strong><a href="#saison">{season.factWindow||'Aug–Mai'}</a></strong><small>{season.factNote||'Erstliga · alle Grounds separat prüfen'}</small></div>
  </div>
  <section className="th-intro hk-intro">
   <h2>{t('intro-heading')}</h2>
   <div><p>{t('intro-a')}</p><p>{t('intro-b')}</p></div>
  </section>
  <aside className="th-critical hk-critical">
   <div><p className="th-eyebrow">{t('intro-alert-eyebrow')}</p><h2>{t('intro-alert-title')}</h2></div>
   <div><p>{t('intro-alert-text')}</p>
    <TLink className="hk-priority-link" href="https://www.hkfa.com/en/competitions/fixtures">ALLE HKFA-SPIELE, ANSTOSSZEITEN & GROUNDS ANZEIGEN</TLink>
   </div>
  </aside>
  <div className="th-content-layout">
   <nav className="th-sticky-nav" aria-label="Inhaltsverzeichnis"><strong>DIREKT ZUM THEMA</strong>
    <a href="#saison"><span>01</span> Wann wird gespielt?</a>
    <a href="#grounds"><span>02</span> Die Stadien</a>
    <a href="#fans"><span>03</span> Nationalmannschaft</a>
    <a href="#wochenende"><span>04</span> Groundhopping</a>
    <a href="#anreise"><span>05</span> Anreise & ÖPNV</a>
    <a href="#spartipps"><span>06</span> Tipps & Tricks</a>
    <a href="#stadt"><span>07</span> Hongkong erleben</a>
    {communityEnabled&&<a href="#community"><span>08</span> Community</a>}
    <a href="#quellen"><span>{communityEnabled?'09':'08'}</span> Quellen & Stand</a>
   </nav>
   <div className="th-chapters">
    <Chapter id="saison" number="01" label="SAISONKALENDER & SPIELPLANUNG" title={t('season-title')}>
      <p className="th-lead">{t('season-lead')}</p>
      <LeagueSeasonCalendar data={season}/>
      <div className="hk-fixtures-box">
       <span>DER WICHTIGSTE LINK FÜR GROUNDHOPPER</span>
       <h3>ALLE SPIELE AUF EINEN BLICK.</h3>
       <p>Premier League, untere Ligen, Jugend- und Frauenfußball, Pokal und Futsal – mit Datum, Anstoßzeit und häufig dem konkreten Platz.</p>
       <TLink className="hk-fixtures-button" href="https://www.hkfa.com/en/competitions/fixtures">ZUM OFFIZIELLEN HKFA-SPIELPLAN</TLink>
      </div>
      <h3>{t('season-more-title')}</h3>
      <p>{t('season-more')}</p>
      <p className="th-inline-tip">{t('season-tip')}</p>
    </Chapter>

    <Chapter id="grounds" number="02" label="STADIEN & BESONDERE GROUNDS" title={t('grounds-title')}>
     <p className="th-lead">{t('grounds-lead')}</p>
     <h3>{t('hkfc-title')}</h3>
     <p>{t('hkfc-a')}</p>
     <Photo name="happy-valley-overview" wide/>
     <div className="th-photo-pair">
      <Photo name="happy-valley-football-skyline"/>
      <Photo name="hkfc-night-match"/>
     </div>
     <p>{t('hkfc-b')}</p>
     <p className="th-inline-tip">{t('hkfc-tip')}</p>
     <Link className="hk-article-link" href="/geschichten/gluecksfund-in-hongkong"><span>SPIELBERICHT · 04.10.2026</span><strong>GLÜCKSFUND IN HONGKONG</strong><span>DEN GANZEN BERICHT LESEN ↗</span></Link>
     <h3>{t('kai-title')}</h3>
     <p>{t('kai-a')}</p>
     <Photo name="kai-tak-hong-kong-cambodia" wide/>
     <p>{t('kai-b')}</p>
     <h3>{t('mong-title')}</h3>
     <p>{t('mong-text')}</p>
     <TLink href="https://www.lcsd.gov.hk/en/stadium/mks/facilities.html">Mong Kok Stadium · offizielle Informationen</TLink>
     <h3>{t('groundfive-title')}</h3>
     <p>{t('groundfive-intro')}</p>
     <div className="th-photo-pair">
      <Photo name="sham-shui-po-tribune"/>
      <Photo name="tsing-yi-ground"/>
     </div>
     <div className="th-photo-pair th-photo-pair-small">
      <Photo name="kowloon-tsai-ground"/>
      <Photo name="la-salle-college"/>
     </div>
     <aside className="th-update"><strong>ZUGANG ZU SCHULGROUNDS</strong><p>Der einfache Zugang beim Besuch 2025 ist keine allgemeine Zutrittsberechtigung für private Schulgelände. Aktuelle Spiele und Zugangsvorgaben vorher prüfen.</p></aside>
    </Chapter>

    <Chapter id="fans" number="03" label="NATIONALMANNSCHAFT & FANKULTUR" title={t('fans-title')}>
      <p className="th-lead">{t('fans-lead')}</p>
      <Photo name="kai-tak-fans" extraClass="hk-fan-photo" wide/>
      <p>{t('fans-a')}</p>
      <p>{t('fans-b')}</p>
      <div className="hk-result-bar"><span>03.10.2026 · FIFA ASEAN CHALLENGE CUP · FINALE</span><div><strong>HONGKONG</strong><b>2:0</b><strong>KAMBODSCHA</strong></div><small>31.374 Zuschauer · Kai Tak Stadium</small></div>
      <p className="th-inline-tip">{t('fans-tip')}</p>
      <TLink href="https://www.hkfa.com/competitions/result/51102/detail">Offizieller Spielbericht · HKFA</TLink>
    </Chapter>

    <Chapter id="wochenende" number="04" label="MEHRERE GROUNDS PRO TAG" title={t('weekend-title')}>
      <p className="th-lead">{t('weekend-a')}</p>
      <p>{t('weekend-b')}</p>
      <div className="hk-matches">
       <div className="hk-matches-head"><span>GROUNDS AUS EIGENEN BESUCHEN</span><strong>{matches.length} SPIELE</strong></div>
       {matches.map((match,i)=><article key={match._key||i}>
        <div className="hk-match-meta"><time dateTime={match.date}><DateText value={match.date}/></time><span>{match.kind}</span></div>
        <div className="hk-match-line"><div><strong>{match.ground}</strong><p>{match.home} – {match.away}</p></div><b>{match.score||'–'}</b></div>
       </article>)}
      </div>
      <div className="th-detail-note"><strong>AUCH JENSEITS DER HKFA</strong><p>In Hongkong gibt es unabhängige Freizeitligen und internationale Vereine. Die Yau Yee Football League gehört zu den traditionsreicheren Beispielen; ihre Spielpläne können eine zusätzliche Quelle für Fußball am Wochenende sein.</p><TLink href="https://www.yauyeeleague.com/">Yau Yee Football League</TLink></div>
    </Chapter>

    <Chapter id="anreise" number="05" label="SHENZHEN, GRENZE & NAHVERKEHR" title={t('travel-title')}>
      <p className="th-lead">{t('travel-lead')}</p>
      <div className="th-trip-grid">
       <section><h3>{t('travel-futian-title')}</h3><p>{t('travel-futian')}</p></section>
       <section><h3>FLUGHAFEN HONGKONG ODER SHENZHEN?</h3><p>{t('travel-flight')}</p></section>
      </div>
      <div className="hk-border-times" aria-label="Grenzübergänge zwischen Shenzhen und Hongkong">
       <div><span>FUTIAN ↔ LOK MA CHAU</span><strong>06:30–22:30</strong></div>
       <div><span>LO WU ↔ LUOHU</span><strong>06:30–00:00</strong></div>
       <div><span>HUANGGANG</span><strong>24 STD.</strong></div>
      </div>
      <p className="th-inline-tip">{t('travel-crossing')}</p>
      <TLink href="https://www.immd.gov.hk/eng/contactus/control_points.html">Offizielle Grenzübergänge & Öffnungszeiten</TLink>
      <div className="th-trip-grid hk-travel-subgrid">
        <section><h3>ÖPNV & OCTOPUS</h3><p>{t('travel-mobility')}</p></section>
        <section><h3>SIM, ESIM & INTERNET</h3><p>{t('travel-sim')}</p></section>
      </div>
      <details className="th-deep-dive">
       <summary>EINREISE: HONGKONG UND FESTLANDCHINA SIND GETRENNT <span aria-hidden="true">+</span></summary>
       <div><p>{t('travel-visa')}</p>
        <TLink href="https://s.nia.gov.cn/ArrivalCardFillingPC/">Offizielle kostenlose Mainland Arrival Card</TLink>
        <TLink href="https://www.immd.gov.hk/eng/contactus/control_points.html">Grenzkontrollen Hongkong</TLink>
       </div>
      </details>
    </Chapter>

    <Chapter id="spartipps" number="06" label="TIPPS & TRICKS" title={t('tips-title')}>
      <p className="th-lead">{t('tips-lead')}</p>
      <div className="th-budget-headline"><div><span>GÜNSTIG UNTERWEGS</span><strong>{t('tips-highlight-title')}</strong></div><p>{t('tips-highlight')}</p></div>
      <div className="th-budget-list">
       {tips.map((tip,i)=><article className="th-budget-tip" key={tip._key||i}>
        <span>{String(i+1).padStart(2,'0')}</span>
        <div><h3>{tip.title}</h3><p>{tip.text}</p>{tip.sourceUrl&&<External href={tip.sourceUrl}>{tip.sourceLabel||'Aktuelle Informationen'}</External>}</div>
       </article>)}
      </div>
      <div className="th-detail-note"><strong>KOSTEN IM BLICK BEHALTEN</strong><p>Beispielpreise in HKD sind Momentaufnahmen. Der Wechselkurs, Unterkunftspreise, Flugangebote und Einreisebedingungen können sich ändern – ebenso die Spielansetzungen.</p></div>
    </Chapter>

    <Chapter id="stadt" number="07" label="SEHENSWÜRDIGKEITEN & STADTKULTUR" title={t('city-title')}>
      <p className="th-lead">{t('city-lead')}</p>
      <div className="th-photo-pair th-photo-pair-city">
       <Photo name="peak-tram-view"/>
       <Photo name="victoria-harbour-night"/>
      </div>
      <h3>THE PEAK & DIE BERÜHMTE BERGBAHN</h3>
      <p>{t('city-peak')}</p>
      <div className="th-photo-pair th-photo-pair-small">
       <Photo name="peak-tram-forest"/>
       <Photo name="hong-kong-tram"/>
      </div>
      <h3>VICTORIA HARBOUR & DIE STAR FERRY</h3>
      <p>{t('city-harbour')}</p>
      <Photo name="tsim-sha-tsui-clock-tower" extraClass="hk-portrait-photo"/>
      <h3>PFERDERENNEN STATT SHOPPINGMALL?</h3>
      <p>{t('city-racing')}</p>
      <TLink href="https://happywednesday.hkjc.com/en-US/plan-your-visit/">Happy Valley Racecourse · Besucherinformationen</TLink>
      <h3>DIE BRÜCKE NACH ZHUHAI & MACAU</h3><p>{t('city-bridge')}</p>
      <h3>SONNTAGS TRIFFT MAN SICH IN DER STADT</h3>
      <p>{t('city-sunday')}</p>
    </Chapter>

    {communityEnabled&&<CountryCommunity country="hongkong" asChapter/>}

    <section className="th-sources" id="quellen">
      <h2>{t('sources-title')}</h2><p>{t('sources-intro')}</p>
      <div>{links.map((link,i)=><External key={link._key||i} href={link.url}>{link.label}</External>)}</div>
    </section>
   </div>
  </div>
  <div className="th-endbar"><Link href="/laender">← ZUR LÄNDERÜBERSICHT</Link><span>HONGKONG · LÄNDERKOMPASS</span></div>
 </main><Footer/></>
}
