import {defineField,defineType} from 'sanity'

export const flightRoutesSettings=defineType({
  name:'flightRoutesSettings',
  title:'Flugrouten-Special: Titelbild',
  type:'document',
  fields:[
    defineField({name:'heroImage',title:'Titelbild hochladen',description:'Erscheint oben im interaktiven Flugrouten-Artikel und auf der Karte unter Kurzmeldungen.',type:'image',options:{hotspot:true},fields:[
      defineField({name:'alt',title:'Alternativtext',type:'string'}),
      defineField({name:'caption',title:'Bildunterschrift',type:'string'})
    ]})
  ],
  preview:{prepare:()=>({title:'Flugrouten-Special – Titelbild'})}
})
