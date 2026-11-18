// Helpers shared by the blog pages (index, post, category).

const plain = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

// "Front-End", "front-end" and "frontend" are the same category: the key
// drops case, accents and anything that is not a letter or digit.
export const categoryKey = (name) => plain(name).replace(/[^a-z0-9]/g, '')

// readable URL segment from the label: "terra-networks", "edge-computing"
const urlSlug = (label) =>
  plain(label)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const postCategories = (post) => [].concat(post.data.categories ?? []).filter(Boolean).map(String)

// [{ key, slug, label, count }] sorted by count, then label. The label is the most
// used spelling (lowercased) of that category; posts are matched by key.
export function collectCategories(posts) {
  const map = new Map()
  posts.forEach((post) => {
    const seen = new Set()
    postCategories(post).forEach((raw) => {
      const key = categoryKey(raw)
      if (!key || seen.has(key)) return
      seen.add(key)
      const entry = map.get(key) ?? { key, count: 0, spellings: {} }
      entry.count++
      const label = raw.toLowerCase()
      entry.spellings[label] = (entry.spellings[label] ?? 0) + 1
      map.set(key, entry)
    })
  })
  return [...map.values()]
    .map(({ key, count, spellings }) => {
      const label = Object.entries(spellings).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0]
      return { key, slug: urlSlug(label), label, count }
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

export const blogBase = (lang) => `/${lang}/blog/`
export const categoryBase = (lang) => `/${lang}/blog/${lang === 'pt-br' ? 'categoria' : 'category'}/`
export const categoryHref = (lang, slug) => `${categoryBase(lang)}${slug}/`

// post entry -> the card shape used by PostCard / PostArchive
// (the old blog index rewrites entry.slug to "<lang>/blog/<slug>" in place,
// so a leading "blog/" is tolerated here)
export const postHref = (post) => {
  const [lang, ...rest] = post.slug.split('/')
  if (rest[0] === 'blog' && rest.length > 1) rest.shift()
  return `/${lang}/blog/${rest.join('/')}/`
}
export const toPostCard = (post) => ({
  href: postHref(post),
  title: post.data.title.split(' ').filter(Boolean).join(' '),
  tag: postCategories(post).slice(0, 2).join(' · ').toLowerCase(),
  date: post.data.date.toISOString().slice(0, 10),
  year: post.data.date.getUTCFullYear(),
  excerpt: post.data.meta_description
})

// posts grouped by year, newest first: [{ year, posts: [card] }]
export function groupByYear(cards) {
  const years = []
  cards.forEach((card) => {
    const group = years.at(-1)
    if (group && group.year === card.year) group.posts.push(card)
    else years.push({ year: card.year, posts: [card] })
  })
  return years
}

export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200))

// "19 FEV, 2017"
export const formatDate = (date, lang) => {
  const parts = new Intl.DateTimeFormat(lang === 'pt-br' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).formatToParts(date)
  const get = (type) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('day')} ${get('month').replace('.', '').toUpperCase()}, ${get('year')}`
}

// Older posts are excerpts that point to the original article with a
// "(Ler artigo completo)[url]" line; returns that url, if any.
export const originalUrl = (body = '') => body.match(/\)\[(https?:\/\/[^\]\s]+)\]/)?.[1] ?? ''
