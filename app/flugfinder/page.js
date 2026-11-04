'use client';
import {useState,useEffect,useRef,useMemo} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AIRPORTS={
 KSF:[51.4083,9.3776,'Kassel-Calden'],SUF:[38.9054,16.2423,'Lamezia Terme'],PMI:[39.5517,2.7388,'Palma de Mallorca'],
 KLU:[46.6425,14.3377,'Klagenfurt'],BDS:[40.6576,17.9470,'Brindisi'],OPO:[41.2481,-8.6814,'Porto'],
 NUE:[49.4987,11.0781,'Nürnberg'],MAN:[53.3537,-2.2750,'Manchester'],LGW:[51.1481,-0.1903,'London-Gatwick'],
 LTN:[51.8747,-0.3683,'London-Luton'],MXP:[45.6306,8.7281,'Mailand-Malpensa'],
 BER:[52.3667,13.5033,'Berlin-Brandenburg'],NCL:[55.0375,-1.6917,'Newcastle'],RMI:[44.0203,12.6117,'Rimini'],
 LJU:[46.2237,14.4576,'Ljubljana'],HAM:[53.6304,9.9882,'Hamburg'],SVQ:[37.4180,-5.8931,'Sevilla'],
 GVA:[46.2381,6.1089,'Genf'],RAK:[31.6069,-8.0363,'Marrakesch'],PRG:[50.1008,14.2600,'Prag'],
 FMM:[47.9888,10.2395,'Memmingen'],CDT:[40.2139,0.0733,'Castellón'],VAR:[43.2321,27.8251,'Warna'],
 FDH:[47.6713,9.5115,'Friedrichshafen'],BRI:[41.1389,16.7606,'Bari'],ZAD:[44.1083,15.3467,'Zadar'],
 BSL:[47.5896,7.5299,'Basel-Mulhouse'],TNG:[35.7269,-5.9169,'Tanger'],
 ZRH:[47.4647,8.5492,'Zürich'],BRS:[51.3827,-2.7191,'Bristol'],
 IOM:[54.0833,-4.6239,'Isle of Man'],NQY:[50.4406,-4.9954,'Newquay'],
 RBA:[34.0515,-6.7515,'Rabat-Salé'],FKB:[48.7794,8.0805,'Karlsruhe/Baden-Baden'],
 HHN:[49.9487,7.2639,'Frankfurt-Hahn'],STN:[51.8850,0.2350,'London-Stansted'],
 AGA:[30.3250,-9.4131,'Agadir'],CTA:[37.4668,15.0664,'Catania'],TIA:[41.4147,19.7206,'Tirana']
};
// Only officially announced routes; dates reflect start dates, not the announcement dates.
const ROUTES=[
 ['KSF','SUF','Ryanair','Sommer 2027','Kalabrien, Catanzaro und Cosenza','https://corporate.ryanair.com/nachrichten/ryanair-startet-fluge-ab-kassel-im-sommer-2027/'],
 ['KSF','PMI','Ryanair','Sommer 2027','Mallorcas Fußballplätze abseits des Tourismus','https://corporate.ryanair.com/nachrichten/ryanair-startet-fluge-ab-kassel-im-sommer-2027/'],
 ['KLU','BDS','Ryanair','April–Oktober 2027','Brindisi, Lecce und Süditalien','https://www.klagenfurt-airport.at/de/presse-kontakt/pressemitteilungen/detail/fluege-ab-klagenfurt-porto-brindisi'],
 ['KLU','OPO','Ryanair','April–Oktober 2027','Porto, Boavista und Nordportugal','https://www.klagenfurt-airport.at/de/presse-kontakt/pressemitteilungen/detail/fluege-ab-klagenfurt-porto-brindisi'],
 ['NUE','MAN','easyJet','seit 2. November 2026','Manchester, Lancashire und Nordengland','https://www.easyjet.com/de/news/airline/story/nuernberg-wird-neuer-flughafen-im-easyjet-netzwerk-airline-kuendigt-vier-saisonale-direktverbindungen-fuer-den-winterflugplan-an'],
 ['NUE','LGW','easyJet','ab 19. November 2026','London, Surrey und Südengland','https://www.airport-nuernberg.de/de/start-easyjet'],
 ['NUE','LTN','easyJet','ab 23. November 2026','London, Luton und die englischen unteren Ligen','https://www.airport-nuernberg.de/de/start-easyjet'],
 ['NUE','MXP','easyJet','ab 27. November 2026','Mailand, Bergamo und Lombardei','https://www.airport-nuernberg.de/de/start-easyjet'],
 ['BER','NCL','easyJet','ab 20. November 2026','Newcastle, Sunderland und Gateshead','https://www.easyjet.com/de/news/airline/story/easyjet-startet-in-die-wintersaison-2026-2027-mehr-verbindungen-fuer-staedtereisen-und-wintersonne'],
 ['BER','RMI','easyJet','Frühjahr 2027','Rimini, Cesena und die Adriaküste','https://www.easyjet.com/de/billigfluege/neue-routen'],
 ['BER','LJU','easyJet','Frühjahr 2027','Ljubljana, Olimpija und Slowenien','https://www.easyjet.com/de/billigfluege/neue-routen'],
 ['HAM','SVQ','easyJet','seit 30. Oktober 2026','Betis, FC Sevilla und Andalusien','https://www.easyjet.com/de/news/airline/story/easyjet-startet-in-die-wintersaison-2026-2027-mehr-verbindungen-fuer-staedtereisen-und-wintersonne'],
 ['HAM','GVA','easyJet','seit 26. Oktober 2026','Servette, Lausanne und Westschweiz','https://www.easyjet.com/de/news/airline/story/easyjet-startet-in-die-wintersaison-2026-2027-mehr-verbindungen-fuer-staedtereisen-und-wintersonne'],
 ['HAM','RAK','easyJet','Winter 2026/27','Marrakesch und marokkanischer Fußball','https://www.easyjet.com/de/billigfluege/neue-routen'],
 ['HAM','PRG','easyJet','Winter 2026/27','Prag und tschechische Fanszenen','https://www.easyjet.com/de/billigfluege/neue-routen'],
 ['FMM','RMI','Ryanair','Sommer 2027','Rimini und Cesena','https://www.memmingen-airport.com/pressemeldung/ein-sommer-mit-vier-neuen-zielen/'],
 ['FMM','CDT','Ryanair','Sommer 2027','CD Castellón und Region Valencia','https://www.memmingen-airport.com/pressemeldung/ein-sommer-mit-vier-neuen-zielen/'],
 ['FMM','SVQ','Ryanair','Sommer 2027','Sevilla und Andalusien','https://www.memmingen-airport.com/pressemeldung/ein-sommer-mit-vier-neuen-zielen/'],
 ['FMM','VAR','Ryanair','Sommer 2027','Spartak Warna und Schwarzmeerküste','https://www.memmingen-airport.com/pressemeldung/ein-sommer-mit-vier-neuen-zielen/'],
 ['FDH','BRI','Ryanair','ab 30. März 2027','SSC Bari und Apulien','https://www.bodensee-airport.eu/press/ryanair-baut-angebot-am-bodensee-airport-friedrichshafen-aus/'],
 ['FDH','OPO','Ryanair','ab 29. März 2027','FC Porto, Boavista und Nordportugal','https://www.bodensee-airport.eu/press/ryanair-baut-angebot-am-bodensee-airport-friedrichshafen-aus/'],
 ['FDH','ZAD','Ryanair','Sommer 2027','NK Zadar und die dalmatinische Küste','https://www.bodensee-airport.eu/press/ryanair-baut-angebot-am-bodensee-airport-friedrichshafen-aus-zadar-neu-im-sommerflugplan-2027/'],
 ['BSL','TNG','easyJet','Winter 2026/27','Tanger und Nordmarokko','https://www.easyjet.com/ch-de/guenstige-fluege/neue-routen'],
 ['ZRH','BRS','easyJet','Winter 2026/27','Bristol, Bath und Südwestengland','https://www.easyjet.com/ch-de/guenstige-fluege/neue-routen'],
 ['ZRH','RAK','easyJet','Winter 2026/27','Marrakesch und marokkanischer Vereinsfußball','https://www.easyjet.com/ch-de/guenstige-fluege/neue-routen'],
 ['GVA','IOM','easyJet','Winter 2026/27','Isle of Man Football League','https://www.easyjet.com/ch-de/guenstige-fluege/neue-routen'],
 ['GVA','NQY','easyJet','Winter 2026/27','Cornwall, Truro und Non-League','https://www.easyjet.com/ch-de/guenstige-fluege/neue-routen'],
 ['GVA','TNG','easyJet','Winter 2026/27','Tanger und Nordmarokko','https://www.easyjet.com/ch-de/guenstige-fluege/neue-routen'],
 ['FKB','RBA','Ryanair','Sommer 2026 (bereits gestartet)','FAR Rabat und FUS Rabat','https://corporate.ryanair.com/nachrichten/ryanair-veroffentlicht-sommerflugplan-2026-fur-deutschland/'],
 ['NUE','RBA','Ryanair','Sommer 2026 (bereits gestartet)','FAR Rabat und FUS Rabat','https://corporate.ryanair.com/nachrichten/ryanair-veroffentlicht-sommerflugplan-2026-fur-deutschland/'],
 ['HHN','RBA','Ryanair','Sommer 2026 (bereits gestartet)','Rabat und Casablanca','https://corporate.ryanair.com/nachrichten/ryanair-veroffentlicht-sommerflugplan-2026-fur-deutschland/'],
 ['NUE','AGA','Ryanair','Winter 2026/27','Agadir und Fußball in Südmarokko','https://corporate.ryanair.com/news/ryanair-launches-record-morocco-winter-schedule/'],
 ['FMM','CTA','Ryanair','Winter 2026/27','Catania und Sizilien','https://corporate.ryanair.com/nachrichten/ryanair-stationiert-4-flugzeug-in-memmingen-fur-winter-2026/'],
 ['FMM','TIA','Ryanair','Winter 2026/27','Tirana und albanische Liga','https://corporate.ryanair.com/nachrichten/ryanair-stationiert-4-flugzeug-in-memmingen-fur-winter-2026/']
].map(([from,to,airline,season,football,source],i)=>({id:i,from,to,airline,season,football,source}));
const ROUTE_ORIGINS=['BER','NUE','HAM','FDH','FMM','KSF','FKB','HHN','KLU','BSL','ZRH','GVA'];
const red='#b02a20', orange='#f27c22';

