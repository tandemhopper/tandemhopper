import { NextResponse } from 'next/server'
import { sanityClient } from '../../lib/sanity'

export async function GET(){
  const result = await sanityClient.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{url, originalFilename}`,
    { filename: 'IMG_20260822_194618.jpg' },
    { cache: 'no-store' }
  )
  return NextResponse.json(result || null)
}
