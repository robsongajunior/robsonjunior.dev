import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.robsonjunior.dev/',
  // trailingSlash: 'always', // for server
  integrations: [
        react(),
        vue(),
        mdx(),
        sitemap()
    ]
});
