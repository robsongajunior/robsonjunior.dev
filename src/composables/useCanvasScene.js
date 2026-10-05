import { onMounted, ref } from 'vue'
import { useAnimationLoop } from './useAnimationLoop'
import { useCanvasViewport } from './useCanvasViewport'
import { usePointerParallax } from './usePointerParallax'
import { useReducedMotion } from './useReducedMotion'

// Wires a framework-agnostic canvas scene ({ resize, frame }) to the page:
// loads its assets, keeps it sized, feeds it mouse/scroll input and runs the loop.
// `onFrame` receives the scroll offset so the caller can move DOM overlays in sync.
export function useCanvasScene(canvasRef, { load, create, onFrame }) {
  const ready = ref(false)
  const reducedMotion = useReducedMotion()
  const pointer = usePointerParallax()
  let scene = null

  const { measure } = useCanvasViewport(canvasRef, (w, h, dpr) => {
    scene?.resize(w, h, dpr)
    if (scene && reducedMotion.value) renderOnce()
  })

  const frame = (t) => {
    if (!scene) return
    const { px, py } = pointer.step()
    const scroll = window.scrollY
    scene.frame(t, { px, py, scroll, reduce: reducedMotion.value })
    onFrame?.({ scroll, reduce: reducedMotion.value })
  }
  const { start, renderOnce } = useAnimationLoop(canvasRef, frame, { reducedMotion })

  onMounted(async () => {
    const assets = await load()
    const ctx = canvasRef.value.getContext('2d')
    scene = create(ctx, assets)
    measure()
    ready.value = true
    start()
  })

  return { ready, reducedMotion }
}
