import {defineField,defineType} from 'sanity'

export const countryComment = defineType({
  name:'countryComment',
  title:'Community-Kommentar',
  type:'document',
  groups:[
    {name:'comment',title:'Leserbeitrag',default:true},
    {name:'answer',title:'Deine Antwort'},
  ],
  fields:[
    defineField({
      name:'countrySlug',title:'Länderführer',type:'string',readOnly:true,group:'comment',
      description:'Wird beim Einsenden automatisch zugeordnet.',
      validation:rule=>rule.required(),
    }),
    defineField({
      name:'author',title:'Name / Pseudonym',type:'string',group:'comment',
      validation:rule=>rule.required().min(2).max(60),
    }),
    defineField({
      name:'category',title:'Thema',type:'string',group:'comment',
      options:{list:[
        {title:'Ergänzung / Reisetipp',value:'tipp'},
        {title:'Korrektur / Ungenauigkeit',value:'korrektur'},
        {title:'Frage',value:'frage'},
        {title:'Stadion / Spielplanung',value:'fussball'},
        {title:'Sonstiges',value:'sonstiges'},
      ]},
    }),
    defineField({
      name:'message',title:'Leserkommentar',type:'text',rows:6,group:'comment',
      validation:rule=>rule.required().min(10).max(1800),
    }),
    defineField({name:'submittedAt',title:'Eingegangen am',type:'datetime',readOnly:true,group:'comment'}),
    defineField({
      name:'editorReply',title:'Antwort von Tandemhopper',type:'text',rows:6,group:'answer',
      description:'Diese Antwort erscheint nach dem Veröffentlichen direkt unter dem Kommentar. Auch eine spätere Änderung erneut veröffentlichen.',
      validation:rule=>rule.max(2000),
    }),
    defineField({
      name:'editorReplyUpdatedAt',title:'Antwort zuletzt aktualisiert',type:'datetime',group:'answer',
      description:'Optional. Wenn leer, zeigt die Website kein gesondertes Antwortdatum.',
    }),
  ],
  orderings:[{
    title:'Neueste zuerst',name:'submittedDesc',
    by:[{field:'submittedAt',direction:'desc'}],
  }],
  preview:{
    select:{author:'author',message:'message',country:'countrySlug',category:'category'},
    prepare:({author,message,country,category})=>({
      title:author||'Neuer Kommentar',
      subtitle:[country?.toUpperCase(),category,message?.slice(0,90)].filter(Boolean).join(' · '),
    }),
  },
})
