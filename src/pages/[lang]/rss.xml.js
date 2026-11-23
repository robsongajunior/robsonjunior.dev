import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import blog from '@i18n/view/blog'
import { byDateDesc, postCategories } from '@utils/blog.js'
import { entryHref, entryLang, hreflangCode, pageLangs } from '@utils/alternates.js'

export function getStaticPaths() {
  return pageLangs('blog').map((lang) => ({ params: { lang } }))
}

export async function GET({ params, site }) {
  const { lang } = params
  const posts = (await getCollection('blog', (entry) => entryLang(entry) === lang)).sort(byDateDesc)

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
