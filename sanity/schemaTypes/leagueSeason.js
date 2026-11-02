import {defineArrayMember,defineField,defineType} from 'sanity'

const monthOptions = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
  .map((title,i)=>({title,value:i+1}))

export const leagueSeason = defineType({
  name:'leagueSeason',
  title:'Liga-Saison und Spielmonate',
  type:'object',
  fields:[
    defineField({name:'eyebrow',title:'Kleine Überschrift',type:'string',initialValue:'SAISONKALENDER · ERSTE LIGA'}),
    defineField({name:'title',title:'Große Überschrift: typische Saison',type:'string',
      description:'Zum Beispiel: Januar bis August. Keine feste Vorhersage für die nächste Saison.'}),
    defineField({name:'lead',title:'Erklärung für Groundhopper',type:'text',rows:5,
      description:'Wann startet und endet die höchste Liga üblicherweise? Besondere Ausnahmen benennen.'}),
    defineField({name:'peakMonths',title:'Reguläre Spielmonate',type:'array',
      description:'Diese Monate werden in der Leiste als typische Spielmonate hervorgehoben. Kein Garant für einen Spieltag.',
      of:[defineArrayMember({type:'number',options:{list:monthOptions}})]}),
    defineField({name:'fringeMonths',title:'Mögliche Randmonate',type:'array',
      description:'Monate, in denen in manchen Jahren die Liga beginnt oder endet.',
      of:[defineArrayMember({type:'number',options:{list:monthOptions}})]}),
    defineField({name:'nextSeasonNote',title:'Hinweis zur nächsten Saison',type:'text',rows:3}),
    defineField({name:'alternateNote',title:'Andere Wettbewerbe außerhalb der Liga',type:'text',rows:4,
      description:'Pokal, Frauen-, Jugend- oder Siebenerwettbewerbe: Spielformen klar voneinander trennen.'}),
    defineField({name:'scheduleSourceUrl',title:'Spielplan / Saisonarchiv: Link',type:'url',validation:r=>r.uri({scheme:['https']})}),
    defineField({name:'scheduleSourceTitle',title:'Linktext zum Spielplan',type:'string'}),
    defineField({name:'checkedAt',title:'Liga-Saison zuletzt überprüft',type:'date'}),
    defineField({name:'history',title:'Historische Spielzeiten (optional)',type:'array',
      description:'Eröffnungs- und letzte Spieltage. Bei Ausnahmen eine kurze Bemerkung ergänzen.',
      of:[defineArrayMember({name:'leagueSeasonYear',type:'object',fields:[
        defineField({name:'year',title:'Saisonjahr',type:'number',validation:r=>r.required().integer().min(1900).max(2200)}),
        defineField({name:'start',title:'Erster Spieltag (TT.MM.JJJJ)',type:'string',validation:r=>r.required()}),
        defineField({name:'end',title:'Letzter Spieltag (TT.MM.JJJJ)',type:'string',validation:r=>r.required()}),
        defineField({name:'note',title:'Besonderheiten',type:'string'}),
      ],preview:{select:{title:'year',subtitle:'note'}}})]}),
  ],
  preview:{select:{title:'title',subtitle:'nextSeasonNote'}},
})
