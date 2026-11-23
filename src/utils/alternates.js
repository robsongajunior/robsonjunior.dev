import { getCollection } from 'astro:content'
import i18nConfig from '@i18n/config'

export const hreflangCode = { 'pt-br': 'pt-BR', en: 'en' }
export const defaultLang = 'pt-br'

const pages = {
  home: { 'pt-br': '/pt-br/', en: '/en/' },
  about: { 'pt-br': '/pt-br/sobre/', en: '/en/about/' },
  contact: { 'pt-br': '/pt-br/contato/', en: '/en/contact/' },
  blog: { 'pt-br': '/pt-br/blog/' },
  deliveries: { 'pt-br': '/pt-br/entregas/' },
  talks: { 'pt-br': '/pt-br/palestras/' }
}

export const pageAlternates = (key) => pages[key]

export const pageLangs = (key) => i18nConfig.langs.filter((lang) => pages[key][lang])

export const langOrder = (langs) => i18nConfig.langs.filter((lang) => langs.includes(lang))

const sections = {
  blog: { 'pt-br': 'blog', en: 'blog' },
  deliveries: { 'pt-br': 'entregas', en: 'deliveries' },
  talks: { 'pt-br': 'palestras', en: 'talks' }
}

export const sectionOf = (collection, lang) => sections[collection][lang]

const splitId = (entry) => {
  const [lang, ...rest] = entry.id.split('/')
  return { lang, path: rest.join('/') }
}

export const entryLang = (entry) => splitId(entry).lang

export const entryPath = (entry) => splitId(entry).path

export const entryHref = (collection, entry) => {
  const { lang, path } = splitId(entry)
  return `/${lang}/${sectionOf(collection, lang)}/${path}/`
}

const entryKey = (entry) => entry.data.translationKey ?? splitId(entry).path

export async function entryAlternates(collection, entry) {
  const key = entryKey(entry)
  const matches = (await getCollection(collection)).filter((other) => entryKey(other) === key)
  return Object.fromEntries(
    langOrder(matches.map(entryLang)).map((lang) => {
      const other = matches.find((entry) => entryLang(entry) === lang)
      return [lang, entryHref(collection, other)]
    })
  )
}
