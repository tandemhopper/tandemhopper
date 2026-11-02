import {defineArrayMember,defineField,defineType} from 'sanity'
import {hongkongDefaults} from '../../lib/hongkongGuideData'

const urlRule=rule=>rule.uri({scheme:['http','https'],allowRelative:false})
const item=(name,title,fields)=>defineArrayMember({
  type:'object',name,title,fields,preview:{
    select:{title:'title',name:'name',subtitle:'text',media:'image'},
    prepare:x=>({title:x.title||x.name||title,subtitle:x.subtitle?.slice(0,95),media:x.media}),
  },
})
const text=(name,title,group,rows=4)=>defineField({name,title,type:'text',rows,group})
const str=(name,title)=>defineField({name,title,type:'string'})
const url=(name,title)=>defineField({name,title,type:'url',validation:urlRule})

export const hongkongEditorialSettings=defineType({
 name:'hongkongEditorialSettings',title:'Hongkong bearbeiten',type:'document',
 groups:[
  {name:'intro',title:'01 · Einstieg',default:true},
  {name:'season',title:'02 · Saison & Spielplan'},
  {name:'grounds',title:'03 · Grounds & Fans'},
  {name:'travel',title:'04 · Anreise & Stadt'},
  {name:'tips',title:'05 · Tipps & Tricks'},
  {name:'images',title:'06 · Bilder'},
  {name:'sources',title:'07 · Quellen & Stand'},
 ],
 fields:[
  defineField({name:'eyebrow',title:'Kleiner Titel über Hongkong',type:'string',group:'intro'}),
  defineField({name:'deck',title:'Untertitel beim Hero-Foto',type:'text',rows:3,group:'intro'}),
  defineField({name:'introTitle',title:'Große Einleitungsüberschrift',type:'string',group:'intro'}),
  text('introText','Einleitung (Absätze durch Leerzeile trennen)','intro',9),
  defineField({name:'spotlightTitle',title:'Prominente HKFA-Spielplan-Box: Titel',type:'string',group:'season'}),
  text('spotlightText','HKFA-Spielplan-Box: Beschreibung','season'),
  defineField({name:'spotlightUrl',title:'HKFA-Spielplan-Link',type:'url',validation:urlRule,group:'season'}),
  defineField({name:'leagueSeason',title:'Liga-Saison und 12-Monats-Kalender',type:'leagueSeason',group:'season',
   description:'Pflichtangabe! Die tatsächlichen Liga-Monate und historischen Spielzeiten jährlich überprüfen.'}),
  text('groundIntro','Einleitung zu den Ground-Beschreibungen','grounds'),
  defineField({name:'grounds',title:'Grounds & Stadien – einzeln bearbeiten und sortieren',type:'array',group:'grounds',of:[item('hongkongGround','Stadion',[
    str('name','Name des Grounds'),str('area','Stadtteil'),str('badge','Kleiner Aufhänger'),
    defineField({name:'description',title:'Beschreibung',type:'text',rows:5}),
    str('note','Selbst besuchtes Spiel / Hinweis'),str('imageSlot','Technischer Fotoslot (nicht ändern)'),
    url('source','Quellenlink'),str('sourceLabel','Linktext')
  ])]}),
  defineField({name:'fanTitle',title:'Überschrift Nationalmannschaft & Fanszene',type:'string',group:'grounds'}),
  text('fanText','Nationalmannschaft und Fanszene','grounds',12),
  text('travelIntro','Einleitung Anreise und Verkehr','travel'),
  defineField({name:'travel',title:'Anreise: Shenzhen, Grenze, Flughafen, ÖPNV',type:'array',group:'travel',of:[item('hongkongTravel','Anreisehinweis',[
    str('title','Überschrift'),text('text','Hinweis',null,5),url('source','Quellenlink'),str('sourceLabel','Linktext')
  ])]}),
  defineField({name:'racecourseTitle',title:'Stadt-Hauptüberschrift Happy Valley',type:'string',group:'travel'}),
  text('racecourseText','Happy Valley: Erklärung','travel'),
  defineField({name:'leisure',title:'Sehenswürdigkeiten und andere Sportarten',type:'array',group:'travel',of:[item('hongkongLeisure','Sehenswürdigkeit',[
    str('title','Titel'),defineField({name:'text',title:'Text',type:'text',rows:5}),url('source','Quellenlink'),str('sourceLabel','Linktext')
  ])]}),
  defineField({name:'tips',title:'Tipps & Tricks – einzeln bearbeiten und ergänzen',type:'array',group:'tips',of:[item('hongkongTip','Spartipp',[
    str('title','Überschrift'),defineField({name:'text',title:'Beschreibung',type:'text',rows:5}),url('source','Quellenlink'),str('sourceLabel','Linktext')
  ])]}),
  defineField({name:'images',title:'Originalfotos austauschen oder neue hochladen',type:'array',group:'images',
   description:'Jede Bildposition hat eine feste Slot-Bezeichnung. Ein hochgeladenes Bild überschreibt das Standardfoto. Bildunterschrift und Alternativtext sind unabhängig editierbar.',
   of:[item('hongkongImage','Bildposition',[
    defineField({name:'slot',title:'Bildposition (nicht ändern)',type:'string',readOnly:true}),
    defineField({name:'title',title:'Fotoposition',type:'string',readOnly:true}),
    defineField({name:'image',title:'Originalbild hochladen',type:'image',options:{hotspot:true}}),
    defineField({name:'alt',title:'Bildbeschreibung',type:'string'}),
    defineField({name:'caption',title:'Bildunterschrift',type:'string'}),
    defineField({name:'fallbackUrl',title:'Aktuelles Bild (nicht ändern)',type:'string',readOnly:true}),
   ])],
  }),
  defineField({name:'sourceLinks',title:'Links zu Quellen und weiteren Informationen',type:'array',group:'sources',of:[item('hongkongSource','Quelle',[
    str('label','Linktext'),url('url','URL')
  ])]}),
  defineField({name:'lastReviewed',title:'Zuletzt überprüft',type:'date',group:'sources'}),
 ],
 initialValue:()=>({
  eyebrow:hongkongDefaults.eyebrow,deck:hongkongDefaults.deck,introTitle:hongkongDefaults.introTitle,
  introText:hongkongDefaults.intro.join('\n\n'),
  spotlightTitle:hongkongDefaults.spotlight.title,spotlightText:hongkongDefaults.spotlight.text,spotlightUrl:hongkongDefaults.spotlight.url,
  leagueSeason:hongkongDefaults.leagueSeason,groundIntro:hongkongDefaults.groundIntro,grounds:hongkongDefaults.grounds,
  fanTitle:hongkongDefaults.fanTitle,fanText:hongkongDefaults.fanParagraphs.join('\n\n'),
  travelIntro:hongkongDefaults.travelIntro,travel:hongkongDefaults.travel,
  racecourseTitle:hongkongDefaults.racecourseTitle,racecourseText:hongkongDefaults.racecourseText,
  leisure:hongkongDefaults.leisure,tips:hongkongDefaults.tips,images:hongkongDefaults.images,
  sourceLinks:hongkongDefaults.sources,lastReviewed:'2026-11-02',
 }),
 preview:{prepare:()=>({title:'Hongkong – Länderkompass',subtitle:'Stadien, Spielmonate, Reisetipps & Bilder bearbeiten'})},
})
