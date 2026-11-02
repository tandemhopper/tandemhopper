import {sanityClient} from './sanity'

// Published edits only. Until the first Studio publication, the guide uses
// the reviewed, version-controlled defaults.
export async function getHongkongEditorialSettings(){
 try {
  return await sanityClient.fetch(
   `*[_type == "hongkongEditorialSettings" && _id == "hongkongEditorialSettings"][0]{
    _id,lastReviewed,eyebrow,deck,introTitle,introText,spotlightTitle,spotlightText,spotlightUrl,
    leagueSeason,groundIntro,grounds[],fanTitle,fanText,travelIntro,travel[],
    racecourseTitle,racecourseText,leisure[],tips[],sourceLinks[],
    images[]{...,"url":image.asset->url}
   }`,{}, {next:{revalidate:60}}
  )
 }catch(e){console.error('Hongkong settings unavailable:',e);return null}
}
