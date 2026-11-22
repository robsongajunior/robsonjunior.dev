---
title: 'Credentials Management API — Terra Webmail'
meta_robots: 'index, follow'
meta_description: 'Hoje em dia, por mais que pareça superficialmente simples realizar a implementação de um login, logo mais à frente pode se tornar um Frankenstein ou até mesmo acabar em um grau de complexidade alto.'
categories: ['javascript', 'front-end']

date: 'Mar 12 2018'
dateUpdate: ''

heroImage: '/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-s3sq4GmkEo-zbq_FyA2CDA.jpeg'
heroAltImage: 'Credentials Management API'
---

![](/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-s3sq4GmkEo-zbq_FyA2CDA.jpeg)
> NOTA: "Rewrite do post escrito em: https://braziljs.org/artigos/credentials-management-api-terra-webmail/"

Este artigo tem como objetivo mostrar por que e como foi implementada a *Credential Management*, bem como os benefícios dessa API, usando como exemplo o login do novo [Terra Webmail](https://mail.terra.com.br/signin).

[Assista ao vídeo no YouTube](https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FOy5F9h5JqEU%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOy5F9h5JqEU&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOy5F9h5JqEU%2Fhqdefault.jpg&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=youtube)

### PILARES

A API tem como base três pilares:

- salvar/gerenciar os dados da credencial;
- permitir acesso com apenas um tap no seletor de contas;
- simplificar o fluxo de acesso;

### LET’S GO BABY

Sabemos que hoje em dia, por mais que pareça superficialmente simples realizar a implementação de um login, logo mais à frente pode se tornar um *Frankenstein* ou até mesmo acabar em um grau de complexidade alto. Muitas vezes, além de gerenciar o login da nossa aplicação, temos os logins de terceiros [Facebook, Twitter, GitHub, Google].

Como temos por costume **não compartilhar** senhas entre aplicações por **motivos de segurança**, acabamos tendo um problema para memorizar todas elas — é **nessa hora que entra o trabalho** da *Credential Management API*. Olhando por cima, temos uma lista de:

- [GitHub](https://github.com/)
- [Gmail](https://mail.google.com/mail/u/0/#inbox)
- [Facebook](https://facebook.com/)
- [Twitter](https://twitter.com/)
- [Instagram](https://www.instagram.com/)
- [Medium](https://medium.com/)
- [Speaker deck](https://speakerdeck.com/)

Esses são os mais comuns, uma pessoa pode ter muito mais que isso para memorizar…

### BENEFÍCIOS

- **facilita** a escolha em caso de **múltiplos usuários**;
- permite uso de **interface nativa** para **múltiplos devices**;
- **identifica** o login que o usuário fez **anteriormente** na página, mesmo que o usuário não tenha auto-login no browser, **permitindo** a ele se logar com apenas **um tap/click**.
- possibilita **interação com o browser** já que ele auto-preenche campos de login/senha atualmente;
- oferece **auto sign in** entre **diferentes dispositivos**;

### AUTO SIGN IN

Esse comportamento nos fez dizer *“wow!”*

![](/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-ynRRDlSx-7V3i_vjVatinw.png)

Caso você esteja logado em sua conta no Google Chrome e faça login em outro dispositivo na mesma página com a mesma conta, o browser identificará que foi efetuado o login e, com isso, ocorrerá o *auto sign in*.

![](/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-Q92vtU6BkPOjL-wsOhH2wA.png)

### PASSO 1 — EFETUANDO LOGIN E ARMAZENANDO A CREDENCIAL

Aqui, vamos ver como foi implementada essa feature no novo [Terra Webmail](https://mail.terra.com.br/signin).

![E.g, Tela Login/Cadastre-se Mail Terra](/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-zGxh63P0HCZ8SnW61MeyBg.png)
> Tela de login com um formulário que contém dois campos: **usuário** e **senha**;

```
var loginForm = document.querySelector('#signin');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
```

```
    validateLoginForm().then(function(res) {
        doLogin(res.user, res.pwd);
    });
});
```

O usuário irá digitar seu *username/password* para efetuar o login pela primeira vez e aí começará a mágica do *Credentials*.

Podemos ver que, quando o evento de envio do formulário for disparado, os valores do formulário de login serão validados. Caso esteja tudo OK, vai disparar a função **doLogin**, que será responsável por efetuar o login efetivo e salvar a credencial usando a Credentials Management API.

Um pouco antes de entrarmos no login, vamos validar se a feature está disponível no browser atual que estamos usando.

```
var cmapiAvailable = window.PasswordCredential && 'credentials' in navigator;
```

Agora que sabemos se está ou não disponível, podemos seguir nossa implementação.

```
function doLogin(user, pwd) {
    return authenticate(user, pwd).then(function(response) {
        // var cmapiAvailable = window.PasswordCredential && 'credentials' in navigator;
        if(cmapiAvailable) {
            var pwdCred = new window.PasswordCredential({
                id: user,
                password: pwd
            });
            navigator.credentials.store(pwdCred);
        }
```

```
        return response;
    });
};
```

A partir daqui, iremos ver o que a função **doLogin** faz.

Ela recebe dois parâmetros, que são os responsáveis por realizar a autenticação: *user — username, pwd — password.*

Após nos certificarmos de que temos a feature disponível, usamos os parâmetros **user** e **pwd** para criar um objeto JavaScript com os atributos **id** e **password**. Logo na próxima linha, passamos esse objeto para uma *nova instância* de **PasswordCredential**.

A variável **pwdCred** armazenará um objeto de credencial, o qual será possível armazenar no browser.

Esse foi o primeiro passo: efetuamos o login e, logo em seguida, a credencial foi armazenada.

Pronto. Mais fácil do que se imaginava, certo?

### PASSO 2 — VERIFICANDO CREDENCIAL SALVA E AUTO SIGN IN

```
function autoSignin() {
    // var cmapiAvailable = window.PasswordCredential && 'credentials' in navigator;
    if(!cmapiAvailable) {
        return;
    }
```

```
    navigator.credentials.get({
        password: true,
        mediation: 'optional'
    }).then(function(cred) {
        if(cred) {
            doLogin(cred.id, cred.password);
        }
    });
};
```

> O atributo **password**, caso **não seja true**, *não conseguirá pegar a credencial*, caso existente.

A função *autoSignin* é disparada logo após o carregamento da página por completo. Agora, iremos ver como e quando buscaremos a credencial caso ela seja existente.

Como já vimos, iremos na primeira linha verificar a existência da API. Caso ela não exista, “matamos” o fluxo.

O mediation pode ter os seguintes valores:

![](/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-wAF1P7H3RVxda3vCLKpOzA.png)

- **silent:** com uma ou mais pessoas, caso tenha credencial salva, tentará logar de forma silenciosa. Caso preventSilentAccess() seja disparado antes, irá ignorar a ação de tentar logar de forma silenciosa e automática.
- **optional:** com uma pessoa, caso tenha credencial salva, tentará logar de forma silenciosa. Caso preventSilentAccess() seja disparado antes, irá ignorar a ação de tentar logar de forma automática e abrirá o seletor de contas.
- **required:** sempre exibirá o seletor de contas caso já tenha memorizado alguma credencial.

### POR QUE ESTAMOS USANDO OPTIONAL?

Vamos entender linha por linha.

Estamos dizendo que caso já tenha sido efetuada e salva a credencial de um login, e o usuário *não tenha disparado preventSilentAccess()*, ele irá tentar logar de forma automática e silenciosa.

Não havendo a credencial porque o usuário disparou o *preventSilentAccess()*, ‘optional’ respeita a opção do usuário e abrirá o seletor de contas caso um ou mais usernames já estejam salvos.

![](/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-6K9tlq6wjze1PQkMAkX7cQ.png)

Optamos por permitir que o usuário tenha o poder de cancelar o *auto sign in*. Para isso, é necessário disparar a função **preventSilentAccess()**, que é a responsável por comunicar à API que, na próxima visita, não deve disparar o *auto sign in*.

### DEBUGGER — chrome://password-manager-internals/

É possível acompanhar o que está acontecendo com a API, ver quando fluxos de auto *sign in* e *sign out* ocorrem, qual formulário ele está interceptando, entre outras coisas.

![](/static/uploads/blog/pt-br/credentials-management-api-terra-webmail/1-uGO7c_8llULfCD8PevsOYw.png)

### DESVANTAGENS

Por enquanto, apenas o Chrome tem suporte para essa feature, tanto *desktop* quanto *mobile*.

Porém, a API [w3c credential management](https://www.w3.org/TR/credential-management-1/) já está em draft na **W3C**. Em um futuro breve teremos uma implementação cross browser.

### REFERÊNCIAS

- [Credential Management API Feature Detection Check-up](https://developers.google.com/web/updates/2018/03/webauthn-credential-management)
- [Sign-in on the Web — Credential Management API and Best Practices](https://medium.com/dev-channel/sign-in-on-the-web-credential-management-api-and-best-practices-d21aed14b6fe)
- [Credential Managament API — elo7](https://engenharia.elo7.com.br/credential-management-api/)
- <https://twitter.com/mobtec/status/986706098257264641>
- <https://developers.google.com/web/updates/2018/03/webauthn-credential-management>
- <https://developers.google.com/web/fundamentals/security/credential-management>
- <https://medium.com/dev-channel/sign-in-on-the-web-credential-management-api-and-best-practices-d21aed14b6fe>
- <https://engenharia.elo7.com.br/credential-management-api/>
- <https://www.youtube.com/watch?v=NJ-sphu2DqQ&t=806s>
- <https://www.youtube.com/watch?v=Oy5F9h5JqEU>
