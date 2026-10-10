<script setup>
defineProps({
  homeHref: { type: String, required: true },
  homeLabel: { type: String, default: 'Robson Júnior' },
  links: { type: Array, default: () => [] }, // [{ href, label }]
  ariaLabel: { type: String, default: 'Principal' }
})
</script>

<template>
  <nav class="nav" :aria-label="ariaLabel">
    <a class="mark" :href="homeHref" :aria-label="homeLabel">R<span>JR</span></a>
    <ul>
      <li v-for="link in links" :key="link.href">
        <a :href="link.href">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: calc(16px + env(safe-area-inset-top, 0px)) var(--gutter) 16px;
  background: linear-gradient(180deg, rgb(var(--ink-rgb) / 0.9), rgb(var(--ink-rgb) / 0));
  pointer-events: none;
}
.nav > * {
  pointer-events: auto;
}
.mark {
  font-family: var(--display);
  font-weight: 900;
  font-size: 28px;
  letter-spacing: -0.01em;
  line-height: 1;
  text-decoration: none;
  color: var(--paper);
}
.mark span {
  color: var(--accent);
}
ul {
  display: flex;
  gap: clamp(12px, 3vw, 28px);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--mono);
  font-size: 13px;
}
a {
  text-decoration: none;
  color: var(--paper);
}
ul a:hover {
  color: var(--accent);
}
@media (max-width: 720px) {
  ul {
    font-size: 12px;
  }
}
</style>
