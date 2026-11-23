<script setup>
defineProps({
  title: { type: String, default: '' },
  items: { type: Array, required: true },
  current: { type: Array, default: () => [] },
  page: { type: String, default: '' }
})
</script>

<template>
  <nav class="categories" :aria-label="title">
    <p v-if="title" class="title">{{ title }}</p>
    <ul>
      <li v-for="item in items" :key="item.href">
        <a
          :href="item.href"
          :class="{ on: current.includes(item.href) || page === item.href }"
          :aria-current="page === item.href ? 'page' : undefined"
        >
          <span>{{ item.label }}</span><span class="count">{{ item.count }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.title {
  margin: 0 0 12px;
  font-family: var(--mono);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}
a {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 13px;
  color: var(--paper);
  text-decoration: none;
  transition: color 0.2s ease, padding 0.2s ease;
}
.count {
  color: var(--mute);
  font-variant-numeric: tabular-nums;
}
a:hover,
a:focus-visible {
  color: var(--accent);
  padding-left: 6px;
}
a.on {
  color: var(--accent);
}
a.on .count {
  color: var(--accent);
}
a[aria-current='page'] {
  padding-left: 10px;
  box-shadow: inset 2px 0 0 var(--accent);
}
@media (prefers-reduced-motion: reduce) {
  a {
    transition: none;
  }
}
</style>
