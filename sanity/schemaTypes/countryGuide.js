import {defineArrayMember, defineField, defineType} from 'sanity'

const richText = [
  defineArrayMember({type: 'block'}),
  defineArrayMember({type: 'image', options: {hotspot: true}, fields: [
    defineField({name: 'alt', title: 'Alternativtext', type: 'string'}),
    defineField({name: 'caption', title: 'Bildunterschrift', type: 'string'}),
  ]}),
]

export const countryGuide = defineType({
  name: 'countryGuide',
  title: 'Länderkompass · Land',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Land', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'URL', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'continent', title: 'Kontinent', type: 'string', options: {list: [
      {title:'Europa',value:'europa'}, {title:'Asien',value:'asien'}, {title:'Afrika',value:'afrika'},
      {title:'Nordamerika',value:'nordamerika'}, {title:'Südamerika',value:'suedamerika'}, {title:'Ozeanien',value:'ozeanien'},
    ]}, validation: r => r.required()}),
    defineField({name: 'region', title: 'Region (für spätere Filter)', type: 'string', description: 'Zum Beispiel Balkan, Westeuropa oder Nordeuropa.'}),
    defineField({name: 'flag', title: 'Flaggen-Emoji', type: 'string'}),
    defineField({name:'fifaRanking',title:'FIFA-Weltranglistenplatz (Männer)',type:'number',validation:r=>r.min(1).max(250)}),
    defineField({name:'fifaRankingDate',title:'Stand der FIFA-Weltrangliste',type:'date'}),
    defineField({name: 'teaser', title: 'Text auf der Länder-Kachel', type: 'text', rows: 2, validation: r => r.max(160)}),
    defineField({name: 'heroImage', title: 'Titelbild', type: 'image', options: {hotspot: true}, fields: [
      defineField({name:'alt',title:'Alternativtext',type:'string'}),
      defineField({name:'caption',title:'Bildunterschrift',type:'string'}),
    ]}),
    defineField({name: 'tileImage', title: 'Optional: separates Kachelbild', type: 'image', options: {hotspot: true}}),
    defineField({name: 'intro', title: 'Einleitung', type: 'array', of: richText}),
    defineField({name:'leagueSeason',title:'PFLICHT: Wann läuft die Liga? / Spielmonate',type:'leagueSeason',description:'Für jeden neuen Länderführer die höchste Liga recherchieren: typische Saisonmonate, letzte Spielzeiten und verlässlicher Spielplanlink. Nicht mit Pokal- oder Jugendwettbewerben verwechseln.',validation:r=>r.required()}),
    defineField({name: 'essentials', title: 'Das Wichtigste auf einen Blick', type: 'array', of: [{type:'string'}]}),
    defineField({name: 'sections', title: 'Themenbereiche', type: 'array', of: [
      defineArrayMember({type:'object', name:'guideSection', fields: [
        defineField({name:'topic',title:'Thema',type:'string',options:{list:[
          {title:'Fußball & Tickets',value:'tickets'}, {title:'Fanszenen & Spiele',value:'fanszenen'},
          {title:'Anreise & Einreise',value:'einreise'}, {title:'Verkehr',value:'verkehr'},
          {title:'Tipps & Tricks',value:'tipps'}, {title:'Weitere Informationen',value:'weiteres'},
        ]},validation:r=>r.required()}),
        defineField({name:'heading',title:'Optionale eigene Überschrift',type:'string'}),
        defineField({name:'content',title:'Text und Bilder',type:'array',of:richText}),
        defineField({name:'tip',title:'Tandemhopper-Tipp (optional)',type:'text',rows:3}),
        defineField({name:'presentation',title:'Darstellung',type:'string',initialValue:'standard',options:{layout:'radio',list:[{title:'Normaler Abschnitt',value:'standard'},{title:'Aufklappbarer Abschnitt',value:'accordion'},{title:'Kompakte Karte (zwei nebeneinander)',value:'card'}]}}),
        defineField({name:'notice',title:'Hinweisbox (optional)',type:'object',fields:[
          defineField({name:'level',title:'Art',type:'string',options:{list:[{title:'Wichtig',value:'important'},{title:'Aktueller Stand',value:'update'},{title:'Gut zu wissen',value:'info'}]}}),
          defineField({name:'title',title:'Titel',type:'string'}),
          defineField({name:'text',title:'Hinweistext',type:'text',rows:3}),
        ]}),
        defineField({name:'sources',title:'Quellen und nützliche Links',type:'array',of:[
          defineArrayMember({type:'object',fields:[
            defineField({name:'label',title:'Bezeichnung',type:'string'}),
            defineField({name:'url',title:'Link',type:'url',validation:r=>r.uri({scheme:['https']})}),
          ]}),
        ]}),
      ],preview:{select:{title:'heading',subtitle:'topic'}}}),
    ]}),
    defineField({name:'checkedAt',title:'Zuletzt überprüft',type:'date'}),
  ],
  preview: {select:{title:'title',subtitle:'continent',media:'heroImage'}},
})
