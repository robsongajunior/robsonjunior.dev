<script setup>
defineProps({
  items: { type: Array, required: true }, // [{ href, tag, title }]
  moreHref: { type: String, default: '' },
  moreLabel: { type: String, default: '' }
})
</script>

<template>
  <div>
    <ul class="log">
      <li v-for="item in items" :key="item.href">
        <a :href="item.href">
          <span class="tag">{{ item.tag }}</span>
          <span class="t">{{ item.title }}</span>
          <span class="go" aria-hidden="true">→</span>
        </a>
      </li>
    </ul>
    <a v-if="moreHref" class="more" :href="moreHref">{{ moreLabel }}</a>
  </div>
</template>

<style scoped>
.log {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}
.log a {
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr) auto;
  gap: 20px;
  align-items: baseline;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  transition: padding 0.18s ease, color 0.18s ease;
}
.tag {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.t {
  font-size: 18px;
  font-weight: 500;
  text-wrap: balance;
}
.go {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent-dim);
}
.log a:hover {
  padding-left: 12px;
}
.log a:hover .t,
.log a:hover .go {
  color: var(--accent);
}
.more {
  display: inline-block;
  margin-top: 24px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-dim);
}
.more:hover {
  border-color: var(--accent);
}
@media (max-width: 720px) {
  .log a {
    grid-template-columns: 1fr auto;
    gap: 4px 16px;
  }
  .tag {
    grid-column: 1 / -1;
  }
}
</style>
