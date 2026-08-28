import {createClient} from 'next-sanity'
import {articles as fallbackArticles} from './articles'

export const sanityClient = createClient({
  projectId: '90kx3kio',
  dataset: 'production',
  apiVersion: '2026-08-20',
  useCdn: true,
})

const articleProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  tag,
  teaser,
  publishedAt,
  featured,
  "hero": heroImage.asset->url,
  "heroAlt": heroImage.alt,
  "heroCaption": heroImage.caption,
  match,
  place,
  tags,
  seoDescription,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "src": asset->url
    },
    _type == "imagePair" => {
      ...,
      "left": left{..., "src": asset->url},
      "right": right{..., "src": asset->url}
    },
    _type == "gallery" => {
      ...,
      images[]{..., "src": asset->url}
    }
  }
}`

const categoryLabels = {
  spielbericht: 'Spielbericht',
  fankultur: 'Fankultur',
  grounds: 'Grounds',
  reisen: 'Reisen',
  verein: 'Verein',
  derby: 'Derby',
  spieler: 'Spieler',
}

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

function normalizeSanityArticle(article) {
  const match = article.match || {}
  const shortTitle = match.homeTeam && match.awayTeam
    ? `${match.homeTeam} – ${match.awayTeam}`
    : article.title
  const publishedDateDisplay = formatDate(article.publishedAt)
  const matchDateDisplay = formatDate(match.matchDate)

  return {
    ...article,
    source: 'sanity',
    shortTitle,
    categoryKey: article.category,
    category: categoryLabels[article.category] || article.category || 'Geschichte',
    tag: article.tag || categoryLabels[article.category] || 'Tandemhopper',
    date: article.publishedAt,
    dateDisplay: publishedDateDisplay,
    matchDateDisplay,
    displayDate: matchDateDisplay || publishedDateDisplay,
    competition: match.competition || '',
    matchday: match.matchday || '',
    matchDate: match.matchDate || '',
    stadium: match.stadium || '',
    attendance: match.attendance || '',
    result: match.result || '',
    heroAlt: article.heroAlt || article.title,
    body: article.body || [],
  }
}

function normalizeFallback(article) {
  return {
    ...article,
    source: 'fallback',
    displayDate: article.dateDisplay || '',
    matchDateDisplay: article.dateDisplay || '',
    categoryKey: article.category.toLowerCase() === 'spielbericht'
      ? 'spielbericht'
      : article.category.toLowerCase() === 'fankultur'
        ? 'fankultur'
        : article.category.toLowerCase(),
  }
}

function sortArticles(items) {
  return [...items].sort((a, b) => {
    const featured = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    if (featured) return featured
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  })
}

async function fetchFromSanity(query, params = {}) {
  let lastError
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await sanityClient.fetch(query, params, {next: {revalidate: 60}})
    } catch (error) {
      lastError = error
      if (attempt < 2) {
        await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)))
      }
    }
  }
  throw lastError
}

export async function getArticles() {
  const fallback = fallbackArticles.map(normalizeFallback)
  try {
    const data = await fetchFromSanity(
      `*[_type == "article" && defined(slug.current)] | order(featured desc, publishedAt desc) ${articleProjection}`
    )
    if (data?.length) {
      const sanityArticles = data.map(normalizeSanityArticle)
      const sanitySlugs = new Set(sanityArticles.map(article => article.slug))
      return sortArticles([
        ...sanityArticles,
        ...fallback.filter(article => !sanitySlugs.has(article.slug)),
      ])
    }
  } catch (error) {
    console.error('Sanity articles unavailable after retries:', error)
  }
  return sortArticles(fallback)
}

export async function getArticleBySlug(slug) {
  try {
    const data = await fetchFromSanity(
      `*[_type == "article" && slug.current == $slug][0] ${articleProjection}`,
      {slug}
    )
    if (data) return normalizeSanityArticle(data)
  } catch (error) {
    console.error('Sanity article unavailable after retries:', error)
  }
  const fallback = fallbackArticles.find((article) => article.slug === slug)
  return fallback ? normalizeFallback(fallback) : null
}
