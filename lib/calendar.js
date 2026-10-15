import {sanityClient} from './sanity'
import {starterMatches} from './calendarStarter'
import {championsLeagueMatches} from './calendarChampionsLeague'
import {europaConferenceMatches} from './calendarEuropaConferenceTips'
import {radarMatches} from './calendarRadarTips'
import {selectedMatches} from './calendarUserSelections'
import {furtherMatches} from './calendarAdditionalDerbies'

// Wettbewerbsphasen werden bewusst nicht mehr veröffentlicht.
// Stattdessen erscheinen ausschließlich redaktionell ausgewählte Spiele.
const matchProjection = `{
  _id,
  homeTeam,
  awayTeam,
  country,
  region,
  regions,
  internationalCompetition,
  city,
  stadium,
  dateStatus,
  matchDate,
  kickoffTime,
  dateFrom,
  dateTo,
  categories,
  priority,
  shortDescription,
  background,
  confirmedInfo,
  editorialAssessment,
  awayFans,
  ticketSituation,
  tags,
  lastChecked,
  sources,
  sourceUrls,
  "article": article->{title, "slug": slug.current}
}`

function matchKey(item) {
  return [item.homeTeam, item.awayTeam, item.matchDate || item.dateFrom].map(value => value || '').join('|').toLowerCase()
}

export async function getCalendarData() {
  let cmsMatches = []
  try {
    cmsMatches = await sanityClient.fetch(
      `*[_type == "calendarMatch"] | order(matchDate asc, dateFrom asc, priority desc) ${matchProjection}`,
      {},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Sanity Spieltipps unavailable:', error)
  }

  const baseMatches = [
    ...starterMatches,
    ...radarMatches,
    ...selectedMatches,
    ...furtherMatches,
    ...championsLeagueMatches.map((match) => ({...match, internationalCompetition: true})),
    ...europaConferenceMatches.map((match) => ({...match, internationalCompetition: true})),
  ]
  // Diese beiden bisherigen Starter-Partien stammen ebenfalls aus UEFA-Wettbewerben.
  const internationalStarterIds = new Set([
    'starter-match-sporting-galatasaray-2026-09-09',
    'starter-match-juventus-nec-2026-09-17',
  ])
  const baseByKey = new Map(baseMatches.map((match) => [
    matchKey(match),
    {...match, internationalCompetition: match.internationalCompetition || internationalStarterIds.has(match._id)},
  ]))

  for (const match of cmsMatches || []) {
    const key = matchKey(match)
    const existing = baseByKey.get(key)
    // CMS-Overrides erhalten die von den Quellen-Dateien bekannte Wettbewerbszuordnung,
    // solange der Redakteur das Feld nicht ausdrücklich anders setzt.
    baseByKey.set(key, {
      ...existing,
      ...match,
      internationalCompetition: typeof match.internationalCompetition === 'boolean'
        ? match.internationalCompetition
        : Boolean(existing?.internationalCompetition),
    })
  }

  const matches = [...baseByKey.values()]
    .sort((a, b) => (a.matchDate || a.dateFrom || '').localeCompare(b.matchDate || b.dateFrom || ''))

  return {matches}
}
