import {sanityClient} from './sanity'

export async function getHongkongEditorialSettings(){
  try{
    return await sanityClient.fetch(
      `*[_type == "hongkongEditorialSettings" && _id == "hongkongEditorialSettings"][0]{
        _id,lastReviewed,leagueSeason,
        introTexts[],footballTexts[],groundsTexts[],fansTexts[],travelTexts[],
        cityTexts[],tipsTexts[],sourcesTexts[],
        matches[],tips[],sourceLinks[],
        images[]{...,"url":image.asset->url}
      }`,
      {},{next:{revalidate:60}}
    )
  }catch(error){
    console.error('Hong Kong country guide settings unavailable',error)
    return null
  }
}
