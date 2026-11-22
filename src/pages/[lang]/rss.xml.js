import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import i18nConfig from '@i18n/config'
import blog from '@i18n/view/blog'
import { postCategories } from '@utils/blog.js'
import { entryHref, entryLang, hreflangCode } from '@utils/alternates.js'

export function getStaticPaths() {
  return i18nConfig.langs.map((lang) => ({ params: { lang } }))
}

export async function GET({ params, site }) {
  const { lang } = params
  const posts = (await getCollection('blog', (entry) => entryLang(entry) === lang)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )

  return rss({
    title: blog[lang].meta.title,
    description: blog[lang].meta.description,
    site: new URL(`/${lang}/blog/`, site).href,
    customData: `<language>${hreflangCode[lang]}</language>`,
    items: posts.map((post) => ({
      title: post.data.title.split(' ').filter(Boolean).join(' '),
      link: entryHref('blog', post),
      pubDate: post.data.date,
      description: post.data.meta_description,
      categories: postCategories(post)
    }))
  })
}
