'use client'

import {useMemo, useState} from 'react'
import Link from 'next/link'

const weekdayShort = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA']
const categoryLabels = {
  fanszene: 'FANSZENE',
  rivalitaet: 'RIVALITÄT',
  auswaertsfahrt: 'GROSSE AUSWÄRTSFAHRT',
  anlass: 'BESONDERER ANLASS',
  unter_dem_radar: 'UNTER DEM RADAR',
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function parseDate(value) {
  return value ? new Date(`${value}T12:00:00`) : null
}

function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function startOfWeek(date) {
  const result = new Date(date)
  const day = result.getDay()
  const distance = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + distance)
  return result
}

function formatDayHeading(date) {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}

function formatMonth(date) {
  return new Intl.DateTimeFormat('de-DE', {month: 'long', year: 'numeric'}).format(date)
}

function formatShortDate(value) {
  const date = parseDate(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('de-DE', {day: '2-digit', month: '2-digit'}).format(date)
}

function competitionActiveOn(competition, isoDate) {
  if (!competition?.startDate) return false
  const end = competition.endDate || competition.startDate
  return competition.startDate <= isoDate && end >= isoDate
}

function matchActiveOn(match, isoDate) {
  if (match.dateStatus === 'window') {
    return Boolean(match.dateFrom && match.dateTo && match.dateFrom <= isoDate && match.dateTo >= isoDate)
  }
  return match.matchDate === isoDate
}

function matchSortValue(match) {
  return match.matchDate || match.dateFrom || '9999-12-31'
}

function formatMatchDate(match) {
  if (match.dateStatus === 'window') {
    const from = formatShortDate(match.dateFrom)
    const to = formatShortDate(match.dateTo)
    return from && to ? `${from}–${to} · TBC` : 'Terminfenster · TBC'
  }

  const date = formatShortDate(match.matchDate)
  const time = match.kickoffTime ? ` · ${match.kickoffTime}` : ''
  const status = match.dateStatus === 'confirmed' ? '' : ' · TBC'
  return `${date}${time}${status}`
}

function CompetitionList({items}) {
  if (!items.length) return null

  return (
    <div className="calendar-competitions" aria-label="Wettbewerbsphasen">
      {items.map((competition) => (
        <article className="calendar-competition" key={competition._id}>
          <span>{competition.shortName || competition.name}</span>
          <strong>{competition.phase}</strong>
          {competition.note ? <p>{competition.note}</p> : null}
          {competition.status === 'preliminary' ? <small>VORLÄUFIG</small> : null}
        </article>
      ))}
    </div>
  )
}

function MatchCard({match}) {
  const categories = (match.categories || []).map((key) => categoryLabels[key] || key.toUpperCase())

  return (
    <article className={`calendar-match${match.priority === 3 ? ' calendar-match-featured' : ''}`}>
      {match.priority === 3 ? <p className="calendar-tip-label">TANDEMHOPPER-TIPP</p> : null}
      <div className="calendar-match-head">
        <div>
          <h3>{match.homeTeam} – {match.awayTeam}</h3>
          <p>{[match.city || match.country, formatMatchDate(match)].filter(Boolean).join(' · ')}</p>
        </div>
        <span className={`calendar-status calendar-status-${match.dateStatus}`}>{match.dateStatus === 'confirmed' ? 'FIX' : 'TBC'}</span>
      </div>

      {categories.length ? (
        <div className="calendar-tags">
          {categories.map((category) => <span key={category}>{category}</span>)}
        </div>
      ) : null}

      <p className="calendar-match-copy">{match.shortDescription}</p>

      <div className="calendar-match-foot">
        {match.stadium ? <span>{match.stadium}</span> : <span />}
        {match.article?.slug ? <Link href={`/geschichten/${match.article.slug}`}>Hintergrund →</Link> : null}
      </div>
    </article>
  )
}

export default function CalendarExplorer({competitions = [], matches = []}) {
  const today = useMemo(() => new Date(), [])
  const [selectedDate, setSelectedDate] = useState(today)
  const [weekendMode, setWeekendMode] = useState(false)

  const weekStart = startOfWeek(selectedDate)
  const weekDays = Array.from({length: 7}, (_, index) => addDays(weekStart, index))

  const viewDates = weekendMode
    ? [addDays(weekStart, 4), addDays(weekStart, 5), addDays(weekStart, 6)]
    : [selectedDate]

  const viewDateStrings = viewDates.map(toISODate)

  const visibleCompetitions = competitions.filter((competition) =>
    viewDateStrings.some((date) => competitionActiveOn(competition, date))
  )

  const visibleMatches = matches
    .filter((match) => viewDateStrings.some((date) => matchActiveOn(match, date)))
    .sort((a, b) => (b.priority || 0) - (a.priority || 0) || matchSortValue(a).localeCompare(matchSortValue(b)))

  const nextMatch = matches
    .filter((match) => matchSortValue(match) > toISODate(selectedDate))
    .sort((a, b) => matchSortValue(a).localeCompare(matchSortValue(b)))[0]

  const heading = weekendMode
    ? `Dieses Wochenende · ${formatShortDate(toISODate(viewDates[0]))}–${formatShortDate(toISODate(viewDates[2]))}`
    : formatDayHeading(selectedDate)

  function selectDay(date) {
    setSelectedDate(date)
    setWeekendMode(false)
  }

  function moveWeek(direction) {
    setSelectedDate((current) => addDays(current, direction * 7))
  }

  function goToday() {
    setSelectedDate(new Date())
    setWeekendMode(false)
  }

  return (
    <section className="calendar-explorer">
      <div className="calendar-actions">
        <div>
          <button type="button" className={!weekendMode ? 'is-active' : ''} onClick={goToday}>HEUTE</button>
          <button type="button" className={weekendMode ? 'is-active' : ''} onClick={() => setWeekendMode(true)}>WOCHENENDE</button>
        </div>
        <span className="calendar-legend"><i className="competition-mark" /> Wettbewerb <i className="tip-mark" /> Tipp</span>
      </div>

      <div className="calendar-month-row">
        <button type="button" aria-label="Vorherige Woche" onClick={() => moveWeek(-1)}>‹</button>
        <strong>{formatMonth(selectedDate).toUpperCase()}</strong>
        <button type="button" aria-label="Nächste Woche" onClick={() => moveWeek(1)}>›</button>
      </div>

      <div className="calendar-week" role="list" aria-label="Wochenauswahl">
        {weekDays.map((date) => {
          const iso = toISODate(date)
          const hasCompetition = competitions.some((competition) => competitionActiveOn(competition, iso))
          const hasTip = matches.some((match) => matchActiveOn(match, iso))
          const selected = !weekendMode && iso === toISODate(selectedDate)

          return (
            <button type="button" key={iso} className={selected ? 'is-selected' : ''} onClick={() => selectDay(date)}>
              <span>{weekdayShort[date.getDay()]}</span>
              <strong>{date.getDate()}</strong>
              <div className="calendar-day-signals" aria-hidden="true">
                {hasCompetition ? <i className="competition-mark" /> : <i />}
                {hasTip ? <i className="tip-mark" /> : <i />}
              </div>
            </button>
          )
        })}
      </div>

      <div className="calendar-view">
        <aside className="calendar-context">
          <p className="eyebrow">{weekendMode ? 'WOCHENENDE' : 'AUSGEWÄHLTER TAG'}</p>
          <h2>{heading}</h2>
          <CompetitionList items={visibleCompetitions} />
          {!visibleCompetitions.length ? <p className="calendar-context-empty">Keine größere Wettbewerbsphase für diesen Zeitraum eingetragen.</p> : null}
        </aside>

        <div className="calendar-recommendations">
          <div className="calendar-section-head">
            <p className="eyebrow">UNSERE TIPPS</p>
            <span>{visibleMatches.length ? `${visibleMatches.length} ${visibleMatches.length === 1 ? 'TIPP' : 'TIPPS'}` : 'KEIN TIPP'}</span>
          </div>

          {visibleMatches.length ? visibleMatches.map((match) => <MatchCard key={match._id} match={match} />) : (
            <div className="calendar-empty">
              <h3>Heute nichts erzwungen.</h3>
              <p>Für diesen Zeitraum haben wir aktuell keinen besonderen Tipp. Genau so soll der Kalender funktionieren: lieber eine Lücke als irgendein Spiel, nur damit hier etwas steht.</p>
              {nextMatch ? <button type="button" onClick={() => selectDay(parseDate(matchSortValue(nextMatch)))}>Nächster Tipp: {formatShortDate(matchSortValue(nextMatch))} →</button> : null}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
