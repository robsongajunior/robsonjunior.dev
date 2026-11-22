---
title: 'Como usamos JavaScript Azion Edge Function para facilitar as próprias entregas'
meta_robots: 'index, follow'
meta_description: 'Com a execução de Edge Functions podemos facilmente escrever pedaços de códigos cruciais para o negócio, mas que não exatamente teríamos como configurar um servidor, segurança e todos aqueles itens que todos nós já conhecemos.'
categories: ['azion', 'edge', 'javascript']

date: 'May 12 2021'
dateUpdate: ''

heroImage: '/static/uploads/blog/pt-br/como-usamos-javascript-azion-edge-functions-para-facilitar-as-propri-as-entregas/1-niJ_iS-Mb_YY1aIxNK4dBQ.jpeg'
heroAltImage: 'Azion Edge Functions, JavaScript Code'
---

![](/static/uploads/blog/pt-br/como-usamos-javascript-azion-edge-functions-para-facilitar-as-propri-as-entregas/1-niJ_iS-Mb_YY1aIxNK4dBQ.jpeg)

Cover — JavaScript code

### Introdução

Em uma empresa de crescimento exponencial, cada vez mais precisamos garantir entregas de relevância cada vez maior em um espaço de tempo cada vez menor.

Com a execução de [Edge Functions](https://www.azion.com/en/products/edge-functions/#overview) podemos facilmente escrever pedaços de códigos cruciais para o negócio, mas que não exatamente teríamos como configurar um servidor, segurança e todos aqueles itens que todos nós já conhecemos.

Hoje o time de Marketing da Azion é responsável por todas as páginas web da empresa onde temos engenheiros trabalhando em conjunto com o time executando essa orquestração das páginas.

Nesse post iremos ver dois problemas importantes resolvidos usando JavaScript [serverless](https://www.azion.com/pt-br/documentacao/casos-de-uso/funcoes-serverless/) functions para entrega de larga escala.

### Problemas resolvidos

- Portal de [carreiras](https://www.azion.com/pt-br/carreiras/vagas/);
- [Sitemap](https://www.azion.com/sitemap.xml) de diferentes projetos abaixo do mesmo domínio;

#### Portal de carreiras

Para o [portal de carreiras](https://www.azion.com/pt-br/carreiras/), antes usávamos uma empresa terceira que gerava os dados e páginas, porém gostaríamos de melhorar e dar a nossa cara para o design e a usabilidade, mas para rodar tudo isso precisávamos de toda estrutura já conhecida, como:

- Servidor;
- Escalabilidade;
- Disponibilidade;
- Segurança;
- Updates;

Com Azion Cells (JavaScript Functions) já temos tudo isso configurado por default, além de rodar nativamente [código JavaScript direto na Edge](https://www.azion.com/pt-br/blog/javascript-azion-edge-functions/). Pelo fato de termos centenas de servidores espalhados por todos os estados brasileiros, temos a **garantia de escalabilidade** além de nossa function **rodar** o **mais perto possível** do **usuário.**

Pelo fato da Azion ter uma [CDN(Content Delivery Network)](https://en.wikipedia.org/wiki/Content_delivery_network) no seu catálogo de produtos, tem a obrigatoriedade de estar sempre disponível, com isso automaticamente também matamos os problemas de escalabilidade.

Pelo fato dessa arquitetura existir, automaticamente **temos** um **ambiente seguro** *contra ataques de crackers (caso não saiba a diferença entre hacker e cracker, você irá poder aprender* [*aqui*](https://www.educamaisbrasil.com.br/educacao/dicas/diferenca-entre-hacker-e-cracker)*)* como [DDos](https://owasp.org/www-community/attacks/Denial_of_Service), [Path Transversal](https://owasp.org/www-community/attacks/Path_Traversal) entre outros conhecidos.

Agora falando do JavaScript rodando na Edge, temos algo parecido com o código abaixo:

![](/static/uploads/blog/pt-br/como-usamos-javascript-azion-edge-functions-para-facilitar-as-propri-as-entregas/1-Cc8QQZFrtduOiI7xZazZuw.png)

Imagem do Azion Real Time Manager — Edge Functions JavaScript

![](/static/uploads/blog/pt-br/como-usamos-javascript-azion-edge-functions-para-facilitar-as-propri-as-entregas/1-5JJJPr9_3sn_ms_COKbKcA.png)

Imagem do Azion Real Time Manager — Edge Functions JavaScript

Uma pequena parte do código que busca dados em um lugar qualquer usado para montar nosso [Portal de Carreiras](http://azion.com/pt-br/carreiras/).

> **OBS:** A API Key é meramente ilustrativa.

Incrível, né? Mas ainda não terminou, vou contar logo abaixo como montamos nosso sitemap de diferentes repositórios em uma única entrega.

#### Sitemap da azion.com

Esta parte do post poderia ser separada em outro, mas quero lhe mostrar como é fácil e importante o uso e abuso do JavaScript no Edge.

Atualmente estamos usando [Jekyll](https://jekyllrb.com/) para trabalhar com [SSG](https://www.azion.com/en/blog/when-to-choose-ssr-vs-ssg-guide/) em alguns pontos da Azion, como:

- [Documentação](https://www.azion.com/pt-br/documentacao/)
- [Blog](https://www.azion.com/pt-br/blog/)
- [Casos de Sucesso](https://www.azion.com/pt-br/casos-de-sucesso/)

O domínio é o mesmo, porém os projetos são separados, são Jekyll separados, deploy independente e cada um usa um bucket, assim podemos fazer clean sem medo.

Para conseguirmos juntar isso tudo, cada projeto gera um arquivo sitemap.json onde durante o build escreve nesse json as urls existentes.

O input é algo como:

```
---
# Automated Sitemap
layout: null
---
```

```
{%- for page in site.html_pages -%}
    {%- assign index = index | push: page | uniq -%}
{%- endfor -%}
```

```
{%- for post in site.posts -%}
    {%- assign index = index | push: post | uniq -%}
{%- endfor -%}
```

```
{
    "pt-br": [
    {%- for document in index -%}
        {% if document.permalink_pt-br.size > 0 %}"https://www.azion.com/pt-br{{ document.permalink_pt-br }}"{% if forloop.last != true %},{% endif %}{% endif %}
    {%- endfor -%}
    ],
    "en": [
    {%- for document in index -%}
        {% if document.permalink.size > 0 %}"https://www.azion.com/en{{ document.permalink }}"{% if forloop.last != true %},{% endif %}{% endif %}
    {%- endfor -%}
    ],
    "es": [
    {%- for document in index -%}
        {% if document.permalink_es.size > 0 %}"https://www.azion.com/es{{ document.permalink_es }}"{% if forloop.last != true %},{% endif %}{% endif %}
    {%- endfor -%}
    ],
    "all": [
        {%- for document in index -%}
        {
            {% if document.permalink_pt-br.size  > 0 %}"pt-br": "https://www.azion.com/pt-br{{ document.permalink_pt-br }}"{% if document.permalink.size > 0 or document.permalink_es.size > 0 %},{% endif %}{% endif %}
            {% if document.permalink.size > 0 %}"en": "https://www.azion.com/en{{ document.permalink }}"{% if document.permalink_es.size > 0 %},{% endif %}{%- endif -%}
            {% if document.permalink_es.size > 0 %}"es": "https://www.azion.com/es{{ document.permalink_es }}"{% endif %}
        }{% if forloop.last != true %},{% endif %}
        {%- endfor -%}
    ]
}
```

Como output fica:

```
"pt-br": [
    "https://www.azion.com/pt-br/casos-de-sucesso/unicesumar/",
    "https://www.azion.com/pt-br/casos-de-sucesso/renner/",
    "https://www.azion.com/pt-br/casos-de-sucesso/nzn/",
    "https://www.azion.com/pt-br/casos-de-sucesso/lendico/",
    "https://www.azion.com/pt-br/casos-de-sucesso/getninjas/",
    "https://www.azion.com/pt-br/casos-de-sucesso/agibank/"
  ],
  "en": [
    "https://www.azion.com/en/success-case/omelete/",
    "https://www.azion.com/en/success-case/unicesumar/",
    "https://www.azion.com/en/success-case/renner/",
    "https://www.azion.com/en/success-case/nzn/",
    "https://www.azion.com/en/success-case/lendico/",
    "https://www.azion.com/en/success-case/getninjas/",
    "https://www.azion.com/en/success-case/agibank/"
  ],
  "es": [

  ],
  "all": [
    {
      "en": "https://www.azion.com/en/success-case/omelete/"
    },
    {
      "pt-br": "https://www.azion.com/pt-br/casos-de-sucesso/unicesumar/",
      "en": "https://www.azion.com/en/success-case/unicesumar/"
    },
    {
      "pt-br": "https://www.azion.com/pt-br/casos-de-sucesso/renner/",
      "en": "https://www.azion.com/en/success-case/renner/"
    },
    {
      "pt-br": "https://www.azion.com/pt-br/casos-de-sucesso/nzn/",
      "en": "https://www.azion.com/en/success-case/nzn/"
    },
    {
      "pt-br": "https://www.azion.com/pt-br/casos-de-sucesso/lendico/",
      "en": "https://www.azion.com/en/success-case/lendico/"
    },
    {
      "pt-br": "https://www.azion.com/pt-br/casos-de-sucesso/getninjas/",
      "en": "https://www.azion.com/en/success-case/getninjas/"
    },
    {
      "pt-br": "https://www.azion.com/pt-br/casos-de-sucesso/agibank/",
      "en": "https://www.azion.com/en/success-case/agibank/"
    }
  ]
}
```

> sitemap.json de Casos de Sucesso usado para exemplo

Agora temos mais 2 arquivos json, que são do blog e do site (a documentação é gerada através do site). Com esses arquivos publicados, podemos começar a utilizar JavaScript Edge Functions para gerar o conteúdo final:

<https://www.azion.com/sitemap.xml>

Esse sitemap.xml não é um arquivo, ele é gerado sem cache toda vez que for requisitado, assim não tem perigo de uma URL nova ser criada e não entrar para o sitemap.

O fluxo ficou bem simples:

- Receber request que identifica que está pedindo sitemap.xml;
- Fazer um fetch nos arquivos json;
- Ler conteúdo;
- Montar conteúdo;
- Entregar conteúdo;

```
async function pullSitemap() {
    // to configure another sitemap
    // just add the new fetch function in the list

    return Promise.all([
        fetch('https://www.urldositemapsite.com/sitemap.json', {mode: 'no-cors'}), // site
        fetch('https://www.urldositemapblog.com/sitemap.json', {mode: 'no-cors'}), // blog
        fetch('https://www.urldositemapcases.com/sitemap.json', {mode: 'no-cors'}) // cases
    ]);
}
```

```
async function extractSitemap(rlist) {
    if(!rlist) rlist = [];

    var list = [];
```

```
    for(var i = 0; i < rlist.length; i++) {
        list.push( rlist[i].json() );
    }
```

```
    return Promise.all(list);
}
```

```
/////////////////////
// REQUEST HANDLER //
/////////////////////
```

```
async function handleRequest(request) {
    var response = [];

    try {
        var xml = '';

        var headerXML = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
        var contentXML = '';
        var footerXML = '</urlset> ';

        var pullsitemap = await pullSitemap();
        var extracted = await extractSitemap(pullsitemap);

        extracted.forEach(function(item) {
            var all = item.all ? item.all : [];

            all.forEach(function(linkdata) {
                var defaulturl = '';
                var ptbr =  linkdata['pt-br'];
                var en = linkdata['en'];
                var es = linkdata['es'];

                var loc = '';
                var xhtmlLink = ''

                if(ptbr) {
                    loc = '<loc>' + ptbr + '</loc>';
                    defaulturl = ptbr;
                } else if(en) {
                    loc = '<loc>' + en + '</loc>';
                    defaulturl = en;
                } else if(es) {
                    loc = '<loc>' + es + '</loc>';
                    defaulturl = es;
                }

                if(ptbr) {
                    xhtmlLink += '\t\t<xhtml:link rel="alternate" hreflang="pt-br" href="' + ptbr + '" />\n';
                }
                if(en) {
                    xhtmlLink += '\t\t<xhtml:link rel="alternate" hreflang="en" href="' + en + '" />\n';
                }
                if(es) {
                    xhtmlLink += '\t\t<xhtml:link rel="alternate" hreflang="es" href="' + es + '" />\n';
                }

                xhtmlLink += '\t\t<xhtml:link rel="alternate" hreflang="x-default" href="' + defaulturl + '" />\n';

                contentXML += '\t<url>\n\t\t' + loc + '\n' + xhtmlLink +'\t</url>\n';
            });
        });

        xml += headerXML;
        xml += contentXML;
        xml += footerXML;

        response = new Response(xml.trim());
        response.headers.set("Content-Type", "application/xml");
    } catch(error) {
        response = new Response(`\n${JSON.stringify({error: error })}\n\n`);
        response.headers.set("Content-Type", "application/json");
    }

    return response;
}
```

```
///////////////////
// REQUEST LISTENER //
/////////////////////
```

```
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
});
```

Pronto, um pequeno código de 80 linhas monta um sitemap automático para diversos idiomas sem mais nos preocuparmos sobre regerar. Para cada novo projeto basta adicionar nas primeiras linhas onde tem a lista sendo executada por um Promise.all([]).

Fica muito mais simples vendo na prática, né?

### Considerações

O fato de não termos todas aquelas preocupações apontadas no início do post nos deixa livres para podermos gastar o tempo de desenvolvimento realmente com o desenvolvimento e entrega de features com valor, reduzindo o custo de infraestrutura, ficando apenas sob demanda, além de não precisarmos nos preocupar perante o ponto de vista de segurança, pois tudo isso já vem embutido no pacote ao utilizar Azion Edge Functions.

#### Referências

- [Execute JavaScript no Azion Edge Functions](https://www.azion.com/pt-br/blog/javascript-azion-edge-functions/);
- [Como a Azion passou a utilizar JAM Stack;](https://www.azion.com/pt-br/blog/como-a-azion-passou-a-usar-jamstack/)
- [Saiba como aumentar sua receita com um site tolerante a falhas;](https://www.azion.com/pt-br/blog/Saiba-como-aumentar-a-sua-receita-com-um-site-mais-tolerante-a-falhas/)
- [Como deixar seu site mais rápido e atrair mais visitantes;](https://www.azion.com/pt-br/blog/Como-deixar-seu-site-mais-rapido-e-atrair-mais-visitantes/)
- [When to choose SSG or SSR;](https://www.azion.com/en/blog/when-to-choose-ssr-vs-ssg-guide/)
