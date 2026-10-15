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


// Geprüfte Vereinszuordnungen. Keine Bildersuche nach bloß ähnlich benannten Vereinen.
// Die Commons-Dateinamen sind auf Vereinsidentität und aktuelle Wappenversion geprüft.
const VERIFIED_BADGES = {
  'raec mons': 'https://ilcalcio.net/assets/2e/cf/2ecf377b46c5d53ffc7e0b4374b87f46.png',
  'ksk heist': 'https://primary.jwwb.nl/public/u/p/j/temp-bpazrmsmlmyifrylaudz/k-sk_-heist-transparant-high.png?enable=upscale&enable-io=true&fit=bounds&width=1200',
  'as saint etienne': 'https://www.asse.fr/img/mediakit/Logo_ASSE_Quadri_RVB.png',
  'germania ratingen 04 19': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Ratingen_04-19_logo.svg',
  'bsc sud 05': 'https://images.ebcdn.de/club-5461/logo.png?format=webp&height=400&mode=max&v=6&width=400',
  'bsg stahl brandenburg': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/BSG_Stahl_Brandenburg_Logo_2022.svg',
  'apoel nikosia': 'https://upload.wikimedia.org/wikipedia/commons/9/93/APOEL_%28logo_with_stars%29.svg',
  'als omonia 29m': 'https://images.seeklogo.com/logo-png/55/1/als-omonia-29-mayou-nicosia-logo-png_seeklogo-552906.png',
  'vfr gross gerau': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b7/44/be/b744be7a-1914-ed97-85fc-273e172f8f8c/AppIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.jpeg/1200x630wa.jpg',
  '1 sc gottingen 05': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Offizielles_Wappen_des_1._SC_G%C3%B6ttingen_05.svg',
  'svg gottingen': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/SVG_G%C3%B6ttingen_Logo.png',
  'calcio foggia 1920': 'https://upload.wikimedia.org/wikipedia/commons/4/49/Logo_Calcio_Foggia_1920_-_20212022.png',
  'bsg chemie leipzig': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/BSG_Chemie_Leipzig_Logo.svg',
  'ssv ulm 1846 fu ball': 'https://upload.wikimedia.org/wikipedia/commons/6/6c/SSV_Ulm_1846_Fussball.svg',
  'omonia nikosia': 'https://sportsbouts.com/img/teams%2F133986%2Fbadge.png',
  'sint truidense vv': 'https://images.seeklogo.com/logo-png/29/1/k-sint-truidense-vv-logo-png_seeklogo-295043.png',
  'rot weiss essen': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Logo_of_Rot-Weiss_Essen.svg',
  'dvs 33 ermelo': 'https://www.hollandsevelden.nl/images/club_logo_van_voetbalvereniging_dvs33-ermelo_uit_ermelo.png',
  // Bon Boys: statt eines ähnlich klingenden Fremdwappens nur exakte Suche/Fallback.
}

const VERIFIED_ALIASES = {
  'bon boys': 'SV Bon Boys Haaksbergen',
  '1 sc gottingen 05': '1. SC Göttingen 05',
  'ssv ulm 1846 fussball': 'SSV Ulm 1846 Fußball',
}

async function fetchVerifiedBadge(url) {
  const response = await fetch(url, {
    next: {revalidate: REVALIDATE_SECONDS},
    headers: url.includes('upload.wikimedia.org') ? {'User-Agent': 'Tandemhopper/1.0 (https://tandemhopper.de)'} : {},
  })
  if (!response.ok) return null
  const contentType = (response.headers.get('content-type') || '').toLowerCase().split(';')[0]
  if (!contentType.startsWith('image/')) return null
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
  return VERIFIED_ALIASES[normalized] || TEAM_ALIASES[normalized] || team
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
  const normalized = normalize(team)

  // Niemals irgendein Team aus einer unscharfen API-Suche als korrekt anzeigen.
  // Zuerst die redaktionell überprüfte Bildquelle, danach nur exakte Treffer.
  const verifiedUrl = VERIFIED_BADGES[normalized]
  if (verifiedUrl) {
    try {
      const verified = await fetchVerifiedBadge(verifiedUrl)
      if (verified) return verified
    } catch (error) {
      console.warn('Verified club crest currently unavailable:', team, error)
    }
  }

  const query = searchName(team)
  const wanted = normalize(query)
  const teams = await fetchTeamData(team)
  const soccerTeams = teams.filter((item) => item?.strSport === 'Soccer')
  const candidate = soccerTeams.find((item) => normalize(item?.strTeam) === wanted)
    || soccerTeams.find((item) => normalize(item?.strTeamShort) === wanted)

  if (!candidate?.strBadge) return null
  return fetchVerifiedBadge(candidate.strBadge)
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
