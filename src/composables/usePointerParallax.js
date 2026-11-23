import { onBeforeUnmount, onMounted } from 'vue'

export function usePointerParallax({ ease = 0.06 } = {}) {
  const state = { px: 0, py: 0, tx: 0, ty: 0 }

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    state.tx = e.clientX / innerWidth - 0.5
    state.ty = e.clientY / innerHeight - 0.5
  }
  const step = () => {
    state.px += (state.tx - state.px) * ease
    state.py += (state.ty - state.py) * ease
    return state
  }

  onMounted(() => addEventListener('pointermove', onMove, { passive: true }))
  onBeforeUnmount(() => removeEventListener('pointermove', onMove))

  return { state, step }
}
