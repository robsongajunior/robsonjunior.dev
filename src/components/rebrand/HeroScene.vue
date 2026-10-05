<script setup>
import { ref } from 'vue'
import { useCanvasScene } from '../../composables/useCanvasScene'
import { createPosterScene, loadPosterScene } from './scenes/posterScene'
import { createDeskScene, loadDeskScene } from './scenes/deskScene'

const props = defineProps({
  variant: { type: String, default: 'poster' }, // 'poster' | 'desk'
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  titleAccent: { type: String, default: '' },
  lede: { type: String, default: '' },
  cue: { type: String, default: '' }
})

const scenes = {
  poster: { load: loadPosterScene, create: createPosterScene },
  desk: { load: loadDeskScene, create: createDeskScene }
}

const canvas = ref(null)
const copy = ref(null)

useCanvasScene(canvas, {
  ...scenes[props.variant],
  // the title drifts up faster than the scene while scrolling
  onFrame: ({ scroll, reduce }) => {
    if (!reduce && copy.value) copy.value.style.transform = `translate3d(0,${-scroll * 0.25}px,0)`
  }
})
</script>

<template>
  <header class="hero" id="top">
    <canvas ref="canvas" aria-hidden="true"></canvas>
    <div class="dots"></div>
    <div class="scrim"></div>
    <div ref="copy" class="copy">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1>
        {{ title }} <span v-if="titleAccent">{{ titleAccent }}</span>
      </h1>
      <p v-if="lede" class="lede">{{ lede }}</p>
    </div>
    <div v-if="cue" class="cue">{{ cue }}</div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
  background: var(--ink);
}
canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgb(var(--ink-rgb) / 0.3) 1px, transparent 1.5px);
  background-size: 5px 5px;
  mix-blend-mode: multiply;
}
.scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: var(--hero-scrim);
}
.copy {
  position: absolute;
  left: var(--gutter);
  right: 16px;
  bottom: clamp(28px, 7vh, 72px);
  max-width: 560px;
  will-change: transform;
}
.eyebrow {
  margin: 0 0 14px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
}
h1 {
  margin: 0;
  color: var(--paper);
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(64px, 12vw, 168px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-wrap: balance;
}
h1 span {
  color: var(--accent);
}
.lede {
  margin: 22px 0 0;
  max-width: 42ch;
  color: var(--paper);
  opacity: 0.86;
}
.cue {
  position: absolute;
  right: var(--gutter);
  bottom: clamp(28px, 7vh, 72px);
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
  writing-mode: vertical-rl;
  letter-spacing: 0.12em;
}
@media (max-width: 720px) {
  .cue {
    display: none;
  }
  .copy {
    top: calc(64px + env(safe-area-inset-top, 0px));
    bottom: auto;
  }
  h1 {
    font-size: clamp(48px, 14vw, 72px);
  }
  .lede {
    margin-top: 12px;
    font-size: 15px;
  }
  .scrim {
    background: var(--hero-scrim-mobile);
  }
}
</style>
