import {defineArrayMember,defineField,defineType} from 'sanity'
import {defaultMacauTexts,defaultMacauTips,defaultMacauImageSlots,defaultMacauSources,defaultMacauMapNavigationTip,defaultMacauLrtHighlight} from '../../lib/macauEditableDefaults'
import {defaultMacauLeagueSeason} from '../../lib/leagueSeasonData'

// All fields preserve the current design: only their editorial content changes.
const copyItem = defineArrayMember({
  type:'object',name:'macauCopyEntry',title:'Textblock',
  fields:[
    defineField({name:'key',title:'Technische Zuordnung',type:'string',readOnly:true}),
    defineField({name:'group',title:'Kapitel',type:'string',readOnly:true}),
    defineField({name:'label',title:'Textstelle',type:'string',readOnly:true}),
    defineField({name:'value',title:'Text',type:'text',rows:4,validation:r=>r.required()}),
  ],
  preview:{select:{title:'label',subtitle:'value'}},
})
const urlValidation = r=>r.uri({scheme:['https'],allowRelative:false})
const copyField = (name,title,group)=>defineField({
  name,title,group,type:'array',of:[copyItem],
  description:'Bereits mit den aktuellen Websitetexten gefüllt. Nur den gewünschten Text öffnen und ändern; keine Programmierung nötig.',
})
export const macauEditorialSettings = defineType({
  name:'macauEditorialSettings',title:'Macau bearbeiten',type:'document',
  groups:[
    {name:'intro',title:'01 · Einstieg',default:true},
    {name:'football',title:'02 · Stadien & Spiele'},
    {name:'travel',title:'03 · Anreise & Stadt'},
    {name:'budget',title:'04 · Tipps & Tricks'},
    {name:'images',title:'05 · Bilder'},
    {name:'links',title:'06 · Links & Stand'},
  ],
  fields:[
    defineField({name:'lastReviewed',title:'Zuletzt aktualisiert',type:'date',group:'links'}),
    copyField('introTexts','Titel, Einleitung und Bargeld-Hinweis','intro'),
    copyField('stadiumTexts','Stadien und Canidrome','football'),
    copyField('matchTexts','Spielplanung','football'),
    defineField({name:'leagueSeason',title:'WANN WIRD GESPIELT? · Liga & Saisonkalender',type:'leagueSeason',group:'football',initialValue:()=>defaultMacauLeagueSeason,description:'Hier stehen Spielmonate, Saisontermine, Ausnahmen und die Links. Einmal im Jahr anhand des Spielplans aktualisieren.'}),
    copyField('travelTexts','Anreise und Verkehr','travel'),
    defineField({name:'mapNavigationTip',title:'Karten-Apps & ÖPNV-Navigation (Macau)',type:'text',rows:4,group:'travel',description:'ÖPNV-App-Tipp direkt im Abschnitt Anreise und Verkehr. Nicht alle Google-Maps-Linien gelten als zuverlässig.',initialValue:defaultMacauMapNavigationTip}),
    defineField({name:'lrtHighlight',title:'Highlight · führerlose Hochbahn über Taipa',type:'text',rows:5,group:'travel',description:'Besonderer LRT-Reisetipp im Kapitel Anreise & Verkehr. Auch bei bereits vorhandenen Macau-Dokumenten einfach hier einen eigenen Text eingeben.',initialValue:defaultMacauLrtHighlight}),
    copyField('cityTexts','Stadt und weitere Grounds','travel'),
    copyField('budgetTexts','Einleitung und Hintergrundtipps','budget'),
    defineField({name:'tips',title:'Tipps & Tricks – einzeln bearbeiten oder ergänzen',type:'array',group:'budget',
      description:'Du kannst die Tipps umsortieren, löschen oder neue hinzufügen. Der Aufbau auf der Website bleibt erhalten.',
      of:[defineArrayMember({type:'object',name:'macauBudgetTip',title:'Reisetipp',fields:[
        defineField({name:'title',title:'Überschrift',type:'string',validation:r=>r.required()}),
        defineField({name:'text',title:'Beschreibung',type:'text',rows:5,validation:r=>r.required()}),
        defineField({name:'sourceLabel',title:'Linktext (optional)',type:'string'}),
        defineField({name:'sourceUrl',title:'Linkziel (optional)',type:'url',validation:urlValidation}),
      ],preview:{select:{title:'title',subtitle:'text'}}})],
    }),
    copyField('sourceTexts','Quellen-Hinweis','links'),
    defineField({name:'images',title:'Bilder austauschen und Bildunterschriften anpassen',type:'array',group:'images',
      description:'Bildstelle öffnen, optional ein neues Bild hochladen oder nur die Bildunterschrift ändern. Ohne neuen Upload bleibt das bisherige Foto sichtbar.',
      of:[defineArrayMember({type:'object',name:'macauImageSlot',title:'Bildstelle',fields:[
        defineField({name:'slot',title:'Bildposition (bitte nicht ändern)',type:'string',readOnly:true}),
        defineField({name:'title',title:'Position auf der Seite',type:'string',readOnly:true}),
        defineField({name:'image',title:'Neues Bild – optional',type:'image',options:{hotspot:true}}),
        defineField({name:'alt',title:'Bildbeschreibung (Barrierefreiheit)',type:'string'}),
        defineField({name:'caption',title:'Bildunterschrift',type:'string'}),
      ],preview:{select:{title:'title',subtitle:'caption',media:'image'}}})],
    }),
    defineField({name:'sourceLinks',title:'Quellenlinks und Reise-Links',type:'array',group:'links',
      description:'Link öffnen und die URL oder den sichtbaren Linktext ändern. Die ursprüngliche Zuordnung nicht ändern.',
      of:[defineArrayMember({type:'object',name:'macauLink',title:'Link',fields:[
        defineField({name:'label',title:'Linktext',type:'string',validation:r=>r.required()}),
        defineField({name:'url',title:'Adresse',type:'url',validation:urlValidation}),
        defineField({name:'originalUrl',title:'Technische Zuordnung (nicht ändern)',type:'string',readOnly:true}),
      ],preview:{select:{title:'label',subtitle:'url'}}})],
    }),
  ],
  initialValue:()=>({
    lastReviewed:'2026-11-02',
    introTexts:defaultMacauTexts.filter(x=>x.group==='intro'),
    stadiumTexts:defaultMacauTexts.filter(x=>x.group==='stadien'),
    matchTexts:defaultMacauTexts.filter(x=>x.group==='spiele'),
    leagueSeason:defaultMacauLeagueSeason,
    travelTexts:defaultMacauTexts.filter(x=>x.group==='anreise'),
    mapNavigationTip:defaultMacauMapNavigationTip,
    lrtHighlight:defaultMacauLrtHighlight,
    cityTexts:defaultMacauTexts.filter(x=>x.group==='stadt'),
    budgetTexts:defaultMacauTexts.filter(x=>x.group==='spartipps'),
    sourceTexts:defaultMacauTexts.filter(x=>x.group==='quellen'),
    tips:defaultMacauTips,
    images:defaultMacauImageSlots,
    sourceLinks:defaultMacauSources,
  }),
  preview:{prepare:()=>({title:'Macau – Länderkompass',subtitle:'Texte, Bilder, Links und Tipps bearbeiten'})},
})
