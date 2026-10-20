import {createClient} from 'next-sanity'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) throw new Error('SANITY_WRITE_TOKEN fehlt.')

const client = createClient({
  projectId:'90kx3kio', dataset:'production', apiVersion:'2026-08-20',
  useCdn:false, token, perspective:'raw'
})

const articleId='article-knvb-pokal-des-hoppers-liebling-2026'
const fixtureId='calendar-match-de-treffers-heracles-20261029'
const updateKey='boycott-update-heracles-20261020'
const message='Laut Ankündigung aus der Heracles-Fanszene soll das Pokalspiel wegen des auf 200 Tickets begrenzten Gästekontingents und der verpflichtenden Buskombi boykottiert werden.'

const article=await client.getDocument(articleId)
if(!article) throw new Error('KNVB-Pokal-Artikel in Sanity nicht gefunden.')
const body=article.body || []
if(!body.some(block=>block._key===updateKey)) {
  const index=body.findIndex(block => block._type==='block' && (block.children||[]).some(span => String(span.text||'').includes('Der Titelverteidiger der') && String(span.text||'').includes('Blauwe Dennenappel')))
  if(index<0) throw new Error('De-Treffers-Absatz nicht gefunden, kein Artikelinhalt geändert.')
  const note={
    _key:updateKey,_type:'block',style:'normal',markDefs:[],
    children:[
      {_key:updateKey+'-label',_type:'span',text:'UPDATE (20.10.): ',marks:['strong']},
      {_key:updateKey+'-text',_type:'span',text:message,marks:[]}
    ]
  }
  const next=[...body.slice(0,index+1),note,...body.slice(index+1)]
  await client.patch(articleId).ifRevisionId(article._rev).set({body:next}).commit()
  console.log('✓ Artikel: Boykott-Update unter De Treffers eingefügt.')
} else {
  console.log('↷ Artikel: Update bereits vorhanden.')
}

const matches=await client.fetch('*[_type=="calendarMatch" && homeTeam == "De Treffers" && awayTeam == "Heracles Almelo"]{_id,_rev,shortDescription,background,editorialAssessment,article}')
const base=matches.find(match=>!match._id.startsWith('drafts.'))||matches[0]
const updateLabel='UPDATE (20.10.): Laut Ankündigung aus der Heracles-Fanszene Boykott wegen 200 Gästekarten und verpflichtender Buskombi.'
if(base){
  const desc=(base.shortDescription||'De Treffers empfängt Heracles im KNVB-Pokal.').replace(/\\s*UPDATE \\(20\\.10\\.\\):.*$/,'').trim()
  await client.patch(base._id).ifRevisionId(base._rev).set({
    shortDescription:(desc.length+updateLabel.length+1<=300?desc+' '+updateLabel:updateLabel),
    editorialAssessment:[base.editorialAssessment||'', '20.10.: Boykottankündigung aus der Heracles-Fanszene, bislang nicht unabhängig verifiziert.'].filter(Boolean).join('\\n'),
    article:{_type:'reference',_ref:articleId},
    awayFans: 'unclear',
    ticketSituation:'tight'
  }).commit()
  console.log('✓ Vorhandenen Kalender-Tipp aktualisiert: '+base._id)
}else{
  await client.create({
    _id:fixtureId,
    _type:'calendarMatch',
    homeTeam:'De Treffers',
    awayTeam:'Heracles Almelo',
    country:'Niederlande',
    city:'Groesbeek',
    stadium:'Sportpark Zuid',
    sport:'football',
    dateStatus:'confirmed',
    matchDate:'2026-10-29',
    kickoffTime:'20:00',
    categories:['fanszene','seltenes_spiel'],
    priority:2,
    shortDescription:'De Treffers gegen Heracles im KNVB-Pokal. '+updateLabel,
    background:'Pokalspiel bei De Treffers, Gewinner der Blauen Dennenappel 2025/26. Heracles reist als Zweitligist nach Groesbeek.',
    confirmedInfo:'Do., 29.10.2026, 20:00 Uhr. Heimverein: Tickets ausschließlich im Vorverkauf, keine Tageskasse. Quelle: De Treffers, 13.10.2026.',
    editorialAssessment:'20.10.: Boykott laut Ankündigung aus der Heracles-Fanszene wegen nur 200 Gästekarten und verpflichtender Buskombi. Öffentlich noch nicht unabhängig bestätigt; nicht mit einem vollen Gästeblock planen.',
    awayFans:'unclear',
    ticketSituation:'tight',
    lastChecked:'2026-10-20',
    article:{_type:'reference',_ref:articleId},
    sourceUrls:['https://www.detreffers.nl/uitsluitend-kaarten-in-voorverkoop-de-treffers-heracles/']
  })
  console.log('✓ CMS-Kalendertipp De Treffers – Heracles mit Artikel-Link angelegt.')
}