const DEPARTURE_AIRPORTS=[
  ['DE','BER','Berlin-Brandenburg'],['DE','BRE','Bremen'],['DE','CGN','Köln/Bonn'],['DE','DTM','Dortmund'],['DE','DUS','Düsseldorf'],['DE','NRN','Weeze'],
  ['DE','FRA','Frankfurt/Main'],['DE','HHN','Frankfurt-Hahn'],['DE','HAM','Hamburg'],['DE','HAJ','Hannover'],['DE','FKB','Karlsruhe/Baden-Baden'],
  ['DE','KSF','Kassel'],['DE','LEJ','Leipzig/Halle'],['DE','LBC','Lübeck'],['DE','FMM','Memmingen'],['DE','MUC','München'],
  ['DE','FMO','Münster/Osnabrück'],['DE','NUE','Nürnberg'],['DE','PAD','Paderborn'],['DE','SCN','Saarbrücken'],
  ['DE','FDH','Friedrichshafen'],['DE','STR','Stuttgart'],['DE','DRS','Dresden'],['DE','ERF','Erfurt-Weimar'],['DE','RLG','Rostock-Laage'],
  
  ['NL','EIN','Eindhoven'],['BE','CRL','Brüssel-Charleroi'],['BE','BRU','Brüssel-Zaventem'],['LU','LUX','Luxemburg'],
  ['AT','VIE','Wien'],['AT','SZG','Salzburg'],['AT','INN','Innsbruck'],['AT','GRZ','Graz'],['AT','LNZ','Linz'],['AT','KLU','Klagenfurt'],
  ['CH','ZRH','Zürich'],['CH','BSL','Basel'],['CH','GVA','Genf'],['CH','BRN','Bern'],['CH','ACH','St. Gallen-Altenrhein'],['CH','LUG','Lugano'],['CH','SIR','Sion']
];
const destinationCountry={MAN:'GB',NCL:'GB',LGW:'GB',LTN:'GB',BRS:'GB',IOM:'IM',NQY:'GB',STN:'GB',RBA:'MA',AGA:'MA',TNG:'MA',RAK:'MA',
 SUF:'IT',BDS:'IT',BRI:'IT',RMI:'IT',MXP:'IT',CTA:'IT',PMI:'ES',SVQ:'ES',CDT:'ES',OPO:'PT',PRG:'CZ',LJU:'SI',VAR:'BG',ZAD:'HR',GVA:'CH',TIA:'AL'};
