export default {
  meta: {
    title: 'About | Robson Júnior',
    description:
      'Robson Júnior is a Senior Product Engineer at Azion Technologies. Front-end, developer tooling and edge computing, formerly at Terra Networks.'
  },
  hero: {
    eyebrow: 'about · robson júnior',
    title: 'Product',
    titleAccent: 'Engineer',
    lede: 'Deep into front-end architecture, developer tooling and the experience of people building applications on the edge.',
    cue: 'scroll down'
  },
  intro: {
    id: 'about',
    title: 'About',
    paragraphs: [
      "Hi, I'm Robson Júnior. I'm Brazilian, born in Gramado and living in Porto Alegre.",
      'I have been on the web since 2014. I started out writing CSS3 animations, worked at Terra Networks as a Software Developer and Front-End Engineer and landed at <a href="https://www.azion.com/en/">Azion Technologies</a>, where I keep getting closer to product and architecture decisions.',
      'I like the web, browser applications, Chrome extensions and open source.'
    ],
    links: ['linkedin', 'speakerdeck', 'github', 'instagram', 'twitter']
  },
  bio: {
    id: 'bio',
    title: 'Bio',
    paragraphs: [
      "Robson Júnior is a Senior Product Engineer at Azion Technologies, on the UX Engineering team. At Azion he has also worked on the Experience Engineering, Marketing Engineering, Core Services and Routing Services teams, where he built a RUM (Real User Monitoring) application. Before that he was part of the Technology team at Terra Networks in Porto Alegre, working on SVA, Portal Technology, Entertainment and E-mail Technology, and helped create the company's first Full DevOps team."
    ]
  },
  editorial: {
    statement: {
      index: 'About',
      lines: [
        {
          text: "Hi, I'm "
        },
        {
          text: 'Robson Júnior',
          em: true
        },
        {
          text: '.'
        }
      ],
      summary:
        'I have been on the web since 2014. I started out writing CSS3 animations, worked at Terra Networks and landed at <a href="https://www.azion.com/en/">Azion Technologies</a>, where I keep getting closer to product and architecture decisions.',
      meta: ['gramado → porto alegre', 'brazil']
    },
    now: {
      index: 'Now',
      role: 'Senior Product Engineer',
      company: 'Azion Technologies',
      team: 'UX Engineering team',
      focus: 'Deep into front-end architecture, developer tooling and the experience of people building applications on the edge.'
    },
    journey: {
      index: 'Journey',
      steps: [
        {
          when: '2014',
          where: 'First steps',
          what: 'CSS3 animations'
        },
        {
          when: '2014 — 2018',
          where: 'Terra Networks',
          what: 'Software Developer and Front-End Engineer',
          detail: "SVA, Portal Technology, Entertainment and E-mail Technology. Helped create the company's first Full DevOps team."
        },
        {
          when: 'now',
          where: 'Azion Technologies',
          what: 'Senior Product Engineer',
          detail: 'Experience Engineering, Marketing Engineering, Core Services, Routing Services (a RUM application) and, now, UX Engineering.'
        }
      ]
    },
    topics: {
      index: 'Interests',
      items: ['the web', 'browser applications', 'Chrome extensions', 'open source', 'edge computing', 'developer tooling']
    },
    talks: {
      index: 'Talks',
      statement: 'Sharing my work, the techniques and what I learn along the way.',
      summary: 'In more than 10 years, I have spoken at several events and attended many more.',
      statsIndex: 'In numbers',
      eventsIndex: 'Events',
      stats: {
        events: '+20',
        eventsLabel: 'events, on stage and in the audience',
        decks: 'decks below',
        years: 'years in the field'
      },
      themes: {
        index: 'Recurring themes',
        items: ['JAM Stack', 'Edge computing', 'Scalability', 'Front-end architecture']
      },
      listIndex: 'Decks',
      external: '(opens in a new tab)'
    }
  },
  slogan: {
    label: 'Build, deliver and repeat',
    lines: [
      [
        {
          text: 'Build,',
          em: true
        }
      ],
      [
        {
          text: 'Deliver',
          em: true
        }
      ],
      [
        {
          text: 'and '
        },
        {
          text: 'Repeat',
          em: true
        }
      ]
    ]
  },
  talks: {
    id: 'talks',
    title: 'Talks',
    intro: [
      'I love sharing my work, the techniques and what I learn along the way. In more than 10 years, I have spoken at several events and attended many more.'
    ],
    groups: [
      {
        title: 'As a speaker',
        items: [
          'GUFERS',
          'Gu Mobile',
          'Sucesu RS',
          'Tche Linux',
          'Senac Talks',
          'The Developers Conference',
          'EATI',
          'BrazilJS On The Road BH',
          'Front In Poa'
        ]
      },
      {
        title: 'In the audience',
        items: [
          'JSConf Argentina',
          'Front In Aracaju',
          'Front In Sampa',
          'Criciúma Dev',
          'Python Brasil',
          'TDC',
          'RSJS'
        ]
      }
    ],
    cta: 'see slides',
    items: [
      {
        href: 'https://speakerdeck.com/robsongajunior/move-to-the-edge-construindo-aplicacoes-modernas-e-escalaveis',
        meta: '2023 · Front In Poa',
        title: 'Move to the Edge: building modern, scalable applications',
        description:
          'At the return of Front In Poa in 2023: applications running on the edge, what makes it easier and why front-end matters for edge computing.'
      },
      {
        href: 'https://speakerdeck.com/robsongajunior/construindo-o-futuro-da-web-com-jam-stack',
        meta: '2023',
        title: 'Building the future of the web with JAM Stack',
        description:
          'How JAM Stack helps decouple business rules, interface and data, closing with live code on Azion.'
      },
      {
        href: 'https://speakerdeck.com/robsongajunior/como-jam-stack-ajudou-crescer-o-time-de-marketing-na-azion',
        meta: '2021 · Tchê Linux',
        title: 'How JAM Stack helped the Marketing team grow at Azion',
        description:
          'What JAM Stack is, use cases, problems and solutions, and how a static architecture made Marketing faster at shipping pages.'
      },
      {
        href: 'https://speakerdeck.com/robsongajunior/o-pensamento-por-tras-de-um-desenvolvimento-escalavel',
        meta: '2020',
        title: 'The thinking behind scalable development',
        description:
          "JAM Stack architecture on Azion's first Astro project, component-library agnostic and consuming the Azion Edge Functions API."
      }
    ]
  }
}
