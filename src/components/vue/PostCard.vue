<script setup>
import BentoCell from './BentoCell.vue'

// A blog post inside a BentoCell. 'feature' leads with a monumental title;
// 'compact' keeps the title at reading size. Both show the excerpt when the post has one.
defineProps({
  post: { type: Object, required: true }, // { href, title, tag, date, excerpt }
  index: { type: String, default: '' },
  variant: { type: String, default: 'compact' }, // 'feature' | 'compact'
  cta: { type: String, default: '' }
})
</script>

<template>
  <BentoCell :href="post.href" :index="index" class="post" :class="variant">
    <span class="tag">{{ post.tag }}</span>
    <span class="title">{{ post.title }}</span>
    <span v-if="post.excerpt" class="excerpt">{{ post.excerpt }}</span>
    <span class="meta">
      <time :datetime="post.date">{{ post.date }}</time>
      <span class="go" aria-hidden="true">{{ cta }} →</span>
    </span>
  </BentoCell>
</template>

<style scoped>
.tag {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
}
.title {
  font-weight: 500;
  font-size: 19px;
  line-height: 1.3;
  text-wrap: balance;
}
.excerpt {
  max-width: 46ch;
  font-size: 14px;
  line-height: 1.55;
  color: var(--mute);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.go {
  color: var(--paper);
  transition: transform 0.25s ease, color 0.25s ease;
}
.post:hover .go,
.post:focus-visible .go {
  color: var(--accent);
  transform: translateX(4px);
}

/* feature: monumental title, small technical meta around it */
.feature .title {
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(34px, 3.8vw, 54px);
  line-height: 0.95;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
.feature .excerpt {
  font-size: 15px;
}
@media (prefers-reduced-motion: reduce) {
  .go {
    transition: none;
  }
}
</style>
