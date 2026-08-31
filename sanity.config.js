'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'tandemhopper',
  title: 'Tandemhopper Redaktion',
  basePath: '/studio',
  projectId: '90kx3kio',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Tandemhopper Redaktion')
          .items([
            S.documentTypeListItem('article').title('Geschichten'),
            S.divider(),
            S.listItem()
              .title('Kalender')
              .child(
                S.list()
                  .title('Kalender')
                  .items([
                    S.documentTypeListItem('calendarMatch').title('Spieltipps'),
                    S.documentTypeListItem('calendarCompetition').title('Wettbewerbsphasen'),
                  ]),
              ),
          ]),
    }),
  ],
  schema: {types: schemaTypes},
})
