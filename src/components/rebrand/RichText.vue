<script setup>
// Paragraphs that may contain inline links or emphasis (trusted, authored content).
defineProps({
  paragraphs: { type: Array, required: true },
  size: { type: String, default: 'lg' } // 'lg' | 'md'
})
</script>

<template>
  <div class="rich" :class="size">
    <p v-for="(html, i) in paragraphs" :key="i" v-html="html"></p>
  </div>
</template>

<style scoped>
p {
  margin: 0 0 18px;
  max-width: 62ch;
}
.lg p {
  font-size: 19px;
}
.md p {
  font-size: 17px;
  opacity: 0.86;
}
.rich :deep(strong) {
  color: var(--accent);
  font-weight: 500;
}
.rich :deep(a) {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-dim);
}
.rich :deep(a:hover) {
  border-color: var(--accent);
}
</style>
