<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true }
})
</script>

<template>
  <section class="block" :id="id">
    <h2>{{ title }}</h2>
    <div class="body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.block {
  max-width: 1080px;
  margin: 0 auto;
  padding-block: clamp(64px, 10vw, 120px);
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: clamp(24px, 5vw, 64px);
  border-top: 1px solid var(--line);
}
h2 {
  margin: 0;
  font-family: var(--mono);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.body {
  min-width: 0;
}
@media (max-width: 720px) {
  .block {
    grid-template-columns: 1fr;
  }
}
</style>