const regionLabels={ALL:'Alle Ziele',GB:'England & Großbritannien',IT:'Italien',MA:'Marokko',ES:'Spanien',PT:'Portugal',OTHER:'Weitere Länder'};
const initialRoutes=ROUTES.filter(r=>AIRPORTS[r.from]&&AIRPORTS[r.to]);
function FlightMap({routes,airport,onAirport}){
 const el=useRef(null),map=useRef(null),layers=useRef([]);
 const cb=useRef(onAirport);useEffect(()=>{cb.current=onAirport},[onAirport]);
 useEffect(()=>{
   let dead=false;
   const init=()=>{
     if(dead||!el.current||map.current||!window.L)return;
     const L=window.L, instance=L.map(el.current,{scrollWheelZoom:false}).setView([46,7],4);
     map.current=instance;
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:12,attribution:'© OpenStreetMap'}).addTo(instance);
     instance.fitBounds([[30,-13],[56,30]],{padding:[20,20]});
     initialRoutes.forEach(r=>{
       const a=AIRPORTS[r.from],b=AIRPORTS[r.to];
       const p=L.polyline([[a[0],a[1]],[b[0],b[1]]],{color:'#bcbcbc',opacity:.2,weight:2}).addTo(instance);
       p.on('click',()=>cb.current(r.from));
       layers.current.push({r,p});
     });
     ROUTE_ORIGINS.forEach(code=>{
       const a=AIRPORTS[code];
       L.circleMarker([a[0],a[1]],{radius:7,weight:2,color:'#fff',fillColor:'#171717',fillOpacity:1})
        .addTo(instance).bindTooltip(a[2]+' ('+code+')').on('click',()=>cb.current(code));
     });
     setTimeout(()=>{if(!dead)instance.invalidateSize()},100);
   };
   let link=document.querySelector('link[data-gh-map]');
   if(!link){link=document.createElement('link');link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';link.dataset.ghMap='yes';document.head.append(link)}
   let js=document.querySelector('script[data-gh-map]');
   if(!js){js=document.createElement('script');js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';js.dataset.ghMap='yes';document.body.append(js)}
   js.addEventListener('load',init);if(window.L)init();
   const timer=setInterval(()=>{if(window.L){clearInterval(timer);init()}},250);
   return()=>{dead=true;clearInterval(timer);js?.removeEventListener('load',init);map.current?.remove();map.current=null;layers.current=[]};
 },[]);
 useEffect(()=>{
   const ids=new Set(routes.map(x=>x.id));
   layers.current.forEach(({r,p})=>{
     const match=ids.has(r.id)&&r.from===airport;
     p.setStyle({color:match?(r.airline==='Ryanair'?red:orange):'#b2b2b2',weight:match?4:1.5,opacity:match?0.95:0.12});
     if(match)p.bringToFront();
   });
 },[routes,airport]);
 return <div ref={el} className="gh-map" aria-label="Interaktive Karte der bisher erfassten Strecken"/>;
}
export default function Flugfinder(){
 const [airport,setAirport]=useState('NUE'),[carrier,setCarrier]=useState('ALL'),[region,setRegion]=useState('ALL'),[search,setSearch]=useState('');
 const [showAll,setShowAll]=useState(false);
 const active=useMemo(()=>initialRoutes.filter(r=>(carrier==='ALL'||r.airline===carrier)&&
 (region==='ALL'||(region==='OTHER'?!['GB','MA','IT','ES','PT'].includes(destinationCountry[r.to]):destinationCountry[r.to]===region))&&
 (!search||AIRPORTS[r.to][2].toLowerCase().includes(search.toLowerCase())||r.to.toLowerCase().includes(search.toLowerCase()))),[carrier,region,search]);
 const chosen=useMemo(()=>active.filter(r=>r.from===airport),[active,airport]);
 const availableAirportCodes=new Set(initialRoutes.map(r=>r.from));
 return <><Header/><main className="ghfinder">
 <header className="gh-top"><div className="gh-eyebrow">TANDEMHOPPER · GROUNDHOPPING-TOOL · PILOTVERSION</div>
 <h1>WOHIN GEHT DER<br/><span>NÄCHSTE FLUG?</span></h1>
 <p>Die neue Streckenkarte für Groundhopper. Abflughafen auswählen, Flugziele vergleichen und die nächste Fußballreise planen. Ryanair und easyJet auf einer Karte.</p>
 <div className="gh-warning"><strong>Vorschau mit Pilotdaten</strong> – noch kein vollständiges Flugverzeichnis. Derzeit enthält die Karte nur die bislang recherchierte Streckenauswahl aus unserem Flugrouten-Special. Die vollständige, laufend aktualisierte Datenbasis wird separat aufgebaut.</div>
 </header>
 <section className="gh-workspace">
 <div className="gh-mapwrap"><div className="gh-maphead"><strong>FLUGROUTEN-KARTE</strong><span>Ausgewählte Linien farbig · übrige grau</span></div><FlightMap routes={active} airport={airport} onAirport={setAirport}/>
 <p className="gh-footnote">Flughafenpunkte anhand der bislang hinterlegten Koordinaten; die Linien zeigen Direktverbindungen, keine Flugpfade. Karte © OpenStreetMap.</p></div>
 <div className="gh-controls">
 <h2>FLÜGE FINDEN</h2>
 <label htmlFor="origin">Abflughafen</label>
 <select id="origin" value={airport} onChange={e=>setAirport(e.target.value)}>
 {['DE','NL','BE','LU','AT','CH'].map(country=><optgroup key={country} label={{DE:'Deutschland',NL:'Niederlande',BE:'Belgien',LU:'Luxemburg',AT:'Österreich',CH:'Schweiz'}[country]}>{DEPARTURE_AIRPORTS.filter(a=>a[0]===country).map(a=><option key={a[1]} value={a[1]}>{a[2]} ({a[1]}){!availableAirportCodes.has(a[1])?' · Daten folgen':''}</option>)}</optgroup>)}
 </select>
 <label htmlFor="airline">Fluggesellschaft</label><select id="airline" value={carrier} onChange={e=>setCarrier(e.target.value)}><option value="ALL">Ryanair und easyJet</option><option>Ryanair</option><option>easyJet</option></select>
 <label htmlFor="region">Fußballregion</label><select id="region" value={region} onChange={e=>setRegion(e.target.value)}>{Object.entries(regionLabels).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select>
 <label htmlFor="destination">Ziel suchen</label><input id="destination" value={search} onChange={e=>setSearch(e.target.value)} placeholder="z. B. Rabat, Bari, Manchester"/>
 <div className="gh-results-title"><strong>{chosen.length} erfasste {chosen.length===1?'Strecke':'Strecken'}</strong><span>ab {DEPARTURE_AIRPORTS.find(a=>a[1]===airport)?.[2]||airport}</span></div>
 <div className="gh-results">{chosen.length?chosen.map(r=><a href={r.source} target="_blank" rel="noopener noreferrer" className="gh-item" key={r.id}>
 <span className="gh-airline" style={{color:r.airline==='Ryanair'?red:orange}}>{r.airline}</span>
 <strong>{AIRPORTS[r.to][2]} <small>{r.to}</small></strong><span>{r.season}</span><p>⚽ {r.football}</p><em>Quelle zur Strecke ↗</em></a>):<div className="gh-empty">Für diese Kombination sind in der Pilotdatenbank noch keine Strecken erfasst. Das bedeutet nicht, dass es keine Direktflüge gibt.</div>}</div>
 </div></section>
 <section className="gh-bottom"><h2>WAS IST GEPLANT?</h2><p>Die endgültige Version soll alle aktuellen Nonstop-Strecken von Ryanair und easyJet ab Deutschland, Eindhoven, Brüssel, Charleroi, Luxemburg sowie Österreich und der Schweiz enthalten. Saisonale Strecken werden von ganzjährigen Verbindungen getrennt. Die Daten müssen vor einer öffentlichen Vollständigkeitsangabe aus einer zulässig nutzbaren, aktuellen Quelle eingelesen und mit den Fluggesellschaften abgeglichen werden.</p>
 <p>Besonders praktisch für Groundhopper wäre eine Umkreissuche: etwa ab dem Ruhrgebiet sämtliche verfügbaren Abflughäfen in einem selbst gewählten Radius vergleichen. Auch eine Kombination mit dem <a href="/kalender">Groundhopping-Kalender</a> ist als nächste Ausbaustufe denkbar.</p>
 <a href="/flugrouten">Zum Artikel über die neuen Strecken 2026/27 →</a>
 </section></main><Footer/>
 <style>{` .ghfinder{background:#fbfaf7;color:#171717;min-height:70vh}.gh-top{max-width:1430px;margin:auto;padding:70px 34px 42px}.gh-eyebrow{color:#b02a20;font:700 13px Inter,Arial;letter-spacing:.11em}.gh-top h1{font:800 clamp(60px,8vw,125px)/.87 'Barlow Condensed',Impact,sans-serif;margin:24px 0}.gh-top h1 span{color:#b02a20}.gh-top>p{font:500 21px/1.5 Inter,Arial;max-width:850px}.gh-warning{font:400 14px/1.6 Inter,Arial;margin-top:30px;padding:16px 20px;background:#f0e8dc;border-left:3px solid #b02a20;max-width:1020px}.gh-workspace{max-width:1500px;margin:auto;padding:20px 25px 70px;display:grid;grid-template-columns:minmax(0,1.7fr) minmax(320px,1fr);gap:0}.gh-mapwrap,.gh-controls{background:white;border:1px solid #ddd}.gh-controls{border-left:0;padding:25px 22px}.gh-maphead{padding:16px;display:flex;justify-content:space-between;gap:12px;font:700 13px Inter,Arial}.gh-maphead span{color:#999;font-weight:500}.gh-map{height:670px;background:#e6eae8}.gh-footnote{color:#777;padding:14px;font:400 11px/1.5 Inter,Arial}.gh-controls h2,.gh-bottom h2{font:800 38px 'Barlow Condensed';margin:0 0 20px}.gh-controls label{display:block;margin:16px 0 6px;font:700 12px Inter,Arial}.gh-controls select,.gh-controls input{width:100%;padding:12px;background:white;border:1px solid #c8c8c8;font:500 14px Inter,Arial;min-height:46px}.gh-results-title{border-top:2px solid #171717;margin-top:24px;padding:16px 0 9px;display:flex;justify-content:space-between;align-items:baseline;gap:8px}.gh-results-title strong{font:800 21px 'Barlow Condensed'}.gh-results-title span{font:500 12px Inter,Arial;color:#666}.gh-results{max-height:420px;overflow:auto}.gh-item{display:block;border-bottom:1px solid #e5e5e5;padding:15px 2px}.gh-item .gh-airline{font:800 11px Inter,Arial}.gh-item strong{display:block;font:800 26px 'Barlow Condensed'}.gh-item strong small{font:600 11px Inter,Arial;color:#888}.gh-item>span:nth-of-type(2){font:500 12px Inter,Arial;color:#777}.gh-item p{font:400 12px/1.5 Inter,Arial;margin:7px 0}.gh-item em{font:700 11px Inter,Arial;color:#b02a20;font-style:normal}.gh-empty{padding:22px 4px;font:400 14px/1.7 Inter,Arial;color:#666}.gh-bottom{max-width:940px;margin:auto;padding:30px 25px 100px}.gh-bottom p{font:400 18px/1.8 Inter,Arial}.gh-bottom a{color:#b02a20;font-weight:700}@media(max-width:960px){.gh-workspace{grid-template-columns:1fr;padding:15px}.gh-controls{border-left:1px solid #ddd;border-top:0}.gh-map{height:450px}}@media(max-width:600px){.gh-top{padding:48px 18px 25px}.gh-top h1{font-size:58px}.gh-top>p{font-size:18px}.gh-map{height:340px}.gh-maphead{flex-direction:column}.gh-controls{padding:19px}.gh-results{max-height:none}} `}</style></>;
}
