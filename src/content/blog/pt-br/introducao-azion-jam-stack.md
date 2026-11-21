---
title: 'Introdução Azion JAM Stack'
meta_robots: 'index, follow'
meta_description: 'Com a execução de Edge Functions podemos facilmente escrever pedaços de códigos cruciais para o negócio mas que não exatamente teríamos como configurar um servidor, segurança e todos aqueles items que todos nós já conhecemos.'
categories: ['jamstack', 'edge', 'performance']

date: 'May 21 2021'
dateUpdate: ''

heroImage: '/static/uploads/blog/pt-br/introducao-azion-jam-stack/1-SduL0ettqiMzzxA-SlFdpw.png'
heroAltImage: 'JAM stack — JavaScript, API, Markdown'
---

![](/static/uploads/blog/pt-br/introducao-azion-jam-stack/1-SduL0ettqiMzzxA-SlFdpw.png)

JAM stack — JavaScript, API, Markdown

### Introdução

Por volta de 2017 iniciava uma revolução no desenvolvimento de páginas web. Depois da adoção do mercado perante os [Static Site Generators](https://jamstack.org/generators/) nos times de engenharia e a imensa economia no budget de infra estrutura, veio a questão de levar essa revolução para times não técnicos como: Marketing, Copy Writers, Demand Generator, Product Market etc.

### Motivação

— Como escalar a criação/edição/manutenção de conteúdo sem a necessidade de passar por um desenvolvedor?

Com o crescimento exponencial da [Azion Technologies](https://www.azion.com/), foi preciso encontrar uma maneira de facilitar a criação/edição/manutenção do conteúdo web para viabilizar o acompanhamento do crescimento.

Para ter uma breve idéia do crescimento passamos de um desenvolvedor de uma agencia terceira que cuidava do site, blog para:

- um time de copy writers cuidando da área de [Documentação de Produtos](https://www.azion.com/pt-br/documentacao/) com mais de 15 editores;
- um time de conteúdo para cuidar dos [Casos de Sucesso](https://www.azion.com/pt-br/casos-de-sucesso/), com mais de 10 editores;
- um time de [Product Market](https://www.azion.com/pt-br/blog/) com mais de 15 editores geradores de conteúdo

Talvez esteja esquecendo algo mas praticamente saímos de uma ou duas pessoas responsáveis por tudo para 3 times ou mais com mais de 14 pessoas, nessa conta tem o pessoal que não são editores(entre editores, líderes etc), mas que também possuem determinadas responsabilidades perante nossa presença web.

### Por que ir em direção ao JAM stack e não um CMS normal?

![](/static/uploads/blog/pt-br/introducao-azion-jam-stack/1-8oBHYKPCwu3NBIrprgE1Qw.png)

JAMstack VS LAMPstack

Quando falamos de LAMPstack falamos de (Linux, Apache, MySQL, PHP/Perl/Python), exemplo mais comum possível quando falamos de web service.

JAMstack (Javascript, APIs and markup) é a stack que mais vem crescendo pois usa abusa de todo poder que o Front-End pode ter. APIs conectam o Front-End aos serviços necessários (por exemplo, bancos de dados de conteúdo e gateways de pagamento) e as páginas são servidas como arquivos estáticos.

A diferença mais importante entre JAMstack e a tradicional LAMPstack é que JAMstack não precisa ser levantado a partir de um servidor com conteúdo gerenciados por bancos de dados. Tudo é gerado em tempo de build e enviado para uma [CDN (Content Delivery Network)](https://en.wikipedia.org/wiki/Content_delivery_network). As funcionalidades do tipo servidor são gerenciadas por serviços de terceiros, conectados por meio de APIs.

Para tornar mais fácil a criação de um site JAMstack, surgiram também geradores de sites estáticos. Com um SSG como Gatsby ou Hugo, um desenvolvedor pode criar rapidamente um site básico.

### Vantagens do JAMstack perante LAMPstack

**Performance:** Como as páginas já foram geradas em tempo de build aquele time de geração do conteúdo ou cache do servidor é eliminado juntamente a demanda sobre um banco de dados.

**Custo:** Com uso de uma CDN se torna muito fácil a escalabilidade, não tendo que se preocupar com scale de servidor, banco de dados etc. O custo fica sob demanda, também resolvendo o problema de disponibilidade.

**Segurança:** Sites pré-contruídos não possuem interação dinamica com o servidor então não precisa se preocupar com a segurança de banco de dados, ataques DDoS. Com LAMPstack constantemente precisa ficar atento a updates de segurança entre outros problemas.

**Melhor experiencia de desenvolvimento:** Se tornou muito mais simples de desenvolver para web com o Front-End podendo focar no core, não tendo todo aquele pipeline entre a stack client-side com server-side com intermináveis contratos, assim tudo se conecta via API com responsabilidades únicas, hoje com Github/Gitlab para integrações para facilitar a vida do deploy.

### Conclusão

JAMstack é uma das melhores partes do ecossistema JavaScript, se seu time possui acesso a pessoas técnicas com conhecimento Front-End ou se tem pouco budget disponível para desenvolver um grande projeto focado em web acaba podendo ser um ótimo caminho. Além de facilitar todo gerenciamento desde infra, deploy até performance.

### Continua…

Este artigo foi o primeiro de uma série que virá sobre JAMstack. Teremos em breve conteúdo sobre como foram feitas as analises, escolha da ferramenta, implementação e muito mais que passamos e com os motivos de cada implementação entre, careers, blog, documentação etc.

### Leitura importante:

- [JAMstack vs Wordpress](https://www.azion.com/pt-br/blog/jamstackxwordpress/)
- [Os benefícios da abordagem JAMstack](https://www.azion.com/pt-br/blog/beneficios-do-jamstack/)
- [Azion apresenta Edge Functions JavaScript](https://www.azion.com/pt-br/blog/azion-apresenta-edge-functions/)
- [Melhores práticas Serveless](https://www.azion.com/pt-br/blog/melhores-praticas-serverless/)
- [Aplicações monolíticas ou modernas](https://www.azion.com/pt-br/blog/aplicacoes-monoliticas-ou-modernas/)
- [Execute JavaScript no Azion Edge Functions](https://www.azion.com/pt-br/blog/javascript-azion-edge-functions/)
- [Containers vs Serveless para aplicações modernas](https://www.azion.com/pt-br/blog/containers-vs-serverless-para-apps-modernas/)
