---
title: 'Como a Azion começou utlizar JAM Stack'
meta_robots: 'index, follow'
meta_description: 'Por volta de 2017, iniciou-se uma revolução no desenvolvimento de páginas web. Depois da adoção do mercado dos Static Site Generators nos times de engenharia e da imensa economia no orçamento de infraestrutura, veio a questão de levar essa revolução para times menos técnicos, como Marketing, Copywriters, Demand Generation, Product Marketing...'
categories: ['jamstack', 'frontend']

date: 'May 03 2021'
dateUpdate: ''

heroImage: '/static/uploads/blog/pt-br/como-a-azion-passou-a-usar-jamstack/jamstack.png'
heroAltImage: 'Jamstack'
---

## Introdução

Por volta de 2017, iniciou-se uma revolução no desenvolvimento de páginas web. Depois da adoção do mercado dos Static Site Generators nos times de engenharia e da imensa economia no orçamento de infraestrutura, veio a questão de levar essa revolução para times menos técnicos, como Marketing, Copywriters, Demand Generation, Product Marketing, etc.

## Motivação

A motivação por trás disso era escalar a criação, edição e manutenção de conteúdo sem a necessidade de passar por um desenvolvedor. Com o crescimento exponencial da Azion, foi preciso encontrar uma maneira de facilitar esses processos de conteúdo web para viabilizar o acompanhamento dessa escalada.

Para ter uma breve idéia do crescimento, passamos de um desenvolvedor de uma agência terceira que cuidava do blog para:

- um time de copywriters cuidando da área de Documentação de Produtos com mais de 15 editores;
- um time de conteúdo para cuidar dos Casos de Sucesso, com mais de 10 editores;
- um time de Product Marketing com mais de 15 editores geradores de conteúdo.

Praticamente saímos de uma ou duas pessoas, que eram responsáveis por tudo, para três ou mais times com cerca de 14 pessoas, incluindo o pessoal que não escreve (entre editores, líderes e outros), mas que também possuem determinadas responsabilidades perante nossa presença web.

## Por que ir em direção ao JAMStack e não um CMS normal?

![](/static/uploads/blog/pt-br/como-a-azion-passou-a-usar-jamstack/jamstack.png)

LAMP Stack (Linux, Apache, MySQL, PHP/Perl/Python) é o exemplo mais comum possível quando falamos de web service. Já JAMStack (Javascript, APIs e markup) é a stack que mais vem crescendo, pois abusa de todo o poder que o Front-End pode ter. APIs conectam o Front-End aos serviços necessários (como bancos de dados de conteúdo e gateways de pagamento, por exemplo) e as páginas são servidas como arquivos estáticos.

A diferença mais importante entre JAMStack e a tradicional LAMP Stack é que a primeira não precisa ser levantada a partir de um servidor com conteúdo gerenciado por bancos de dados. Tudo é gerado em tempo de build e enviado para uma CDN (Content Delivery Network). As funcionalidades do tipo servidor são gerenciadas por serviços de terceiros, conectados por meio de APIs.

Para tornar mais fácil a criação de um site JAMStack, surgiram também geradores de sites estáticos. Com um SSG como Gatsby ou Hugo, um desenvolvedor pode criar um site básico rapidamente.

## Vantagens do JAMStack perante LAMP stack

**Performance:** Como as páginas já foram geradas em tempo de build, aquele tempo de geração do conteúdo ou cache do servidor é eliminado junto com a demanda de um banco de dados.

**Custo:** Com uso de uma CDN, torna-se muito fácil a escalabilidade, não tendo que se preocupar com scale de servidor, banco de dados etc. O custo fica sob demanda, o que também resolve o problema de disponibilidade.

**Segurança:** Sites pré-construídos não têm interação dinâmica com o servidor, então não é necessário se preocupar com a segurança de bancos de dados ou ataques DDoS. Com LAMP stack, é preciso constantemente ficar atento a updates de segurança, entre outros problemas.

**Melhor experiência de desenvolvimento:** Se tornou muito mais simples desenvolver para web com o Front-End focado no core, não tendo todo aquele pipeline entre a stack client-side e server-side com intermináveis contratos. Assim, tudo se conecta via API com responsabilidades únicas, usando o Github/Gitlab para integrações para facilitar a vida do deploy.

## Conclusão

JAMStack é uma das melhores partes do ecossistema JavaScript. Se seu time possui acesso a pessoas técnicas com conhecimento Front-End ou se tem pouco orçamento disponível para desenvolver um grande projeto focado em web, acaba sendo um ótimo caminho. Além de facilitar todo gerenciamento, desde a infraestrutura, o deploy e até a performance.
