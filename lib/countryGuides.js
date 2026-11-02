import {sanityClient} from './sanity'
import {macauGuide} from './macauGuide'

const projection = `{
  _id, title, "slug":slug.current, continent, region, flag, teaser, checkedAt, fifaRanking, fifaRankingDate, leagueSeason,
  "hero":heroImage.asset->url, "heroAlt":heroImage.alt, "heroCaption":heroImage.caption,
  "tile":coalesce(tileImage.asset->url,heroImage.asset->url),
  intro[]{..., _type == "image" => {..., "src":asset->url}},
  sections[]{...,content[]{..., _type == "image" => {..., "src":asset->url}}}
}`

const editorialGuides = [macauGuide]

export async function getCountryGuides() {
  try {
    const fromSanity = await sanityClient.fetch(
      `*[_type == "countryGuide" && defined(slug.current)] | order(title asc) ${projection}`,
      {}, {next:{revalidate:300}}
    ) || []
    const publishedSlugs = new Set(fromSanity.map(country => country.slug))
    return [...fromSanity, ...editorialGuides.filter(country => !publishedSlugs.has(country.slug))].sort((a,b)=>a.title.localeCompare(b.title, 'de'))
  } catch (error) {
    console.error('Country guides unavailable:', error)
    return editorialGuides
  }
}

export async function getCountryGuide(slug) {
  try {
    const fromSanity = await sanityClient.fetch(
      `*[_type == "countryGuide" && slug.current == $slug][0] ${projection}`,
      {slug}, {next:{revalidate:300}}
    )
    return fromSanity || editorialGuides.find(country => country.slug === slug) || null
  } catch (error) {
    console.error('Country guide unavailable:', error)
    return editorialGuides.find(country => country.slug === slug) || null
  }
}
