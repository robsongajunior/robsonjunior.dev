<script setup>
import BentoCell from './BentoCell.vue'
import LinkList from './LinkList.vue'

defineProps({
  id: { type: String, required: true },
  statement: { type: Object, required: true },
  links: { type: Array, default: () => [] },
  now: { type: Object, required: true },
  journey: { type: Object, required: true },
  topics: { type: Object, required: true }
})
</script>

<template>
  <section class="about" :id="id">
    <div class="grid">
      <BentoCell class="a" :index="statement.index">
        <h2 class="statement">
          <template v-for="part in statement.lines" :key="part.text">
            <em v-if="part.em">{{ part.text }}</em>
            <template v-else>{{ part.text }}</template>
          </template>
        </h2>
        <p class="summary" v-html="statement.summary"></p>
        <div class="foot">
          <ul class="meta">
            <li v-for="item in statement.meta" :key="item">{{ item }}</li>
          </ul>
          <LinkList v-if="links.length" :links="links" />
        </div>
      </BentoCell>

      <BentoCell class="n" :index="now.index">
        <p class="role">{{ now.role }}</p>
        <p class="company">
          {{ now.company }}<span>{{ now.team }}</span>
        </p>
        <p class="focus">{{ now.focus }}</p>
      </BentoCell>

      <BentoCell class="t" :index="topics.index">
        <ul class="topics">
          <li v-for="item in topics.items" :key="item">{{ item }}</li>
        </ul>
      </BentoCell>

      <BentoCell class="j" :index="journey.index">
        <ol class="journey">
          <li v-for="step in journey.steps" :key="step.where">
            <span class="when">{{ step.when }}</span>
            <span class="where">{{ step.where }}</span>
            <span class="what">{{ step.what }}</span>
            <span v-if="step.detail" class="detail">{{ step.detail }}</span>
          </li>
        </ol>
      </BentoCell>
    </div>
  </section>
</template>

<style scoped>
.about {
  max-width: 1080px;
  margin: 0 auto;
  padding-block: clamp(64px, 10vw, 120px);
}
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-areas:
    'a a a a a a a n n n n n'
    't t t t j j j j j j j j';
  grid-template-rows: minmax(440px, auto) auto;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.a {
  grid-area: a;
}
.n {
  grid-area: n;
}
.t {
  grid-area: t;
}
.j {
  grid-area: j;
}
p {
  margin: 0;
}

.statement {
  margin: 0;
  max-width: 12ch;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(44px, 5.6vw, 76px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-wrap: balance;
}
.statement em {
  font-style: normal;
  color: var(--accent);
}
.summary {
  max-width: 52ch;
  font-size: 17px;
  line-height: 1.6;
}
.summary :deep(a) {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
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

.role {
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(34px, 3.6vw, 48px);
  line-height: 0.95;
  text-transform: uppercase;
  text-wrap: balance;
}
.company {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
  display: grid;
  gap: 2px;
}
.company span {
  color: var(--mute);
}
.focus {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: 15px;
  line-height: 1.55;
  color: var(--paper);
}

.topics {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.topics li {
  font-family: var(--mono);
  font-size: 13px;
  padding: 5px 10px;
  border: 1px solid var(--line);
}

.journey {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
}
.journey li {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 2px 20px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}
.journey li:first-child {
  border-top: 0;
  padding-top: 0;
}
.when {
  grid-row: span 3;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  padding-top: 4px;
}
.where {
  font-weight: 500;
  font-size: 19px;
  line-height: 1.3;
}
.what {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--mute);
}
.detail {
  margin-top: 6px;
  font-size: 15px;
  line-height: 1.55;
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-areas:
      'a a a a a a'
      'n n n n n n'
      'j j j j j j'
      't t t t t t';
    grid-template-rows: auto;
  }
  .a {
    min-height: 420px;
  }
}
@media (max-width: 639px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'a' 'n' 'j' 't';
  }
  .a {
    min-height: 0;
  }
  .journey li {
    grid-template-columns: minmax(0, 1fr);
  }
  .when {
    grid-row: auto;
    padding-top: 0;
  }
}
</style>
