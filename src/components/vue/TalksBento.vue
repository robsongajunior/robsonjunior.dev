<script setup>
import BentoCell from './BentoCell.vue'
import TalkList from './TalkList.vue'

// Talks section: intro statement (I), numbers (S), one events cell listing every
// event (stage and audience together) and the
// recurring themes in small cells, then the editorial list of decks.
defineProps({
  id: { type: String, required: true },
  intro: { type: Object, required: true }, // { index, statement, summary }
  stats: { type: Object, required: true }, // { index, items: [{ value, label, wide? }] } — wide spans both columns
  events: { type: Object, required: true }, // { index, groups: [{ title, items: [] }] }
  themes: { type: Object, required: true }, // { index, items: [] }
  list: { type: Object, required: true } // { index, items, external }
})
</script>

<template>
  <section class="talks-section" :id="id">
    <div class="grid">
      <BentoCell class="i" :index="intro.index">
        <h2 class="statement">{{ intro.statement }}</h2>
        <p class="summary">{{ intro.summary }}</p>
      </BentoCell>

      <BentoCell class="s" :index="stats.index">
        <dl class="stats">
          <div v-for="stat in stats.items" :key="stat.label" :class="{ wide: stat.wide }">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
      </BentoCell>

      <BentoCell class="g" :index="events.index">
        <ul class="names">
          <li v-for="item in events.groups.flatMap((group) => group.items)" :key="item">{{ item }}</li>
        </ul>
      </BentoCell>

      <BentoCell class="th" :index="themes.index">
        <ul class="themes">
          <li v-for="item in themes.items" :key="item">{{ item }}</li>
        </ul>
      </BentoCell>
    </div>

    <div class="list">
      <span class="list-index">{{ list.index }}</span>
      <TalkList :items="list.items" :external="list.external" />
    </div>
  </section>
</template>

<style scoped>
.talks-section {
  max-width: 1080px;
  margin: 0 auto;
  padding-block: clamp(64px, 10vw, 120px);
  display: grid;
  gap: clamp(48px, 7vw, 88px);
}
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-areas:
    'i i i i i i i s s s s s'
    'g g g g g g g g th th th th';
  grid-template-rows: minmax(400px, auto) auto;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.i {
  grid-area: i;
}
.s {
  grid-area: s;
}
.g {
  grid-area: g;
}
.th {
  grid-area: th;
}

/* I — intro */
.statement {
  margin: 0;
  max-width: 14ch;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(40px, 5vw, 68px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-wrap: balance;
}
.summary {
  margin: auto 0 0;
  max-width: 52ch;
  font-size: 17px;
  line-height: 1.6;
}

/* S — numbers in a 2×2 grid of hairline cells */
.stats {
  margin: auto 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.stats div {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  background: var(--ink);
}
.stats .wide {
  grid-column: 1 / -1;
}
.stats .wide dd {
  font-size: clamp(72px, 8vw, 120px);
}
.stats dt {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.4;
  color: var(--mute);
}
.stats dd {
  margin: 0;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(48px, 5vw, 72px);
  line-height: 0.85;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

/* G — every event in one plain list, flowing in columns; T — themes as outlined tags */
.names {
  margin: 0;
  padding: 0;
  list-style: none;
  columns: 2 180px;
  column-gap: 24px;
  font-size: 15px;
}
.names li {
  break-inside: avoid;
  padding-block: 3px;
}
.themes {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.themes li {
  font-family: var(--mono);
  font-size: 13px;
  padding: 5px 10px;
  border: 1px solid var(--accent-dim);
}

.list {
  display: grid;
  gap: 16px;
}
.list-index {
  font-family: var(--mono);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mute);
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-areas:
      'i i i i i i'
      's s s s s s'
      'g g g g g g'
      'th th th th th th';
    grid-template-rows: auto;
  }
  .i {
    min-height: 360px;
  }
}
@media (max-width: 639px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'i' 's' 'g' 'th';
  }
  .i {
    min-height: 0;
  }
}
</style>
