<script setup>
defineProps({
  links: { type: Array, required: true } // [{ href, label }]
})
</script>

<template>
  <ul class="links">
    <li v-for="link in links" :key="link.href">
      <a :href="link.href" rel="me noopener" target="_blank">{{ link.label }}</a>
    </li>
  </ul>
</template>

<style scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--mono);
  font-size: 15px;
}
a {
  text-decoration: none;
  border-bottom: 1px solid var(--line);
}
a:hover {
  color: var(--accent);
  border-color: var(--accent);
}
</style>
