<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, required: true }
})

const active = ref(props.items[0]?.slug ?? '')
let observer

onMounted(() => {
  const targets = props.items.map((item) => document.getElementById(item.slug)).filter(Boolean)
  if (!targets.length) return
  const visible = new Map()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
      const hit = targets.find((el) => visible.get(el.id))
      if (hit) active.value = hit.id
      else {
        const passed = targets.filter((el) => el.getBoundingClientRect().top < 120)
        if (passed.length) active.value = passed.at(-1).id
      }
    },
    { rootMargin: '-80px 0px -60% 0px' }
  )
  targets.forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav class="toc" :aria-label="title">
    <p v-if="title" class="title">{{ title }}</p>
    <ol>
      <li v-for="item in items" :key="item.slug" :class="'d' + item.depth">
        <a :href="'#' + item.slug" :aria-current="active === item.slug ? 'location' : undefined">{{ item.text }}</a>
      </li>
    </ol>
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
ol {
  margin: 0;
  padding: 0;
  list-style: none;
  border-left: 1px solid var(--line);
}
a {
  display: block;
  margin-left: -1px;
  padding: 6px 0 6px 16px;
  border-left: 2px solid transparent;
  font-size: 14px;
  line-height: 1.4;
  color: var(--mute);
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.d3 a {
  padding-left: 30px;
  font-size: 13px;
}
a:hover,
a:focus-visible {
  color: var(--paper);
}
a[aria-current] {
  color: var(--accent);
  border-left-color: var(--accent);
}
@media (prefers-reduced-motion: reduce) {
  a {
    transition: none;
  }
}
</style>
