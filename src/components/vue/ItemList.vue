<script setup>
defineProps({
  items: { type: Array, required: true } // [{ href, title, description, cta }]
})
</script>

<template>
  <ul class="items">
    <li v-for="item in items" :key="item.href">
      <a :href="item.href" target="_blank" rel="noopener">
        <span class="t">{{ item.title }}</span>
        <span class="go">{{ item.cta }} →</span>
        <span class="d">{{ item.description }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.items {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}
a {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px 24px;
  align-items: baseline;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  transition: padding 0.18s ease;
}
.t {
  font-size: 19px;
  font-weight: 500;
  text-wrap: balance;
}
.d {
  grid-column: 1;
  font-size: 15px;
  line-height: 1.55;
  color: var(--mute);
  max-width: 64ch;
}
.go {
  grid-row: 1;
  grid-column: 2;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent-dim);
  white-space: nowrap;
}
a:hover {
  padding-left: 12px;
}
a:hover .t,
a:hover .go {
  color: var(--accent);
}
@media (max-width: 720px) {
  a {
    grid-template-columns: 1fr;
  }
  .go {
    grid-row: auto;
    grid-column: 1;
  }
}
</style>
