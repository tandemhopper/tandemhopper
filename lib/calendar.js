import {sanityClient} from './sanity'

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

export async function getCalendarData() {
  const [competitions, matches] = await Promise.all([
    fetchCalendarQuery(`*[_type == "calendarCompetition"] | order(startDate asc) ${competitionProjection}`),
    fetchCalendarQuery(`*[_type == "calendarMatch"] | order(matchDate asc, dateFrom asc, priority desc) ${matchProjection}`),
  ])

  return {
    competitions: competitions || [],
    matches: matches || [],
  }
}
