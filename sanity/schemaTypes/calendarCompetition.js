import {defineField, defineType} from 'sanity'

export const calendarCompetition = defineType({
  name: 'calendarCompetition',
  title: 'Wettbewerbsphase',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Wettbewerb',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Kurzname',
      description: 'Zum Beispiel „Champions League“ statt „UEFA Champions League“.',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          {title: 'Europa', value: 'europe'},
          {title: 'Afrika', value: 'africa'},
          {title: 'Asien', value: 'asia'},
          {title: 'Südamerika', value: 'south_america'},
          {title: 'Nord- & Mittelamerika', value: 'north_central_america'},
          {title: 'Global', value: 'global'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Land',
      description: 'Nur bei nationalen Pokalen oder Turnieren nötig.',
      type: 'string',
    }),
    defineField({
      name: 'competitionType',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          {title: 'Internationaler Clubwettbewerb', value: 'continental_club'},
          {title: 'Nationaler Pokal', value: 'national_cup'},
          {title: 'Nationalmannschaft', value: 'national_team'},
          {title: 'Turnier', value: 'tournament'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phase',
      title: 'Phase / Runde',
      description: 'Zum Beispiel „Ligaphase · Spieltag 3“, „Viertelfinale“ oder „Finale“.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Startdatum',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Enddatum',
      description: 'Bei eintägigen Terminen leer lassen.',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Terminstatus',
      type: 'string',
      initialValue: 'confirmed',
      options: {
        list: [
          {title: 'Fix', value: 'confirmed'},
          {title: 'Vorläufig', value: 'preliminary'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Kurzer Hinweis',
      description: 'Nur ausfüllen, wenn die Phase zusätzliche Erklärung braucht.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(240),
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
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      phase: 'phase',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({title, phase, startDate, endDate}) {
      const formatDate = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString('de-DE') : ''
      const dates = endDate && endDate !== startDate
        ? `${formatDate(startDate)}–${formatDate(endDate)}`
        : formatDate(startDate)

      return {
        title,
        subtitle: [phase, dates].filter(Boolean).join(' · '),
      }
    },
  },
})
