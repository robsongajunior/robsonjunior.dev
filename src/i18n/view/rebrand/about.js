const talks = {
  'pt-br': [
    {
      href: 'https://speakerdeck.com/robsongajunior/move-to-the-edge-construindo-aplicacoes-modernas-e-escalaveis',
      title: 'Move to the Edge: construindo aplicações modernas e escaláveis',
      description: 'No retorno do Front In Poa em 2023: aplicações rodando no edge, seus facilitadores e a importância do front-end para o edge computing.'
    },
    {
      href: 'https://speakerdeck.com/robsongajunior/construindo-o-futuro-da-web-com-jam-stack',
      title: 'Construindo o futuro da web com JAM Stack',
      description: 'Como o JAM Stack ajuda a desacoplar regras de negócio, interface e camada de dados, fechando com live code na Azion.'
    },
    {
      href: 'https://speakerdeck.com/robsongajunior/como-jam-stack-ajudou-crescer-o-time-de-marketing-na-azion',
      title: 'Como JAM Stack ajudou a crescer o time de Marketing na Azion',
      description: 'O que é JAM Stack, casos de uso, problemas e soluções, e como a arquitetura estática deu mais agilidade ao Marketing na criação de páginas.'
    },
    {
      href: 'https://speakerdeck.com/robsongajunior/o-pensamento-por-tras-de-um-desenvolvimento-escalavel',
      title: 'O pensamento por trás de um desenvolvimento escalável',
      description: 'Arquitetura JAM Stack no primeiro projeto da Azion em Astro, agnóstico de component library e consumindo a API de Azion Edge Functions.'
    }
  ],
  en: [
    {
      href: 'https://speakerdeck.com/robsongajunior/move-to-the-edge-construindo-aplicacoes-modernas-e-escalaveis',
      title: 'Move to the Edge: building modern, scalable applications',
      description: 'At the return of Front In Poa in 2023: applications running on the edge, what makes it easier and why front-end matters for edge computing.'
    },
    {
      href: 'https://speakerdeck.com/robsongajunior/construindo-o-futuro-da-web-com-jam-stack',
      title: 'Building the future of the web with JAM Stack',
      description: 'How JAM Stack helps decouple business rules, interface and data, closing with live code on Azion.'
    },
    {
      href: 'https://speakerdeck.com/robsongajunior/como-jam-stack-ajudou-crescer-o-time-de-marketing-na-azion',
      title: 'How JAM Stack helped the Marketing team grow at Azion',
      description: 'What JAM Stack is, use cases, problems and solutions, and how a static architecture made Marketing faster at shipping pages.'
    },
    {
      href: 'https://speakerdeck.com/robsongajunior/o-pensamento-por-tras-de-um-desenvolvimento-escalavel',
      title: 'The thinking behind scalable development',
      description: "JAM Stack architecture on Azion's first Astro project, component-library agnostic and consuming the Azion Edge Functions API."
    }
  ]
}

const speaker = ['OGUFERS', 'Sucesu RS', 'Senac Talks', 'The Developers Conference', 'EATI', 'BrazilJS On The Road BH', 'Front In Poa']
const attendee = ['JSConf Argentina', 'Front In Aracaju', 'Front In Sampa', 'Criciúma Dev', 'Python Brasil', 'TDC', 'RSJS']

const slogan = {
  label: 'Build, deliver and repeat',
  lines: [[{ text: 'Build,', em: true }], [{ text: 'Deliver', em: true }], [{ text: 'and ' }, { text: 'Repeat', em: true }]]
}

export default {
  'pt-br': {
    meta: {
      title: 'Sobre | Robson Júnior',
      description:
        'Robson Júnior é Senior Product Engineer na Azion Technologies. Front-end, developer tooling e edge computing, com passagem pelo Terra Networks.'
    },
    nav: [
      { href: '#sobre', label: 'Sobre' },
      { href: '#palestras', label: 'Palestras' }
    ],
    hero: {
      eyebrow: 'sobre · robson júnior',
      title: 'Product',
      titleAccent: 'Engineer',
      lede: 'Imerso em arquitetura front-end, developer tooling e a experiência de quem constrói aplicações na edge.',
      cue: 'role para baixo'
    },
    intro: {
      id: 'sobre',
      title: 'Sobre',
      paragraphs: [
        'Olá, me chamo Robson Júnior. Sou brasileiro, nasci em Gramado e moro em Porto Alegre.',
        'Estou na web desde 2014. Comecei fazendo animações em CSS3, passei pelo Terra Networks como Software Developer e Front-End Engineer e cheguei à <a href="https://www.azion.com/pt-br/">Azion Technologies</a>, onde venho trabalhando cada vez mais perto do produto e das decisões de arquitetura.',
        'Gosto de web, browser applications, extensões de Chrome e open source.'
      ],
      links: ['linkedin', 'speakerdeck', 'github', 'instagram', 'twitter']
    },
    bio: {
      id: 'bio',
      title: 'Bio',
      paragraphs: [
        'Robson Júnior é Senior Product Engineer na Azion Technologies, no time de UX Engineering. Na Azion, também passou pelos times de Experience Engineering, Marketing Engineering, Core Services e Routing Services, onde trabalhou em uma aplicação de RUM (Real User Monitoring). Antes, fez parte do time de Tecnologia da Terra Networks em Porto Alegre, passando por SVA, Tecnologia Portal, Entretenimento e Tecnologia de E-mail, e participou da criação do primeiro time Full DevOps da empresa.'
      ]
    },
    slogan,
    talks: {
      id: 'palestras',
      title: 'Palestras',
      intro: [
        'Tenho uma paixão enorme por compartilhar o meu trabalho, as técnicas e o que aprendo no caminho. Em mais de 10 anos de carreira, passei por vários eventos como palestrante e muitos outros na plateia.'
      ],
      groups: [
        { title: 'Como palestrante', items: speaker },
        { title: 'Na plateia', items: attendee }
      ],
      cta: 'ver apresentação',
      items: talks['pt-br']
    }
  },
  en: {
    meta: {
      title: 'About | Robson Júnior',
      description:
        'Robson Júnior is a Senior Product Engineer at Azion Technologies. Front-end, developer tooling and edge computing, formerly at Terra Networks.'
    },
    nav: [
      { href: '#about', label: 'About' },
      { href: '#talks', label: 'Talks' }
    ],
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
        'Robson Júnior is a Senior Product Engineer at Azion Technologies, on the UX Engineering team. At Azion he has also worked on the Experience Engineering, Marketing Engineering, Core Services and Routing Services teams, where he built a RUM (Real User Monitoring) application. Before that he was part of the Technology team at Terra Networks in Porto Alegre, working on SVA, Portal Technology, Entertainment and E-mail Technology, and helped create the company\'s first Full DevOps team.'
      ]
    },
    slogan,
    talks: {
      id: 'talks',
      title: 'Talks',
      intro: [
        'I love sharing my work, the techniques and what I learn along the way. In more than 10 years, I have spoken at several events and attended many more.'
      ],
      groups: [
        { title: 'As a speaker', items: speaker },
        { title: 'In the audience', items: attendee }
      ],
      cta: 'see slides',
      items: talks.en
    }
  }
}
