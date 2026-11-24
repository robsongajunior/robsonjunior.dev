---
title: 'O retorno: um quadro, um site novo e o blog de volta'
meta_robots: 'index, follow'
meta_description: 'Tudo começou com um quadro. O site foi refeito do zero, na identidade e na tecnologia, e o blog volta a ser publicado.'
categories: ['front-end', 'performance']

date: 'Nov 23 2026'
dateUpdate: ''

heroImage: '/static/uploads/blog/pt-br/o-retorno/depois-home-desktop.webp'
heroAltImage: 'Home nova do robsonjunior.dev: ilustração em retícula de uma figura de capuz digitando num teclado, em verde-limão sobre preto, ao lado do nome ROBSON JÚNIOR em letras condensadas'
---

Tudo começou com um quadro.

Eu tenho uma obra física com a ilustração que hoje abre a home deste site: uma figura de moletom com capuz, debruçada sobre um teclado, o rosto escondido na sombra e preenchido por letras, uma janela com grades ao fundo. Traço de gravura, cara de HQ, retícula por cima de tudo. Verde-limão sobre preto.

Olhando para ele, a ideia veio sozinha: e se o site tivesse essa cara?

E não só a cara do quadro. Eu queria trazer de volta algumas coisas do **readsec**, de uns 10, 12 anos atrás, e reviver aquela pegada de design. O quadro foi a faísca; o readsec foi a referência. O resto foi trabalho.

## O que estava no ar

Até hoje, quem abria o robsonjunior.dev encontrava uma tela preta, o slogan "BORN TO BUILD AND DELIVER" em letras 3D cinza e um convite: "Pressione ⌘ k para começar". Era uma paleta de comandos. O menu tinha Home, Blog, Entregas, Github, Sobre e Palestras.

![Home antiga no desktop: tela preta com o slogan BORN TO BUILD AND DELIVER em letras 3D cinza e a instrução para pressionar Command K](/static/uploads/blog/pt-br/o-retorno/antes-home-desktop.webp)

Era isso. E o blog estava parado.

## O que virou

A home nova abre com a cena do quadro. O nome vem em tipografia condensada enorme, "ROBSON JÚNIOR", com "porto alegre, rs · desde 2014" logo acima e uma linha que resume onde estou: Product Engineer na Azion Technologies. Produto na cabeça, engenharia nas mãos. Edge, IA e open source.

![Home nova no desktop: a ilustração do quadro, com a figura de capuz digitando, ocupa o fundo; à esquerda, o nome ROBSON JÚNIOR e a descrição de Product Engineer na Azion](/static/uploads/blog/pt-br/o-retorno/depois-home-desktop.webp)

A ilustração não é uma imagem chapada. Ela foi separada em camadas (fundo, meio e frente) que se movem em canvas. É o quadro ganhando um pouco de profundidade na tela.

No celular, a mesma ideia precisou caber em outra proporção:

![Home antiga no celular: tela preta com o slogan em letras 3D](/static/uploads/blog/pt-br/o-retorno/antes-home-mobile.webp)

![Home nova no celular: a cena ilustrada com o nome em destaque](/static/uploads/blog/pt-br/o-retorno/depois-home-mobile.webp)

As outras páginas seguiram o mesmo caminho. Home, [sobre](/pt-br/sobre/), [palestras](/pt-br/palestras/), blog, entregas e [contato](/pt-br/contato/) viraram páginas editoriais, cada uma com seu tema. A Sobre, por exemplo, tem a própria cena ilustrada.

![Página Sobre antiga no desktop](/static/uploads/blog/pt-br/o-retorno/antes-sobre-desktop.webp)

![Página Sobre nova no desktop: cena ilustrada em tons de ciano com o título PRODUCT ENGINEER](/static/uploads/blog/pt-br/o-retorno/depois-sobre-desktop.webp)

![Página de palestras antiga no desktop](/static/uploads/blog/pt-br/o-retorno/antes-palestras-desktop.webp)

![Página de palestras nova no desktop, no layout editorial do site novo](/static/uploads/blog/pt-br/o-retorno/depois-palestras-desktop.webp)

Alguns detalhes que ninguém pede, mas que eu queria: o favicon "RJR" acompanha o tema de cada página, e um brilho suave segue o cursor. A página de contato, que antes dava 404, agora existe e tem formulário. O inglês ficou reduzido por enquanto a home, about e contact.

## Por baixo do capô

Identidade nova era o objetivo. Mas já que eu ia mexer em tudo, aproveitei para arrumar a casa. Medi o site no ar e o build novo com Chrome headless, no desktop. Os números abaixo são em KB descomprimidos.

### Fontes

**Antes:** Rubik em `.ttf`, de 3 a 5 arquivos de ~203 KB cada. Eram 609 KB na home, 811 KB num post e 1014 KB na página Sobre.

**Agora:** três arquivos woff2 auto-hospedados (Big Shoulders Display, IBM Plex Sans e IBM Plex Mono), só com os subconjuntos latin e latin-ext. São 94 KB em todas as páginas.

O protótipo novo usava Google Fonts. Antes de publicar, trouxe tudo para o próprio domínio, para controlar o cache na edge. As duas fontes principais têm preload.

### JavaScript

**Antes:** ~282 KB em toda página. React, React DOM, a paleta de comandos (kbar), Vue e nanostores, tudo junto.

**Agora:** ~104 KB na home e na Sobre, ~80 KB num post. React, kbar e nanostores saíram. Ficou só Vue, em ilhas do Astro, que só carregam onde existe interação: o brilho que segue o cursor, as cenas animadas do hero e o sumário dos posts.

