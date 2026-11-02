import {sanityClient} from './sanity'
import {correctPublishedMacauCopy} from './macauCopyCorrections'

// Only published editor changes affect the public page.
// Missing settings intentionally fall back to the committed, working design.
export async function getMacauEditorialSettings() {
  try {
    const published = await sanityClient.fetch(
      `*[_type == "macauEditorialSettings" && _id == "macauEditorialSettings"][0]{
        _id,lastReviewed,leagueSeason,mapNavigationTip,
        introTexts[],stadiumTexts[],matchTexts[],travelTexts[],
        cityTexts[],budgetTexts[],sourceTexts[],
        tips[],sourceLinks[],
        images[]{...,"url":image.asset->url}
      }`,
      {}, {next:{revalidate:60}}
    )
    return correctPublishedMacauCopy(published)
  } catch (error) {
    console.error('Macau editorial settings unavailable:', error)
    return null
  }
}
