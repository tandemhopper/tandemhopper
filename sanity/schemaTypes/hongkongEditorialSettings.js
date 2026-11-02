import {defineArrayMember,defineField,defineType} from 'sanity'
import {defaultHongkongTexts,defaultHongkongImages,defaultHongkongMatches,defaultHongkongTips,defaultHongkongSources,defaultHongkongLeagueSeason} from '../../lib/hongkongEditableDefaults'

const textEntry=defineArrayMember({
 name:'hongkongCopyEntry',type:'object',title:'Textblock',fields:[
  defineField({name:'key',title:'Interne Textstelle',type:'string',readOnly:true}),
  defineField({name:'group',title:'Kapitel',type:'string',readOnly:true}),
  defineField({name:'label',title:'Welche Textstelle?',type:'string',readOnly:true}),
  defineField({name:'value',title:'Text (im Artikel sichtbar)',type:'text',rows:5,validation:r=>r.required()}),
 ],preview:{select:{title:'label',subtitle:'value'}},
})
const copyField=(name,title,group)=>defineField({name,title,group,type:'array',of:[textEntry],description:'Textstelle öffnen, Text anpassen und veröffentlichen. Die Gestaltung der Website bleibt unverändert.'})
const urlRule=r=>r.uri({scheme:['https'],allowRelative:false})
export const hongkongEditorialSettings=defineType({
 name:'hongkongEditorialSettings',title:'Hongkong bearbeiten',type:'document',
 groups:[
  {name:'intro',title:'01 · Titel & Einstieg',default:true},
  {name:'football',title:'02 · Spiele & Saisons'},
  {name:'grounds',title:'03 · Stadien & Grounds'},
  {name:'fans',title:'04 · Nationalmannschaft & Fans'},
  {name:'travel',title:'05 · Anreise, ÖPNV, Stadt'},
  {name:'tips',title:'06 · Tipps & Tricks'},
  {name:'images',title:'07 · Fotos & Bildtexte'},
  {name:'links',title:'08 · Quellen & Stand'},
 ],
 fields:[
  copyField('introTexts','Einleitung & wichtigste Hinweise','intro'),
  copyField('footballTexts','Saison, Spielplanung, Wochenendspiele','football'),
  defineField({name:'leagueSeason',title:'Wann läuft die Liga? · Saisonkalender',type:'leagueSeason',group:'football',initialValue:()=>defaultHongkongLeagueSeason,description:'Spielmonate und historische Daten jedes Jahr mit offizieller HKFA-Spielplanquelle prüfen.'}),
  defineField({name:'matches',title:'Eigene Groundbesuche und Ergebnisse',type:'array',group:'football',of:[
    defineArrayMember({type:'object',name:'hongkongMatch',fields:[
      defineField({name:'date',title:'Datum (JJJJ-MM-TT)',type:'date',validation:r=>r.required()}),
      defineField({name:'ground',title:'Ground',type:'string',validation:r=>r.required()}),
      defineField({name:'home',title:'Heim',type:'string',validation:r=>r.required()}),
      defineField({name:'away',title:'Gast',type:'string',validation:r=>r.required()}),
      defineField({name:'score',title:'Ergebnis',type:'string'}),
      defineField({name:'kind',title:'Wettbewerb / Spielart',type:'string'}),
    ],preview:{select:{title:'ground',subtitle:'date'}}}),
  ]}),
  copyField('groundsTexts','Stadien, Rennbahn & kleinere Grounds','grounds'),
  copyField('fansTexts','Nationalmannschaft und Fankultur','fans'),
  copyField('travelTexts','Shenzhen, Grenzkontrollen, ÖPNV, SIM','travel'),
  copyField('cityTexts','Stadt, The Peak, Pferderennen','travel'),
  copyField('tipsTexts','Tipps & Tricks: Einleitung','tips'),
  defineField({name:'tips',title:'Spartipps – bearbeiten, sortieren, hinzufügen',type:'array',group:'tips',
    of:[defineArrayMember({type:'object',name:'hongkongBudgetTip',fields:[
      defineField({name:'title',title:'Überschrift',type:'string',validation:r=>r.required()}),
      defineField({name:'text',title:'Beschreibung',type:'text',rows:5,validation:r=>r.required()}),
      defineField({name:'sourceLabel',title:'Linkbeschriftung (optional)',type:'string'}),
      defineField({name:'sourceUrl',title:'Link-URL (optional)',type:'url',validation:urlRule}),
    ],preview:{select:{title:'title',subtitle:'text'}}})],
  }),
  defineField({name:'images',title:'Originalfotos austauschen & Bildunterschriften ändern',type:'array',group:'images',
    description:'Bildstelle öffnen: optional neues Bild hochladen oder nur den Text ändern. Ohne Upload bleibt das aktuelle Tandemhopper-Foto sichtbar.',
    of:[defineArrayMember({type:'object',name:'hongkongImageSlot',fields:[
      defineField({name:'slot',title:'Bildposition (nicht ändern)',type:'string',readOnly:true}),
      defineField({name:'title',title:'Position im Artikel',type:'string',readOnly:true}),
      defineField({name:'image',title:'Bild ersetzen (optional)',type:'image',options:{hotspot:true}}),
      defineField({name:'alt',title:'Bildbeschreibung',type:'string'}),
      defineField({name:'caption',title:'Bildunterschrift',type:'string'}),
    ],preview:{select:{title:'title',subtitle:'caption',media:'image'}}})],
  }),
  copyField('sourcesTexts','Quellen & Aktualität: Text','links'),
  defineField({name:'sourceLinks',title:'Links – Anzeigename & URL ändern',type:'array',group:'links',
    of:[defineArrayMember({type:'object',name:'hongkongLink',fields:[
      defineField({name:'label',title:'Linktext',type:'string',validation:r=>r.required()}),
      defineField({name:'url',title:'Adresse',type:'url',validation:urlRule}),
      defineField({name:'originalUrl',title:'Interne Zuordnung (nicht ändern)',type:'string',readOnly:true}),
    ],preview:{select:{title:'label',subtitle:'url'}}})],
  }),
  defineField({name:'lastReviewed',title:'Redaktionell überprüft am',type:'date',group:'links'}),
 ],
 initialValue:()=>({
  introTexts:defaultHongkongTexts.filter(x=>x.group==='intro'),
  footballTexts:defaultHongkongTexts.filter(x=>x.group==='football'),
  leagueSeason:defaultHongkongLeagueSeason,
  matches:defaultHongkongMatches,
  groundsTexts:defaultHongkongTexts.filter(x=>x.group==='grounds'),
  fansTexts:defaultHongkongTexts.filter(x=>x.group==='fans'),
  travelTexts:defaultHongkongTexts.filter(x=>x.group==='travel'),
  cityTexts:defaultHongkongTexts.filter(x=>x.group==='city'),
  tipsTexts:defaultHongkongTexts.filter(x=>x.group==='tips'),
  tips:defaultHongkongTips,
  images:defaultHongkongImages,
  sourcesTexts:defaultHongkongTexts.filter(x=>x.group==='sources'),
  sourceLinks:defaultHongkongSources,
  lastReviewed:'2026-11-02',
 }),
 preview:{prepare:()=>({title:'Hongkong · Länderkompass',subtitle:'Texte, Stadien, Bilder, Tipps, Saisons und Links bearbeiten'})},
})
