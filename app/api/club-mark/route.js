const REVALIDATE_SECONDS = 60 * 60 * 24 * 30

const TEAM_IDS = {
  'paris saint germain': '133714',
  'fenerbahce': '133807',
}

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

// Nur gezielte Korrekturen für nachweislich falsche/fehlende Vereinswappen.
// Alle anderen Vereine behalten die bisherige TheSportsDB-Suche unverändert.
const PINNED_BADGES = {
  'red star fc': [
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Logo_Red_Star_FC_2014.svg',
  ],
  'as saint etienne': [
    'https://www.asse.fr/img/mediakit/Logo_ASSE_Quadri_RVB.png',
  ],
  'raec mons': [
    'https://fanshop.raecmons44.be/cdn/shop/files/Mons-logo.png?v=1768412580',
  ],
  'ksk heist': [
    'https://cdn-img.zerozero.pt/img/logos/equipas/43577_imgbank_1687789932.png',
    'https://primary.jwwb.nl/public/u/p/j/temp-bpazrmsmlmyifrylaudz/k-sk_-heist-transparant-high.png?enable=upscale&enable-io=true&fit=bounds&width=1200',
  ],
  'apoel nikosia': [
    'https://upload.wikimedia.org/wikipedia/commons/9/93/APOEL_%28logo_with_stars%29.svg',
  ],
  'apoel nicosia': [
    'https://upload.wikimedia.org/wikipedia/commons/9/93/APOEL_%28logo_with_stars%29.svg',
  ],
  'omonia nikosia': [
    'https://sportsbouts.com/img/teams%2F133986%2Fbadge.png',
  ],
  'omonia nicosia': [
    'https://sportsbouts.com/img/teams%2F133986%2Fbadge.png',
  ],
  'als omonia 29m': [
    'https://www.footylogos.com/dls/logo/omonia-29m.png',
  ],
  'omonia 29m': [
    'https://www.footylogos.com/dls/logo/omonia-29m.png',
  ],
  'omonia 29is maiou': [
    'https://www.footylogos.com/dls/logo/omonia-29m.png',
  ],
}

async function fetchPinnedBadge(url) {
  const response = await fetch(url, {
    next: {revalidate: REVALIDATE_SECONDS},
    headers: url.includes('upload.wikimedia.org')
      ? {'User-Agent': 'Tandemhopper/1.0 (https://tandemhopper.de)'}
      : {},
  })
  if (!response.ok) return null

  const contentType = (response.headers.get('content-type') || '').split(';')[0].toLowerCase()
  if (!['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'].includes(contentType)) return null

  const body = await response.arrayBuffer()
  if (!body.byteLength || body.byteLength > 5 * 1024 * 1024) return null
  return {body, contentType}
}

const SUCCESS_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=2592000, immutable',
  'CDN-Cache-Control': 'public, max-age=31536000, stale-while-revalidate=604800',
  'Vercel-CDN-Cache-Control': 'public, max-age=31536000, stale-while-revalidate=604800',
}

const FALLBACK_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=86400',
  'CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
  'Vercel-CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
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

async function fetchTeamData(team) {
  const normalized = normalize(team)
  const teamId = TEAM_IDS[normalized]

  if (teamId) {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=${teamId}`, {
      next: {revalidate: REVALIDATE_SECONDS},
    })
    if (response.ok) {
      const data = await response.json()
      const teams = Array.isArray(data?.teams) ? data.teams : []
      if (teams.length) return teams
    }
  }

  const query = searchName(team)
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(query)}`, {
    next: {revalidate: REVALIDATE_SECONDS},
  })
  if (!response.ok) return []

  const data = await response.json()
  return Array.isArray(data?.teams) ? data.teams : []
}

async function fetchBadge(team) {
  const pinned = PINNED_BADGES[normalize(team)]
  if (pinned) {
    // Bei diesen Vereinen keinesfalls das erste ähnlich benannte API-Ergebnis
    // anzeigen (Red Star FC wurde sonst fälschlich SK Beveren zugeordnet).
    for (const url of pinned) {
      try {
        const badge = await fetchPinnedBadge(url)
        if (badge) return badge
      } catch (error) {
        console.warn('Pinned badge unavailable:', team, error)
      }
    }
    return null
  }

  const query = searchName(team)
  const teams = await fetchTeamData(team)
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
        ...FALLBACK_CACHE_HEADERS,
      },
    })
  }

  try {
    const badge = await fetchBadge(team)
    if (badge) {
      return new Response(badge.body, {
        headers: {
          'Content-Type': badge.contentType,
          ...SUCCESS_CACHE_HEADERS,
        },
      })
    }
  } catch (error) {
    console.error('Club badge lookup failed:', team, error)
  }

  return new Response(fallbackSvg(team), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      ...FALLBACK_CACHE_HEADERS,
    },
  })
}
