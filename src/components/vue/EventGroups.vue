<script setup>
defineProps({
  groups: { type: Array, required: true } // [{ title, items: string[] }]
})
</script>

<template>
  <div class="events">
    <div v-for="group in groups" :key="group.title">
      <h3>{{ group.title }}</h3>
      <ul>
        <li v-for="item in group.items" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin: 8px 0 36px;
}
h3 {
  margin: 0 0 10px;
  font-family: var(--mono);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
li {
  font-family: var(--mono);
  font-size: 13px;
  padding: 5px 10px;
  border: 1px solid var(--line);
}
</style>
