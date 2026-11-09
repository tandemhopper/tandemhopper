'use client'

import {useEffect,useRef,useState} from 'react'

const DAYS = [
  {key:'12.11.',label:'Do · 12.11.',color:'#2979ff'},
  {key:'13.11.',label:'Fr · 13.11.',color:'#d32f2f'},
  {key:'14.11.',label:'Sa · 14.11.',color:'#f9a825'},
  {key:'15.11.',label:'So · 15.11.',color:'#2e7d32'},
  {key:'18.11.',label:'Mi · 18.11.',color:'#7b1fa2'},
]

const FIXTURES = [
  {day:'12.11.',time:'12:00',lat:52.379,long:9.767,place:'Hannover',game:'Hannover 96 – TSV Havelse',note:'Eilenriedestadion · Testspiel'},
  {day:'12.11.',time:'14:30',lat:52.432,long:10.804,place:'Wolfsburg',game:'VfL Wolfsburg – Union Berlin',note:'AOK-Stadion · Testspiel'},
  {day:'13.11.',time:'14:00',lat:49.013,long:12.101,place:'Regensburg',game:'Jahn Regensburg – Blau-Weiß Linz',note:'Sportpark Kaulbachweg · Testspiel'},
  {day:'13.11.',time:'19:00',lat:51.500,long:3.910,place:'Kloetinge',game:'VV Kloetinge – HSV Hoek',note:'Wesselopark · Zeeuwse Derby'},
  {day:'13.11.',time:'19:11',lat:52.303,long:10.572,place:'Braunschweig',game:'SV Querum – PSV Braunschweig',note:'Ascheplatz-Abschied'},
  {day:'14.11.',time:'13:00',lat:53.504,long:13.083,place:'Penzlin',game:'Penzliner SV – Hansa Rostock',note:'Landespokal Mecklenburg-Vorpommern'},
  {day:'14.11.',time:'13:00',lat:51.127,long:12.811,place:'Colditz-Hausdorf',game:'HFC Colditz – 1. FC Lok Leipzig',note:'Sachsenpokal · kleiner Originalground'},
  {day:'14.11.',time:'13:00',lat:51.309,long:13.290,place:'Riesa',game:'BSG Stahl Riesa – FSV Zwickau',note:'Sachsenpokal · Feralpi-Arena'},
  {day:'14.11.',time:'13:00',lat:51.067,long:10.935,place:'Walschleben',game:'SV Empor Walschleben – Rot-Weiß Erfurt',note:'Thüringenpokal'},
  {day:'14.11.',time:'13:00',lat:50.718,long:11.341,place:'Rudolstadt',game:'Einheit Rudolstadt – Carl Zeiss Jena',note:'Thüringenpokal'},
  {day:'14.11.',time:'13:00',lat:49.407,long:8.843,place:'Neckarsteinach',game:'SpVgg Neckarsteinach – Waldhof Mannheim',note:'Badischer Pokal · ausverkauft'},
  {day:'14.11.',time:'14:00',lat:50.724,long:3.161,place:'Tourcoing',game:'US Tourcoing – Stade de Reims',note:'Coupe de France'},
  {day:'14.11.',time:'17:30',lat:41.085,long:16.840,place:'Bari',game:'SSC Bari – Foggia',note:'Serie C · Gästeregelung prüfen'},
  {day:'14.11.',time:'18:00',lat:51.349,long:6.575,place:'Krefeld',game:'KFC Uerdingen – Wuppertaler SV',note:'Grotenburg · Fanszenenduell'},
  {day:'14.11.',time:'19:00',lat:51.534,long:4.465,place:'Roosendaal',game:'RBC Roosendaal – Goes',note:'Derde Divisie · Atik Stadion'},
  {day:'15.11.',time:'13:00',lat:50.821,long:12.967,place:'Chemnitz',game:'TSV IFA Chemnitz – BSG Chemie Leipzig',note:'Sachsenpokal · Eubaer Straße'},
  {day:'15.11.',time:'13:00',lat:51.460,long:12.626,place:'Eilenburg',game:'FC Eilenburg – Chemnitzer FC',note:'Sachsenpokal · Ilburg-Stadion'},
  {day:'15.11.',time:'13:00',lat:52.412,long:12.556,place:'Brandenburg',game:'BSC Süd 05 – Babelsberg 03',note:'Landespokal Brandenburg'},
  {day:'15.11.',time:'14:00',lat:49.700,long:4.940,place:'Sedan',game:'CS Sedan Ardennes – Bourges FC',note:'Coupe de France'},
  {day:'15.11.',time:'14:30',lat:40.672,long:14.770,place:'Salerno',game:'Salernitana – Catania',note:'Serie C · ohne Catania-Gästefans'},
  {day:'15.11.',time:'14:30',lat:41.228,long:16.296,place:'Andria',game:'Fidelis Andria – Nocerina',note:'Serie D · Gästesektor geschlossen'},
  {day:'15.11.',time:'15:00',lat:51.493,long:7.455,place:'Dortmund',game:'BVB Frauen – Schalke 04 Frauen',note:'Rote Erde · Rekordkulisse erwartet'},
  {day:'15.11.',time:'15:00',lat:51.298,long:6.846,place:'Ratingen',game:'Ratingen 04/19 – Rot-Weiss Essen',note:'Niederrheinpokal'},
  {day:'18.11.',time:'20:00',lat:51.261,long:6.734,place:'Düsseldorf',game:'Fortuna Düsseldorf – MSV Duisburg',note:'Niederrheinpokal · Straßenbahnderby'},
]

