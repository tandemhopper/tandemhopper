import {sanityClient} from './sanity'
import {starterMatches} from './calendarStarter'
import {championsLeagueMatches} from './calendarChampionsLeague'
import {europaConferenceMatches} from './calendarEuropaConferenceTips'
import {radarMatches} from './calendarRadarTips'
import {selectedMatches} from './calendarUserSelections'
import {furtherMatches} from './calendarAdditionalDerbies'
import {lowerLeagueMatches} from './calendarLowerLeagues2026'
import {germanCupMatches} from './calendarGermanCup2026'
import {octoberMatchExtras} from './calendarOctoberExtras'
import {mayDerbyMatches} from './calendarNewMayDerbies'
import {womensDerbyMatches} from './calendarWomensDerby2026'

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
  sport,
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

const editorialArticleLinks = [
  {
    matchDate: '2026-10-27',
    homeTeam: 'koninklijkehfc',
    awayTeam: 'goaheadeagles',
    article: {
      title: 'KNVB-Pokal: Des Hoppers Liebling!',
      slug: 'knvb-pokal-des-hoppers-liebling-2026',
    },
  },
  {
    matchDate: '2026-10-27',
    homeTeam: 'rijnsburgseboys',
    awayTeam: 'fcdenbosch',
    article: {
      title: 'KNVB-Pokal: Des Hoppers Liebling!',
      slug: 'knvb-pokal-des-hoppers-liebling-2026',
    },
  },
  {
    matchDate: '2026-10-28',
    homeTeam: 'joswatergraafsmeer',
    awayTeam: 'nacbreda',
    article: {
      title: 'KNVB-Pokal: Des Hoppers Liebling!',
      slug: 'knvb-pokal-des-hoppers-liebling-2026',
    },
  },
  {
    matchDate: '2026-10-28',
    homeTeam: 'scgenemuiden',
    awayTeam: 'fcdordrecht',
    article: {
      title: 'KNVB-Pokal: Des Hoppers Liebling!',
      slug: 'knvb-pokal-des-hoppers-liebling-2026',
    },
  },
  {
    matchDate: '2026-10-29',
    homeTeam: 'kozakkenboys',
    awayTeam: 'fcutrecht',
    article: {
      title: 'KNVB-Pokal: Des Hoppers Liebling!',
      slug: 'knvb-pokal-des-hoppers-liebling-2026',
    },
  },
  {
    matchDate: '2026-10-17',
    homeTeam: 'redstar',
    awayTeam: 'saintetienne',
    article: {
      title: '20 Jahre Kampf um Bauer',
      slug: '20-jahre-kampf-um-bauer',
    },
  },
]

function matchKey(item) {
  return [item.homeTeam, item.awayTeam, item.matchDate || item.dateFrom].map(value => value || '').join('|').toLowerCase()
}

function normalizeTeamName(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase()
}

function attachEditorialArticle(match) {
  if (match.article?.slug) return match

  const homeTeam = normalizeTeamName(match.homeTeam)
  const awayTeam = normalizeTeamName(match.awayTeam)

  const link = editorialArticleLinks.find((item) => (
    item.matchDate === match.matchDate
    && homeTeam.includes(item.homeTeam)
    && awayTeam.includes(item.awayTeam)
  ))

  return link ? {...match, article: link.article} : match
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
    ...lowerLeagueMatches,
    ...germanCupMatches,
    ...octoberMatchExtras,
    ...mayDerbyMatches,
    ...womensDerbyMatches,
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
    .map(attachEditorialArticle)
    .sort((a, b) => (a.matchDate || a.dateFrom || '').localeCompare(b.matchDate || b.dateFrom || ''))

  return {matches}
}
