import {defineArrayMember, defineField, defineType} from 'sanity'

export const calendarMatch = defineType({
  name: 'calendarMatch',
  title: 'Spieltipp',
  type: 'document',
  fields: [
    defineField({
      name: 'homeTeam',
      title: 'Heimteam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'awayTeam',
      title: 'Auswärtsteam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      description: 'Wird für den öffentlichen Kalenderfilter verwendet.',
      type: 'string',
      options: {
        list: [
          {title: 'Europa', value: 'europe'},
          {title: 'Afrika', value: 'africa'},
          {title: 'Asien', value: 'asia'},
          {title: 'Südamerika', value: 'south_america'},
          {title: 'Nord- & Mittelamerika', value: 'north_central_america'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'city', title: 'Stadt / Ort', type: 'string'}),
    defineField({name: 'stadium', title: 'Stadion', type: 'string'}),
    defineField({
      name: 'dateStatus',
      title: 'Terminstatus',
      type: 'string',
      initialValue: 'confirmed',
      options: {
        list: [
          {title: 'Fix terminiert', value: 'confirmed'},
          {title: 'Datum / Uhrzeit noch TBC', value: 'tbc'},
          {title: 'Nur Zeitraum bekannt', value: 'window'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'matchDate',
      title: 'Spieldatum',
      type: 'date',
      hidden: ({document}) => document?.dateStatus === 'window',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.dateStatus !== 'window' && !value) return 'Bitte ein Datum eintragen.'
        return true
      }),
    }),
    defineField({
      name: 'kickoffTime',
      title: 'Anstoßzeit',
      description: 'Format zum Beispiel 20:45. Leer lassen, wenn noch nicht bekannt.',
      type: 'string',
      hidden: ({document}) => document?.dateStatus === 'window',
      validation: (rule) => rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {name: 'Uhrzeit', invert: false}).warning('Bitte möglichst im Format HH:MM eintragen.'),
    }),
    defineField({
      name: 'dateFrom',
      title: 'Zeitraum von',
      type: 'date',
      hidden: ({document}) => document?.dateStatus !== 'window',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.dateStatus === 'window' && !value) return 'Bitte den Beginn des Zeitraums eintragen.'
        return true
      }),
    }),
    defineField({
      name: 'dateTo',
      title: 'Zeitraum bis',
      type: 'date',
      hidden: ({document}) => document?.dateStatus !== 'window',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.dateStatus === 'window' && !value) return 'Bitte das Ende des Zeitraums eintragen.'
        return true
      }),
    }),
    defineField({
      name: 'categories',
      title: 'Warum ist das Spiel interessant?',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Fanszene', value: 'fanszene'},
          {title: 'Rivalität', value: 'rivalitaet'},
          {title: 'Große Auswärtsfahrt', value: 'auswaertsfahrt'},
          {title: 'Besonderer Anlass', value: 'anlass'},
          {title: 'Unter dem Radar', value: 'unter_dem_radar'},
        ],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'priority',
      title: 'Priorität',
      description: '1 = interessant · 2 = klare Empfehlung · 3 = Highlight',
      type: 'number',
      initialValue: 2,
      options: {
        list: [
          {title: '1 – interessant', value: 1},
          {title: '2 – klare Empfehlung', value: 2},
          {title: '3 – Highlight', value: 3},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().integer().min(1).max(3),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kurzbegründung',
      description: 'Warum gehört genau dieses Spiel in den Kalender? Maximal 300 Zeichen.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'background',
      title: 'Hintergrund',
      description: 'Optional: etwas ausführlicher erklären, warum die Partie interessant ist.',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'confirmedInfo',
      title: 'Bestätigte Informationen',
      description: 'Belegte Fakten, zum Beispiel Gästekontingent, Fanmarsch oder Verkaufsstatus.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'editorialAssessment',
      title: 'Unsere Einschätzung',
      description: 'Redaktionelle Einschätzung klar getrennt von bestätigten Fakten.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'awayFans',
      title: 'Gästefans',
      type: 'string',
      options: {
        list: [
          {title: 'Zugelassen', value: 'allowed'},
          {title: 'Ausgeschlossen', value: 'banned'},
          {title: 'Unklar', value: 'unclear'},
          {title: 'Nicht relevant', value: 'not_relevant'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'ticketSituation',
      title: 'Ticketlage',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Angespannt', value: 'tight'},
          {title: 'Schwierig', value: 'difficult'},
          {title: 'Unbekannt', value: 'unknown'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Interne / zusätzliche Tags',
      description: 'Zum Beispiel Dorfderby, Amateur, Finale, Stadionabschied oder Pyro.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'sources',
      title: 'Quellen',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Quellentyp',
              type: 'string',
              options: {
                list: [
                  {title: 'Verein / Verband', value: 'official'},
                  {title: 'Lokales Medium', value: 'local_media'},
                  {title: 'Fanmedium', value: 'fan_media'},
                  {title: 'Social Media', value: 'social_media'},
                  {title: 'Forum', value: 'forum'},
                  {title: 'Sonstiges', value: 'other'},
                ],
                layout: 'dropdown',
              },
            }),
            defineField({name: 'url', title: 'Link', type: 'url'}),
            defineField({name: 'note', title: 'Notiz', type: 'string'}),
          ],
          preview: {
            select: {title: 'note', subtitle: 'type'},
            prepare({title, subtitle}) {
              return {title: title || 'Quelle', subtitle}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'lastChecked',
      title: 'Zuletzt geprüft',
      type: 'date',
    }),
    defineField({
      name: 'article',
      title: 'Passender Tandemhopper-Artikel',
      type: 'reference',
      to: [{type: 'article'}],
    }),
  ],
  orderings: [
    {
      title: 'Nächste zuerst',
      name: 'matchDateAsc',
      by: [{field: 'matchDate', direction: 'asc'}],
    },
    {
      title: 'Highlights zuerst',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      homeTeam: 'homeTeam',
      awayTeam: 'awayTeam',
      country: 'country',
      matchDate: 'matchDate',
      dateFrom: 'dateFrom',
      dateStatus: 'dateStatus',
      priority: 'priority',
    },
    prepare({homeTeam, awayTeam, country, matchDate, dateFrom, dateStatus, priority}) {
      const dateValue = matchDate || dateFrom
      const date = dateValue ? new Date(`${dateValue}T12:00:00`).toLocaleDateString('de-DE') : 'Termin offen'
      const status = dateStatus === 'confirmed' ? 'fix' : dateStatus === 'window' ? 'Zeitraum' : 'TBC'

      return {
        title: `${homeTeam || '?'} – ${awayTeam || '?'}`,
        subtitle: [date, country, `Prio ${priority || '–'}`, status].filter(Boolean).join(' · '),
      }
    },
  },
})
