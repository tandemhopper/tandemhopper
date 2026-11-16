import crypto from 'node:crypto'
import {createClient} from 'next-sanity'

if (!process.env.SANITY_WRITE_TOKEN) {
  throw new Error('SANITY_WRITE_TOKEN fehlt; keine Veröffentlichung vornehmen.')
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '90kx3kio',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2026-08-20',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  perspective: 'raw',
})

const slug = 'caf-auslosung-groundhopping-tipps-2026-27'
const stamp = '2026-11-16'
const hashKey = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12)
const block = (style, text, id) => ({
  _type: 'block',
  _key: hashKey('caf-nov16:' + id),
  style,
  markDefs: [],
  children: [{_type: 'span', _key: hashKey('caf-span-nov16:' + id), text, marks: []}],
})
const k = (id) => hashKey('caf-nov16:' + id)

const updateBlocks = [
  block('h2', 'Update 16. November: Die ersten Anstoßzeiten stehen fest', 'title'),
  block('normal', 'Für die ersten beiden Gruppenspieltage kommen jetzt die Feinansetzungen. Einige Vereine haben Mitteilungen der CAF erhalten; die weiteren Angaben stammen unter anderem aus Schiedsrichteransetzungen, lokalen Medien und Verbandsinformationen. Zeiten unten immer am Spielort. Vor nicht stornierbaren Buchungen bitte nochmals kontrollieren.', 'intro'),
  block('h3', 'Die ersten konkret angesetzten Spiele', 'games-title'),
  block('normal', '27.11. · 19:00 – AS FAR Rabat – Durban City (Stade Prince Moulay Abdellah, Rabat).', 'asfar-durban'),
  block('normal', '28.11. · 18:00 – Zamalek – Club Africain (Cairo International Stadium, Kairo).', 'zamalek-africain'),
  block('normal', '28.11. · 19:00 – Raja Casablanca – ASKO Kara (Stade Mohammed V, Casablanca).', 'raja-asko'),
  block('normal', '04.12. · 21:00 – MC Alger – Zamalek (Stade Ali Ammar / Ali La Pointe, Algier).', 'mca-zamalek'),
  block('normal', '05.12. · 17:00 – Primeiro de Agosto – Raja Casablanca (Estádio 11 de Novembro, Luanda).', 'primeiro-raja'),
  block('normal', '05.12. · 21:00 – Al Ahly Tripoli – AS FAR Rabat (Tripoli International Stadium, Tripolis). Die in marokkanischen Quellen genannten 19 Uhr sind GMT, nicht libysche Ortszeit.', 'tripoli-far'),
  block('h3', 'Tansania: Sansibar bleibt die große Stadionfrage', 'tanzania-title'),
  block('normal', 'Nach Mitteilung des tansanischen Verbandes ist das New Amaan Complex auf Sansibar derzeit die einzige für diese CAF-Spiele zugelassene Spielstätte des Landes. Das betrifft die Planungen von Young Africans, Simba, Azam und Singida. An einer möglichen Freigabe des Uhuru Stadium in Daressalam wird noch gearbeitet. Deshalb Dar es Salaam oder Sansibar keinesfalls allein aus alten Spielplänen ableiten; die endgültige Stadionfreigabe für jede Partie prüfen.', 'tanzania'),
  block('normal', 'Quellen und weiterführende Meldungen: CAF-Spielkalender (cafonline.com), El Botola vom 15.11. zu Raja und AS FAR, La Presse de Tunisie vom 15.11. zu Zamalek – Club Africain, Al-Ahram vom 15.11. zu MC Alger – Zamalek sowie Soka Letu zur Stadionsituation in Tansania. Ticketkontingente und Gästefanregelungen sind damit noch nicht bestätigt.', 'sources'),
]

