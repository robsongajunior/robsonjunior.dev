<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  url: { type: String, required: true },
  text: { type: String, default: '' },
  labels: { type: Object, required: true }
})

const copied = ref(false)
let timer
async function copy() {
  try {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.prompt(props.labels.copy, props.url)
  }
}
const enc = encodeURIComponent
const x = `https://x.com/intent/post?url=${enc(props.url)}&text=${enc(props.text)}`
const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(props.url)}`
</script>

<template>
  <div class="share">
    <p v-if="title" class="title">{{ title }}</p>
    <ul>
      <li>
        <button type="button" @click="copy">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
          <span>{{ copied ? labels.copied : labels.copy }}</span>
        </button>
      </li>
      <li>
        <a :href="x" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" /></svg>
          <span>X</span>
        </a>
      </li>
      <li>
        <a :href="linkedin" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v11M4 4v1M9 20v-11M9 13a4 4 0 0 1 8 0v7" /></svg>
          <span>LinkedIn</span>
        </a>
      </li>
    </ul>
    <span class="sr" role="status" aria-live="polite">{{ copied ? labels.copied : '' }}</span>
  </div>
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
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}
a,
button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--paper);
  background: none;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}
svg {
  width: 30px;
  height: 30px;
  padding: 7px;
  border: 1px solid var(--line);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: border-color 0.2s ease;
}
a:hover,
a:focus-visible,
button:hover,
button:focus-visible {
  color: var(--accent);
}
a:hover svg,
button:hover svg {
  border-color: var(--accent);
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
