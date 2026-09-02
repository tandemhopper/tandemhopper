const REVALIDATE_SECONDS = 60 * 60 * 24 * 30

const TEAM_ALIASES = {
  'slavia prag': 'Slavia Praha',
  'dinamo bucuresti': 'Dinamo Bucuresti',
  'fenerbahce': 'Fenerbahce',
  'vfb stuttgart': 'VfB Stuttgart',
  'slovan bratislava': 'Slovan Bratislava',
  'club brugge': 'Club Brugge',
  'psv eindhoven': 'PSV Eindhoven',
  'lille osc': 'Lille',
  'rc lens': 'Lens',
  'galatasaray': 'Galatasaray',
  'lask': 'LASK Linz',
  'fcsb': 'FCSB',
}

function normalize(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase()
}

function searchName(team) {
  const normalized = normalize(team)
  return TEAM_ALIASES[normalized] || team
}

function initials(team) {
  const parts = String(team || '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!parts.length) return 'TH'
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase()
  return parts.slice(0, 3).map((part) => part[0]).join('').toUpperCase()
}

function fallbackSvg(team) {
  const label = initials(team).replace(/[<>&"']/g, '')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img"><rect x="4" y="4" width="88" height="88" rx="18" fill="#fff" stroke="#d8d8d8" stroke-width="4"/><text x="48" y="55" text-anchor="middle" dominant-baseline="middle" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="800" fill="#111">${label}</text></svg>`
}

async function fetchBadge(team) {
  const query = searchName(team)
  const endpoint = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(query)}`
  const response = await fetch(endpoint, {next: {revalidate: REVALIDATE_SECONDS}})
  if (!response.ok) return null

  const data = await response.json()
  const teams = Array.isArray(data?.teams) ? data.teams : []
  if (!teams.length) return null

  const wanted = normalize(query)
  const soccerTeams = teams.filter((item) => item?.strSport === 'Soccer')
  const candidate = soccerTeams.find((item) => normalize(item?.strTeam) === wanted)
    || soccerTeams.find((item) => normalize(item?.strTeamShort) === wanted)
    || soccerTeams[0]
    || teams[0]

  if (!candidate?.strBadge) return null

  const badgeResponse = await fetch(candidate.strBadge, {next: {revalidate: REVALIDATE_SECONDS}})
  if (!badgeResponse.ok) return null

  return {
    body: await badgeResponse.arrayBuffer(),
    contentType: badgeResponse.headers.get('content-type') || 'image/png',
  }
}

export async function GET(request) {
  const {searchParams} = new URL(request.url)
  const team = (searchParams.get('team') || '').trim().slice(0, 80)

  if (!team) {
    return new Response(fallbackSvg('TH'), {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800',
      },
    })
  }

  try {
    const badge = await fetchBadge(team)
    if (badge) {
      return new Response(badge.body, {
        headers: {
          'Content-Type': badge.contentType,
          'Cache-Control': 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800',
        },
      })
    }
  } catch (error) {
    console.error('Club badge lookup failed:', team, error)
  }

  return new Response(fallbackSvg(team), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