function bodyText(node) {
  return node?._type === 'block' ? (node.children || []).map((x) => x.text || '').join('') : ''
}
function replaceText(body, needle, newText) {
  const item = body.find((n) => bodyText(n).includes(needle))
  if (!item || item.children?.length !== 1) {
    console.log('Hinweis: Redaktionell bearbeitete Stelle nicht automatisch ersetzt: ' + needle)
    return
  }
  item.children[0].text = newText
}

async function updateArticle() {
  const document = await client.fetch(
    '*[_type == "article" && slug.current == $slug && !(_id in path("drafts.**"))][0]{_id,_rev,body,title}',
    {slug}
  )
  if (!document?._id || !Array.isArray(document.body)) {
    throw new Error('Veröffentlichten CAF-Artikel nicht gefunden: Sicherheitsabbruch.')
  }

  const body = structuredClone(document.body)
  const ids = new Set(updateBlocks.map((b) => b._key))
  const already = body.some((b) => b._key === k('title'))
  const filtered = body.filter((b) => !ids.has(b._key))

  replaceText(filtered,
    'Die einzelnen Partien sind noch nicht auf konkrete Tage und Uhrzeiten terminiert',
    'Champions League und Confederation Cup haben sechs feste Spieltagsfenster zwischen Ende November und Ende Januar. Inzwischen werden die ersten Partien Schritt für Schritt konkret angesetzt. Bei den übrigen Spielen sowie bei Tickets, Gästekontingenten und Spielorten bleibt Vorsicht angebracht.'
  )
  replaceText(filtered,
    'Welches Spiel am Freitag, Samstag oder Sonntag stattfindet',
    'Einige Spiele der ersten beiden Spieltage haben inzwischen ein konkretes Datum, eine Uhrzeit und einen gemeldeten Spielort. Bei anderen Partien bleibt nur das Spieltagsfenster bekannt. Gerade die tatsächlichen Stadien und Gästefanregelungen bitte vor einer Buchung erneut prüfen.'
  )
  replaceText(filtered,
    'Stand: 28. Oktober 2026. Die folgenden Angaben sind Spieltagsfenster',
    'Stand: 16. November 2026. Die nachfolgenden Gruppenübersichten zeigen weiterhin vor allem die ursprünglichen CAF-Spieltagsfenster. Bereits präzisierte Ansetzungen findet ihr im Update weiter oben. Hervorgehoben sind unsere aktuellen Groundhopping-Empfehlungen.'
  )
  replaceText(filtered,
    'MC Alger – Zamalek am 4.–6. Dezember',
    'MC Alger – Zamalek ist inzwischen für Freitag, 4. Dezember, um 21 Uhr Ortszeit im Stade Ali Ammar (Ali La Pointe) in Algier angesetzt. Das Rückspiel folgt am 22.–24. Januar in Kairo; die genaue Ansetzung steht noch aus.'
  )
  const insertAt = Math.min(4, filtered.length)
  filtered.splice(insertAt, 0, ...updateBlocks)
  await client.patch(document._id).ifRevisionId(document._rev).set({body: filtered}).commit()
  console.log('✓ CAF-Artikel in Sanity gezielt aktualisiert' + (already ? ' (bestehendes Update ersetzt)' : '') + '; vorhandene Bilder und Studio-Edits erhalten.')
}

