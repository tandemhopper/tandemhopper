import {NextResponse} from 'next/server'
import {sanityClient} from '../../../lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const slug = 'fa-cup-auslosung-2026-groundhopper'
  try {
    const article = await sanityClient.withConfig({useCdn: false}).fetch(
      '*[_type == "article" && slug.current == $slug][0]{_id,title,slug,"firstText":body[0].children[0].text,"hasOwnPhoto":defined(heroImage.asset._ref),"bodyCount":count(body)}',
      {slug}, {cache:'no-store'}
    )
    return NextResponse.json({found:Boolean(article),article}, {headers:{'Cache-Control':'no-store'}})
  } catch (error) {
    return NextResponse.json({error:error?.message||'Unknown CMS error'},{status:500,headers:{'Cache-Control':'no-store'}})
  }
}
