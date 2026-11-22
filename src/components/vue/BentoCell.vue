<script setup>
defineProps({
  href: { type: String, default: '' },
  index: { type: String, default: '' },
  tone: { type: String, default: 'ink' }
})
</script>

<template>
  <component :is="href ? 'a' : 'div'" :href="href || undefined" class="cell" :class="[tone, { link: href }]">
    <span v-if="index" class="index">{{ index }}</span>
    <slot />
  </component>
</template>

<style scoped>
.cell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: clamp(20px, 2.6vw, 32px);
  background: var(--ink);
  color: var(--paper);
  text-decoration: none;
}
.cell.accent {
  background: var(--accent);
  color: var(--ink);
}
.index {
  font-family: var(--mono);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}
.accent .index {
  color: var(--ink);
}
.link::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--accent);
  clip-path: inset(0 100% 100% 0);
  transition: clip-path 0.45s cubic-bezier(0.65, 0, 0.35, 1);
  pointer-events: none;
}
.accent.link::after {
  inset: 8px;
  border-color: var(--ink);
}
.link:hover::after,
.link:focus-visible::after {
  clip-path: inset(0 0 0 0);
}
.link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}
.accent.link:focus-visible {
  outline-color: var(--ink);
}
@media (prefers-reduced-motion: reduce) {
  .link::after {
    transition: none;
  }
}
</style>
