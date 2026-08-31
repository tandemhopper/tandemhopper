'use client'

import {useEffect} from 'react'
import Link from 'next/link'

const categoryLabels = {
  fanszene: 'FANSZENE',
  rivalitaet: 'RIVALITÄT',
  auswaertsfahrt: 'GROSSE AUSWÄRTSFAHRT',
  anlass: 'BESONDERER ANLASS',
  unter_dem_radar: 'UNTER DEM RADAR',
}

const awayFanLabels = {
  allowed: 'Gästefans zugelassen',
  excluded: 'Keine Gästefans',
  unclear: 'Gästefan-Regelung noch unklar',
}

const ticketLabels = {
  normal: 'Normale Ticketlage',
  tense: 'Angespannte Ticketlage',
  difficult: 'Schwierige Ticketlage',
}

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(`${value}T12:00:00`))
}

function formatSchedule(match) {
  if (match.dateStatus === 'window') {
    const from = formatDate(match.dateFrom)
    const to = formatDate(match.dateTo)
    return from && to ? `${from}–${to}` : 'Terminfenster'
  }

  return [formatDate(match.matchDate), match.kickoffTime].filter(Boolean).join(' · ')
}

export default function MatchDetails({match, onClose}) {
  useEffect(() => {
    if (!match) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [match, onClose])

  if (!match) return null

  const categories = (match.categories || []).map((key) => categoryLabels[key] || key.toUpperCase())
  const usefulFacts = []

  if (match.awayFans && match.awayFans !== 'not_relevant' && awayFanLabels[match.awayFans]) usefulFacts.push(awayFanLabels[match.awayFans])
  if (match.ticketSituation && match.ticketSituation !== 'unknown' && ticketLabels[match.ticketSituation]) usefulFacts.push(ticketLabels[match.ticketSituation])
  if (match.confirmedInfo) usefulFacts.push(match.confirmedInfo)

  return (
    <div className="calendar-detail-layer" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <aside className="calendar-detail" role="dialog" aria-modal="true" aria-labelledby="calendar-detail-title">
        <div className="calendar-detail-handle" aria-hidden="true" />
        <button className="calendar-detail-close" type="button" aria-label="Details schließen" onClick={onClose}>×</button>

        <div className="calendar-detail-head">
          {match.priority === 3 ? <p className="calendar-tip-label">TANDEMHOPPER-TIPP</p> : null}
          <h2 id="calendar-detail-title">{match.homeTeam} – {match.awayTeam}</h2>
          <p>{[match.city || match.country, match.stadium].filter(Boolean).join(' · ')}</p>
          <div className="calendar-detail-schedule">
            <strong>{formatSchedule(match)}</strong>
            <span className={`calendar-status calendar-status-${match.dateStatus}`}>{match.dateStatus === 'confirmed' ? 'FIX' : 'TBC'}</span>
          </div>
        </div>

        {categories.length ? <div className="calendar-tags calendar-detail-tags">{categories.map((category) => <span key={category}>{category}</span>)}</div> : null}

        <section className="calendar-detail-section">
          <p className="eyebrow">WARUM INTERESSANT?</p>
          <p>{match.background || match.shortDescription}</p>
          {match.editorialAssessment ? <p>{match.editorialAssessment}</p> : null}
        </section>

        {usefulFacts.length ? (
          <section className="calendar-detail-section calendar-detail-facts">
            <p className="eyebrow">GUT ZU WISSEN</p>
            <ul>{usefulFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          </section>
        ) : null}

        {match.lastChecked ? <p className="calendar-detail-check">Stand: {formatDate(match.lastChecked)}</p> : null}
        {match.article?.slug ? <Link className="calendar-detail-link" href={`/geschichten/${match.article.slug}`}>Ausführlichen Hintergrund lesen →</Link> : null}
      </aside>
    </div>
  )
}
