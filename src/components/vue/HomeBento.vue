<script setup>
import BentoCell from './BentoCell.vue'
import PostCard from './PostCard.vue'

defineProps({
  id: { type: String, required: true },
  articlesId: { type: String, required: true },
  index: { type: Array, default: () => [] },
  about: { type: Object, required: true },
  featured: { type: Object, default: null },
  recent: { type: Object, required: true },
  explore: { type: Object, required: true },
  cta: { type: String, default: '' }
})
</script>

<template>
  <section class="bento" :id="id">
    <div class="legend">
      <ol>
        <li v-for="(entry, i) in index" :key="entry">
          <span>{{ String(i + 1).padStart(2, '0') }}</span> {{ entry }}
        </li>
      </ol>
    </div>

    <div class="grid">
      <BentoCell class="a" :index="about.index">
        <h2 class="headline">
          <template v-for="part in about.headline" :key="part.text">
            <em v-if="part.em">{{ part.text }}</em>
            <template v-else>{{ part.text }}</template>
          </template>
        </h2>
        <p class="summary">{{ about.summary }}</p>
        <div class="about-foot">
          <ul class="meta">
            <li v-for="item in about.meta" :key="item">{{ item }}</li>
          </ul>
          <a class="more" :href="about.link.href">{{ about.link.label }} →</a>
        </div>
      </BentoCell>

      <div v-if="$slots.featured" :id="articlesId" class="b featured">
        <slot name="featured" />
      </div>
      <PostCard
        v-else-if="featured"
        :id="articlesId"
        class="b"
        variant="feature"
        :index="featured.index"
        :post="featured.post"
        :cta="cta"
      />

      <PostCard
        v-for="(post, i) in recent.posts"
        :key="post.href"
        :class="'c' + (i + 1)"
        :index="recent.index + '.' + (i + 1)"
        :post="post"
        :cta="cta"
      />

      <BentoCell class="d" tone="accent" :href="explore.href" :index="explore.index">
        <span class="explore-title">{{ explore.title }}</span>
        <span class="explore-foot">
          <span class="count">{{ explore.count }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </span>
      </BentoCell>
    </div>
  </section>
</template>

<style scoped>
.bento {
  max-width: 1080px;
  margin: 0 auto;
  padding-block: clamp(64px, 10vw, 120px);
  display: grid;
  gap: 16px;
}
.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.legend ol {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.legend ol span {
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-areas:
    'a a a a a a a b b b b b'
    'c1 c1 c1 c2 c2 c2 c3 c3 c3 d d d';
  grid-template-rows: minmax(480px, auto) minmax(300px, auto);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.a {
  grid-area: a;
}
.b {
  grid-area: b;
  scroll-margin-top: 96px;
}
.featured {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--ink);
}
.featured :deep(.carousel) {
  flex: 1;
}
.c1 {
  grid-area: c1;
}
.c2 {
  grid-area: c2;
}
.c3 {
  grid-area: c3;
}
.d {
  grid-area: d;
}

.headline {
  margin: 0;
  max-width: 13ch;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(44px, 5.6vw, 76px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-wrap: balance;
}
.headline em {
  font-style: normal;
  color: var(--accent);
}
.summary {
  margin: 0;
  max-width: 52ch;
  font-size: 17px;
  line-height: 1.6;
  color: var(--paper);
}
.about-foot {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px 24px;
}
.meta {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--mute);
}
.more {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-dim);
  transition: border-color 0.2s ease;
}
.more:hover,
.more:focus-visible {
  border-color: var(--accent);
}

.explore-title {
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(40px, 4.4vw, 60px);
  line-height: 0.9;
  text-transform: uppercase;
  text-wrap: balance;
}
.explore-foot {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
}
.count {
  font-family: var(--mono);
  font-size: 12px;
}
.arrow {
  font-family: var(--display);
  font-weight: 900;
  font-size: 56px;
  line-height: 0.8;
  transition: transform 0.3s ease;
}
.d:hover .arrow,
.d:focus-visible .arrow {
  transform: translateX(8px);
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-areas:
      'a a a a a a'
      'b b b b b b'
      'c1 c1 c1 c2 c2 c2'
      'c3 c3 c3 d d d';
    grid-template-rows: auto;
    grid-auto-rows: minmax(260px, auto);
  }
  .a {
    min-height: 420px;
  }
  .b {
    min-height: 280px;
  }
}
@media (max-width: 639px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'a' 'b' 'c1' 'c2' 'c3' 'd';
    grid-auto-rows: auto;
  }
  .a,
  .b {
    min-height: 0;
  }
  .d {
    min-height: 200px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .arrow,
  .more {
    transition: none;
  }
}
</style>
