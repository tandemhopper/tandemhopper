const MONTHS = ['JAN','FEB','MÄR','APR','MAI','JUN','JUL','AUG','SEP','OKT','NOV','DEZ']

const formatDate = value => {
  if (!value) return null
  const [y,m,d] = value.split('-')
  return y&&m&&d ? [d,m,y].join('.') : value
}

export default function LeagueSeasonCalendar({data}) {
  if (!data) return null
  const primary=new Set(data.peakMonths||[])
  const fringe=new Set(data.fringeMonths||[])
  const monthsLabel=MONTHS.map((month,i)=>month+': '+(primary.has(i+1)?'typischer Spielmonat':fringe.has(i+1)?'je nach Saison':'normalerweise außerhalb der Liga')).join(', ')
  return <aside className="th-season-panel" aria-label="Ligaspielzeiten und Saisonkalender">
    <div className="th-season-top">
      <div><span className="th-season-eyebrow">{data.eyebrow||'LIGA-SAISON · SPIELMONATE'}</span>
        <h3>{data.title||'LIGA-SAISON PRÜFEN'}</h3></div>
      {data.checkedAt&&<span className="th-season-checked">GEPRÜFT {formatDate(data.checkedAt)}</span>}
    </div>
    {data.lead&&<p className="th-season-lead">{data.lead}</p>}
    <div className="th-season-month-grid" role="img" aria-label={monthsLabel}>
      {MONTHS.map((month,i)=>{
        const m=i+1
        const state=primary.has(m)?'main':fringe.has(m)?'edge':'off'
        return <div key={month} className={'th-season-month th-season-month-'+state} aria-hidden="true">
          <span>{month}</span><i/>
        </div>
      })}
    </div>
    <div className="th-season-key"><span><i className="th-season-key-main"/> Typischer Spielmonat</span><span><i className="th-season-key-edge"/> Je nach Saison</span><span><i className="th-season-key-off"/> Meist keine Erstligaspiele</span></div>
    {data.nextSeasonNote&&<p className="th-season-warning"><strong>FÜR DIE REISEPLANUNG:</strong> {data.nextSeasonNote}</p>}
    {data.history?.length>0&&<details className="th-season-history">
      <summary>SPIELZEITEN DER VERGANGENEN JAHRE <span aria-hidden="true">+</span></summary>
      <div className="th-season-history-inner">
        <table><thead><tr><th>Saison</th><th>Erster Spieltag</th><th>Letzter Spieltag</th></tr></thead>
          <tbody>{data.history.map((h,i)=><tr key={h._key||h.year||i}><th scope="row">{h.year}</th><td>{h.start}</td><td>{h.end}{h.note&&<small>{h.note}</small>}</td></tr>)}</tbody>
        </table>
      </div>
    </details>}
    {data.alternateNote&&<p className="th-season-alternatives"><strong>AUSSERHALB DER LIGA:</strong> {data.alternateNote}</p>}
    {data.scheduleSourceUrl&&<a className="th-season-source" href={data.scheduleSourceUrl} target="_blank" rel="noopener noreferrer">{data.scheduleSourceTitle||'Spielplan und Saisonarchiv'} ↗</a>}
  </aside>
}
