'use client'

import {useCallback, useEffect, useMemo, useState} from 'react'
import Link from 'next/link'
import ClubMarks from '../ClubMarks'
import CalendarFilters from './CalendarFilters'
import MatchDetails from './MatchDetails'
import {categoryLabels, regionsForMatch} from '../../lib/calendarTaxonomy'

const dateFormatter = new Intl.DateTimeFormat('de-DE', {month: 'long', year: 'numeric'})
const weekdayFormatter = new Intl.DateTimeFormat('de-DE', {weekday: 'long'})

function isoToday() {
  const date = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function dateFromISO(value) {
  return new Date(`${value}T12:00:00`)
}

function shortDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('de-DE', {day: '2-digit', month: '2-digit'}).format(dateFromISO(value))
}

function displayDate(match, today) {
  if (match.dateStatus === 'window') {
    // Ein noch offenes Terminfenster erscheint nur einmal, nicht an jedem möglichen Spieltag.
    return match.dateFrom < today ? today : match.dateFrom
  }
  return match.matchDate
}

function scheduleLabel(match) {
  if (match.dateStatus === 'unscheduled') return 'Termin noch nicht angesetzt'
  if (match.dateStatus === 'window') {
    return `${shortDate(match.dateFrom)}–${shortDate(match.dateTo)} · TBC`
  }
  return [shortDate(match.matchDate), match.kickoffTime, match.dateStatus === 'confirmed' ? null : 'TBC'].filter(Boolean).join(' · ')
}

function MatchCard({match, onOpen}) {
  const categories = (match.categories || []).map((key) => categoryLabels[key] || key.toUpperCase())

  function openDetails(event) {
    // Mittelklick/Strg-Klick soll den Deep-Link regulär in einem neuen Tab öffnen können.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onOpen(match)
  }

  return (
    <article className={`calendar-match${match.priority === 3 ? ' calendar-match-featured' : ''}`}>
      {match.priority === 3 ? <p className="calendar-tip-label">TANDEMHOPPER-HIGHLIGHT</p> : null}
      {match.sport === 'speedway' ? <p className="calendar-other-sport-label">SPEEDWAY · KEIN FUSSBALL</p> : null}
      <div className="calendar-match-head">
        <div>
          <h3>{match.homeTeam} – {match.awayTeam}</h3>
          <p>{[match.city || match.country, scheduleLabel(match)].filter(Boolean).join(' · ')}</p>
        </div>
        <div className="calendar-match-visual">
          {match.sport === 'speedway'
            ? <span className="calendar-other-sport-icon" aria-label="Speedway">🏁</span>
            : <ClubMarks homeTeam={match.homeTeam} awayTeam={match.awayTeam} variant="calendar" />}
          <span className={`calendar-status calendar-status-${match.dateStatus}`}>
            {match.dateStatus === 'confirmed' ? 'FIX' : match.dateStatus === 'unscheduled' ? 'TERMIN OFFEN' : 'TBC'}
          </span>
        </div>
      </div>
      {categories.length ? <div className="calendar-tags">{categories.map((category) => <span key={category}>{category}</span>)}</div> : null}
      <p className="calendar-match-copy">{match.shortDescription}</p>
      <div className="calendar-match-foot">
        {match.stadium ? <span>{match.stadium}</span> : <span />}
        <div className="calendar-match-links">
          {match.article?.slug ? <Link href={`/geschichten/${match.article.slug}`}>Artikel →</Link> : null}
          <Link href={`/kalender?spiel=${encodeURIComponent(match._id)}`} onClick={openDetails}>Details →</Link>
        </div>
      </div>
    </article>
  )
}

