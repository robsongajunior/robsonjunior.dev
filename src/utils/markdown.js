import { getCollection } from 'astro:content'
import i18nConfig from '@i18n/config'
import home from '@i18n/view/home'
import about from '@i18n/view/about'
import contact from '@i18n/view/contact'
import blog from '@i18n/view/blog'
import deliveriesView from '@i18n/view/deliveries'
import talksView from '@i18n/view/talks'
import shared from '@i18n/component/site'
import {
  defaultLang,
  entryAlternates,
  entryHref,
  entryLang,
  hreflangCode,
  langOrder,
  pageAlternates
} from '@utils/alternates.js'
import {
  byDateDesc,
  categoryHref,
  categoryKey,
  collectCategories,
  formatDate,
  groupByYear,
  postCategories,
  categoryMeta,
  postLede,
  readingMinutes
} from '@utils/blog.js'
import { talkStats } from '@utils/talks.js'

const site = import.meta.env.SITE

const absoluteUrl = (path) => new URL(path, site).href

export const markdownPath = (pathname) => `${pathname.replace(/\/$/, '')}.md`

const markdownUrl = (pathname) => absoluteUrl(markdownPath(pathname))

const cleanTitle = (title) => title.split(' ').filter(Boolean).join(' ')

const isoDate = (date) => date.toISOString().slice(0, 10)

const validDate = (date) => date instanceof Date && !Number.isNaN(date.valueOf())

const escapeText = (text = '') =>
  String(text)
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/([\\[\]])/g, '\\$1')

const staticPageKeys = ['home', 'about', 'contact', 'blog', 'deliveries', 'talks']

let pageList

export function markdownPages() {
  pageList ??= enumeratePages()
  return pageList
}

async function enumeratePages() {
  const [posts, deliveries, talks] = await Promise.all([
    getCollection('blog'),
    getCollection('deliveries'),
    getCollection('talks')
  ])
  const pages = []
  const add = (path, type, lang, data = {}) => pages.push({ path, type, lang, ...data })

  staticPageKeys.forEach((key) => {
    const paths = pageAlternates(key)
    i18nConfig.langs.filter((lang) => paths[lang]).forEach((lang) => add(paths[lang], key, lang))
  })

  posts.forEach((entry) =>
    add(entryHref('blog', entry), 'post', entryLang(entry), { collection: 'blog', entry })
  )
  deliveries.forEach((entry) =>
    add(entryHref('deliveries', entry), 'entry', entryLang(entry), {
      collection: 'deliveries',
      entry
    })
  )
  talks.forEach((entry) =>
    add(entryHref('talks', entry), 'entry', entryLang(entry), { collection: 'talks', entry })
  )

  const langs = langOrder(posts.map(entryLang))
  const categoriesOf = (lang) => collectCategories(posts.filter((post) => entryLang(post) === lang))
  langs.forEach((lang) => {
    categoriesOf(lang).forEach((category) => {
      const alternates = Object.fromEntries(
        langs
          .filter((other) => categoriesOf(other).some((c) => c.slug === category.slug))
          .map((other) => [other, categoryHref(other, category.slug)])
      )
      add(categoryHref(lang, category.slug), 'category', lang, { category, alternates })
    })
  })

  return pages
}

async function pagePaths() {
  return new Set((await markdownPages()).map((page) => page.path))
}

