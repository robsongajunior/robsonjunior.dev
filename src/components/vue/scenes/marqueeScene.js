// Blog hero: tilted bands of the real post titles in outlined display type,
// each band sliding at its own speed (alternating direction, faster with scroll).
// Now and then one title lights up in the accent colour and fades out.

const ANGLE = -0.14 // ~8° tilt
const SEP = '  /  '

const font = (size) => `900 ${size}px "Big Shoulders Display", Impact, sans-serif`

// colours come from the page theme tokens
function themeColors() {
  const css = getComputedStyle(document.documentElement)
  const v = (name, fallback) => css.getPropertyValue(name).trim() || fallback
  return { ink: v('--ink', '#160a11'), accent: v('--accent', '#ff4f9e'), mute: v('--mute', '#a3899a') }
}

export async function loadMarqueeScene(titles = []) {
  if (document.fonts?.load) await document.fonts.load(font(100)).catch(() => {})
  return { titles: titles.map((t) => t.toUpperCase()), colors: themeColors() }
}

export function createMarqueeScene(ctx, { titles, colors }) {
  let W = 0
  let H = 0
  let dpr = 1
  let size = 0
  let rows = []
  let lastFlash = 0
  let last = 0

  // each band gets the titles in a different order so the rows don't line up
  function build() {
    size = Math.round(Math.max(56, Math.min(150, H / 6.2)))
    ctx.font = font(size)
    const sepW = ctx.measureText(SEP).width
    const diag = Math.hypot(W, H)
    const count = Math.ceil(diag / (size * 1.05)) + 2
    const list = titles.length ? titles : ['BLOG']
    rows = Array.from({ length: count }, (_, r) => {
      const shift = (r * 5) % list.length
      const order = list.slice(shift).concat(list.slice(0, shift))
      const segs = []
      let x = 0
      order.forEach((text) => {
        const w = ctx.measureText(text).width
        segs.push({ text, x, w, glow: 0 })
        x += w + sepW
      })
      return {
        segs,
        length: x,
        dir: r % 2 ? 1 : -1,
        speed: 14 + ((r * 7) % 5) * 6, // px per second
        offset: (r * 997) % x
      }
    })
    // start with one title lit (it stays lit in the still, reduced-motion frame)
    const lit = rows[Math.floor(rows.length / 2) - 1]
    if (lit) lit.segs.forEach((seg) => (seg.glow = 1))
  }

  return {
    resize(width, height, pixelRatio) {
      W = width
      H = height
      dpr = pixelRatio
      build()
    },

    frame(t, { px, py, scroll, reduce }) {
      const dt = last ? Math.min(t - last, 64) / 1000 : 0
      last = t
      const sy = Math.min(scroll, H)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = colors.ink
      ctx.fillRect(0, 0, W * dpr, H * dpr)

      // band rotated around the centre, slightly shifted by the pointer
      const m = reduce ? 0 : 1
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.translate(W / 2 + m * -px * 18, H / 2 + m * (-py * 10 - sy * 0.2))
      ctx.rotate(ANGLE)
      const diag = Math.hypot(W, H)
      const step = size * 1.05
      const top = -(rows.length * step) / 2

      ctx.font = font(size)
      ctx.textBaseline = 'top'
      ctx.lineWidth = 1.25
      ctx.lineJoin = 'round'

      // light up a random visible title every ~1.6s
      if (!reduce && t - lastFlash > 1600) {
        lastFlash = t
        const row = rows[(Math.random() * rows.length) | 0]
        row.segs[(Math.random() * row.segs.length) | 0].glow = 1
      }

      rows.forEach((row, r) => {
        if (!reduce) row.offset += row.dir * (row.speed * dt + (scroll - (row.lastScroll ?? scroll)) * 0.6)
        row.lastScroll = scroll
        const y = top + r * step
        const base = ((row.offset % row.length) + row.length) % row.length
        for (let copy = -1; copy <= Math.ceil(diag / row.length) + 1; copy++) {
          row.segs.forEach((seg) => {
            const x = -diag / 2 + seg.x + copy * row.length - base
            if (x > diag / 2 || x + seg.w < -diag / 2) return
            if (seg.glow > 0.02) {
              ctx.globalAlpha = seg.glow
              ctx.fillStyle = colors.accent
              ctx.fillText(seg.text, x, y)
            }
            ctx.globalAlpha = 0.32
            ctx.strokeStyle = colors.mute
            ctx.strokeText(seg.text, x, y)
          })
        }
        if (!reduce) row.segs.forEach((seg) => (seg.glow *= 0.994))
      })
      ctx.globalAlpha = 1
    }
  }
}
