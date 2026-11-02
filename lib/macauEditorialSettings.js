import {sanityClient} from './sanity'

// Only published editor changes affect the public page.
// Missing settings intentionally fall back to the committed, working design.
export async function getMacauEditorialSettings() {
  try {
    return await sanityClient.fetch(
      `*[_type == "macauEditorialSettings" && _id == "macauEditorialSettings"][0]{
        _id,lastReviewed,leagueSeason,
        introTexts[],stadiumTexts[],matchTexts[],travelTexts[],
        cityTexts[],budgetTexts[],sourceTexts[],
        tips[],sourceLinks[],
        images[]{...,"url":image.asset->url}
      }`,
      {}, {next:{revalidate:60}}
    )
  } catch (error) {
    console.error('Macau editorial settings unavailable:', error)
    return null
  }
}
