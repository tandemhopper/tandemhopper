'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
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
const ORIGINS=['BER','NUE','HAM','FDH','FMM','KSF','FKB','HHN','KLU','BSL','ZRH','GVA'];
const red='#b02a20', orange='#f27c22';
function RouteMap({selected,visible,onChoose}){
 const el=useRef(null),mapRef=useRef(null),layers=useRef([]),markers=useRef([]),callback=useRef(onChoose);
 useEffect(()=>{callback.current=onChoose},[onChoose]);
 useEffect(()=>{
   let cancelled=false;
   const init=()=>{
     if(cancelled||!el.current||mapRef.current||!window.L)return;
     const L=window.L, map=L.map(el.current,{scrollWheelZoom:false,zoomControl:true,attributionControl:true}).setView([45,7],4);
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:12,attribution:'© OpenStreetMap-Mitwirkende'}).addTo(map);
     map.fitBounds([[30,-12],[57,29]],{padding:[22,22]});
     mapRef.current=map;
     ORIGINS.forEach(code=>{
       const a=AIRPORTS[code];
       const marker=L.circleMarker([a[0],a[1]],{radius:7,color:'#fff',weight:2,fillColor:'#161616',fillOpacity:1}).addTo(map);
       marker.bindTooltip(a[2]+' ('+code+')',{direction:'top'});
       marker.on('click',()=>callback.current(code));
       markers.current.push({code,marker});
     });
     ROUTES.forEach(route=>{
       const a=AIRPORTS[route.from],b=AIRPORTS[route.to];
       const on=route.from==='NUE'; const line=L.polyline([[a[0],a[1]],[b[0],b[1]]],{color:on?(route.airline==='Ryanair'?red:orange):'#b8b8b8',weight:on?3.8:1.5,opacity:on?.92:.17}).addTo(map);
       line.bindTooltip(a[2]+' → '+b[2]+' · '+route.airline);
       line.on('click',()=>callback.current(route.from));
       layers.current.push({route,line});
     });
     window.dispatchEvent(new Event('resize'));
     setTimeout(()=>{if(!cancelled)map.invalidateSize()},120);
   };
   if(window.L){init();return()=>{cancelled=true;mapRef.current?.remove();mapRef.current=null;layers.current=[];markers.current=[]}};
   let css=document.querySelector('link[data-flight-leaflet]');
   if(!css){css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.dataset.flightLeaflet='yes';document.head.appendChild(css)}
   let script=document.querySelector('script[data-flight-leaflet]');
   if(!script){script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.dataset.flightLeaflet='yes';document.body.appendChild(script)}
   script.addEventListener('load',init);
   const check=setInterval(()=>{if(window.L){clearInterval(check);init()}},250);
   return()=>{cancelled=true;clearInterval(check);script.removeEventListener('load',init);mapRef.current?.remove();mapRef.current=null;layers.current=[];markers.current=[]};
 },[]);
 useEffect(()=>{
   layers.current.forEach(({route,line})=>{
     const active=route.from===selected&&visible.includes(route.airline);
     const muted=selected&&route.from!==selected;
     line.setStyle({color:active?(route.airline==='Ryanair'?red:orange):'#b8b8b8',weight:active?3.8:1.5,opacity:active?.92:muted?.17:.36});
     if(active)line.bringToFront();
   });
   markers.current.forEach(({code,marker})=>marker.setStyle({fillColor:code===selected?red:'#181818',radius:code===selected?9:6,fillOpacity:code===selected?1:.8}));
 },[selected,visible]);
 return <div ref={el} className="fr-map" role="application" aria-label="Interaktive Karte der neuen Flugverbindungen"/>;
}
export default function FlightRoutes(){
 const [selected,setSelected]=useState('NUE'),[airlines,setAirlines]=useState(['Ryanair','easyJet']);
 const [heroImage,setHeroImage]=useState(null);
 useEffect(()=>{let active=true;fetch('/api/flight-routes-image').then(r=>r.json()).then(d=>{if(active&&d.url)setHeroImage(d)}).catch(()=>{});return ()=>{active=false}},[]);
 const scrollRef=useRef(null),scrollingRef=useRef(false);
 const chosen=useMemo(()=>ROUTES.filter(r=>r.from===selected&&airlines.includes(r.airline)),[selected,airlines]);
 function pick(code,scroll=true){setSelected(code);if(scroll&&scrollRef.current){scrollingRef.current=true;scrollRef.current.querySelector('[data-code="'+code+'"]')?.scrollIntoView({behavior:'smooth',block:'nearest'});setTimeout(()=>{scrollingRef.current=false},700)}}
 function onScroll(){if(scrollingRef.current||!scrollRef.current)return;const root=scrollRef.current;let best=null,dist=Infinity;root.querySelectorAll('[data-code]').forEach(node=>{const d=Math.abs(node.offsetTop-root.offsetTop-root.scrollTop);if(d<dist){dist=d;best=node.dataset.code}});if(best)setSelected(best)}
 function toggleAirline(name){setAirlines(old=>old.includes(name)?old.length===1?old:old.filter(v=>v!==name):[...old,name])}
 return <><Header/><main className="fr">
 <div className="fr-hero"><div className="fr-kicker">TANDEMHOPPER / GROUNDHOPPING & REISEN / 04.11.2026</div><h1>RYANAIR SCHIMPFT.<br/><span>UND FLIEGT TROTZDEM.</span></h1><p className="fr-intro">Ständig klagt Ryanair über zu hohe Kosten an deutschen Flughäfen und droht mit Einschnitten. Gleichzeitig tauchen immer neue Strecken auf dem Flugplan auf. Neben den obligatorischen Sonnenzielen sind darunter auch einige ziemlich spannende Verbindungen für Fußballreisende. Wir haben sie auf die Karte gepackt.</p><div className="fr-meta">RYANAIR & EASYJET <span>·</span> WINTER 2026/27 UND SOMMER 2027 <span>·</span> 4. NOVEMBER 2026</div></div>
 {heroImage?.url&&<figure className="fr-photo-hero"><img src={heroImage.url} alt={heroImage.alt||'Flugzeug am Flughafen'}/><figcaption>{heroImage.caption||'Foto: Tandemhopper'}</figcaption></figure>}
 <section className="fr-explainer"><p><strong>Welche neue Strecke führt zum nächsten Ground?</strong> Ein Klick auf den Abflughafen oder ein Scroll durch die Liste zeigt seine Ziele. Die übrigen Routen treten in den Hintergrund. Rot steht für Ryanair, Orange für easyJet – und bei jeder Strecke gibt es die wichtigsten Infos sowie einen Link zur Quelle.</p></section>
 <section className="fr-experience" aria-label="Flugrouten-Karte">
 <div className="fr-map-column"><div className="fr-toolbar"><span>FLUGROUTEN ENTDECKEN</span><div><button onClick={()=>toggleAirline('Ryanair')} className={airlines.includes('Ryanair')?'active':''} aria-pressed={airlines.includes('Ryanair')}><i style={{background:red}}/>Ryanair</button><button onClick={()=>toggleAirline('easyJet')} className={airlines.includes('easyJet')?'active':''} aria-pressed={airlines.includes('easyJet')}><i style={{background:orange}}/>easyJet</button></div></div><RouteMap selected={selected} visible={airlines} onChoose={pick}/><small>Flughäfen sind anhand ihrer geografischen Koordinaten verortet. Die geraden Linien symbolisieren Direktverbindungen, nicht den tatsächlichen Flugweg. Kartendaten: © OpenStreetMap-Mitwirkende.</small></div>
 <div className="fr-sidebar"><div className="fr-sideheader"><b>ABFLUGHAFEN WÄHLEN</b><span>SCROLLEN ↓</span></div><div className="fr-scroll" ref={scrollRef} onScroll={onScroll} tabIndex={0}>{ORIGINS.map((code,i)=>{const arr=ROUTES.filter(r=>r.from===code);return <button key={code} data-code={code} className={'fr-origin '+(selected===code?'selected':'')} onClick={()=>pick(code)} aria-pressed={selected===code}><div className="fr-index">{String(i+1).padStart(2,'0')}</div><div><strong>{AIRPORTS[code][2]}</strong><small>{code} · {arr.length} {arr.length===1?'Verbindung':'Verbindungen'}</small></div><span>↗</span></button>})}</div><div className="fr-current"><div className="fr-selected">AB {AIRPORTS[selected][2].toUpperCase()} <span>{chosen.length} ROUTEN</span></div>{chosen.length===0?<p>Für diesen Filter sind keine Verbindungen ausgewählt.</p>:chosen.map(r=><a className="fr-route" href={r.source} target="_blank" rel="noopener noreferrer" key={r.id}><span className="fr-airline" style={{color:r.airline==='Ryanair'?red:orange}}>{r.airline}</span><strong>{AIRPORTS[r.to][2]} <em>{r.to}</em></strong><span>{r.season}</span><small>⚽ {r.football}</small><span className="fr-source">Quelle ansehen ↗</span></a>)}</div></div></section>
 <article className="fr-story"><div className="fr-story-kicker">FLUGROUTEN / FUSSBALLREISEN</div><h2>VON DER KOSTENDEBATTE ZUM NÄCHSTEN AUSWÄRTSTRIP</h2><p className="fr-lead">Ryanair und Deutschland, das ist mittlerweile eine ziemlich komplizierte Beziehung. Kaum vergeht ein Monat, in dem die irische Billigfluggesellschaft nicht über die Luftverkehrsteuer, Sicherheitsgebühren oder die Kosten an deutschen Flughäfen schimpft. Immer wieder stellt Ryanair einen Rückzug von Strecken oder Flugzeugen in Aussicht. Und dann kommt eine Meldung wie die vom 4. November: Ausgerechnet Kassel-Calden wird neu ins Streckennetz aufgenommen.</p>
 <p>Ab Ende März 2027 soll es von Nordhessen zweimal pro Woche nach Palma de Mallorca und zweimal nach Lamezia Terme in Kalabrien gehen. In ihrer Ankündigung lobt die Airline den Regionalflughafen für wettbewerbsfähige Bedingungen – und nutzt dieselbe Mitteilung, um erneut niedrigere Abgaben in Deutschland zu fordern. Das ist nicht einmal ein Widerspruch: Ryanair zieht sich von manchen teuren Standorten zurück und sucht gleichzeitig neue Chancen an günstigeren Flughäfen. Von einem pauschalen Abschied aus Deutschland kann jedenfalls keine Rede sein.</p>
 <p>Für uns Groundhopper sind diese Ankündigungen besonders interessant. Natürlich landen viele neue Flüge erst einmal wieder auf Mallorca oder an der nächsten Urlaubsküste. Doch zwischen den typischen Ferienzielen verstecken sich Verbindungen, mit denen sich plötzlich ein bislang umständlicher Fußballtrip ganz einfach organisieren lässt: ein Wochenende in Nordengland, ein Abstecher nach Apulien oder eine Reise zu den Fanszenen Marokkos.</p>
 <h3>ENGLAND: VON NÜRNBERG INS FUSSBALLPARADIES</h3><p>Die vielleicht spannendste neue Verbindung führt von Nürnberg nach Manchester. easyJet ist dort seit dem 2. November unterwegs. Für Groundhopper ist das ein Volltreffer: Manchester selbst, Liverpool, Bolton, Wigan und unzählige kleine Stadien liegen vergleichsweise dicht beieinander. Wer ein Wochenende richtig durchplant, kann dort mehr als nur ein Spiel mitnehmen.</p>
 <p>Auch Berlin–Newcastle verdient einen Blick. Die Verbindung soll am 20. November starten und ist zunächst nur für einen begrenzten Zeitraum vorgesehen. Newcastle United, Sunderland, Gateshead und zahlreiche Non-League-Vereine machen den Nordosten Englands zum idealen Revier für eine Fußballtour. Von Nürnberg nach London-Gatwick und London-Luton erweitern weitere easyJet-Flüge die Auswahl für englische Grounds.</p>
 <h3>MAROKKO: RABAT, AGADIR UND GROSSE KURVEN</h3><p>Marokko ist auf dem Flugplan längst kein exotischer Sonderfall mehr. Mit Verbindungen nach Rabat, Marrakesch und Agadir lässt sich eine Reise zur Botola Pro immer häufiger ohne aufwendigen Umstieg planen. Für Fans von FAR Rabat, FUS Rabat oder den großen Casablanca-Klubs lohnt es sich, auf die Flugtage zu achten: Die Strecken Nürnberg–Rabat oder Karlsruhe/Baden-Baden–Rabat gibt es bereits seit dem Sommer 2026, während andere Angebote erst mit dem Winterflugplan hinzugekommen sind.</p>
 <p>Allerdings gilt gerade in Marokko: Ein günstiger Hinflug ist nur die halbe Miete. Spielorte, Anstoßzeiten und manchmal sogar Spieltage können sich kurzfristig ändern. Wer für ein bestimmtes Derby fliegt, sollte deshalb nicht nur den Ticketpreis im Auge behalten.</p>
 <h3>ITALIEN: NEUE WEGE IN DEN SÜDEN</h3><p>In Italien wird es für Fußballreisende besonders interessant. Von Friedrichshafen aus soll Ryanair künftig Bari ansteuern, Klagenfurt bekommt Brindisi und Kassel Lamezia Terme. Das sind keine beliebigen Ferienorte: In Apulien und Kalabrien warten neben größeren Klubs auch alte Stadien, lebendige Regionalligen und Vereine, für die Fußball weit mehr als ein Wochenendprogramm ist.</p>
 <p>Memmingen–Rimini ist ebenfalls einen Blick wert. Entlang der Adriaküste lässt sich der Flug mit Besuchen bei mehreren Vereinen verbinden. Wer sich nicht auf die Serie A beschränkt, entdeckt im italienischen Unterhaus regelmäßig die interessanteren Geschichten.</p>
 <h3>DIE NEUEN ROUTEN AUF EINEN BLICK</h3><p>Ob aus Berlin, Nürnberg, Memmingen, Friedrichshafen, Kassel, Klagenfurt oder der Schweiz: Die interaktive Karte oben zeigt die Verbindungen, die für den Winter 2026/27 und Sommer 2027 angekündigt oder kürzlich aufgenommen wurden. Auch einige bereits im Sommer 2026 gestartete Marokko-Strecken sind als Ergänzung dabei, damit bei der Reiseplanung nichts übersehen wird. Einfach den Abflughafen auswählen und schauen, welcher Ground als Nächstes infrage kommt.</p>
 <div className="fr-note"><b>VOR DER BUCHUNG</b><p>Nicht jede Verbindung wird täglich oder ganzjährig bedient. Manche Strecken sind nur für wenige Wochen vorgesehen. Gerade bei Fußballreisen lohnt sich deshalb ein Blick auf die genauen Flugtage, den Rückflug und den aktuellen Spielplan. Die Streckenübersicht verlinkt die jeweiligen Ankündigungen der Airlines und Flughäfen.</p></div>
 </article></main><Footer/>
 <style>{String.raw`
 .fr{--fr-red:#b02a20;--fr-orange:#f27c22;background:#fbfaf7;color:#161616}.fr-hero{padding:76px max(5vw,22px) 54px;max-width:1440px;margin:auto}.fr-kicker,.fr-meta,.fr-story-kicker{font:700 13px/1.4 Inter,Arial,sans-serif;letter-spacing:.12em;color:#b02a20}.fr-photo-hero{max-width:1440px;margin:0 auto 22px;padding:0 24px}.fr-photo-hero img{width:100%;height:min(55vw,620px);object-fit:cover;object-position:50% 52%;filter:contrast(1.04)}.fr-photo-hero figcaption{font:500 11px/1.5 Inter,Arial,sans-serif;color:#666;padding:9px 0}.fr-hero h1{font:800 clamp(64px,9.3vw,150px)/.86 'Barlow Condensed',Impact,sans-serif;letter-spacing:-.015em;margin:26px 0 29px}.fr-hero h1 span{color:#b02a20}.fr-intro{font:500 clamp(18px,2vw,25px)/1.48 Inter,Arial,sans-serif;max-width:900px;margin:0 0 26px}.fr-meta{color:#6a6966;letter-spacing:0}.fr-meta span{margin:0 8px}.fr-explainer{background:#efece5;padding:19px max(5vw,22px);font-size:15px;line-height:1.6}.fr-explainer p{max-width:1350px;margin:auto}.fr-experience{max-width:1540px;margin:auto;display:grid;grid-template-columns:minmax(0,1.8fr) minmax(320px,.9fr);gap:0;padding:42px 24px 64px}.fr-map-column{background:white;position:relative;min-width:0;border:1px solid #ddd}.fr-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 17px;flex-wrap:wrap;font:700 14px 'Barlow Condensed',sans-serif;letter-spacing:.05em}.fr-toolbar div{display:flex;gap:8px}.fr-toolbar button{border:1px solid #bbb;background:#f3f1ed;color:#777;border-radius:30px;padding:9px 13px;cursor:pointer;font:600 12px Inter,Arial}.fr-toolbar button.active{background:#181818;color:white;border-color:#181818}.fr-toolbar i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}.fr-map{height:630px;background:#e6eae7}.fr-map-column>small{font-size:11px;display:block;padding:12px 15px;line-height:1.5;color:#656565}.fr-sidebar{border:1px solid #ddd;border-left:0;background:white;min-width:0}.fr-sideheader{display:flex;justify-content:space-between;padding:18px;font:700 12px Inter;letter-spacing:.05em;border-bottom:1px solid #ddd}.fr-sideheader span{color:#b02a20}.fr-scroll{height:282px;overflow:auto;scrollbar-color:#b02a20 #f0eee9}.fr-origin{width:100%;display:flex;align-items:center;text-align:left;gap:14px;padding:13px 16px;border:0;border-bottom:1px solid #e8e5df;background:#fff;cursor:pointer;color:#181818}.fr-origin:hover,.fr-origin.selected{background:#f5f0ea}.fr-origin.selected{box-shadow:inset 4px 0 #b02a20}.fr-index{font:800 26px 'Barlow Condensed';color:#b9b3ac;min-width:29px}.fr-origin.selected .fr-index{color:#b02a20}.fr-origin>div:nth-child(2){flex:1}.fr-origin strong{display:block;font:800 23px/1 'Barlow Condensed',sans-serif}.fr-origin small{font:500 11px Inter;color:#777}.fr-current{padding:15px;max-height:460px;overflow:auto}.fr-selected{display:flex;justify-content:space-between;gap:8px;border-bottom:2px solid #141414;padding:8px 0 12px;font:800 17px 'Barlow Condensed',sans-serif}.fr-selected span{font-size:12px;color:#b02a20}.fr-route{display:block;padding:15px 0;border-bottom:1px solid #e4e0d9}.fr-route:hover{background:#faf8f4}.fr-route .fr-airline{font:800 11px Inter;display:block;margin-bottom:4px}.fr-route strong{font:800 25px/1 'Barlow Condensed';display:block}.fr-route em{font:600 11px Inter;font-style:normal;color:#999;margin-left:5px}.fr-route>span:nth-of-type(2){display:block;font:600 12px Inter;color:#666;margin-top:5px}.fr-route small{display:block;font:400 12px/1.5 Inter;margin-top:7px}.fr-route .fr-source{display:block;color:#b02a20;font:700 11px Inter;margin-top:8px}.fr-story{max-width:900px;margin:auto;padding:35px 22px 110px}.fr-story h2{font:800 clamp(47px,6vw,76px)/.93 'Barlow Condensed';margin:22px 0}.fr-story h3{font:800 37px/1.08 'Barlow Condensed';margin:50px 0 12px}.fr-story p{font:400 18px/1.8 Inter,Arial;margin:0 0 23px}.fr-story .fr-lead{font-size:24px;line-height:1.6;font-weight:500}.fr-note{padding:28px;background:#efebe4;border-left:4px solid #b02a20;margin:35px 0}.fr-note b{font:800 18px 'Barlow Condensed'}.fr-note p{font-size:14px;margin:8px 0 0}.leaflet-container{font-family:Inter,Arial,sans-serif}.leaflet-control-attribution{font-size:9px!important}@media(max-width:950px){.fr-experience{grid-template-columns:1fr;padding:22px 12px 50px}.fr-sidebar{border-left:1px solid #ddd;border-top:0}.fr-map{height:430px}.fr-scroll{height:250px}.fr-current{max-height:none}.fr-hero{padding-top:46px}.fr-story .fr-lead{font-size:21px}}@media(max-width:550px){.fr-photo-hero{padding:0 12px}.fr-photo-hero img{height:330px}.fr-map{height:390px}.fr-hero h1{font-size:61px}.fr-hero{padding:45px 18px 35px}.fr-explainer{padding:18px}.fr-toolbar{padding:11px}.fr-origin strong{font-size:21px}.fr-story h3{font-size:32px}.fr-story p{font-size:16px}}`}</style></>;
}
