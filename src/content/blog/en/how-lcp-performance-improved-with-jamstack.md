---
translationKey: 'azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms'
title: "How JAMStack improved Azion's LCP performance"
meta_robots: 'index, follow'
meta_description: 'Adopting SSG (static site generators) on Front End also helps to diminish page load time SSGs enable a large part of the content to be assembled during build time, avoiding excess processing time for each and every request...'
meta_keywords: ''
categories: ['azion', 'jamstack', 'performance']
date: 'Jun 01 2021'
dateUpdate: ''
heroImage: '/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-4w6vE0EojI-fSxK7SYNrIw.png'
heroAltImage: 'JAM stack'
---

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-4w6vE0EojI-fSxK7SYNrIw.png)

Azion JAMStack Performance: from 2.8s to 400ms — Performance Banner

The previous article covered the [Azion JAM Stack introduction](/pt-br/blog/introducao-azion-jam-stack/) (in Portuguese), which I recommend as an introduction to this one.

Here you will read about the results of small actions to reduce the amount of resources each page uses, which noticeably improved the load time of the more than 900 pages we have under <https://www.azion.com/>.

We have 4 separate systems answering for our main domain, each with [i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization) support configured for 3 languages: Portuguese, English and Spanish:

- [Blog](https://www.azion.com/pt-br/blog/)
- [Success Stories](https://www.azion.com/pt-br/casos-de-sucesso/)
- [Documentation](https://www.azion.com/pt-br/documentacao/)
- Landing Pages (marketing)

Although they are separate projects, all of them use the same resources under <https://assets.azion.com/static/>

### How SSG relates to LCP

Adopting [SSG](https://jamstack.org/generators/) on the Front-End also takes a few ms off page load. What do I mean by that?

LCP — Largest Contentful Paint. It is a user-centric metric that measures the [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics).

With SSG a large part of the page content is assembled at build time, so we no longer spend time processing each request.

The LCP metric measures the render time of the largest content or image visible on screen, relative to when the page started loading.

These are the recommended values for the metric:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-R4kUKlR_bsef8r0DZTesdw.png)

<https://web.dev/vitals/lcp_8x2.svg>

We need to be careful when talking about performance, because what the user perceives can differ from what is actually measured: a site that takes longer can feel faster just by working on the user's perception.

I never forget this quote:

> User perception is performance. — [Guilherme Moser](https://www.linkedin.com/in/guilhermems/), [Terra Networks.](https://www.terra.com.br/)

### What work was done to reach these results?

A quick look showed that something was wrong. Pay attention to the image below:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-mDpfKPWwF-V5wbivqGfNlQ.png)

Tools: Network + Coverage — Google Chrome Dev Tools

- In the blue band of the network tab, we can see a 2.0mb CSS file;
- In the red band of the coverage tab, we can see **2 045 425 bytes** of CSS, of which **2 021 783 are unused**. That is **98.8% unnecessary processing and traffic**.

Even though the browser can cache it, putting all the responsibility on the browser would be irresponsible, because it brings other problems: a simple, frequent deploy with frequent cache refreshes would hurt not only LCP but also TTFB, TBT, TTI and others.

Looking at this scenario, we clearly had to update that structure urgently: being a [JAM Stack](https://www.azion.com/pt-br/blog/beneficios-do-jamstack/) site, we could not accept such poor performance.

### Getting to work

The work was basically splitting the CSS. See in the images below what we had:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-wa5jYHZhXy8HV44wtpTd0w.png)

part 1 — continues

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-NIHpQEpZjMFhVK3SssxEPw.png)

part 2 — continues

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-Jf0fIKHQ4yY-VgQSscvOZg.png)

part 3 — end

The first version of our site shipped this single compiled CSS to every page.

We started by turning what was in ./pages/\_file.scss into ./pages/\_page.scss, so when Jekyll compiled we would not need to change destinations or code.

With that, each file without the \_ prefix (Sass uses it by default for files that are imported rather than output) compiles one to one, file to output.

We went from a single huge 2.0mb bundle.css to several smaller files of roughly 100k each (before gzip).

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-LB_MfzWc52fEteM_3D42ZA.png)

Current CSS structure per page

What about the shared files? We tested file by file to see what was really needed, and arrived at this bundle shared by every page:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-NGBRavzklTGiYtqpw1E3EA.png)

Resources shared by every page

Much smaller, right? This is the final shared resources file, and each inner page uses something like:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-DDZN_DKX1OhYjRXfaPIxcg.png)

Products page style

One of the pages with the most components ended up at roughly 90k after compiling.

### Integrating with the HTML

If you use SSG tools, you are used to configuring [Front-Matter](https://jekyllrb.com/docs/front-matter/): the tools use this block at the top of the file to know how the content should be compiled.

So we only made small changes to our pages.

We went from a header in the HTML pages that held everything they needed

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-n1YD0ZszeXSk_dYXcEZI2w.png)

to:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-K5CkmXxQp9fmOCleH5ZMqg.png)

Now the style comes from the Front-Matter configuration, which is read during the build. Something like:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-73XyM5tj8M8v-WdWs5FKZg.png)

We reused as much of what already existed as possible, and a subtle change gave us huge gains.

### What were the results?

At first we had this kind of result:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-SWGzqBIExUpiLMAZ17Yo1w.png)

With the new model we reached more than 70% improvement:

![](/static/uploads/blog/pt-br/azion-jamstack-lcp-performance-melhora-dos-3s-para-400ms/1-Kpt60KTBwNtkVmAcEe_nag.png)

Both tests were for the page <https://www.azion.com/pt-br/>

### Benchmark

- [WebPageTest Test Details - Dulles : www.azion.com/pt-br/ - 04/13/21 16:28:01](https://www.webpagetest.org/result/210413_BiDcJJ_96c3264b804396a13342f29105e4ea25/3/details/)
- [WebPageTest Test Result - Dulles : www.azion.com/pt-br/ - 04/16/21 15:27:53](https://www.webpagetest.org/result/210416_BiDcGJ_45e84776ce763441a0b3a495a8fc3a18/)

- LCP improved from 2.1s to 1.3s;
- First Byte improved from 0.256s to 0.18s;
- Start Render improved from 1.9s to 0.6s;
- First Contentful Paint improved from 1.8s to 0.63s;
- Speed Index improved from 2s to 0.7s;

You can find more results directly in the tests.

### Coming soon

Everything indicates that the JAMStack architecture is becoming more and more important.

[More time, tools, and details on the page experience update](https://developers.google.com/search/blog/2021/04/more-details-page-experience)

Starting in June, a rollout will begin in which LCP, FID and CLS make up Google's new "Page Experience" ranking signal.

### References:

- [Azion JAM Stack introduction](/pt-br/blog/introducao-azion-jam-stack/) (in Portuguese);
- [Render Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css#:~:text=Render%20Blocking%20CSS%20bookmark_border&text=By%20default%2C%20CSS%20is%20treated,and%20queries%20to%20unblock%20rendering.);
- [Largest Contentful Paint — LPC](https://web.dev/lcp/);
- [First Input Delay](https://web.dev/fid/) — FID;
- [Time to Interactive — TTI](https://web.dev/tti/);
- [Total blocking Time — TBT](https://web.dev/tbt/);
- [User Centric Performance Metrics](https://web.dev/user-centric-performance-metrics/#types-of-metrics);
