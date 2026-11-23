<script setup>
import CategoryList from './CategoryList.vue'
import PostArchive from './PostArchive.vue'

defineProps({
  crumbs: { type: Array, default: () => [] },
  index: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  count: { type: String, default: '' },
  categories: { type: Object, default: null },
  years: { type: Array, required: true },
  cta: { type: String, default: '' }
})
</script>

<template>
  <section class="category">
    <header class="head">
      <nav v-if="crumbs.length" class="crumbs" aria-label="Breadcrumb">
        <ol>
          <li v-for="crumb in crumbs" :key="crumb.label">
            <a v-if="crumb.href" :href="crumb.href">{{ crumb.label }}</a>
            <span v-else aria-current="page">{{ crumb.label }}</span>
          </li>
        </ol>
      </nav>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="title">{{ title }}</h1>
      <p class="count">{{ count }}</p>
    </header>

    <div class="layout" :class="{ full: !categories }">
      <aside v-if="categories" class="side">
        <div class="stick">
          <CategoryList :title="categories.title" :items="categories.items" :page="categories.page" />
        </div>
      </aside>
      <div class="posts">
        <PostArchive :years="years" :cta="cta" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.category {
  max-width: 1240px;
  margin: 0 auto;
  padding-block: clamp(112px, 14vw, 160px) clamp(64px, 10vw, 120px);
}
p {
  margin: 0;
}
.crumbs ol {
  margin: 0 0 32px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.crumbs li + li::before {
  content: '›';
  margin: 0 10px;
}
.crumbs a {
  color: var(--mute);
  text-decoration: none;
}
.crumbs a:hover,
.crumbs a:focus-visible {
  color: var(--accent);
}
.crumbs [aria-current] {
  color: var(--paper);
}
.head {
  padding-bottom: clamp(32px, 5vw, 56px);
  border-bottom: 1px solid var(--line);
}
.eyebrow {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
}
.title {
  margin: 12px 0 0;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(64px, 10vw, 144px);
  line-height: 0.85;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
  color: var(--accent);
}
.count {
  margin-top: 16px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--mute);
}
.layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 56px;
  padding-top: clamp(32px, 5vw, 56px);
}
.layout.full {
  grid-template-columns: minmax(0, 1fr);
}
.stick {
  position: sticky;
  top: 96px;
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .side {
    order: 2;
  }
  .stick {
    position: static;
  }
}
</style>
