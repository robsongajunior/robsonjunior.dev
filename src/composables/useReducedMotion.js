import { onBeforeUnmount, onMounted, ref } from 'vue'

// Tracks the user's "reduce motion" preference.
export function useReducedMotion() {
  const reduced = ref(false)
  let query

  const update = () => {
    reduced.value = query.matches
  }

  onMounted(() => {
    query = matchMedia('(prefers-reduced-motion: reduce)')
    update()
    query.addEventListener('change', update)
  })
  onBeforeUnmount(() => query?.removeEventListener('change', update))

  return reduced
}
