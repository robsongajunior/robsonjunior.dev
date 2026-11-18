<script setup>
// Editorial list of talks: numbered rows with year/event, a large title,
// the description and a CTA to the external deck.
defineProps({
  items: { type: Array, required: true }, // [{ href, title, description, meta?, cta }]
  external: { type: String, default: '' } // screen reader hint for links opening in a new tab
})
</script>

<template>
  <ol class="talks">
    <li v-for="(item, i) in items" :key="item.href">
      <a :href="item.href" target="_blank" rel="noopener">
        <span class="num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="body">
          <span v-if="item.meta" class="meta">{{ item.meta }}</span>
          <span class="title">{{ item.title }}</span>
          <span class="desc">{{ item.description }}</span>
        </span>
        <span class="go">
          {{ item.cta }} <span aria-hidden="true">↗</span>
          <span v-if="external" class="sr">{{ external }}</span>
        </span>
      </a>
    </li>
  </ol>
</template>

<style scoped>
.talks {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}
a {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  gap: 8px 24px;
  align-items: start;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  color: inherit;
}
.num {
  font-family: var(--display);
  font-weight: 900;
  font-size: 40px;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px var(--mute);
  transition: -webkit-text-stroke-color 0.25s ease;
}
.body {
  display: grid;
  gap: 8px;
  min-width: 0;
}
.meta {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--accent);
}
.title {
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(26px, 3vw, 38px);
  line-height: 0.98;
  text-transform: uppercase;
  text-wrap: balance;
  transition: color 0.25s ease;
}
.desc {
  max-width: 60ch;
  font-size: 15px;
  line-height: 1.55;
  color: var(--mute);
}
.go {
  font-family: var(--mono);
  font-size: 12px;
  white-space: nowrap;
  padding-top: 6px;
  transition: color 0.25s ease, transform 0.25s ease;
}
a:hover .title,
a:focus-visible .title,
a:hover .go,
a:focus-visible .go {
  color: var(--accent);
}
a:hover .num,
a:focus-visible .num {
  -webkit-text-stroke-color: var(--accent);
}
a:hover .go,
a:focus-visible .go {
  transform: translate(3px, -3px);
}
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@media (max-width: 639px) {
  a {
    grid-template-columns: 40px minmax(0, 1fr);
  }
  .num {
    font-size: 28px;
  }
  .go {
    grid-column: 2;
    padding-top: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .num,
  .title,
  .go {
    transition: none;
  }
}
</style>
