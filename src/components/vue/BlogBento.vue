<script setup>
import BentoCell from './BentoCell.vue'
import PostCard from './PostCard.vue'
import PostArchive from './PostArchive.vue'

defineProps({
  id: { type: String, required: true },
  intro: { type: Object, required: true },
  stats: { type: Object, required: true },
  latest: { type: Object, default: null },
  themes: { type: Object, required: true },
  archive: { type: Object, required: true },
  cta: { type: String, default: '' }
})
</script>

<template>
  <section class="blog" :id="id">
    <div class="grid">
      <BentoCell class="i" :index="intro.index">
        <h2 class="statement">{{ intro.statement }}</h2>
      </BentoCell>

      <BentoCell class="s" :index="stats.index">
        <dl class="stats">
          <div v-for="stat in stats.items" :key="stat.label" :class="{ wide: stat.wide }">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
      </BentoCell>

      <PostCard v-if="latest" class="f" variant="feature" :index="latest.index" :post="latest.post" :cta="cta" />

      <BentoCell class="t" :index="themes.index">
        <ul class="themes">
          <li v-for="item in themes.items" :key="item.name">
            <a :href="item.href">{{ item.name }}<span>{{ item.count }}</span></a>
          </li>
        </ul>
      </BentoCell>
    </div>

    <div class="archive" :id="archive.id">
      <span class="archive-index">{{ archive.index }}</span>
      <PostArchive :years="archive.years" :cta="cta" />
    </div>
  </section>
</template>

<style scoped>
.blog {
  max-width: 1080px;
  margin: 0 auto;
  padding-block: clamp(64px, 10vw, 120px);
  display: grid;
  gap: clamp(48px, 7vw, 88px);
}
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-areas:
    'i i i i i i i s s s s s'
    'f f f f f f f f t t t t';
  grid-template-rows: minmax(440px, auto) auto;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.i {
  grid-area: i;
}
.s {
  grid-area: s;
}
.f {
  grid-area: f;
  min-height: 320px;
}
.t {
  grid-area: t;
}
p {
  margin: 0;
}

.statement {
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

.stats {
  margin: auto 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.stats div {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  background: var(--ink);
}
.stats .wide {
  grid-column: 1 / -1;
}
.stats .wide dd {
  font-size: clamp(72px, 8vw, 120px);
}
.stats dt {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.4;
  color: var(--mute);
}
.stats dd {
  margin: 0;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(48px, 5vw, 72px);
  line-height: 0.85;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.themes {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.themes a {
  display: inline-flex;
  gap: 8px;
  font-family: var(--mono);
  font-size: 13px;
  padding: 5px 10px;
  color: var(--paper);
  text-decoration: none;
  border: 1px solid var(--accent-dim);
  transition: background-color 0.2s ease, color 0.2s ease;
}
.themes span {
  color: var(--accent);
}
.themes a:hover,
.themes a:focus-visible {
  color: var(--ink);
  background: var(--accent);
  border-color: var(--accent);
}
.themes a:hover span,
.themes a:focus-visible span {
  color: var(--ink);
}

.archive {
  display: grid;
  gap: 16px;
  scroll-margin-top: 80px;
}
.archive-index {
  font-family: var(--mono);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-areas:
      'i i i i i i'
      's s s s s s'
      'f f f f f f'
      't t t t t t';
    grid-template-rows: auto;
  }
  .i {
    min-height: 320px;
  }
}
@media (max-width: 639px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'i' 's' 'f' 't';
  }
  .i {
    min-height: 0;
  }
}
</style>
