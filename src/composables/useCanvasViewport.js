import { onBeforeUnmount, onMounted } from 'vue'

// Keeps a canvas backing store in sync with its CSS size and device pixel ratio.
// Calls onResize(width, height, dpr) on mount and on every window resize.
export function useCanvasViewport(canvasRef, onResize, { maxDpr = 2 } = {}) {
  const size = { width: 0, height: 0, dpr: 1 }

  const measure = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    size.dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    size.width = canvas.clientWidth
    size.height = canvas.clientHeight
    canvas.width = size.width * size.dpr
    canvas.height = size.height * size.dpr
    onResize?.(size.width, size.height, size.dpr)
  }

  onMounted(() => addEventListener('resize', measure))
  onBeforeUnmount(() => removeEventListener('resize', measure))

  return { size, measure }
}
