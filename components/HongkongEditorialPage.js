import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import LeagueSeasonCalendar from './LeagueSeasonCalendar'
import CountryCommunity from './CountryCommunity'
import {hongkongDefaults} from '../lib/hongkongGuideData'

function Url({url,children,external=true}) {
 if(!url)return null
 return <a className="th-source-link" href={url} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}<span aria-hidden="true"> ↗</span></a>
}
function Chapter({id,number,label,title,children}) {
 return <section className="th-chapter" id={id}>
  <span className="th-chapter-number">{number} / {label}</span><h2>{title}</h2>{children}
 </section>
}
function chunk(text,fallback='') {
 return (typeof text==='string'?text:fallback).split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean)
}
function Photo({slot,photos,wide=false,priority=false}) {
 const data=photos.get(slot)
 const url=data?.url||data?.fallbackUrl
 if(!url)return null
 return <figure className={'th-photo hk-photo'+(wide?' th-photo-wide':'')}>
   <img src={url} alt={data?.alt||''} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async"/>
   {data?.caption&&<figcaption>{data.caption}</figcaption>}
  </figure>
}

export default function HongkongEditorialPage({settings,communityEnabled=false}){
 const def=hongkongDefaults
 const string=(key,fallback)=>typeof settings?.[key]==='string'?settings[key]:fallback
 const entries=(key)=>Array.isArray(settings?.[key])?settings[key]:def[key]||[]
 const photos=new Map(def.images.map(x=>[x.slot,{...x,...(settings?.images?.find(y=>y.slot===x.slot)||{})}]))
 const photo=(slot,wide=false)=> <Photo slot={slot} wide={wide} photos={photos}/>
 const league={...def.leagueSeason,...(settings?.leagueSeason||{})}
 const grounds=entries('grounds'),tips=entries('tips'),travel=entries('travel'),leisure=entries('leisure'),sources=entries('sourceLinks')
 const review=settings?.lastReviewed?new Intl.DateTimeFormat('de-DE',{timeZone:'UTC'}).format(new Date(settings.lastReviewed+'T00:00:00Z')):'02.11.2026'
 const first=grounds.filter(x=>x._key==='kai'||x._key==='hkfc')
 const others=grounds.filter(x=>x._key!=='kai'&&x._key!=='hkfc')
 return <><Header/><main className="th-country th-hongkong">
  <nav className="th-breadcrumb" aria-label="Brotkrumennavigation"><Link href="/laender">LÄNDERKOMPASS</Link><span>/</span><span>ASIEN</span><span>/</span><strong>HONGKONG</strong><i/><span>GUIDE 02</span></nav>
  <header className="th-hero">
   <div className="th-hero-copy">
     <p className="th-eyebrow">{string('eyebrow',def.eyebrow)}</p>
     <h1>HONGKONG<span>.</span></h1>
     <p className="th-hero-deck">{string('deck',def.deck)}</p>
     <div className="th-hero-meta"><span>GROUNDHOPPING-GUIDE</span><span>STAND {review}</span></div>
   </div>
   <figure className="th-hero-photo">
     {photos.get('hero')?.url||photos.get('hero')?.fallbackUrl?
       <img src={photos.get('hero')?.url||photos.get('hero')?.fallbackUrl} alt={photos.get('hero')?.alt||'Fußball in Hongkong'} fetchPriority="high"/>:null}
     <figcaption>{photos.get('hero')?.caption||'Hongkong · Groundhopping'}</figcaption>
   </figure>
  </header>

  <div className="th-facts" aria-label="Hongkong auf einen Blick">
    <div><span>FIFA-RANGLISTE · MÄNNER</span><strong>153. Platz</strong><small>Stand: 07.10.2026</small></div>
    <div><span>FUSSBALLVERBAND</span><strong>Hong Kong FA</strong><small>Eigenständiges FIFA-Mitglied</small></div>
    <div><span>WÄHRUNG</span><strong>Hongkong-Dollar</strong><small>HKD · Octopus praktisch</small></div>
    <div><span>PREMIER LEAGUE · MONATE</span><strong><a href="#saison">{league.factWindow||'Aug–Mai'}</a></strong><small>{league.factNote||'Sommerpause prüfen'}</small></div>
  </div>

  <section className="th-intro">
    <h2>{string('introTitle',def.introTitle)}</h2>
    <div>{chunk(string('introText',def.intro.join('\n\n'))).map((p,i)=><p key={i}>{p}</p>)}</div>
  </section>

  <aside className="th-critical hk-important">
   <div><p className="th-eyebrow">DAS WICHTIGSTE ZUERST</p><h2>{string('spotlightTitle',def.spotlight.title)}</h2></div>
   <div><p>{string('spotlightText',def.spotlight.text)}</p>
    <a className="hk-prime-link" href={string('spotlightUrl',def.spotlight.url)} target="_blank" rel="noopener noreferrer">HKFA-SPIELPLAN ÖFFNEN <span aria-hidden="true">↗</span></a></div>
  </aside>

  <div className="th-content-layout">
   <nav className="th-sticky-nav" aria-label="Inhaltsverzeichnis"><strong>DIREKT ZUM THEMA</strong>
    <a href="#saison"><span>01</span> Wann wird gespielt?</a>
    <a href="#grounds"><span>02</span> Stadien & Grounds</a>
    <a href="#nationalelf"><span>03</span> Nationalelf & Fans</a>
    <a href="#spiele"><span>04</span> Sieben Groundbesuche</a>
    <a href="#anreise"><span>05</span> Anreise & Verkehr</a>
    <a href="#stadt"><span>06</span> Stadt & Sportkultur</a>
    <a href="#spartipps"><span>07</span> Tipps & Tricks</a>
    {communityEnabled&&<a href="#community"><span>08</span> Community</a>}
    <a href="#quellen"><span>{communityEnabled?'09':'08'}</span> Quellen & Stand</a>
   </nav>
   <div className="th-chapters">
    <Chapter id="saison" number="01" label="LIGA-SAISONS & SPIELPLAN" title="WANN WIRD GESPIELT?">
      <p className="th-lead">Hongkong ist wesentlich flexibler als Macau. Die Premier League läuft üblicherweise vom Spätsommer bis Mai. Wer auch die kleineren Ligen, internationalen Amateurwettbewerbe und Jugendspiele berücksichtigt, kann an einem einzigen Wochenende viele Partien finden.</p>
      <LeagueSeasonCalendar data={league}/>
      <div className="hk-plan-pair">
       <div><strong>01 / VERBANDSSPIELPLAN</strong><h3>HKFA · ALLE WETTBEWERBE</h3><p>Premier League, erste bis dritte Division, Frauen-, Jugend- und Futsalwettbewerbe. Bei jeder Partie Anstoßzeit, Spielort und gegebenenfalls den Zugang prüfen.</p><Url url="https://www.hkfa.com/en/competitions/fixtures">HKFA – komplette Ansetzungen</Url></div>
       <div><strong>02 / INTERNATIONALER AMATEURFUSSBALL</strong><h3>YAU YEE LEAGUE</h3><p>Eine zusätzliche Liga außerhalb des HKFA-Spielplans. Teams wie German All Stars, Irish Harps oder Club Wanderers machen die internationale Amateurwelt sichtbar. Teilweise werden die Plätze bis 21 Uhr bespielt.</p><Url url="https://www.yauyeeleague.com/en/fixtures/league">Yau Yee – Fixtureliste</Url></div>
      </div>
      <div className="th-detail-note"><strong>WICHTIG FÜR JUNI UND JULI</strong><p>Fußballplätze sind auch in den Sommermonaten belegt. Daraus folgt aber nicht, dass regelmäßig ein öffentlich zugängliches Pflichtspiel stattfindet. Vor allem bei Hitze und hoher Luftfeuchtigkeit erst nach einem konkreten Termin buchen.</p></div>
    </Chapter>

    <Chapter id="grounds" number="02" label="STADIEN & GROUNDS" title="ACHT PLÄTZE. ACHT VERSCHIEDENE KULISSEN.">
      <p className="th-lead">{string('groundIntro',def.groundIntro)}</p>
      {first.map((g,i)=><article className="hk-ground-feature" key={g._key||i}>
       <div className="hk-ground-label"><span>{String(i+1).padStart(2,'0')} / {g.area}</span><strong>{g.badge}</strong></div>
       <h3>{g.name}</h3>
       <p>{g.description}</p>
       {photo(g.imageSlot,true)}
       <div className="hk-ground-bottom"><span>{g.note}</span><Url url={g.source}>{g.sourceLabel||'Mehr zum Ground'}</Url></div>
      </article>)}
      <div className="hk-ground-grid">
       {others.map((g,i)=><article className="hk-ground-card" key={g._key||i}>
         <div className="hk-ground-card-top"><span>{String(i+3).padStart(2,'0')}</span><small>{g.area}</small></div>
         <h3>{g.name}</h3><p className="hk-ground-badge">{g.badge}</p>
         {photo(g.imageSlot)}
         <p>{g.description}</p>
         <div className="hk-ground-bottom"><span>{g.note}</span><Url url={g.source}>{g.sourceLabel||'Mehr erfahren'}</Url></div>
       </article>)}
      </div>
      <div className="th-update"><strong>ZUTRITT NICHT PAUSCHAL GARANTIERT</strong><p>Bei den dokumentierten Besuchen waren die kleinen Grounds frei erreichbar. Schulplätze wie das La Salle College und private Anlagen können aber andere Regeln haben. Das gilt besonders außerhalb offiziell angesetzter Spiele.</p></div>
    </Chapter>

    <Chapter id="nationalelf" number="03" label="FANKULTUR & NATIONALMANNSCHAFT" title={string('fanTitle',def.fanTitle)}>
     {chunk(string('fanText',def.fanParagraphs.join('\n\n'))).map((p,i)=><p key={i}>{p}</p>)}
     {photo('fans',true)}
     <div className="hk-score"><div><span>FIFA ASEAN CHALLENGE CUP · DIVISION 2</span><strong>HONGKONG <i>2:0</i> KAMBODSCHA</strong><small>FINALE · KAI TAK STADIUM · 03.10.2026 · 31.374 ZUSCHAUER</small></div><Url url="https://inside.fifa.com/organisation/news/asean-challenge-cup-hong-kong-china-eric-fok">FIFA – das Finale</Url></div>
     <div className="th-detail-note"><strong>WIE FANFRÖMMIGKEIT HIER WIRKLICH AUSSIEHT</strong><p>Das Finalspiel war laut und international, mit Vorsängern, Fahnen und Trommeln. Die eigene Wahrnehmung der englischen Lieder gilt für genau dieses Spiel – nicht automatisch für jedes Länderspiel und jede Hongkonger Fanszene.</p><Url url="https://www.inmediahk.net/node/%E9%AB%94%E8%82%B2/%E4%BA%9E%E9%81%8B%E6%92%90%E5%88%B0%E6%9D%B1%E7%9B%9F%E7%9B%83%E2%80%94%E2%80%94%E6%B8%AF%E9%9A%8A%E6%AD%BB%E5%BF%A0%E7%9A%84%E4%B8%80%E5%80%8B%E6%9C%88">InMediaHK – Power of Hong Kong (2026)</Url></div>
    </Chapter>

    <Chapter id="spiele" number="04" label="UNSERE GROUNDHOPPING-TOUR" title="FÜNF GROUNDS AN EINEM SONNTAG.">
     <p className="th-lead">Am Sonntag, 23. Februar 2025, standen fünf verschiedene Plätze auf dem Programm – und 2026 kamen zwei völlig andere Spielorte dazu. Die Liste zeigt konkret, was beim Groundhopping in Hongkong möglich war. Sie ist kein allgemeiner Spielplan.</p>
     <div className="hk-match-list">
      {[
        ['23.02.2025','Kowloon Tsai Sports Ground','Kwok Keung – Kui Tan SC','1:2'],
        ['23.02.2025','La Salle College','La Salle College U19 – Gegner nicht bekannt','0:0'],
        ['23.02.2025','Kowloon Tsai Park Side Pitches','Kowloon Cricket Club – Wanchai Sports Federation','3:1'],
        ['23.02.2025','Sham Shui Po Sports Ground','Kowloon City – Eastern SC','1:5'],
        ['23.02.2025','Tsing Yi Sports Ground','Hong Kong Rangers – North District','3:1'],
        ['03.10.2026','Kai Tak Stadium','Hongkong – Kambodscha','2:0'],
        ['04.10.2026','Hong Kong Football Club Stadium','Lucky Mile – Kui Tan','3:3'],
      ].map(([date,stadium,teams,result],i)=><div className="hk-match-row" key={i}><span>{date}</span><div><strong>{stadium}</strong><p>{teams}</p></div><b>{result}</b></div>)}
     </div>
     <div className="hk-photo-strip">{photo('happy-valley')}{photo('hkfc')}</div>
     <p>Besonders am HKFC ist die Mischung ungewöhnlich: luxuriöses Vereinsgebäude, Fußballplatz und Pferderennbahn im selben Viertel. Der ausführliche Vor-Ort-Bericht schildert das 3:3 vom 4. Oktober 2026.</p>
     <Url url="https://tandemhopper.de/geschichten/gluecksfund-in-hongkong" external={false}>Unser Spielbericht: Glücksfund in Hongkong</Url>
    </Chapter>

    <Chapter id="anreise" number="05" label="SHENZHEN, ÖPNV & GRENZEN" title="NACH HONGKONG, OHNE DAS BUDGET ZU SPRENGEN.">
     <p className="th-lead">{string('travelIntro',def.travelIntro)}</p>
     <div className="th-trip-grid">{travel.map((a,i)=><section key={a._key||i}><h3>{a.title}</h3><p>{a.text}</p><Url url={a.source}>{a.sourceLabel||'Weitere Informationen'}</Url></section>)}</div>
     <div className="hk-crossing"><div><span>FUTIAN PORT ↔ LOK MA CHAU</span><strong>06:30–22:30</strong><small>Direkte Fußgängergrenze mit MTR-Anschluss</small></div><div><span>LO WU ↔ LUOHU</span><strong>06:30–24:00</strong><small>Separate Kontrollstelle</small></div><div><span>HUANGGANG</span><strong>24 STUNDEN</strong><small>Andere Verbindung, kein identischer MTR-Übergang</small></div></div>
     <div className="th-detail-note"><strong>ACHTUNG BEI SPÄTEN SPIELEN</strong><p>Vor einem Abendspiel nicht nur die letzte MTR-Verbindung ansehen, sondern auch den Grenzschluss. Gerade ein Spiel mit Anpfiff um 20 Uhr kann das Pendeln über Futian Port unpraktisch machen.</p><Url url="https://www.immd.gov.hk/eng/contactus/control_points.html">Offizielle Grenzzeiten</Url></div>
    </Chapter>

    <Chapter id="stadt" number="06" label="ABSEITS DES SPIELFELDS" title={string('racecourseTitle',def.racecourseTitle)}>
     <p className="th-lead">{string('racecourseText',def.racecourseText)}</p>
     {photo('happy-valley',true)}
     <div className="th-trip-grid">{leisure.map((x,i)=><section key={x._key||i}><h3>{x.title}</h3><p>{x.text}</p><Url url={x.source}>{x.sourceLabel||'Mehr Informationen'}</Url></section>)}</div>
     <div className="hk-photo-strip">{photo('peak')}{photo('tram')}{photo('star-ferry')}{photo('clocktower')}</div>
    </Chapter>

    <Chapter id="spartipps" number="07" label="TIPPS & TRICKS" title="HONGKONG MUSS NICHT TEUER SEIN.">
     <p className="th-lead">Das Hotel kann ins Geld gehen, und manche Touristenattraktion erst recht. Dafür kostet eine Straßenbahnfahrt weniger als ein Kaffee – und bei Essen, Fähren, Museen und Grenzpendeln lässt sich einiges sparen.</p>
     <div className="th-budget-headline"><div><span>DER BUDGET-PLAN</span><strong>VIEL STADT. WENIG KOSTEN.</strong></div><p>Ein erschwinglicher Hongkong-Tag: günstiges Two-dish-rice-Essen, historische Tram, Hafenpromenade, Star Ferry und die kostenlose Aussicht am Peak. Nicht jeder Tipp ist gratis – und beim Pendeln muss die Grenzfahrt in die Rechnung.</p></div>
     <div className="th-budget-list">{tips.map((x,i)=><article className="th-budget-tip" key={x._key||i}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{x.title}</h3><p>{x.text}</p>{x.source&&<Url url={x.source}>{x.sourceLabel||'Quelle prüfen'}</Url>}</div></article>)}</div>
     <details className="th-deep-dive"><summary>WIE VIEL KOSTET EINE NACHT IN HONGKONG? <span aria-hidden="true">+</span></summary><div><p>Die Preise schwanken stark nach Messe, Rennwochenende, Feiertagen, Größe und Lage. Für Hongkong und Futian deshalb immer **den konkreten Reisepreis** inklusive möglicher Hotelsteuern, Grenzfahrten und Zeitverlust vergleichen – nicht pauschal von einem festen Verhältnis ausgehen.</p><Url url="https://www.ird.gov.hk/eng/faq/hatq.htm">Hotelsteuer in Hongkong (3 Prozent)</Url></div></details>
     <details className="th-deep-dive"><summary>KANN ICH IM SOMMER EINFACH EIN SPIEL FINDEN? <span aria-hidden="true">+</span></summary><div><p>Vielleicht, aber nicht garantiert. Die Premier League pausiert normalerweise zwischen den Spielzeiten. Sonderturniere und andere Klassen können trotzdem aktiv sein. Der HKFA- und der Yau-Yee-Spielplan sind die beiden wichtigsten Startpunkte.</p><Url url="https://www.hkfa.com/en/competitions/fixtures">HKFA-Spielplan</Url><Url url="https://www.yauyeeleague.com/en/fixtures/league">Yau Yee League</Url></div></details>
    </Chapter>

    {communityEnabled&&<CountryCommunity country="hongkong" asChapter/>}
    <section className="th-sources" id="quellen"><h2>QUELLEN & AKTUALITÄT</h2><p>Die persönlichen Spiel- und Reiseerfahrungen stammen aus Hongkong-Besuchen im Februar 2025 und Oktober 2026. Zeiten, Preise und Spielpläne können sich ändern – insbesondere Grenzöffnungszeiten, Tickets und Ligasaison. Letzte Überprüfung: {review}.</p><div>{sources.map((x,i)=><Url key={x._key||i} url={x.url}>{x.label}</Url>)}</div></section>
   </div>
  </div>
  <div className="th-endbar"><Link href="/laender">← ZUR LÄNDERÜBERSICHT</Link><span>HONGKONG · LÄNDERKOMPASS</span></div>
 </main><Footer/></>
}
