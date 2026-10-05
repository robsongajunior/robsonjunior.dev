// Content shared by the rebranded pages, per language.
const social = {
  github: { href: 'https://github.com/robsongajunior/', label: 'GitHub' },
  linkedin: { href: 'https://www.linkedin.com/in/robsongajunior/', label: 'LinkedIn' },
  instagram: { href: 'https://www.instagram.com/robson.ga.junior/', label: 'Instagram' },
  twitter: { href: 'https://x.com/robsongajunior', label: 'Twitter' },
  speakerdeck: { href: 'https://speakerdeck.com/robsongajunior/', label: 'Speaker Deck' }
}

const sign = [
  { text: 'Born', em: true },
  { text: ' to ' },
  { text: 'build', em: true },
  { text: ' and ' },
  { text: 'deliver', em: true }
]

export default {
  'pt-br': {
    homeLabel: 'Robson Júnior, início',
    aboutPath: '/pt-br/sobre/',
    blogPath: '/pt-br/blog/',
    social,
    footer: {
      sign,
      credits: 'Feito com <a href="https://astro.build/">Astro</a>, entregue pela <a href="https://www.azion.com/pt-br/">Azion</a>.'
    }
  },
  en: {
    homeLabel: 'Robson Júnior, home',
    aboutPath: '/en/about/',
    blogPath: '/en/blog/',
    social,
    footer: {
      sign,
      credits: 'Built with <a href="https://astro.build/">Astro</a>, delivered by <a href="https://www.azion.com/en/">Azion</a>.'
    }
  }
}
