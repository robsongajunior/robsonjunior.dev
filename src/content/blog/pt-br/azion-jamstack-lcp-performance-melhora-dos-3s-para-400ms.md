---
title: 'Azion JAM Stack LCP Performance — melhora dos 3s para 400/600ms'
meta_robots: 'index, follow'
meta_description: 'Aqui voce irá ler um pouco dos resultados das small actions para otimizar a quantidade de recursos utilizados pela página, consequentemente melhorando expressivamente o tempo de carregamento das mais de 900 páginas...'
categories: ['jamstack', 'performance', 'frontend']

date: 'Apr 20 2021'
dateUpdate: ''

heroImage: '/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-4w6vE0EojI-fSxK7SYNrIw.png'
heroAltImage: 'Azion JAMStack Performance: de 2.8s para 400ms — Performance Banner'
---

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-4w6vE0EojI-fSxK7SYNrIw.png)

Azion JAMStack Performance: de 2.8s para 400ms — Performance Banner

No artigo anterior fala sobre como foi a [Introdução Azion JAM Stack](/pt-br/blog/introducao-azion-jam-stack/) onde recomendo para introdutório deste.

Aqui voce irá ler um pouco dos resultados das small actions para otimizar a quantidade de recursos utilizados pela página, consequentemente melhorando expressivamente o tempo de carregamento das mais de 900 páginas que temos a baixo de <https://www.azion.com/> .

Temos 4 sistemas separados respondendo para nosso domínio principal, cada um com suporte [i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization) configurado para 3 idiomas: português, inglês, espanhol;

- [Blog](https://www.azion.com/pt-br/blog/)
- [Casos de Sucesso](https://www.azion.com/pt-br/casos-de-sucesso/)
- [Documentação](https://www.azion.com/pt-br/documentacao/)
- Landing Pages (marketing)

Apensar de serem projetos separados, todos utilizam os mesmos recursos que estão abaixo de <https://assets.azion.com/static/>

### Relação SSG com LCP

Com a adoção do [SSG](https://jamstack.org/generators/) no cenário Front-End vem também alguns ms a menos na hora de carregar a página. O que quero dizer com isso?

LCP — Largest Contentful Paint. É uma métrica voltada para o usuário para mensurar a [percepção de load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics).

Com o SSG podemos montar grade parte do conteúdo da página em tempo de build, não temos mais aquele tempo do processamento da requisição.

Métrica LCP calcula o tempo de renderização do maior conteúdo/imagem mostrado na tela para visualização em relação a quando a página começou ser carregada.

Sobre o indicado para métricas, a baixo temos o recomendado

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-R4kUKlR_bsef8r0DZTesdw.png)

<https://web.dev/vitals/lcp_8x2.svg>

Temos que ter cuidado quando falamos em performance pois a percepção do usuário pode ser diferentes do que realmente é mensurado, fazendo um site que pode ter um tempo maior parecer mais rápido apenas por trabalhar na percepção de usuário.

Nunca me esqueço da frase:

> Percepção de usuário é performance. — [Guilherme Moser](https://www.linkedin.com/in/guilhermems/), [Terra Networks.](https://www.terra.com.br/)

### Qual trabalho foi feito para alcançar os resultados?

Em uma rápida análise podemos ver que tinha algo errado, preste atenção na imagem abaixo:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-mDpfKPWwF-V5wbivqGfNlQ.png)

Ferramentas: Network + Coverage — Google Chrome Dev Tools

- Na faixa azul da aba network, podemos ver que temos um CSS de 2.0mb;
- Na faixa vermelha do coverage podemos ver **2 045 425 bytes** de css sendo que **2 021 783 não utilizados**, isso é **98.8% de processamento e tráfego desnecessário**.

Por mais que temos a possiblidade de fazer cache no browser, jogar a responsabilidade toda para cima dele seria uma irresponsabilidade, pois acarretaria em outros problemas, como um simples e constante deploy com constante refresh de cache prejudicaria não só o LCP mas como TTFB, TBT, TTI entre outros.

Bom, olhando para esse cenário com certeza precisávamos atualizar essa estrutura urgente, pois pelo fato de ser um site baseado em [JAM Stack](https://www.azion.com/pt-br/blog/beneficios-do-jamstack/) não poderíamos aceitar aquele péssimo desempenho de performance.

### Mãos ao trabalho

O trabalho basicamente foi quebrar o CSS. Veja nas imagens abaixo o que tinhamos:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-wa5jYHZhXy8HV44wtpTd0w.png)

parte 1— continua

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-NIHpQEpZjMFhVK3SssxEPw.png)

parte 2— continua

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-Jf0fIKHQ4yY-VgQSscvOZg.png)

parte 3 — final

Nossa primeira versão de site contava com esse compilado de CSS para todas as páginas.

Iniciamos transformando o que estava em ./pages/\_file.scss para ./pages/\_page.scss assim automaticamente na hora do Jekyll compilar não precisaria alterar destino nem alterar código.

Com isso cada arquivo que não possui \_ (usado por default no sass) para quando usar como import e não output, ao compilar geraria 1 para 1 em relação arquivo/output.

O que passou de apenas um bundle.css imenso de 2.0mb para vários arquivos menores, no qual mais ou menos cada um tem 100k. (ainda sem contar gzip)

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-LB_MfzWc52fEteM_3D42ZA.png)

