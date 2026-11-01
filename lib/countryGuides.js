import {sanityClient} from './sanity'

const projection = `{
  _id, title, "slug":slug.current, continent, region, flag, teaser, checkedAt,
  "hero":heroImage.asset->url, "heroAlt":heroImage.alt, "heroCaption":heroImage.caption,
  "tile":coalesce(tileImage.asset->url,heroImage.asset->url),
  intro[]{..., _type == "image" => {..., "src":asset->url}},
  sections[]{...,content[]{..., _type == "image" => {..., "src":asset->url}}}
}`

export async function getCountryGuides() {
  try {
    return await sanityClient.fetch(
      `*[_type == "countryGuide" && defined(slug.current)] | order(title asc) ${projection}`,
      {}, {next:{revalidate:300}}
    ) || []
  } catch (error) {
    console.error('Country guides unavailable:', error)
    return []
  }
}

export async function getCountryGuide(slug) {
  try {
    return await sanityClient.fetch(
      `*[_type == "countryGuide" && slug.current == $slug][0] ${projection}`,
      {slug}, {next:{revalidate:300}}
    )
  } catch (error) {
    console.error('Country guide unavailable:', error)
    return null
  }
}
