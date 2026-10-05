import { onBeforeUnmount, onMounted } from 'vue'

// Moves each line of a block horizontally, alternating sides, based on how far
// the block is from the middle of the viewport. Lines rest in place when centered.
export function useScrollDrift(rootRef, { selector = 'span', amount = 8, reducedMotion }) {
  let ticking = false
  let lines = []

  const update = () => {
    ticking = false
    const root = rootRef.value
    if (!root) return
    const r = root.getBoundingClientRect()
    const k = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight))
    lines.forEach((line, i) => {
      line.style.transform = `translate3d(${(i % 2 ? -1 : 1) * k * amount}vw,0,0)`
    })
  }
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  onMounted(() => {
    if (reducedMotion?.value || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lines = [...(rootRef.value?.querySelectorAll(selector) ?? [])]
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', update)
    update()
  })
  onBeforeUnmount(() => {
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', update)
  })
}
