<script setup>
import PostCard from './PostCard.vue'
import CategoryList from './CategoryList.vue'

// Blog post page. Three columns on desktop (in the spirit of the Azion blog):
// categories + share on the left, the article in the middle, "on this page"
// on the right; both sides stick while reading. Below 1180px the left column
// moves under the article; below 900px the contents sit between header and body.
// Static: the share buttons and the scroll-spy contents come in through slots.
defineProps({
  cover: { type: Object, default: null }, // { src, alt }
  crumbs: { type: Array, default: () => [] }, // [{ href?, label }]
  title: { type: String, required: true },
  lede: { type: String, default: '' },
  author: { type: Object, required: true }, // { name, avatar }
  date: { type: Object, required: true }, // { iso, label }
  reading: { type: String, default: '' },
  tags: { type: Object, default: null }, // { title, items: [{ href, label }] }
  categories: { type: Object, required: true }, // { title, items, current }
  original: { type: Object, default: null }, // { href, label, note, host }
  related: { type: Object, default: null }, // { title, posts }
  cta: { type: String, default: '' }
})
</script>

<template>
  <article class="post">
    <div class="cover" aria-hidden="true">
      <div v-if="cover" class="img" :style="{ backgroundImage: `url('${cover.src}')` }"></div>
      <div class="dots"></div>
    </div>

    <div class="layout">
      <header class="head">
        <nav v-if="crumbs.length" class="crumbs" aria-label="Breadcrumb">
          <ol>
            <li v-for="crumb in crumbs" :key="crumb.label">
              <a v-if="crumb.href" :href="crumb.href">{{ crumb.label }}</a>
              <span v-else aria-current="page">{{ crumb.label }}</span>
            </li>
          </ol>
        </nav>
        <h1 class="title">{{ title }}</h1>
        <p v-if="lede" class="lede">{{ lede }}</p>
        <div class="byline">
          <img :src="author.avatar" alt="" width="48" height="48" loading="eager" />
          <div>
            <p class="name">{{ author.name }}</p>
            <p class="meta">
              <time :datetime="date.iso">{{ date.label }}</time><template v-if="reading"> · {{ reading }}</template>
            </p>
          </div>
        </div>
      </header>

      <aside v-if="$slots.toc" class="right">
        <div class="stick"><slot name="toc" /></div>
      </aside>

      <div class="body">
        <div class="post-prose"><slot /></div>

        <a v-if="original" class="original" :href="original.href" target="_blank" rel="noopener">
          <span class="note">{{ original.note }}</span>
          <span class="go">{{ original.label }} <span aria-hidden="true">↗</span></span>
          <span class="host">{{ original.host }}</span>
        </a>

        <div v-if="tags && tags.items.length" class="tags">
          <span>{{ tags.title }}</span>
          <ul>
            <li v-for="tag in tags.items" :key="tag.href">
              <a :href="tag.href">{{ tag.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <aside class="left">
        <div class="stick">
          <slot name="share" />
          <CategoryList :title="categories.title" :items="categories.items" :current="categories.current" />
        </div>
      </aside>
    </div>

    <section v-if="related && related.posts.length" class="related">
      <h2>{{ related.title }}</h2>
      <div class="related-grid">
        <PostCard v-for="post in related.posts" :key="post.href" :post="post" :cta="cta" />
      </div>
    </section>
  </article>
</template>

<style scoped>
.post {
  padding-bottom: clamp(64px, 10vw, 120px);
}

/* cover: the post image in the page accent (duotone) under a halftone */
.cover {
  position: relative;
  height: clamp(220px, 30vw, 380px);
  margin-inline: calc(-1 * var(--gutter));
  overflow: hidden;
  background: var(--accent-dim);
  border-bottom: 1px solid var(--line);
}
.img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: grayscale(1) contrast(1.15);
  mix-blend-mode: multiply;
  opacity: 0.9;
}
.dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgb(var(--ink-rgb) / 0.55) 1px, transparent 1.6px);
  background-size: 5px 5px;
  background-color: rgb(var(--ink-rgb) / 0.25);
}
.cover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(var(--ink-rgb) / 0.7) 0%, transparent 35%, rgb(var(--ink-rgb) / 0.9) 100%);
}

.layout {
  max-width: 1240px;
  margin: 0 auto;
  padding-top: clamp(40px, 6vw, 64px);
  display: grid;
  grid-template-columns: 220px minmax(0, 720px) 220px;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'left head right'
    'left body right';
  justify-content: space-between;
  gap: 0 48px;
}
.head {
  grid-area: head;
}
.body {
  grid-area: body;
}
.left {
  grid-area: left;
}
.right {
  grid-area: right;
}
.stick {
  position: sticky;
  top: 96px;
  display: grid;
  gap: 40px;
}
/* the category list is long: the left column scrolls on its own while sticky */
.left .stick {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}
p {
  margin: 0;
}

/* header */
.crumbs ol {
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.crumbs li {
  min-width: 0;
}
.crumbs li + li::before {
  content: '›';
  margin: 0 10px;
}
.crumbs a {
  color: var(--mute);
  text-decoration: none;
}
.crumbs a:hover,
.crumbs a:focus-visible {
  color: var(--accent);
}
.crumbs [aria-current] {
  color: var(--paper);
}
.title {
  margin: 0;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(40px, 5vw, 68px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-wrap: balance;
}
.lede {
  margin-top: 20px;
  font-size: 20px;
  line-height: 1.5;
  color: var(--mute);
}
.byline {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--line);
}
.byline img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(1);
  border: 1px solid var(--accent-dim);
}
.name {
  font-weight: 500;
  font-size: 15px;
}
.meta {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}

