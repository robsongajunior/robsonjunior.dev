---
title: 'Atualizando a Documentação JAM Stack da Azion - Migrando Jekyll para Astro'
meta_robots: 'index, follow'
meta_description: ''
categories: ['JamStack', 'Jekyll']

date: 'Sep 21 2023'
dateUpdate: ''

heroImage: ''
heroAltImage: 'Jekyll --> AstroJS'
---

## Atualizando a Documentação JAM Stack da Azion  --  Migrando Jekyll para Astro

Há 3 anos trabalho com Jekyll diretamente todos os dias, uma ferramenta do tipo SSG(site static generator). A tecnologia por baixo dos panos é Ruby on Rails e Liquid como template engine para escrever e reutilizar componentes trazendo uma arquitetura mais saudável. Jekyll e seus plugins ajudaram muito para evolução da geração de site estáticos.

- jekyll-multiple-languages-plugin
- jekyll-paginate
- jekyll-category-pages
- kramdown

Com poucos plugins é possível criar um blog quase que por completo em múltiplos idiomas. Mas, chegou a hora de ir além


## Astro e primeiras percepções

Logo de início fico com a percepção que a maleabilidade aumenta consideravelmente.

**Exemplo:**

I18N para Jekyll temos os plugins configurados no arquivo _config.yml e Gemfile e usamos de forma fixa. O que acontece em tempo de build é lido a partir de uma pasta.

Com AstroJS passamos a utilizar collections, o que permite termos acesso a esses arquivos utilizando uma API, já com implementações para facilitar o uso somando a elas conectarmos um funções de request, caso precisamos buscar externamente um dado para construir nossa página SSG, assim misturamos a criação da página de forma estática dando a maleabilidade necessária para dinamizar o que for preciso durante o processo de build.

## Debug

Existe ferramentas com debug logs mais refinados, as vezes uma quebra por um pequeno descuido pode ser tornar horas de dor de cabeça!


### Errors

> No static path found for requested path. https://docs.astro.build/en/reference/errors/no-matching-static-path-found/

A documentação é bem clara, mas problemas como / ao final do permalink usado pelo Jekyll mas tentando levar para Astro.build, iá causar esse error, basta remover a / final e estará liberado para utilizar passando como […slug]

> [@mdx-js/rollup] Could not parse expression with acorn: Unexpected token

Marcações das variáveis de template Liquid junto ao markdown irá gerar o error acima. 

**Exemplo:** `[Edge Firewall]({% tl documentation_products_edge_firewall %})`
Isso para extensão .mdx, .md irá compilar normalmente, sendo a variável impressa no formato string.

> [@mdx-js/rollup] Could not parse expression with acorn: Unexpected character '#'

Este error é disparado quando compilado utilizando mdx criando uma ancora em algum heading. Exemplo: `#My Title {#some_anchor}`
https://github.com/mdx-js/mdx/issues/1953


## Features

- collections
- getHeadings
- mdx custom components
- multiples library components (Vue, React, Astro Components)


## Primeiros passos: Jekyll → Astro

1. remover do front-matter o atributo layout, utilizado pelo Jekyll para durante o build encontrar o layout necessário da pasta _layouts. No astro/docs eles usam um atributo chamado type, no template tem um criado apenas para ler esse atributo e fazer switch do layout necessário. Nesse passo vamos utilizar o layout default, sem passar o type; find ./docs_[lang]/pages -name '*md' -exec sed -i '.bkp' '2d' {} \;
2. Remover ou conseguir de alguma forma substituir as variáveis de translate utilizadas pelo Jekyll ,{% tl [namespace] %} ;
3. Remover do name file o pré-fixo obrigatório pelo Jekyll (YYYY-MM-DD-filename.md);
4. Remove do Front-Matter todos attrs não utilizável. Aqui, precisei remover os permalink_en (deprecado a mto tempo mas alguns arquivos ainda estavam lá sem utilidade). Durante o 5.build é validado, caso não de match com o configurado, irá causar um error durante o build;
5. Remover do conteúdo dos arquivos markdowns as âncoras dos links para alguma section da página. O componente configurado é um plugin no qual gera automaticamente, o rehype;
6. Atualizar extensões dos arquivos de .md para .mdx;


## Seguindo a migração

Chegou a hora de deixar no tema da empresa. Aqui utilizamos um pacote front-end no qual temos organizados os tokens da empresa, nesse cenário basicamente precisamos dos tokens referente a cores.
Nós gostamos muito da documentação do Astro e os componentes disponíveis para usar no mdx, com isso deixamos as margens e espaçamentos proporcionais perante a versão original com pequenas adaptações.


## A importância do Design & Front-End

Até agora falamos de itens técnicos, mas após os tudo funcionando e os tokens instalados, como utilizar os tokens corretos para os elementos corretos? Para uma documentação de sucesso precisamos ter uma grande preocupação com contraste, peso de font-family após trazer para font-family do nosso tema, se após revisar peso e font-family a área de leitura ficou ok ou não? São diversas perguntas que sem alguém especialista que tem esse cuidado e conhecimento não seria possível migrar para algo tão agradável quando fossemos de um dark para light e vice-versa.


## Benefícios

1. Migrando documentação para Astro passamos a ter uma documentação mais rica devido aos editores terem acesso a utilizar componentes em suas documentações de uma forma fácil.
2. O formato de ilhas e seus técnicas de compilação automatizou muito o trabalho de otimização para performance, sendo um trabalho não refinado já atingindo nota 80 no pagespeed.web.dev
3. Possibilidade de mesclar tecnologias, vue, react e svelte sem precisar adaptar para uma abstração e compilação.
4. Astro é arquitetado para facilitar geração de conteúdo, podendo de uma forma fácil fazer um fetch para ir em seus CMS API ou utilizando a Content API para acessar seus arquivos locais em uma arquitetura Git Based.
5. Fácil Edge Deploy já sendo suportado na Azion.


## doc.azion.com

Acesse, me fale o que achou de como ficou! Já teve a chance de trabalhar ou até mesmo brincar com Astro? Tem um case e quer conversar sobre, sempre todos bem vindos.


## Referencias

- https://2022.stateofjs.com/en-US/libraries/rendering-frameworks/
- https://astro.build/
- https://docs.astro.build/en/getting-started/
- https://docs.astro.build/pt-br/guides/migrate-to-astro/from-jekyll/#key-similarities-between-jekyll-and-astro
- https://www.youtube.com/watch?v=fCcT6-PqL1Q
