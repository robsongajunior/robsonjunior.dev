import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Scroll-snap carousel state: the active slide follows the track's scroll,
// controls scroll the track, autoplay stops on hold, pause or reduced motion.
export function useCarousel(trackRef, count, { interval = 7000, reducedMotion } = {}) {
  const active = ref(0)
  const paused = ref(false)
  const held = ref(false)
  const mounted = ref(false)
  const cycle = ref(0) // bumps whenever the autoplay timer restarts
  const running = computed(
    () => mounted.value && count > 1 && !paused.value && !held.value && !reducedMotion?.value
  )
  let timer

  const go = (i) => {
    const track = trackRef.value
    if (!track) return
    const index = (i + count) % count
    track.scrollTo({ left: index * track.clientWidth, behavior: reducedMotion?.value ? 'auto' : 'smooth' })
  }
  const next = () => go(active.value + 1)
  const prev = () => go(active.value - 1)
  const toggle = () => {
    paused.value = !paused.value
  }
  const hold = (value) => {
    held.value = value
  }

  const onScroll = () => {
    const track = trackRef.value
    active.value = Math.round(track.scrollLeft / track.clientWidth)
  }

  const stop = () => clearInterval(timer)
  const start = () => {
    stop()
    cycle.value++
    if (!running.value) return
    timer = setInterval(() => {
      if (!document.hidden) next()
    }, interval)
  }

  onMounted(() => {
    trackRef.value?.addEventListener('scroll', onScroll, { passive: true })
    mounted.value = true
  })
  onBeforeUnmount(() => {
    stop()
    trackRef.value?.removeEventListener('scroll', onScroll)
  })
  watch(running, start)
  // any slide change (autoplay, controls, swipe) starts a fresh interval
  watch(active, () => running.value && start())

  return { active, paused, running, cycle, interval, go, next, prev, toggle, hold }
}
