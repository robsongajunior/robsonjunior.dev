import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const productionBuild = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  site: 'https://www.robsonjunior.dev/',
  trailingSlash: 'always', // for server
  compressHTML: productionBuild ? true : false,
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
        react(),
        vue(),
        mdx(),
        sitemap()
    ],
    vite: {
        ssrBuild: true,
        server: {
          fs: {
            allow: ['..']
          }
        },
        plugins: [],
        ssr: {
          noExternal: [],
          external: []
        }
    }
});