### Dependências

**Antes:** 15 dependências de runtime no `package.json` (astro ^5.2.3, @astrojs/react, @astrojs/vue ^5, react, react-dom, kbar, nanostores, @nanostores/vue, @types/react e outras), mais sass.

**Agora:** 7. astro ^7.4.13, @astrojs/vue ^7, @astrojs/mdx ^8, @astrojs/markdown-remark, @astrojs/rss, @astrojs/sitemap e vue.

Tailwind e PrimeVue chegaram a ser testados no meio do caminho. Saíram antes de chegar aqui.

### Node e Astro

**Antes:** Node fixado em 20.5.1 e Astro 5.

**Agora:** Node 26 (LTS) no projeto e no CI, via `.nvmrc`, e Astro 7, com content collections no Content Layer (glob loaders), Vite 8 e Zod 4.

A migração de versão não foi por esporte. O `npm audit` apontava 7 vulnerabilidades: 1 crítica, 3 altas e 3 baixas. A crítica era um XSS no `define:vars` e em atributos espalhados do Astro, corrigido só na versão 7. Depois da migração: zero.

Para garantir que nada quebrou pelo caminho, conferi que todas as URLs, o texto visível e as tags de SEO ficaram idênticos, e comparei screenshots pixel a pixel.

### Os posts voltaram para casa

**Antes:** a listagem do blog carregava imagens de miro.medium.com e de robsongajunior.github.io. Conteúdo meu, servido por terceiros.

**Agora:** os textos e as imagens dos posts vivem no próprio repositório. A listagem caiu de ~1975 KB em 25 requisições para ~242 KB em 13, sem nenhum domínio de terceiros. Aproveitei para revisar os posts em português e organizar as categorias.

![Listagem antiga do blog no desktop](/static/uploads/blog/pt-br/o-retorno/antes-blog-desktop.webp)

![Listagem nova do blog no desktop, com os posts e as imagens servidos pelo próprio site](/static/uploads/blog/pt-br/o-retorno/depois-blog-desktop.webp)

E a página de leitura também mudou:

![Post antigo no desktop](/static/uploads/blog/pt-br/o-retorno/antes-post-desktop.webp)

![Post novo no desktop, com o layout de leitura e o sumário do novo site](/static/uploads/blog/pt-br/o-retorno/depois-post-desktop.webp)

### SEO e descoberta

**Antes:** o [RSS em português](/pt-br/rss.xml) dava 404. O `robots.txt` também.

**Agora:** os dois existem e o feed traz todos os posts. As páginas que existem nas duas línguas têm hreflang (pt-BR, en e x-default), todas têm canonical, e há sitemap.

### Um site para pessoas e para agentes

Toda página `/x/` tem agora um gêmeo em Markdown em `/x.md`. A home em português, por exemplo, está em [/pt-br.md](/pt-br.md). Cada página anuncia o seu gêmeo com `<link rel="alternate" type="text/markdown">`, e na raiz existe um [/llms.txt](/llms.txt) listando tudo. Antes, os dois davam 404.

O site agora é lido por pessoas e por agentes de IA, e cada um recebe o formato que faz sentido para ele.

### Pipeline e segurança

**Agora:** um novo workflow de segurança no GitHub Actions roda `npm audit` (falha a partir de moderate) e `npm audit signatures`, o TruffleHog procura segredos verificados no histórico inteiro e o depcheck aponta dependências não usadas. O `package-lock.json` passou a ser versionado e o deploy usa `npm ci`.

O caminho até o ar continua o mesmo: push na main, build, bucket no GCP, entrega pela Azion na edge. GA4 e Microsoft Clarity são carregados de forma controlada. Os layouts legados foram removidos e o código foi limpo de comentários.

## Os números, lado a lado

| | Antes | Agora |
|---|---|---|
| Fontes (home) | 609 KB, Rubik .ttf | 94 KB, 3 woff2 |
| Fontes (Sobre) | 1014 KB | 94 KB |
| JavaScript (home) | ~282 KB | ~104 KB |
| JavaScript (post) | ~282 KB | ~80 KB |
| Dependências de runtime | 15 + sass | 7 |
| Listagem do blog | ~1975 KB, 25 req. | ~242 KB, 13 req. |
| Domínios de terceiros no blog | 2 | 0 |
| Vulnerabilidades (`npm audit`) | 7 (1 crítica) | 0 |
| Node | 20.5.1 | 26 (LTS) |
| Astro | 5 | 7 |
| RSS pt-br, robots.txt, llms.txt | 404 | no ar |

## Sobre o peso, com franqueza

Seria fácil fechar dizendo que o site ficou mais leve. Não é verdade, pelo menos não no total.

A cena ilustrada do hero é feita de SVGs grandes: ~795 KB, ~458 KB e ~145 KB. A cena da Sobre tem ~2,8 MB.

Os ganhos estão em fontes, em JavaScript e em tirar terceiros do caminho. A ilustração é uma escolha consciente. Ela é a identidade do site, é o quadro na tela. O peso agora está onde eu quero que esteja: no que dá cara ao site, e não em bibliotecas que o visitante nunca vê.

## O blog está de volta

Foi um bom tempo sem publicar por aqui. O site novo existe, os posts antigos foram trazidos para casa e revisados, e este é o primeiro texto da nova fase.

Se quiser acompanhar, o [RSS](/pt-br/rss.xml) agora funciona. Se preferir conversar, a página de [contato](/pt-br/contato/) também.

E se você for um agente lendo a versão em Markdown: seja bem-vindo também.
