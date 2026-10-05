<script setup>
import { ref } from 'vue'
import { useScrollDrift } from '../../composables/useScrollDrift'
import { useReducedMotion } from '../../composables/useReducedMotion'

defineProps({
  label: { type: String, required: true },
  // each line is a list of parts: { text, em }
  lines: { type: Array, required: true }
})

const root = ref(null)
useScrollDrift(root, { selector: 'span.line', reducedMotion: useReducedMotion() })
</script>

<template>
  <section class="slogan" :aria-label="label">
    <p ref="root" aria-hidden="true">
      <span v-for="(line, i) in lines" :key="i" class="line">
        <template v-for="(part, j) in line" :key="j">
          <em v-if="part.em">{{ part.text }}</em><template v-else>{{ part.text }}</template>
        </template>
      </span>
    </p>
  </section>
</template>

<style scoped>
.slogan {
  padding-inline: var(--gutter);
  padding-block: 0 clamp(72px, 12vw, 168px);
  overflow: hidden;
  background: var(--ink);
}
.slogan::before {
  content: '';
  display: block;
  max-width: 1080px;
  margin: 0 auto clamp(72px, 12vw, 168px);
  border-top: 1px solid var(--line);
}
p {
  margin: 0 auto;
  max-width: 1400px;
  text-align: center;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(72px, 17vw, 248px);
  line-height: 0.86;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: var(--paper);
}
.line {
  display: block;
  white-space: pre;
  will-change: transform;
}
em {
  font-style: normal;
  color: var(--accent);
}
</style>