export default function InternationalBreakMap(){
  const mapEl = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const [activeDay,setActiveDay] = useState('alle')

  useEffect(()=>{
    let cancelled = false
    const init = () => {
      if(cancelled || !mapEl.current || mapRef.current || !window.L) return
      const L = window.L
      const map = L.map(mapEl.current,{scrollWheelZoom:false,zoomControl:true}).setView([50.3,8.2],5)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom:12,
        attribution:'© OpenStreetMap-Mitwirkende'
      }).addTo(map)
      map.fitBounds([[38.5,2.0],[54.4,17.5]],{padding:[20,20]})
      mapRef.current = map
      markersRef.current = FIXTURES.map(fixture => {
        const day = DAYS.find(item=>item.key===fixture.day)
        const marker = L.circleMarker([fixture.lat,fixture.long],{
          radius:7,
          color:'#fff',
          weight:2,
          fillColor:day?.color || '#111',
          fillOpacity:1,
        }).addTo(map)
        marker.bindPopup(`<strong>${fixture.game}</strong><br><span>${fixture.day.} · ${fixture.time} Uhr · ${fixture.place}</span><br><small>${fixture.note}</small>`)
        marker.bindTooltip(fixture.place,{direction:'top'})
        return {fixture,marker}
      })
      setTimeout(()=>map.invalidateSize(),150)
    }

    if(window.L){ init() }
    else {
      if(!document.querySelector('link[data-ibm-leaflet]')){
        const link=document.createElement('link')
        link.rel='stylesheet'
        link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.dataset.ibmLeaflet='yes'
        document.head.appendChild(link)
      }
      let script=document.querySelector('script[data-ibm-leaflet]')
      if(!script){
        script=document.createElement('script')
        script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.dataset.ibmLeaflet='yes'
        document.body.appendChild(script)
      }
      script.addEventListener('load',init,{once:true})
    }

    return ()=>{
      cancelled=true
      if(mapRef.current){mapRef.current.remove();mapRef.current=null}
      markersRef.current=[]
    }
  },[])

  useEffect(()=>{
    markersRef.current.forEach(({fixture,marker})=>{
      const visible = activeDay==='alle' || fixture.day===activeDay
      if(visible){
        marker.setStyle({opacity:1,fillOpacity:1})
        marker.getElement()?.classList.remove('ibm-hidden-marker')
      } else {
        marker.setStyle({opacity:0,fillOpacity:0})
        marker.getElement()?.classList.add('ibm-hidden-marker')
      }
    })
  },[activeDay])

  return <section className="ibm-wrap" aria-label="Interaktive Karte der Groundhopping-Tipps in der Länderspielpause">
    <div className="ibm-head">
      <div>
        <span className="ibm-kicker">TANDEMHOPPER-KARTE</span>
        <h2>WO LOHNT SICH DIE LÄNDERSPIELPAUSE?</h2>
      </div>
      <p>Marker anklicken für Spiel, Uhrzeit und Ground. Über die Buttons lässt sich nach Tagen filtern.</p>
    </div>
    <div className="ibm-filter">
      <button className={activeDay==='alle'?'active':''} onClick={()=>setActiveDay('alle')}>ALLE</button>
      {DAYS.map(day=><button key={day.key} className={activeDay===day.key?'active':''} onClick={()=>setActiveDay(day.key)}><i style={{background:day.color}}/>{day.label}</button>)}
    </div>
    <div ref={mapEl} className="ibm-map"/>
    <div className="ibm-legend">{DAYS.map(day=><span key={day.key}><i style={{background:day.color}}/>{day.label}</span>)}</div>
    <p className="ibm-note">Die Karte ist eine redaktionelle Orientierung. Gerade bei Pokalspielen bitte Gästeregelungen, Tickets und Austragungsort kurz vor Abfahrt noch einmal prüfen.</p>
    <style jsx>{`
      .ibm-wrap{margin:26px 0 38px;padding:22px;background:#f3f0e9;border:1px solid #d9d3c8}
      .ibm-head{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(220px,.8fr);gap:24px;align-items:end;margin-bottom:18px}
      .ibm-kicker{font-size:11px;font-weight:800;letter-spacing:.12em;color:#a3201b}
      .ibm-head h2{font-family:'Barlow Condensed',Impact,sans-serif;font-size:clamp(30px,5vw,48px);line-height:.95;margin:5px 0 0}
      .ibm-head p,.ibm-note{font-size:13px;line-height:1.5;margin:0;color:#4b4b4b}
      .ibm-filter{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
      .ibm-filter button{border:1px solid #c7c0b4;background:#fff;padding:8px 10px;font:700 12px/1 Inter,Arial,sans-serif;cursor:pointer}
      .ibm-filter button.active{background:#171717;color:#fff;border-color:#171717}
      .ibm-filter i,.ibm-legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px;vertical-align:middle}
      .ibm-map{height:520px;min-height:360px;background:#ddd}
      .ibm-legend{display:flex;flex-wrap:wrap;gap:12px 18px;padding-top:12px;font-size:12px;font-weight:700}
      .ibm-note{margin-top:10px}
      :global(.ibm-hidden-marker){pointer-events:none}
      :global(.leaflet-popup-content){font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.45}
      :global(.leaflet-popup-content strong){font-family:'Barlow Condensed',Impact,sans-serif;font-size:18px}
      @media(max-width:720px){.ibm-wrap{margin-left:-10px;margin-right:-10px;padding:14px}.ibm-head{grid-template-columns:1fr;gap:8px}.ibm-map{height:430px}}
    `}</style>
  </section>
}
