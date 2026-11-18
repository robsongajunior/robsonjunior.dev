<script setup>
// Blog archive grouped by year: an outlined year on the left, one row per post
// with date, title, tags and the excerpt.
defineProps({
  years: { type: Array, required: true }, // [{ year, posts: [{ href, title, tag, date, excerpt }] }]
  cta: { type: String, default: '' }
})
</script>

<template>
  <div class="archive">
    <section v-for="group in years" :key="group.year" class="year" :aria-labelledby="'y' + group.year">
      <h2 :id="'y' + group.year" class="num">{{ group.year }}</h2>
      <ol class="posts">
        <li v-for="post in group.posts" :key="post.href">
          <a :href="post.href">
            <span class="meta">
              <time :datetime="post.date">{{ post.date }}</time>
              <span v-if="post.tag" class="tag">{{ post.tag }}</span>
            </span>
            <span class="title">{{ post.title }}</span>
            <span v-if="post.excerpt" class="desc">{{ post.excerpt }}</span>
            <span class="go" aria-hidden="true">{{ cta }} →</span>
          </a>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.archive {
  border-top: 1px solid var(--line);
}
.year {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 24px;
  border-bottom: 1px solid var(--line);
}
.num {
  margin: 0;
  padding-top: 28px;
  font-family: var(--display);
  font-weight: 900;
  font-size: 56px;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px var(--mute);
}
.posts {
  margin: 0;
  padding: 0;
  list-style: none;
}
.posts li + li {
  border-top: 1px solid var(--line);
}
a {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px 24px;
  padding: 28px 0;
  text-decoration: none;
  color: inherit;
}
.meta,
.title,
.desc {
  grid-column: 1;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.tag {
  color: var(--accent);
}
.title {
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(24px, 2.6vw, 34px);
  line-height: 0.98;
  text-transform: uppercase;
  text-wrap: balance;
  transition: color 0.25s ease;
}
.desc {
  max-width: 64ch;
  font-size: 15px;
  line-height: 1.55;
  color: var(--mute);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.go {
  grid-column: 2;
  grid-row: 1;
  font-family: var(--mono);
  font-size: 12px;
  white-space: nowrap;
  transition: color 0.25s ease, transform 0.25s ease;
}
a:hover .title,
a:focus-visible .title,
a:hover .go,
a:focus-visible .go {
  color: var(--accent);
}
a:hover .go,
a:focus-visible .go {
  transform: translateX(4px);
}
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}
@media (max-width: 767px) {
  .year {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  .num {
    font-size: 44px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .title,
  .go {
    transition: none;
  }
}
</style>
