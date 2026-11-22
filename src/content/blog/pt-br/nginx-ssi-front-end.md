---
title: 'Nginx + SSI & Front-End'
meta_robots: 'index, follow'
meta_description: 'Este artigo aborda uma alternativa que, sendo uma poderosa solução juntando tecnologias de back-end e front-end, irá facilitar o trabalho de desenvolvimento, validação e deploy, impactando desde o desenvolvedor até o mais alto nível da empresa.'
categories: ['front-end']

date: 'Mar 13 2020'
dateUpdate: ''

heroImage: '/static/uploads/blog/pt-br/nginx-ssi-front-end/1-HxshvkxpXBONjC_7Uy_7gQ.jpeg'
heroAltImage: 'Capa - Foguete lançado levando um homem'
---

![](/static/uploads/blog/pt-br/nginx-ssi-front-end/1-HxshvkxpXBONjC_7Uy_7gQ.jpeg)

Este artigo aborda uma alternativa que, sendo uma poderosa solução juntando tecnologias de back-end e front-end, irá facilitar o trabalho de desenvolvimento, validação e deploy, impactando desde o desenvolvedor até o mais alto nível da empresa. Pois, com o trabalho simplificado, maior a qualidade e quantidade das entregas.

Para um entendimento melhor, brevemente descreverei as tecnologias usadas.

### Nginx

