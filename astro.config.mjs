import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'

import vite from './astro.vite.config'
import integrations from './astro.config.integrations'

const productionBuild = import.meta.env.PROD

export default defineConfig({
  site: 'https://www.robsonjunior.dev/',
  trailingSlash: 'always',
  compressHTML: productionBuild ? true : false,
  build: {
    inlineStylesheets: 'always'
  },
  markdown: {
    processor: unified()
  },
  integrations: integrations,
  vite: vite
})