const fixtures = [
  {home: ['as far', 'far rabat', 'as far rabat', 'far'], away: ['durban city'], date: '2026-11-27', time: '19:00', stadium: 'Stade Prince Moulay Abdellah', city: 'Rabat', source: 'El Botola, 15.11.2026'},
  {home: ['zamalek', 'zamalek sc'], away: ['club africain'], date: '2026-11-28', time: '18:00', stadium: 'Cairo International Stadium', city: 'Kairo', source: 'La Presse de Tunisie, 15.11.2026'},
  {home: ['raja', 'raja casablanca', 'raja club athletic'], away: ['asko kara', 'asko de kara', 'asko'], date: '2026-11-28', time: '19:00', stadium: 'Stade Mohammed V', city: 'Casablanca', source: 'El Botola, 15.11.2026'},
  {home: ['mc alger', 'mouloudia algier', 'mouloudia alger', 'mca'], away: ['zamalek', 'zamalek sc'], date: '2026-12-04', time: '21:00', stadium: 'Stade Ali Ammar (Ali La Pointe)', city: 'Algier', source: 'Al-Ahram, 15.11.2026'},
  {home: ['primeiro de agosto', '1º de agosto', '1 de agosto', 'primeiro'], away: ['raja', 'raja casablanca', 'raja club athletic'], date: '2026-12-05', time: '17:00', stadium: 'Estádio 11 de Novembro', city: 'Luanda', source: 'El Botola, 15.11.2026 (16 Uhr GMT)'},
  {home: ['al ahly tripoli', 'al ahli tripoli', 'al ahly tripolis', 'al ahli tripolis'], away: ['as far', 'far rabat', 'as far rabat', 'far'], date: '2026-12-05', time: '21:00', stadium: 'Tripoli International Stadium', city: 'Tripolis', source: 'El Botola, 15.11.2026 (19 Uhr GMT)'},
]
const norm = (str) => String(str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

async function updateExistingCalendar() {
  const docs = await client.fetch(
    '*[_type == "calendarMatch" && defined(homeTeam) && defined(awayTeam)]{_id,_rev,homeTeam,awayTeam,dateStatus,matchDate,kickoffTime,stadium,city,confirmedInfo}'
  )
  let count = 0
  for (const fix of fixtures) {
    const matching = docs.filter((doc) => fix.home.some((s) => norm(s) === norm(doc.homeTeam))
      && fix.away.some((s) => norm(s) === norm(doc.awayTeam)))
    for (const doc of matching) {
      const confirmedInfo = [doc.confirmedInfo || '', 'CAF-Ansetzung (Stand 16.11.2026): ' + fix.date + ', ' + fix.time + ' Uhr Ortszeit, ' + fix.stadium + '. Quelle: ' + fix.source + '. Ticket- und Gästefanregeln gesondert prüfen.']
        .filter((line, i) => i === 0 || !(doc.confirmedInfo || '').includes('CAF-Ansetzung (Stand 16.11.2026)'))
        .filter(Boolean).join('\n\n')
      await client.patch(doc._id).ifRevisionId(doc._rev).set({
        matchDate: fix.date,
        kickoffTime: fix.time,
        stadium: fix.stadium,
        city: fix.city,
        dateStatus: 'confirmed',
        confirmedInfo,
        lastChecked: stamp,
      }).unset(['dateFrom','dateTo']).commit()
      count += 1
      console.log('✓ Bestehenden Kalendertipp aktualisiert: ' + doc.homeTeam + ' – ' + doc.awayTeam)
    }
  }
  console.log('Kalender: ' + count + ' bestehende Treffer aktualisiert; keine neuen Spiele ohne Redaktionseintrag erfunden.')
}


async function addCuratedCafCalendarTips() {
  // Only genuinely interesting, verifiably dated fixtures, not the whole CAF schedule.
  // Never overwrite an entry created/edited in the Studio.
  const tips = [
    {
      slug: 'zamalek-club-africain-2026-11-28',
      homeTeam: 'Zamalek SC', awayTeam: 'Club Africain', country: 'Ägypten',
      city: 'Kairo', stadium: 'Cairo International Stadium',
      matchDate: '2026-11-28', kickoffTime: '18:00', priority: 3,
      categories: ['fanszene', 'auswaertsfahrt'],
      shortDescription: 'Zwei der größten nordafrikanischen Fanszenen treffen in Kairo aufeinander. Anstoß am Samstag um 18 Uhr Ortszeit.',
      background: 'Gruppenspiel der CAF Champions League. Ein tunesisches Auswärtskontingent ist noch nicht bestätigt; vor einer Reise bitte Zugangsregeln überprüfen.',
      confirmedInfo: '28.11.2026, 18:00 Uhr Ortszeit, Cairo International Stadium. Quellen: La Presse de Tunisie und El Botola, 15.11.2026.',
      sourceUrl: 'https://www.lapresse.tn/2026/11/15/arbitrage-trois-arbitres-internationaux-designes-pour-les-prochaines-affiches-des-clubs-tunisiens/',
    },
    {
      slug: 'raja-asko-2026-11-28',
      homeTeam: 'Raja Casablanca', awayTeam: 'ASKO Kara', country: 'Marokko',
      city: 'Casablanca', stadium: 'Stade Mohammed V',
      matchDate: '2026-11-28', kickoffTime: '19:00', priority: 2,
      categories: ['fanszene'],
      shortDescription: 'Raja in der CAF-Gruppenphase im Mohammed V – eine der interessanten nordafrikanischen Kurven, allerdings mit offenen Fanfragen.',
      background: 'CAF Confederation Cup. Der Termin ist über die Schiedsrichteransetzungen bekannt. Ob die aktive Raja-Szene anwesend sein wird, muss noch geklärt werden.',
      confirmedInfo: '28.11.2026, 19:00 Uhr Ortszeit, Stade Mohammed V. Quelle: El Botola vom 15.11.2026. Gästefanregelung und Ticketverkauf noch offen.',
      sourceUrl: 'https://m.elbotola.com/fr/article/2026-11-15-13-51-39.html',
    },
    {
      slug: 'mc-alger-zamalek-2026-12-04',
      homeTeam: 'MC Alger', awayTeam: 'Zamalek SC', country: 'Algerien',
      city: 'Algier', stadium: 'Stade Ali Ammar (Ali La Pointe)',
      matchDate: '2026-12-04', kickoffTime: '21:00', priority: 3,
      categories: ['fanszene', 'auswaertsfahrt'],
      shortDescription: 'Eines der stärksten CAF-Duelle für Fanszenen: Mouloudia Algier empfängt Zamalek, jetzt Freitag um 21 Uhr terminiert.',
      background: 'CAF Champions League, zweiter Gruppenspieltag. Die Anstoßzeit stammt aus einer offiziellen Spielbenachrichtigung an Zamalek. Ticket- und Gästefaninfos stehen noch aus.',
      confirmedInfo: '04.12.2026, 21:00 Uhr algerische Ortszeit, Stade Ali Ammar. Quellen: Al-Ahram und Al-Watan Sport vom 15.11.2026.',
      sourceUrl: 'https://gate.ahram.org.eg/News/5985107.aspx',
    },
  ]

  let created = 0
  for (const tip of tips) {
    const id = 'calendar-caf-' + tip.slug
    const existing = await client.getDocument(id)
    if (existing) {
      console.log('↷ Vorhandenen kuratierten CAF-Tipp nicht überschrieben: ' + tip.slug)
      continue
    }
    const {slug: ignored, sourceUrl, ...fields} = tip
    const doc = {
      _id: id,
      _type: 'calendarMatch',
      ...fields,
      dateStatus: 'confirmed',
      internationalCompetition: true,
      regions: ['nordafrika'],
      sport: 'football',
      awayFans: 'unclear',
      ticketSituation: 'unknown',
      editorialAssessment: 'Besonders interessant für Groundhopper, aber keine Garantie für Gästefans. Kurzfristige Stadion- und Ticketänderungen beachten.',
      lastChecked: '2026-11-16',
      sources: [{_type: 'object', _key: hashKey(id + ':source'), type: 'local_media', url: sourceUrl, note: 'Anstoßzeit und Stadion, Stand 16.11.2026'}],
    }
    await client.createIfNotExists(doc)
    created++
    console.log('✓ CAF-Kalendertipp neu angelegt: ' + fields.homeTeam + ' – ' + fields.awayTeam)
  }
  console.log('Kalender: ' + created + ' zusätzliche, geprüfte CAF-Highlights angelegt.')
}

await updateArticle()
await updateExistingCalendar()
await addCuratedCafCalendarTips()
console.log('CAF-Abgleich beendet.')
