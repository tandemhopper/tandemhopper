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
            S.listItem().title('✈️ Flugrouten – Titelbild').child(S.document().schemaType('flightRoutesSettings').documentId('flightRoutesSettings')),
            S.divider(),
            S.listItem().title('Länderkompass').child(S.list().title('Länderkompass').items([
              S.listItem().title('🇲🇴 Macau bearbeiten').child(S.document().schemaType('macauEditorialSettings').documentId('macauEditorialSettings')),
              S.listItem().title('🇭🇰 Hongkong bearbeiten').child(S.document().schemaType('hongkongEditorialSettings').documentId('hongkongEditorialSettings')),
              S.documentTypeListItem('countryGuide').title('Weitere Länder'),
              S.documentTypeListItem('countryComment').title('Community · Kommentare & Antworten'),
            ])),
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
