import {defineArrayMember, defineField, defineType} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Geschichte',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL / Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Spielbericht', value: 'spielbericht'},
          {title: 'Fankultur / Kurzmeldung', value: 'fankultur'},
          {title: 'Ground', value: 'grounds'},
          {title: 'Reise', value: 'reisen'},
          {title: 'Verein', value: 'verein'},
          {title: 'Derby', value: 'derby'},
          {title: 'Spieler', value: 'spieler'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Kleine Kategoriezeile',
      description: 'Zum Beispiel „Regionalliga Südwest“, „Fankultur“ oder „Fußballreisen“.',
      type: 'string',
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Veröffentlichungsdatum',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Im Startseiten-Hero anzeigen',
      description: 'Ausgewählte Beiträge laufen im großen Aufmacher der Startseite durch. Bis zu sechs sind sinnvoll.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Position im Startseiten-Hero',
      description: '1 steht zuerst. Bei gleicher Position entscheidet das Veröffentlichungsdatum.',
      type: 'number',
      hidden: ({document}) => !document?.featured,
      validation: (rule) => rule.integer().min(1).max(6),
    }),
    defineField({
      name: 'heroImage',
      title: 'Titelbild',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alternativtext', type: 'string'}),
        defineField({name: 'caption', title: 'Bildunterschrift', type: 'string'}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'match',
      title: 'Spielinformationen',
      type: 'object',
      hidden: ({document}) => document?.category !== 'spielbericht',
      fields: [
        defineField({name: 'homeTeam', title: 'Heimteam', type: 'string'}),
        defineField({name: 'awayTeam', title: 'Auswärtsteam', type: 'string'}),
        defineField({name: 'competition', title: 'Wettbewerb / Liga', type: 'string'}),
        defineField({name: 'matchday', title: 'Spieltag / Runde', type: 'string'}),
        defineField({name: 'matchDate', title: 'Spieldatum', type: 'date'}),
        defineField({name: 'stadium', title: 'Stadion', type: 'string'}),
        defineField({name: 'attendance', title: 'Zuschauer', type: 'string'}),
        defineField({name: 'result', title: 'Ergebnis', type: 'string'}),
      ],
    }),
    defineField({
      name: 'place',
      title: 'Ort & Land',
      type: 'object',
      fields: [
        defineField({name: 'city', title: 'Ort', type: 'string'}),
        defineField({name: 'country', title: 'Land', type: 'string'}),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Artikel',
      description: 'Text und Fotobausteine können frei gemischt werden.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Zwischenüberschrift', value: 'h2'},
            {title: 'Kleine Zwischenüberschrift', value: 'h3'},
            {title: 'Zitat', value: 'blockquote'},
          ],
          lists: [
            {title: 'Aufzählung', value: 'bullet'},
            {title: 'Nummeriert', value: 'number'},
          ],
        }),
        defineArrayMember({
          type: 'image',
          title: 'Großes Einzelbild',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alternativtext', type: 'string'}),
            defineField({name: 'caption', title: 'Bildunterschrift', type: 'string'}),
            defineField({
              name: 'width',
              title: 'Darstellung',
              type: 'string',
              initialValue: 'wide',
              options: {
                list: [
                  {title: 'Breit', value: 'wide'},
                  {title: 'Im Text', value: 'text'},
                ],
                layout: 'radio',
              },
            }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'imagePair',
          title: 'Zwei Bilder nebeneinander',
          fields: [
            defineField({name: 'left', title: 'Bild links', type: 'image', options: {hotspot: true}}),
            defineField({name: 'right', title: 'Bild rechts', type: 'image', options: {hotspot: true}}),
            defineField({name: 'caption', title: 'Gemeinsame Bildunterschrift', type: 'string'}),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'gallery',
          title: 'Galerie / Fotostrecke',
          fields: [
            defineField({name: 'title', title: 'Galerie-Titel', type: 'string', initialValue: 'Fotostrecke'}),
            defineField({
              name: 'images',
              title: 'Bilder',
              type: 'array',
              options: {layout: 'grid'},
              of: [
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({name: 'alt', title: 'Alternativtext', type: 'string'}),
                    defineField({name: 'caption', title: 'Bildunterschrift', type: 'string'}),
                  ],
                }),
              ],
              validation: (rule) => rule.min(2),
            }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'factBox',
          title: 'Faktenkasten',
          fields: [
            defineField({name: 'title', title: 'Überschrift', type: 'string'}),
            defineField({
              name: 'items',
              title: 'Fakten',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'label', title: 'Begriff', type: 'string'}),
                    defineField({name: 'value', title: 'Wert', type: 'string'}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Schlagwörter',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-Beschreibung',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'publishedAt',
      media: 'heroImage',
    },
    prepare({title, category, date, media}) {
      const d = date ? new Date(date).toLocaleDateString('de-DE') : ''
      return {
        title,
        subtitle: [category, d].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
