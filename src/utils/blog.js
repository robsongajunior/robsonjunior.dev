import { entryHref } from '@utils/alternates.js'

const plain = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

export const categoryKey = (name) => plain(name).replace(/[^a-z0-9]/g, '')

const urlSlug = (label) =>
  plain(label)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const byDateDesc = (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id)

export const postCategories = (post) => [].concat(post.data.categories ?? []).filter(Boolean).map(String)

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

export const categoryMeta = (labels, label, total) => {
  const count = `${total} ${total === 1 ? labels.post : labels.posts}`
  return {
    count,
    title: `${label} · Blog | Robson Júnior`,
    description: `${labels.title} ${label}: ${count}.`
  }
}

export const blogBase = (lang) => `/${lang}/blog/`
export const categoryBase = (lang) => `/${lang}/blog/${lang === 'pt-br' ? 'categoria' : 'category'}/`
export const categoryHref = (lang, slug) => `${categoryBase(lang)}${slug}/`

export const toPostCard = (post) => ({
  href: entryHref('blog', post),
  title: post.data.title.split(' ').filter(Boolean).join(' '),
  tag: postCategories(post).slice(0, 2).join(' · ').toLowerCase(),
  date: post.data.date.toISOString().slice(0, 10),
  year: post.data.date.getUTCFullYear(),
  excerpt: post.data.meta_description
})

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

const flat = (text = '') =>
  text
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .toLowerCase()
    .slice(0, 60)

export const postLede = (post) =>
  post.data.meta_description && !flat(post.body).startsWith(flat(post.data.meta_description)) ? post.data.meta_description : ''

export const originalUrl = (body = '') => body.match(/\)\[(https?:\/\/[^\]\s]+)\]/)?.[1] ?? ''
