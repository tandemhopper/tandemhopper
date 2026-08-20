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
  plugins: [structureTool()],
  schema: {types: schemaTypes},
})