**Nginx** (lê-se “engine x”) é um servidor [HTTP](https://pt.wikipedia.org/wiki/HTTP), [proxy reverso](https://pt.wikipedia.org/wiki/Proxy_reverso), proxy de e-mail IMAP/POP3.

Lida com requisições Web do tipo “event-based web server”; é possível diminuir o consumo de memória do servidor, passando as requisições Web primeiro pelo Nginx, assim, o servidor não precisa servir arquivos estáticos.

> <https://pt.wikipedia.org/wiki/Nginx>

### SSI

> Server Side Include

É um interpretador server-side, usado praticamente exclusivamente para a Aplicação Web. É comum ser usado para incluir conteúdo dinâmico e arquivos em uma página web, muito usado também para injetar código em tempo de execução server-side. Isso ocorre geralmente através de uma diretiva **#include.**

> <https://en.wikipedia.org/wiki/Server_Side_Includes>

Outras ferramentas também possuem suporte a marcações SSI.

- <https://httpd.apache.org/docs/2.4/mod/mod_include.html>
- <https://docs.microsoft.com/en-us/iis/configuration/system.webserver/serversideinclude>

### Front-End

O Front-End é liberado, pois o serviço executará antes de entregar a página ao usuário, ou será requisitado via browser utilizando HTTP Request. Para facilitar, muitas vezes apenas um [***curl***](https://curl.haxx.se/) é o suficiente.

### Começando

Com os temas alinhados acima, temos o suficiente para entender o objetivo. Preste atenção na imagem a seguir:

![](/static/uploads/blog/pt-br/nginx-ssi-front-end/1-3EhyyvAfAf_02gOfhkqSsg.png)

Agora vamos detalhar passo a passo:

1. User Agent dispara uma request solicitando uma página para algum endpoint;
2. Endpoint tem um Nginx na frente, como o Nginx recebe a primeira request, ele repassa para a origem, podendo ser fora usando terceiros com um proxy\_pass ou até mesmo servindo via o próprio Nginx;
3. Quando essa request volta com o conteúdo da página;
4. O Nginx, com SSI ativo, verifica se tem alguma marcação SSI;
5. Caso não seja encontrada marcação SSI, o Nginx entrega a página para o User Agent;
6. Caso seja encontrada marcação SSI, o Nginx a interpretará e irá fazer uma sub\_request para o serviço externo que informa o conteúdo a ser injetado;
7. Sub\_request feita pelo Nginx para o serviço externo recebe o conteúdo a ser injetado na página;
8. Após injetado, Nginx devolve a página montada para o usuário;

> **NOTA:** Como no nosso caso estamos utilizando um serviço externo para nos indicar o conteúdo a ser injetado, pode ser requisitado também via JavaScript.

### Implementação

Irei iniciar com a premissa de que já tenha o Nginx instalado. Agora, vamos iniciar as configurações:

**Configurando Nginx:**

```
# Nginx basic sample configuration

server {
    ssi on;

    location / {

       # set $origargs - setado e responsável por repassar query string
       # neste caso o Nginx está entregando o próprio HTML, mas poderia ser um proxy_pass para uma origem.
```

```
        set $origargs $args;

        root /usr/share/nginx;
        index index.html;
    }

    # config used by SSI
    location /service {
       # $newuri is necessary to concat browser qh with SSI markup on HTML file
       set $newuri $is_args$args&$origargs;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://meu.servico.com$newuri;
    }
}
```

No arquivo index.html, teremos o seguinte código:

```
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Nginx + SSI para Front-End</title>

    <!--# include virtual="/service/?component=mod.boilerplate&format=html&render=pre" -->
</head>
<body>

    <!--# include virtual="/service/?component=mod.aztech&format=html&render=pos" -->
</body>
```

Depois de processadas, as marcações serão alteradas gerando o seguinte resultado:

```
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Content Delivery Network (CDN) || Azion Technologies</title>
  <link href="style.css" rel="stylesheet" type="text/css" media="screen">

    <link type="text/css" rel="stylesheet" href="https://aztechjs.azion.com/azion-boilerplate/@css/main.min.css"/>
</head>
<body>
    <script type="text/javascript" src="https://aztechjs.azion.com/aztechjs/namespace.min.js"></script>
</body>
```

> No HTML gerado, estou usando recursos que utilizamos aqui na [Azion Technologies](https://www.azion.com/pt-br/).

### Robson, isso que você chama de ferramenta poderosa?

Calma, ainda faltam alguns pontos a serem mostrados:

Note que temos duas marcações:

- *<!--# include virtual="/service/?component=mod.boilerplate&format=html&render=pre" -->*
- *<!--# include virtual="/service/?component=mod.aztech&format=html&render=pos" -->*

Nessas marcações temos alguns parâmetros onde irei detalhar o que cada um é:

- ***component:*** parâmetro que informa o id do conteúdo solicitado, este parâmetro pode ser repetido pedindo diferentes componentes;
- ***format:*** utilizamos como valores, ***html*** e ***json*** — Valor html usado quando requisitado via back-end, pois o conteúdo a ser injetado é html. Valor json utilizado quando requisitado via JavaScript, pois será retornado um json, assim sendo o Front-End responsável por injetar os recursos;
- ***render:*** utilizamos como valores, ***pre*** e ***pos*** — Usado apenas quando format=html, isso indica em qual parte está sendo requisitado. Quando format=json, vêm todos os recursos na mesma request;

Para um melhor entendimento, irei mostrar um json de configuração utilizado pelo serviço que entrega os recursos:

```
////////////////////////////////////////////////
// arquivo de configuração mod.boilerplate.json
////////////////////////////////////////////////
{
    "id": "mod.boilerplate",
    "files": {
        "css": [
            {
                "path": "https://aztechjs.azion.com/azion-boilerplate/@css/main.css",
                "render": "pre"
            }
        ],
        "js": []
    },
    "contentType": "text/css",
    "dependencies": []
}
```

```
///////////////////////////////////////////
// arquivo de configuração mod.aztech.json ///////////////////////////////////////////
{
    "id": "mod.aztech",
    "files": {
        "css": [],
        "js": [
            {
                "path": "https://aztechjs.azion.com/aztechjs/namespace.min.js",
                "render": "pos"
            }
        ]
    },
    "contentType": "text/javascript",
    "dependencies": []
}
```

Cada recurso tem seu json de configuração, quando passado por dependências, o serviço faz um read dessas configurações recursivamente.

Essas são as configurações de produção, mas elas são alteradas dependendo dos parâmetros repassados, exemplo:

- *<! — # include virtual=”/service/?component=mod.boilerplate&format=html&render=pre”*

Caso sejam adicionados mais alguns parâmetros, como mod.boilerplate.env=stage, automaticamente essa configuração é alterada e é encontrada a versão de stage, ficando:

- *<! — # include virtual=”/service/?component=mod.boilerplate&mod.boilerplate.env=stage&format=html&render=pre”*

Outra possibilidade é entrelaçar com ambiente de desenvolvimento, assim ficaria:

- *<! — # include virtual=”/service/?component=mod.boilerplate&mod.boilerplate.env=dev&mod.boilerplate.user=user.name&format=html&render=pre”*

Aqui, o recurso entregue é da versão ainda em desenvolvimento de um usuário específico.

Porém é muito trabalhoso ficar trocando na marcação, então utilizamos query\_string, onde é repassado:

Então, com as marcações de produção, mas passando os mesmos parâmetros por query\_string, o browser repassa para o Nginx que repassa para o serviço criando a possibilidade de ter uma entrega de uma página via back-end sendo modificada pelo browser.

### Vantagens

- Aplicação não precisa de rebuild;
- Cruzar ambiente de produção com stage e development;
- Testar apenas a parte alterada;
- Agilidade na entrega;
- Segurança na validação;
- Performance, mesclando recursos obrigatórios para renderização de uma página com o que pode vir sob demanda;

### Desvantagens

- Necessário um serviço que saiba encontrar as URLs dos recursos;
- Front-End inteligente o suficiente que não trabalhe apenas com bundle;
- Ter um ambiente para poder colocar os recursos em um lugar que não seja localhost;

### NOTA

Em breve teremos um artigo mostrando todo o pipeline do desenvolvimento Front-End da [Azion Technologies](https://www.azion.com/pt-br/) utilizando todo workflow.

### Referência

- <https://nginx.org/en/docs/http/ngx_http_ssi_module.html>
- <https://en.wikipedia.org/wiki/Server_Side_Includes>

### Agradecimentos

Neste artigo, eu tenho algumas pessoas para agradecer e que levarei pra sempre como referências:

- Obrigado Alberto Boa Vista;
- Obrigado Guilherme Moser Sousa;
- Obrigado Rafael Cirolini;
- Obrigado Rói Avidan;
- Obrigado André Marquardt;

Essas pessoas sempre me inspiraram e me ajudaram a crescer, evoluir e me tornar um profissional de excelência, criativo e ousado. Nomes com quem foi uma honra trabalhar quando defendia a empresa [Terra Networks](https://www.terra.com.br/) e o mais importante, nomes que lembrarei quando tiver 70 anos. Pois desde lá venho aplicando tudo e mais um pouco do que aprendi.