const linkTarget = (href, paths) => {
  const match = href.match(/^(?:https?:\/\/(?:www\.)?robsonjunior\.dev)?(\/(?!\/)[^?#]*)(.*)$/)
  if (!match) return href
  const [, pathname, rest] = match
  const page = pathname.endsWith('/') ? pathname : `${pathname}/`
  if (paths.has(page)) return markdownUrl(page) + rest.replace(/^\?[^#]*/, '')
  return absoluteUrl(pathname) + rest
}

const inlineHtml = (html = '', paths = new Set()) =>
  String(html)
    .replace(/<br\s*\/?>/gi, '  \n')
    .replace(
      /<a\s[^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
      (_, href, text) => `[${inlineHtml(text, paths)}](${linkTarget(href, paths)})`
    )
    .replace(/<(strong|b)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<[^>]+>/g, '')

const parts = (list) => list.map((part) => (part.em ? `*${part.text}*` : part.text)).join('')

const rewriteLine = (line, paths) =>
  line
    .replace(
      /(\]\()((?:https?:\/\/(?:www\.)?robsonjunior\.dev)?\/(?!\/)[^)\s]*)/g,
      (_, open, href) => open + linkTarget(href, paths)
    )
    .replace(
      /\b(src|href)="((?:https?:\/\/(?:www\.)?robsonjunior\.dev)?\/(?!\/)[^"]*)"/g,
      (_, attr, href) => `${attr}="${linkTarget(href, paths)}"`
    )
    .replace(/^# /, '## ')

const mdxSpaces = (line) => line.replace(/\{' '\}/g, ' ')

function rewriteBody(body = '', paths = new Set(), mdx = false) {
  let fence = ''
  return body
    .split('\n')
    .map((line) => {
      const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/)?.[1]
      if (fence) {
        if (marker && marker[0] === fence[0] && marker.length >= fence.length) fence = ''
        return line
      }
      if (marker) {
        fence = marker
        return line
      }
      return rewriteLine(mdx ? mdxSpaces(line) : line, paths)
    })
    .join('\n')
    .trim()
}

const yamlString = (value) => JSON.stringify(String(value))

function frontmatter({ title, description, lang, url, alternates, date, updated, categories }) {
  const lines = [
    '---',
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `lang: ${hreflangCode[lang]}`,
    `url: ${url}`
  ]
  const alternateEntries = Object.entries(alternates ?? {})
  if (alternateEntries.length > 1) {
    lines.push('alternates:')
    alternateEntries.forEach(([code, path]) =>
      lines.push(`  ${hreflangCode[code]}: ${markdownUrl(path)}`)
    )
  }
  if (date) lines.push(`date: ${isoDate(date)}`)
  if (validDate(updated)) lines.push(`updated: ${isoDate(updated)}`)
  if (categories) lines.push(`categories: [${categories.map(yamlString).join(', ')}]`)
  lines.push('---')
  return lines.join('\n')
}

const card = (entry, href) => ({
  href,
  title: cleanTitle(entry.data.title),
  date: isoDate(entry.data.date),
  year: entry.data.date.getUTCFullYear(),
  time: entry.data.date.valueOf(),
  excerpt: entry.data.meta_description
})

const cardItem = (item) =>
  `- [${escapeText(item.title)}](${markdownUrl(item.href)}) — ${item.date}${item.excerpt ? ` — ${escapeText(item.excerpt)}` : ''}`

const yearSections = (years) =>
  years.map((group) => [`## ${group.year}`, group.posts.map(cardItem).join('\n')])

const linkItems = (links) =>
  links.map((link) => `- [${escapeText(link.label)}](${link.href})`).join('\n')

function talksSections(lang, level) {
  const h = '#'.repeat(level)
  const source = about[lang].talks
  const ed = about[lang].editorial.talks
  const stats = talkStats(ed, source.items.length)
  return [
    ed.statement,
    ed.summary,
    `${h} ${ed.statsIndex}`,
    stats.map((stat) => `- ${stat.value} ${stat.label}`).join('\n'),
    `${h} ${ed.eventsIndex}`,
    ...source.groups.flatMap((group) => [
      `${h}# ${group.title}`,
      group.items.map((item) => `- ${item}`).join('\n')
    ]),
    `${h} ${ed.themes.index}`,
    ed.themes.items.map((item) => `- ${item}`).join('\n'),
    `${h} ${ed.listIndex}`,
    source.items
      .map(
        (talk) =>
          `- [${escapeText(talk.title)}](${talk.href})${talk.meta ? ` — ${talk.meta}` : ''} — ${escapeText(talk.description)}`
      )
      .join('\n')
  ]
}

const cover = (entry) =>
  entry.data.heroImage
    ? `![${escapeText(entry.data.heroAltImage ?? '')}](${linkTarget(entry.data.heroImage, new Set())})`
    : ''

const isMdx = (entry) => entry.filePath.endsWith('.mdx')

const byline = (entry, lang) => {
  const labels = blog[lang].post
  return `${labels.author} · ${formatDate(entry.data.date, lang)} · ${readingMinutes(entry.body)} ${labels.reading}`
}

const builders = {
  async home({ lang }, paths) {
    const page = home[lang]
    const common = shared[lang]
    const bento = page.bento
    const allPosts = (await getCollection('blog', (entry) => entryLang(entry) === lang)).sort(
      byDateDesc
    )
    const posts = allPosts
      .slice(0, page.articles.limit)
      .map((post) => card(post, entryHref('blog', post)))
    const talks = (await getCollection('talks', (entry) => entryLang(entry) === lang))
      .sort(byDateDesc)
      .map((talk) => card(talk, entryHref('talks', talk)))
    const featured = talks
      .slice(0, 2)
      .concat(posts.slice(0, 2))
      .sort((a, b) => b.time - a.time)
      .slice(0, 4)
    const recent = posts.filter((post) => !featured.includes(post)).slice(0, 3)
    const firstYear = allPosts.length
      ? allPosts[allPosts.length - 1].data.date.getUTCFullYear()
      : ''
    return {
      title: page.meta.title,
      description: page.meta.description,
      alternates: pageAlternates('home'),
      h1: `${page.hero.title} ${page.hero.titleAccent}`.trim(),
      blocks: [
        page.hero.lede,
        `## ${bento.index[0]}`,
        parts(bento.about.headline),
        inlineHtml(bento.about.summary, paths),
        `[${bento.about.more}](${linkTarget(common.aboutPath, paths)})`,
        ...(featured.length ? [`## ${bento.index[1]}`, featured.map(cardItem).join('\n')] : []),
        ...(recent.length ? [`## ${bento.index[2]}`, recent.map(cardItem).join('\n')] : []),
        ...(allPosts.length
          ? [
              `## ${bento.index[3]}`,
              `[${bento.explore.title}](${linkTarget(common.blogPath, paths)}) — ${allPosts.length} ${bento.explore.count} · ${bento.explore.since} ${firstYear}`
            ]
          : []),
        `## ${page.contact.title}`,
        linkItems(page.contact.links.map((key) => common.social[key]))
      ]
    }
  },

  async about({ lang }, paths) {
    const page = about[lang]
    const common = shared[lang]
    const ed = page.editorial
    return {
      title: page.meta.title,
      description: page.meta.description,
      alternates: pageAlternates('about'),
      h1: `${page.hero.title} ${page.hero.titleAccent}`.trim(),
      blocks: [
        `## ${ed.statement.index}`,
        parts(ed.statement.lines),
        inlineHtml(ed.statement.summary, paths),
        linkItems(page.intro.links.map((key) => common.social[key])),
        `## ${ed.now.index}`,
        `${ed.now.role} — ${ed.now.company} — ${ed.now.team}`,
        ed.now.focus,
        `## ${ed.topics.index}`,
        ed.topics.items.map((item) => `- ${item}`).join('\n'),
        `## ${ed.journey.index}`,
        ed.journey.steps
          .map(
            (step) =>
              `- **${step.when}** — ${step.where} — ${step.what}${step.detail ? `\n  ${step.detail}` : ''}`
          )
          .join('\n'),
        `## ${ed.talks.index}`,
        ...talksSections(lang, 3)
      ]
    }
  },

  async contact({ lang, path }) {
    const page = contact[lang]
    const common = shared[lang]
    return {
      title: page.meta.title,
      description: page.meta.description,
      alternates: pageAlternates('contact'),
      h1: page.intro.statement,
      blocks: [
        page.intro.summary,
        linkItems(page.intro.links.map((key) => common.social[key])),
        `## ${page.form.index}`,
        `[${page.form.submit}](${absoluteUrl(path)})`
      ]
    }
  },

  async blog({ lang }) {
    const page = blog[lang]
    const posts = (await getCollection('blog', (entry) => entryLang(entry) === lang)).sort(
      byDateDesc
    )
    const all = collectCategories(posts)
    const sharedThemes = all.filter((category) => category.count > 1)
    const themes = sharedThemes.length ? sharedThemes : all
    return {
      title: page.meta.title,
      description: page.meta.description,
      alternates: pageAlternates('blog'),
      h1: `${page.hero.title} ${page.hero.titleAccent}`.trim(),
      blocks: [
        page.intro.statement,
        ...yearSections(
          groupByYear(posts.map((post) => card(post, entryHref('blog', post))))
        ).flat(),
        `## ${page.themes}`,
        themes
          .map(
            (category) =>
              `- [${escapeText(category.label)}](${markdownUrl(categoryHref(lang, category.slug))}) (${category.count})`
          )
          .join('\n')
      ]
    }
  },

  async deliveries({ lang }) {
    const page = deliveriesView[lang]
    const posts = (await getCollection('deliveries', (entry) => entryLang(entry) === lang)).sort(
      byDateDesc
    )
    return {
      title: page.meta.title,
      description: page.meta.description,
      alternates: pageAlternates('deliveries'),
      h1: page.title,
      blocks: [
        `${posts.length} ${posts.length === 1 ? page.item : page.items}`,
        ...yearSections(
          groupByYear(posts.map((post) => card(post, entryHref('deliveries', post))))
        ).flat()
      ]
    }
  },

  async talks({ lang }) {
    const page = talksView[lang]
    return {
      title: page.meta.title,
      description: page.meta.description,
      alternates: pageAlternates('talks'),
      h1: `${page.hero.title} ${page.hero.titleAccent}`.trim(),
      blocks: talksSections(lang, 2)
    }
  },

  async category({ lang, category, alternates }) {
    const labels = blog[lang].category
    const posts = (await getCollection('blog', (entry) => entryLang(entry) === lang))
      .sort(byDateDesc)
      .filter((post) => postCategories(post).map(categoryKey).includes(category.key))
    const meta = categoryMeta(labels, category.label, posts.length)
    return {
      title: meta.title,
      description: meta.description,
      alternates,
      h1: category.label,
      blocks: [
        meta.count,
        ...yearSections(
          groupByYear(posts.map((post) => card(post, entryHref('blog', post))))
        ).flat()
      ]
    }
  },

  async post({ entry, collection, lang }, paths) {
    const title = cleanTitle(entry.data.title)
    return {
      title: `${title} | Robson Júnior`,
      description: entry.data.meta_description || title,
      alternates: await entryAlternates(collection, entry),
      date: entry.data.date,
      updated: entry.data.dateUpdate,
      categories: postCategories(entry),
      cover: cover(entry),
      h1: title,
      blocks: [postLede(entry), byline(entry, lang), rewriteBody(entry.body, paths, isMdx(entry))]
    }
  },

  async entry({ entry, collection, lang }, paths) {
    const title = cleanTitle(entry.data.title)
    return {
      title: `${title} | Robson Júnior`,
      description: entry.data.meta_description || title,
      alternates: await entryAlternates(collection, entry),
      date: entry.data.date,
      updated: entry.data.dateUpdate,
      cover: cover(entry),
      h1: title,
      blocks: [
        entry.data.meta_description ?? '',
        byline(entry, lang),
        rewriteBody(entry.body, paths, isMdx(entry))
      ]
    }
  }
}

export async function renderMarkdown(page) {
  const paths = await pagePaths()
  const doc = await builders[page.type](page, paths)
  const head = frontmatter({ ...doc, lang: page.lang, url: absoluteUrl(page.path) })
  const body = [`# ${doc.h1}`, doc.cover, ...doc.blocks]
    .filter((block) => block && String(block).trim())
    .join('\n\n')
  return `${head}\n\n${body}\n`
}

const pageMeta = { home, about, contact, blog, deliveries: deliveriesView, talks: talksView }

const sectionTypes = [
  ['Blog posts', 'blog'],
  ['Deliveries', 'deliveries'],
  ['Talks', 'talks']
]

export async function renderLlms() {
  const pages = await markdownPages()
  const langs = [defaultLang, ...i18nConfig.langs.filter((lang) => lang !== defaultLang)]
  const entryLine = (title, path, description) =>
    `- [${escapeText(title)}](${markdownUrl(path)}): ${escapeText(description)}`
  const lines = ['# Robson Júnior', '', ...langs.map((lang) => `> ${home[lang].meta.description}`)]

  langs.forEach((lang) => {
    const own = pages.filter((page) => page.lang === lang)
    const staticPages = staticPageKeys.flatMap((key) => own.filter((page) => page.type === key))
    lines.push('', `## Pages (${lang})`, '')
    staticPages.forEach((page) => {
      const { meta } = pageMeta[page.type][lang]
      lines.push(entryLine(meta.title, page.path, meta.description))
    })
    sectionTypes.forEach(([heading, collection]) => {
      const entries = own
        .filter((page) => page.collection === collection)
        .filter((page) => !/noindex/i.test(page.entry.data.meta_robots ?? ''))
        .sort((a, b) => byDateDesc(a.entry, b.entry))
      if (!entries.length) return
      lines.push('', `## ${heading} (${lang})`, '')
      entries.forEach((page) => {
        const title = cleanTitle(page.entry.data.title)
        lines.push(entryLine(title, page.path, page.entry.data.meta_description || title))
      })
    })
  })

  return `${lines.join('\n')}\n`
}
