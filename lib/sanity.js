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

  return {
    ...article,
    source: 'sanity',
    shortTitle,
    categoryKey: article.category,
    category: categoryLabels[article.category] || article.category || 'Geschichte',
    tag: article.tag || categoryLabels[article.category] || 'Tandemhopper',
    date: article.publishedAt,
    dateDisplay: formatDate(article.publishedAt),
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
    categoryKey: article.category.toLowerCase() === 'spielbericht'
      ? 'spielbericht'
      : article.category.toLowerCase() === 'fankultur'
        ? 'fankultur'
        : article.category.toLowerCase(),
  }
}

export async function getArticles() {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "article" && defined(slug.current)] | order(featured desc, publishedAt desc) ${articleProjection}`,
      {},
      {next: {revalidate: 60}}
    )
    if (data?.length) return data.map(normalizeSanityArticle)
  } catch (error) {
    console.error('Sanity articles unavailable:', error)
  }
  return fallbackArticles.map(normalizeFallback)
}

export async function getArticleBySlug(slug) {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "article" && slug.current == $slug][0] ${articleProjection}`,
      {slug},
      {next: {revalidate: 60}}
    )
    if (data) return normalizeSanityArticle(data)
  } catch (error) {
    console.error('Sanity article unavailable:', error)
  }
  const fallback = fallbackArticles.find((article) => article.slug === slug)
  return fallback ? normalizeFallback(fallback) : null
}
