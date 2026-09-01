import {sanityClient} from './sanity'
import {starterCompetitions, starterMatches} from './calendarStarter'
import {championsLeagueCompetitions, championsLeagueMatches} from './calendarChampionsLeague'
import {conferenceLeagueCompetitions} from './calendarConferenceLeague'
import {cafChampionsLeagueCompetitions} from './calendarCafChampionsLeague'

const competitionProjection = `{
  _id,
  name,
  shortName,
  region,
  country,
  competitionType,
  phase,
  startDate,
  endDate,
  status,
  note,
  "article": article->{title, "slug": slug.current}
}`

const matchProjection = `{
  _id,
  homeTeam,
  awayTeam,
  country,
  region,
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
  "article": article->{title, "slug": slug.current}
}`

async function fetchCalendarQuery(query) {
  try {
    return await sanityClient.fetch(query, {}, {next: {revalidate: 60}})
  } catch (error) {
    console.error('Sanity calendar unavailable:', error)
    return []
  }
}

function competitionKey(item) {
  return [item.name, item.phase, item.startDate].map(value => value || '').join('|').toLowerCase()
}

function matchKey(item) {
  return [item.homeTeam, item.awayTeam, item.matchDate || item.dateFrom].map(value => value || '').join('|').toLowerCase()
}

function mergeWithCms(starterItems, cmsItems, getKey) {
  const merged = new Map(starterItems.map(item => [getKey(item), item]))
  for (const item of cmsItems || []) merged.set(getKey(item), item)
  return [...merged.values()]
}

export async function getCalendarData() {
  const [cmsCompetitions, cmsMatches] = await Promise.all([
    fetchCalendarQuery(`*[_type == "calendarCompetition"] | order(startDate asc) ${competitionProjection}`),
    fetchCalendarQuery(`*[_type == "calendarMatch"] | order(matchDate asc, dateFrom asc, priority desc) ${matchProjection}`),
  ])

  const competitions = mergeWithCms(
    [
      ...starterCompetitions,
      ...championsLeagueCompetitions,
      ...conferenceLeagueCompetitions,
      ...cafChampionsLeagueCompetitions,
    ],
    cmsCompetitions,
    competitionKey,
  ).sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''))

  const matches = mergeWithCms(
    [...starterMatches, ...championsLeagueMatches],
    cmsMatches,
    matchKey,
  ).sort((a, b) => (a.matchDate || a.dateFrom || '').localeCompare(b.matchDate || b.dateFrom || ''))

  return {competitions, matches}
}
