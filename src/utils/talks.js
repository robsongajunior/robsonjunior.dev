export const talkStats = (talks, decks) => [
  { value: talks.stats.events, label: talks.stats.eventsLabel, wide: true },
  { value: decks, label: talks.stats.decks },
  { value: new Date().getFullYear() - 2014, label: talks.stats.years }
]
