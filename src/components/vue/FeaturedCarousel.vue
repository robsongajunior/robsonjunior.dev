<script setup>
import { computed, ref } from 'vue'
import PostCard from './PostCard.vue'
import { useCarousel } from '../../composables/useCarousel'
import { useReducedMotion } from '../../composables/useReducedMotion'

const props = defineProps({
  items: { type: Array, required: true },
  index: { type: String, default: '' },
  cta: { type: String, default: '' },
  labels: { type: Object, required: true }
})

const track = ref(null)
const reducedMotion = useReducedMotion()
const { active, paused, running, cycle, interval, go, next, prev, toggle, hold } = useCarousel(track, props.items.length, { reducedMotion })
const counter = computed(() => String(active.value + 1).padStart(2, '0') + ' / ' + String(props.items.length).padStart(2, '0'))
</script>

<template>
  <section
    class="carousel"
    :class="{ running }"
    :style="{ '--interval': interval + 'ms' }"
    aria-roledescription="carousel"
    :aria-label="labels.region"
    @mouseenter="hold(true)"
    @mouseleave="hold(false)"
    @focusin="hold(true)"
    @focusout="hold(false)"
  >
    <header class="head">
      <span class="index">{{ index }}</span>
      <span class="controls">
        <span class="counter" aria-live="polite">{{ counter }}</span>
        <button type="button" :aria-label="labels.prev" @click="prev">←</button>
        <button type="button" :aria-label="paused ? labels.play : labels.pause" @click="toggle">
          {{ paused ? '▶' : 'II' }}
        </button>
        <button type="button" :aria-label="labels.next" @click="next">→</button>
      </span>
    </header>

    <div ref="track" class="track">
      <div
        v-for="(item, i) in items"
        :key="item.href"
        class="slide"
        role="group"
        aria-roledescription="slide"
        :aria-label="i + 1 + ' ' + labels.of + ' ' + items.length"
        :inert="i !== active || undefined"
      >
        <PostCard variant="feature" :post="item" :cta="cta" class="card" />
      </div>
    </div>

    <div class="dots">
      <button
        v-for="(item, i) in items"
        :key="item.href"
        type="button"
        :class="{ on: i === active }"
        :aria-label="i + 1 + ' ' + labels.of + ' ' + items.length"
        :aria-current="i === active || undefined"
        @click="go(i)"
      >
        <span :key="i === active ? active + '-' + cycle : 'idle'" class="fill"></span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--ink);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: clamp(20px, 2.6vw, 32px) clamp(20px, 2.6vw, 32px) 0;
}
.index,
.counter {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}
.index {
  font-weight: 500;
}
.controls {
  display: flex;
  align-items: center;
  gap: 4px;
}
.counter {
  margin-right: 8px;
  font-variant-numeric: tabular-nums;
}
.controls button {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--paper);
  font-family: var(--mono);
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.controls button:hover {
  border-color: var(--accent);
  color: var(--accent);
}
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.track {
  flex: 1;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.track::-webkit-scrollbar {
  display: none;
}
.slide {
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
  scroll-snap-align: start;
}
.card {
  flex: 1;
}

.dots {
  display: flex;
  gap: 6px;
  padding: 0 clamp(20px, 2.6vw, 32px) clamp(20px, 2.6vw, 32px);
}
.dots button {
  flex: 1;
  height: 12px;
  padding: 5px 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}
.dots button::before {
  content: '';
  display: block;
  height: 2px;
  background: var(--line);
}
.fill {
  display: block;
  height: 2px;
  margin-top: -2px;
  width: 0;
  background: var(--accent);
}
.on .fill {
  width: 100%;
}
.running .on .fill {
  animation: fill var(--interval) linear;
}
@keyframes fill {
  from {
    width: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .on .fill {
    animation: none;
  }
  .controls button {
    transition: none;
  }
}
</style>
