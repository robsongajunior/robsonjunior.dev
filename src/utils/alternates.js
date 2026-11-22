import { getCollection } from 'astro:content'

export const hreflangCode = { 'pt-br': 'pt-BR', en: 'en' }
export const defaultLang = 'pt-br'

const pages = {
  home: { 'pt-br': '/pt-br/', en: '/en/' },
  about: { 'pt-br': '/pt-br/sobre/', en: '/en/about/' },
  contact: { 'pt-br': '/pt-br/contato/', en: '/en/contact/' },
  blog: { 'pt-br': '/pt-br/blog/', en: '/en/blog/' },
  deliveries: { 'pt-br': '/pt-br/entregas/', en: '/en/deliveries/' },
  talks: { 'pt-br': '/pt-br/palestras/' }
}

export const pageAlternates = (key) => pages[key]

const sections = {
  blog: { 'pt-br': 'blog', en: 'blog' },
  deliveries: { 'pt-br': 'entregas', en: 'deliveries' },
  talks: { 'pt-br': 'palestras', en: 'talks' }
}

const splitId = (entry) => {
  const [lang, ...rest] = entry.id.replace(/\.(md|mdx)$/, '').split('/')
  return { lang, path: rest.join('/') }
}

export const entryLang = (entry) => splitId(entry).lang

export const entryHref = (collection, entry) => {
  const { lang, path } = splitId(entry)
  return `/${lang}/${sections[collection][lang]}/${path}/`
}

const entryKey = (entry) => entry.data.translationKey ?? splitId(entry).path

export async function entryAlternates(collection, entry) {
  const key = entryKey(entry)
  const all = await getCollection(collection)
  return Object.fromEntries(all.filter((other) => entryKey(other) === key).map((other) => [entryLang(other), entryHref(collection, other)]))
}