export default function CalendarExplorer({matches = []}) {
  const [today] = useState(isoToday)
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [onlyHighlights, setOnlyHighlights] = useState(false)
  const [activeMatch, setActiveMatch] = useState(null)

  useEffect(() => {
    function syncFromUrl() {
      const id = new URLSearchParams(window.location.search).get('spiel')
      setActiveMatch(matches.find((match) => match._id === id) || null)
    }
    syncFromUrl()
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [matches])

  const openDetails = useCallback((match) => {
    const url = new URL(window.location.href)
    url.searchParams.set('spiel', match._id)
    window.history.pushState({}, '', url)
    setActiveMatch(match)
  }, [])

  const closeDetails = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('spiel')
    window.history.replaceState({}, '', url)
    setActiveMatch(null)
  }, [])

  const filtered = useMemo(() => matches.filter((match) => {
    if (!match.matchDate && !match.dateFrom) return false
    if (match.dateStatus === 'window' && (!match.dateFrom || !match.dateTo || match.dateTo < today)) return false
    if (match.dateStatus !== 'window' && match.matchDate < today) return false
    if (category && !(match.categories || []).includes(category)) return false
    if (region && !regionsForMatch(match).includes(region)) return false
    if (onlyHighlights && match.priority !== 3) return false
    return true
  }).sort((a, b) => {
    const dateCompare = displayDate(a, today).localeCompare(displayDate(b, today))
    if (dateCompare) return dateCompare
    const timeCompare = (a.kickoffTime || '99:99').localeCompare(b.kickoffTime || '99:99')
    return timeCompare || (b.priority || 0) - (a.priority || 0)
  }), [matches, today, category, region, onlyHighlights])

  const watchlist = useMemo(() => matches.filter((match) => {
    if (match.dateStatus !== 'unscheduled' || match.matchDate || match.dateFrom) return false
    if (category && !(match.categories || []).includes(category)) return false
    if (region && !regionsForMatch(match).includes(region)) return false
    if (onlyHighlights && match.priority !== 3) return false
    return true
  }), [matches, category, region, onlyHighlights])

  const monthGroups = useMemo(() => {
    const months = []
    for (const match of filtered) {
      const iso = displayDate(match, today)
      const monthKey = iso.slice(0, 7)
      let month = months[months.length - 1]
      if (!month || month.key !== monthKey) {
        month = {key: monthKey, label: dateFormatter.format(dateFromISO(iso)), days: []}
        months.push(month)
      }
      let day = month.days[month.days.length - 1]
      if (!day || day.date !== iso) {
        const date = dateFromISO(iso)
        day = {
          date: iso,
          weekday: weekdayFormatter.format(date),
          day: date.getDate(),
          matches: [],
        }
        month.days.push(day)
      }
      day.matches.push(match)
    }
    return months
  }, [filtered, today])

  function resetFilters() {
    setCategory('')
    setRegion('')
    setOnlyHighlights(false)
  }

  return (
    <section className="calendar-explorer">
      <CalendarFilters
        category={category}
        region={region}
        onlyHighlights={onlyHighlights}
        onCategoryChange={setCategory}
        onRegionChange={setRegion}
        onHighlightsChange={setOnlyHighlights}
        onReset={resetFilters}
        resultCount={filtered.length + watchlist.length}
      />

      {monthGroups.map((month) => (
        <section className="spieltipps-month" key={month.key} aria-label={month.label}>
          <h2 className="spieltipps-month-title">{month.label}</h2>
          {month.days.map((day) => (
            <div className="spieltipps-day" key={day.date}>
              <aside className="spieltipps-date" aria-label={`${day.weekday}, ${day.day}. ${month.label}`}>
                <span>{day.weekday}</span>
                <strong>{day.day}</strong>
                <small>{month.label}</small>
              </aside>
              <div className="spieltipps-day-matches">
                {day.matches.map((match) => <MatchCard key={match._id} match={match} onOpen={openDetails} />)}
              </div>
            </div>
          ))}
        </section>
      ))}
      {watchlist.length > 0 && (
        <section className="spieltipps-undated" aria-label="Vorgemerkte Begegnungen ohne Termin">
          <h2 className="spieltipps-month-title">Vorgemerkt · Termin offen</h2>
          <p className="spieltipps-watchlist-note">Interessante Begegnungen ohne belastbare Ansetzung. Kein bestätigter Reisetermin.</p>
          <div className="spieltipps-undated-items">
            {watchlist.map((match) => <MatchCard key={match._id} match={match} onOpen={openDetails} />)}
          </div>
        </section>
      )}
      {!monthGroups.length && !watchlist.length && (
        <div className="calendar-empty" role="status">
          <h3>Aktuell keine passenden Spieltipps.</h3>
          <p>Hier wird kein Spiel ergänzt, nur um eine Lücke zu füllen. Probiere eine andere Region oder Kategorie.</p>
          {(category || region || onlyHighlights) && <button type="button" onClick={resetFilters}>Alle Spieltipps anzeigen →</button>}
        </div>
      )}
      <MatchDetails match={activeMatch} onClose={closeDetails} />
    </section>
  )
}