/* end of the article */
.original {
  display: grid;
  gap: 6px;
  margin-top: 40px;
  padding: 24px;
  background: var(--accent);
  color: var(--ink);
  text-decoration: none;
}
.original .note {
  font-size: 15px;
}
.original .go {
  font-family: var(--display);
  font-weight: 900;
  font-size: 32px;
  line-height: 1;
  text-transform: uppercase;
}
.original .go span {
  display: inline-block;
  transition: transform 0.25s ease;
}
.original .host {
  font-family: var(--mono);
  font-size: 12px;
}
.original:hover .go span,
.original:focus-visible .go span {
  transform: translate(3px, -3px);
}
.original:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.tags ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tags a {
  display: inline-block;
  padding: 5px 10px;
  font-size: 13px;
  color: var(--paper);
  text-decoration: none;
  border: 1px solid var(--accent-dim);
}
.tags a:hover,
.tags a:focus-visible {
  color: var(--ink);
  background: var(--accent);
  border-color: var(--accent);
}

/* related: three post cards in a hairline grid */
.related {
  max-width: 1240px;
  margin: clamp(64px, 9vw, 112px) auto 0;
}
.related h2 {
  margin: 0 0 24px;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(32px, 3.6vw, 48px);
  line-height: 0.95;
  text-transform: uppercase;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

@media (max-width: 1180px) {
  .layout {
    grid-template-columns: minmax(0, 1fr) 220px;
    grid-template-areas:
      'head right'
      'body right'
      'left left';
    gap: 0 40px;
  }
  .left {
    margin-top: 64px;
    padding-top: 40px;
    border-top: 1px solid var(--line);
  }
  .left .stick {
    position: static;
    max-height: none;
    overflow: visible;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 40px;
  }
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'head' 'right' 'body' 'left';
  }
  .right {
    margin-top: 28px;
  }
  .right .stick {
    position: static;
  }
  .related-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 639px) {
  .left .stick {
    grid-template-columns: minmax(0, 1fr);
  }
  .lede {
    font-size: 18px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .original .go span {
    transition: none;
  }
}
</style>

<!-- the article markdown comes from Astro, so its styles can't be scoped -->
<style>
.post-prose {
  padding-top: 32px;
  font-size: 18px;
  line-height: 1.75;
  overflow-wrap: break-word;
}
.post-prose > * + * {
  margin-top: 1.1em;
}
.post-prose p,
.post-prose ul,
.post-prose ol,
.post-prose blockquote,
.post-prose pre,
.post-prose table,
.post-prose figure {
  margin-bottom: 0;
}
.post-prose h2,
.post-prose h3,
.post-prose h4 {
  margin: 2em 0 0;
  scroll-margin-top: 96px;
  text-wrap: balance;
}
.post-prose h2 {
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(30px, 3.2vw, 40px);
  line-height: 1;
  text-transform: uppercase;
}
.post-prose h3 {
  font-weight: 500;
  font-size: 22px;
  line-height: 1.3;
}
.post-prose h4 {
  font-family: var(--mono);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--mute);
}
.post-prose h2 + *,
.post-prose h3 + *,
.post-prose h4 + * {
  margin-top: 0.6em;
}
.post-prose a {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.post-prose a:hover {
  text-decoration-thickness: 2px;
}
.post-prose strong {
  font-weight: 600;
  color: var(--paper);
}
.post-prose ul,
.post-prose ol {
  padding-left: 1.3em;
}
.post-prose li + li {
  margin-top: 0.35em;
}
.post-prose li::marker {
  color: var(--accent);
}
.post-prose blockquote {
  margin-left: 0;
  margin-right: 0;
  padding: 4px 0 4px 20px;
  border-left: 2px solid var(--accent);
  color: var(--mute);
}
.post-prose code {
  padding: 0.12em 0.4em;
  font-family: var(--mono);
  font-size: 0.85em;
  background: rgb(255 255 255 / 0.05);
  border: 1px solid var(--line);
}
.post-prose pre {
  padding: 20px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.6;
  border: 1px solid var(--line);
  background: rgb(0 0 0 / 0.3) !important;
}
.post-prose pre code {
  padding: 0;
  border: 0;
  background: none;
  font-size: inherit;
}
.post-prose table {
  display: block;
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: 15px;
}
.post-prose th,
.post-prose td {
  padding: 12px 16px;
  text-align: left;
  vertical-align: top;
  border: 1px solid var(--line);
}
.post-prose th {
  font-family: var(--mono);
  font-weight: 500;
  font-size: 13px;
  color: var(--mute);
}
.post-prose img,
.post-prose video,
.post-prose iframe {
  display: block;
  max-width: 100%;
  height: auto;
  border: 1px solid var(--line);
}
.post-prose iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}
.post-prose figcaption {
  margin-top: 8px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.post-prose hr {
  margin: 2.5em 0;
  border: 0;
  border-top: 1px solid var(--line);
}
</style>
