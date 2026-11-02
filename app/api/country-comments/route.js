import {createHmac, randomBytes, randomUUID, timingSafeEqual} from 'node:crypto'
import {createClient} from 'next-sanity'
import {NextResponse} from 'next/server'
import {getCountryGuide} from '../../../lib/countryGuides'
import {sanityClient} from '../../../lib/sanity'

export const runtime='nodejs'
export const dynamic='force-dynamic'

const PROJECT_ID='90kx3kio'
const DATASET='production'
const API_VERSION='2026-08-20'
const PAGE_SIZE=30
const allowedCategories=new Set(['tipp','korrektur','frage','fussball','sonstiges'])
const recentAttempts=new Map()

const validSlug=slug=>typeof slug==='string'&&slug.length<=80&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
const cleanText=(input,max)=>typeof input==='string'
  ? input.normalize('NFC').replace(/\r\n?/g,'\n').trim().slice(0,max+1)
  : ''

function signature(value,secret){
  return createHmac('sha256',secret).update('tandemhopper-community-v1:'+value).digest('hex')
}
function makeChallenge(slug,secret){
  const payload=[slug,Date.now(),randomBytes(12).toString('hex')].join('.')
  return payload+'.'+signature(payload,secret)
}
function verifyChallenge(value,slug,secret){
  if(typeof value!=='string'||value.length>240)return false
  const parts=value.split('.')
  if(parts.length!==4||parts[0]!==slug||!/^[0-9]{13}$/.test(parts[1])||!/^[0-9a-f]{24}$/.test(parts[2])||!/^[0-9a-f]{64}$/.test(parts[3]))return false
  const payload=parts.slice(0,3).join('.')
  const expected=Buffer.from(signature(payload,secret),'hex')
  const received=Buffer.from(parts[3],'hex')
  if(!timingSafeEqual(expected,received))return false
  const age=Date.now()-Number(parts[1])
  return age>=5000&&age<7200000
}
const respond=(data,status=200)=>NextResponse.json(data,{status,headers:{'Cache-Control':'no-store'}})

export async function GET(request){
  const params=new URL(request.url).searchParams
  const slug=params.get('country')||''
  if(!validSlug(slug))return respond({error:'Ungültiges Land.'},400)
  const offset=Math.min(3000,Math.max(0,Number.parseInt(params.get('offset')||'0',10)||0))
  const end=offset+PAGE_SIZE
  try{
    // No draft documents are queried. Public readers only see published comments.
    const filter='*[_type == "countryComment" && countrySlug == $slug && !(_id in path("drafts.**"))]'
    const [comments,total]=await Promise.all([
      sanityClient.fetch(`${filter} | order(submittedAt desc) [${offset}...${end}]{_id,author,category,message,submittedAt,editorReply,editorReplyUpdatedAt}`,{slug},{cache:'no-store'}),
      sanityClient.fetch(`count(${filter})`,{slug},{cache:'no-store'}),
    ])
    const secret=process.env.SANITY_COMMENT_WRITE_TOKEN||''
    return respond({
      comments:comments||[],
      total:total||0,
      nextOffset:end<(total||0)?end:null,
      enabled:Boolean(secret),
      challenge:secret?makeChallenge(slug,secret):null,
    })
  }catch(error){
    console.error('Country comments query failed:',error)
    return respond({error:'Die Kommentare können derzeit nicht geladen werden.'},503)
  }
}

export async function POST(request){
  const secret=process.env.SANITY_COMMENT_WRITE_TOKEN
  if(!secret)return respond({error:'Die Kommentarfunktion ist derzeit noch nicht freigeschaltet.'},503)
  const expectedOrigin=new URL(request.url).origin
  const origin=request.headers.get('origin')
  if(origin && origin!==expectedOrigin)return respond({error:'Anfrage nicht erlaubt.'},403)
  const size=Number(request.headers.get('content-length')||0)
  if(size>15000)return respond({error:'Der Beitrag ist zu lang.'},413)

  let input
  try{input=await request.json()}catch{return respond({error:'Ungültige Anfrage.'},400)}
  if(!input||typeof input!=='object'||Array.isArray(input))return respond({error:'Ungültige Anfrage.'},400)
  const slug=input.country
  if(!validSlug(slug))return respond({error:'Ungültiges Land.'},400)
  // A filled honeypot is discarded without storing visitor data.
  if(input.website)return respond({ok:true,message:'Danke! Dein Beitrag wird nach Prüfung veröffentlicht.'},201)
  if(!verifyChallenge(input.challenge,slug,secret))return respond({error:'Bitte lade die Seite neu und versuche es erneut.'},400)

  const author=cleanText(input.author,60)
  const message=cleanText(input.message,1800)
  const category=allowedCategories.has(input.category)?input.category:'sonstiges'
  if(author.length<2||author.length>60||message.length<10||message.length>1800||input.consent!==true){
    return respond({error:'Bitte gib einen Namen und einen Kommentar ein und bestätige die Veröffentlichung.'},400)
  }
  if(/(?:https?:\/\/|www\.)/gi.test(message)&&[...message.matchAll(/(?:https?:\/\/|www\.)/gi)].length>2){
    return respond({error:'Bitte höchstens zwei Links in einem Kommentar verwenden.'},400)
  }

  // Best-effort cooldown. Does not replace infrastructure-level anti-abuse protections.
  const ip=(request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim()
  const ipKey=signature(ip,secret).slice(0,24)
  const now=Date.now()
  for(const [key,value] of recentAttempts)if(now-value.last>1200000)recentAttempts.delete(key)
  const previous=recentAttempts.get(ipKey)
  if(previous && (now-previous.last<20000||(previous.count>=3&&now-previous.first<1200000))){
    return respond({error:'Zu viele Beiträge hintereinander. Bitte versuche es später erneut.'},429)
  }
  try{
    const country=await getCountryGuide(slug)
    if(!country)return respond({error:'Dieser Länderführer existiert nicht.'},404)
    const client=createClient({projectId:PROJECT_ID,dataset:DATASET,apiVersion:API_VERSION,useCdn:false,token:secret})
    const id='drafts.countryComment.'+randomUUID()
    await client.create({
      _id:id,
      _type:'countryComment',
      countrySlug:slug,
      author,
      category,
      message,
      submittedAt:new Date().toISOString(),
    })
    recentAttempts.set(ipKey,{
      first:previous&&now-previous.first<1200000?previous.first:now,
      last:now,
      count:previous&&now-previous.first<1200000?previous.count+1:1,
    })
    return respond({ok:true,message:'Vielen Dank! Dein Kommentar ist eingegangen und erscheint nach der Freigabe.'},201)
  }catch(error){
    console.error('Country comment submission failed:',error)
    return respond({error:'Das Absenden hat gerade nicht funktioniert. Bitte versuche es später erneut.'},503)
  }
}