Atual estrutura de páginas por css

Mas e os arquivos compartilhamos? Foi testado arquivo por arquivo para ver o que era realmente necessário ou não, e com isso chegamos ao compilado para fazer shared em todas as páginas:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-NGBRavzklTGiYtqpw1E3EA.png)

Recursos em comum para todas páginas

Bem menor né? Esse é o arquivo final de recursos compartilhados onde cara página interna vai usar algo como:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-DDZN_DKX1OhYjRXfaPIxcg.png)

Estilo da página de produtos

Em uma das páginas com maior número de componentes ficou com aproximadamente 90k após compilado.

### Integrando com o HTML

Para quem usa ferramentas de SSG está acostumado a configurar [Front-Matters](https://jekyllrb.com/docs/front-matter/), as ferramentas utilizam esse tipo de marcação ao topo do arquivo para dizer como o conteúdo deve ser compilado.

Com isso apenas fizemos pequenas mudanças nas nossas páginas.

Passamos de um header nas páginas HTML que continham tudo que precisava

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-n1YD0ZszeXSk_dYXcEZI2w.png)

para:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-K5CkmXxQp9fmOCleH5ZMqg.png)

Agora, esse estilo irá vir da configuração do Front-Matter que será atualizado durante o build. Algo como:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-73XyM5tj8M8v-WdWs5FKZg.png)

Podemos ver que utilizamos o máximo dos recursos já utilizados com sutil alteração onde nos proporcionou enormes ganhos.

### Quais foram os resultados?

No primeiro momento tinhamos esse tipo de resultado."

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-SWGzqBIExUpiLMAZ17Yo1w.png)

No novo modelo chegamos a ter mais de 70% de melhoria:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-Kpt60KTBwNtkVmAcEe_nag.png)

Ambos os testes eram para a página, <https://www.azion.com/pt-br/>

### Benchmark

- [WebPageTest Test Details - Dulles : www.azion.com/pt-br/ - 04/13/21 16:28:01](https://www.webpagetest.org/result/210413_BiDcJJ_96c3264b804396a13342f29105e4ea25/3/details/)
- [WebPageTest Test Result - Dulles : www.azion.com/pt-br/ - 04/16/21 15:27:53](https://www.webpagetest.org/result/210416_BiDcGJ_45e84776ce763441a0b3a495a8fc3a18/)

- Melhora de LCP de: 2.1s para 1.3s;
- Melhora de First Byte de: 0.256s para 0.18s;
- Melhora de Start Render de: 1.9s para 0.6s;
- Melhora de First Contentful Paint de: 1.8s para 0.63s;
- Melhora de Speed Index de: 2s para 0.7s;

Para mais resultados pode ser olhado diretamente nos testes.

### Novidades em breve

Ao que tudo indica, a importancia da arquitetura JAMStack está cada vez mais consolidado.

[More time, tools, and details on the page experience update](https://developers.google.com/search/blog/2021/04/more-details-page-experience)

A partir de junho um rollout irá começa ocorrer onde LCP, FID e CLS montam o novo sinal do ranking do Google “Page Experience”.

### Referências:

- [Introdução Azion JAM Stack](/pt-br/blog/introducao-azion-jam-stack/);
- [Render Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css#:~:text=Render%20Blocking%20CSS%20bookmark_border&text=By%20default%2C%20CSS%20is%20treated,and%20queries%20to%20unblock%20rendering.);
- [Largest Contentful Paint — LPC](https://web.dev/lcp/);
- [First Input Delay](https://web.dev/fid/) — FID;
- [Time to Interactive — TTI](https://web.dev/tti/);
- [Total blocking Time — TBT](https://web.dev/tbt/);
- [User Centric Performance Metrics](https://web.dev/user-centric-performance-metrics/#types-of-metrics);
