<script setup>
defineProps({
  // signature parts: { text, em }
  sign: { type: Array, required: true },
  credits: { type: String, required: true } // trusted inline HTML
})
</script>

<template>
  <footer>
    <span class="sign">
      <template v-for="(part, i) in sign" :key="i">
        <em v-if="part.em">{{ part.text }}</em><template v-else>{{ part.text }}</template>
      </template>
    </span>
    <span class="credits" v-html="credits"></span>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding: 32px var(--gutter) calc(32px + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
.sign {
  font-family: var(--display);
  font-weight: 900;
  font-size: 15px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--paper);
  white-space: pre;
}
.sign em {
  font-style: normal;
  color: var(--accent);
}
.credits :deep(a) {
  color: var(--paper);
  text-decoration: none;
}
.credits :deep(a:hover) {
  color: var(--accent);
}
</style>
