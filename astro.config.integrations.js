import mdx from '@astrojs/mdx'
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap'

export default [
  vue({ appEntrypoint: './src/vue.config.js' }),
  mdx(),
  sitemap()
]
