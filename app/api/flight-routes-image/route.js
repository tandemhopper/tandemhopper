import {sanityClient} from '../../../lib/sanity'

export const revalidate = 60

export async function GET(){
  try {
    const image = await sanityClient.fetch(
      '*[_id == "flightRoutesSettings" && _type == "flightRoutesSettings"][0]{"url":heroImage.asset->url,"alt":heroImage.alt,"caption":heroImage.caption}',
      {},
      {next:{revalidate:60}}
    )
    return Response.json({url:image?.url||null,alt:image?.alt||'Flugzeug auf dem Rollfeld',caption:image?.caption||''})
  } catch {
    return Response.json({url:null,alt:'',caption:''})
  }
}
