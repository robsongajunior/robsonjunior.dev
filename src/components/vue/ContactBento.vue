<script setup>
import BentoCell from './BentoCell.vue'
import LinkList from './LinkList.vue'

defineProps({
  id: { type: String, required: true },
  intro: { type: Object, required: true },
  links: { type: Array, default: () => [] },
  formIndex: { type: String, default: '' }
})
</script>

<template>
  <section class="contact" :id="id">
    <div class="grid">
      <BentoCell class="i" :index="intro.index">
        <h1 class="statement">{{ intro.statement }}</h1>
        <p class="summary">{{ intro.summary }}</p>
        <div class="foot">
          <ul class="meta">
            <li v-for="item in intro.meta" :key="item">{{ item }}</li>
          </ul>
          <LinkList v-if="links.length" :links="links" />
        </div>
      </BentoCell>

      <BentoCell class="f" :index="formIndex">
        <slot name="form" />
      </BentoCell>
    </div>
  </section>
</template>

<style scoped>
.contact {
  max-width: 1080px;
  margin: 0 auto;
  padding-block: clamp(112px, 14vw, 160px) clamp(64px, 10vw, 120px);
}
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-areas: 'i i i i i f f f f f f f';
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.i {
  grid-area: i;
  min-height: 560px;
}
.f {
  grid-area: f;
}
p {
  margin: 0;
}
.statement {
  margin: 0;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(56px, 5.2vw, 76px);
  line-height: 0.88;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-wrap: balance;
  color: var(--accent);
}
.summary {
  max-width: 40ch;
  font-size: 17px;
  line-height: 1.6;
}
.foot {
  margin-top: auto;
  display: grid;
  gap: 20px;
}
.meta {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mute);
}
@media (max-width: 1023px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'i' 'f';
  }
  .i {
    min-height: 0;
  }
}
</style>
