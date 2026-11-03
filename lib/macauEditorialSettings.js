import {sanityClient} from './sanity'
import {correctPublishedMacauCopy} from './macauCopyCorrections'
import {upgradePublishedMacauNovember2026} from './macauNovember2026Updates'

// Only published editor changes affect the public page.
// Missing settings intentionally fall back to the committed, working design.
export async function getMacauEditorialSettings() {
  try {
    const published = await sanityClient.fetch(
      `*[_type == "macauEditorialSettings" && _id == "macauEditorialSettings"][0]{
        _id,lastReviewed,leagueSeason,mapNavigationTip,lrtHighlight,
        introTexts[],stadiumTexts[],matchTexts[],travelTexts[],
        cityTexts[],budgetTexts[],sourceTexts[],
        tips[],sourceLinks[],
        images[]{...,"url":image.asset->url}
      }`,
      {}, {next:{revalidate:60}}
    )
    return upgradePublishedMacauNovember2026(correctPublishedMacauCopy(published))
  } catch (error) {
    console.error('Macau editorial settings unavailable:', error)
    return null
  }
}
