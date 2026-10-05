import { onBeforeUnmount, onMounted } from 'vue'

// requestAnimationFrame loop that only runs while `targetRef` is on screen.
// With reduced motion it renders a single still frame instead of looping.
export function useAnimationLoop(targetRef, frame, { reducedMotion }) {
  let running = false
  let visible = true
  let active = false
  let rafId = 0
  let observer

  const loop = (t) => {
    if (!visible || !active) {
      running = false
      return
    }
    frame(t)
    rafId = requestAnimationFrame(loop)
  }

  const start = () => {
    active = true
    if (reducedMotion.value) {
      frame(0)
      return
    }
    if (!running) {
      running = true
      rafId = requestAnimationFrame(loop)
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && active) start()
    })
    if (targetRef.value) observer.observe(targetRef.value)
  })
  onBeforeUnmount(() => {
    active = false
    cancelAnimationFrame(rafId)
    observer?.disconnect()
  })

  return { start, renderOnce: () => frame(0) }
}
