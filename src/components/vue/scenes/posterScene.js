// Home hero: the Roadsec poster, traced into three layers (window, figure, hands)
// and drawn on a canvas with mouse/scroll parallax, typing fingers and watermarks.
// Framework agnostic: the Vue component only feeds it size, time and input.

const LIME = '#c8f031'
const WALL = '#121310'
const TOP = 350
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const BASE = '/static/scenes/home'

// Window rows of the poster, used to continue the panes past its edges
const ROWS = [
  { side: -1, T: [[11, 86], [638, 189]], B: [[0, 823], [641, 747]] },
  { side: -1, T: [[0, 1076], [641, 984]], B: [[0, 1816], [650, 1535]] },
  { side: 1, T: [[1807, 190], [2371, 104]], B: [[1808, 745], [2371, 818]] },
  { side: 1, T: [[1808, 987], [2371, 1069]], B: [[1799, 1534], [2371, 1781]] }
]
const POSTER_PANES = [
  [[11, 86], [638, 189], [641, 747], [0, 823]],
  [[2371, 104], [2371, 818], [1808, 745], [1807, 190]],
  [[801, 179], [1647, 183], [1645, 705], [796, 712]],
  [[805, 958], [1645, 962], [1645, 1535], [805, 1535]],
  [[641, 984], [650, 1535], [0, 1816], [0, 1076]],
  [[1808, 987], [2371, 1069], [2371, 1781], [1799, 1534]]
]
const MARKS = ['code', 'skull', 'ai', 'js', 'hack', 'css', 'skull', 'code', 'hack', 'js', 'vue', 'skull', 'code', 'hack', 'js', 'css', 'skull', 'code', 'hack', 'js', 'css']
const PRESS = 70
const HOLD = 50
const LIFT = 120
const DEPTH = 18

const yAt = ([x1, y1], [x2, y2], x) => y1 + ((y2 - y1) * (x - x1)) / (x2 - x1)

function seeded(seed) {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function drawMark(g, kind, sz) {
  const f = (w) => `900 ${w}px "Big Shoulders Display", Impact, sans-serif`
  const knockout = (draw) => {
    g.globalCompositeOperation = 'destination-out'
    g.fillStyle = 'rgba(0,0,0,.9)'
    draw()
    g.globalCompositeOperation = 'source-over'
  }
  g.fillStyle = 'rgba(10,11,9,.05)'
  g.strokeStyle = 'rgba(10,11,9,.05)'
  g.lineWidth = sz * 0.07
  g.textAlign = 'center'
  g.textBaseline = 'middle'

  if (kind === 'js') {
    g.fillRect(-sz / 2, -sz / 2, sz, sz)
    knockout(() => {
      g.textAlign = 'right'
      g.textBaseline = 'alphabetic'
      g.font = f(sz * 0.55)
      g.fillText('JS', sz * 0.42, sz * 0.44)
    })
  }
  if (kind === 'css') {
    g.fillRect(-sz / 2, -sz / 2, sz, sz)
    knockout(() => {
      g.textAlign = 'left'
      g.textBaseline = 'alphabetic'
      g.font = f(sz * 0.34)
      g.fillText('{ }', -sz * 0.4, -sz * 0.08)
      g.textAlign = 'right'
      g.font = f(sz * 0.46)
      g.fillText('CSS', sz * 0.42, sz * 0.44)
    })
  }
  if (kind === 'vue') {
    const V = (pts) => {
      g.beginPath()
      pts.forEach(([x, y], i) => (i ? g.lineTo(x * sz, y * sz) : g.moveTo(x * sz, y * sz)))
      g.closePath()
      g.fill()
    }
    V([[-0.55, -0.4], [-0.33, -0.4], [0, 0.17], [0.33, -0.4], [0.55, -0.4], [0, 0.5]])
    V([[-0.22, -0.4], [-0.1, -0.4], [0, -0.22], [0.1, -0.4], [0.22, -0.4], [0, -0.02]])
  }
  if (kind === 'code') {
    g.font = f(sz * 0.8)
    g.fillText('</>', 0, 0)
  }
  if (kind === 'hack') {
    g.font = f(sz * 0.78)
    g.fillText('H4CK', 0, 0)
  }
  if (kind === 'ai') {
    g.lineWidth = sz * 0.06
    g.strokeRect(-sz * 0.32, -sz * 0.32, sz * 0.64, sz * 0.64)
    for (let i = -2; i <= 2; i++) {
      const o = i * sz * 0.12
      ;[
        [o, -sz * 0.32, o, -sz * 0.46],
        [o, sz * 0.32, o, sz * 0.46],
        [-sz * 0.32, o, -sz * 0.46, o],
        [sz * 0.32, o, sz * 0.46, o]
      ].forEach(([a, b, c, d]) => {
        g.beginPath()
        g.moveTo(a, b)
        g.lineTo(c, d)
        g.stroke()
      })
    }
    g.font = f(sz * 0.42)
    g.fillText('AI', 0, sz * 0.03)
  }
  if (kind === 'skull') {
    g.beginPath()
    g.arc(0, -sz * 0.08, sz * 0.3, Math.PI * 0.85, Math.PI * 2.15)
    g.lineTo(sz * 0.2, sz * 0.3)
    g.lineTo(-sz * 0.2, sz * 0.3)
    g.closePath()
    g.fill()
    knockout(() => {
      ;[[-sz * 0.12, -sz * 0.04], [sz * 0.12, -sz * 0.04]].forEach(([x, y]) => {
        g.beginPath()
        g.arc(x, y, sz * 0.08, 0, 6.283)
        g.fill()
      })
      g.beginPath()
      g.moveTo(0, sz * 0.06)
      g.lineTo(-sz * 0.04, sz * 0.14)
      g.lineTo(sz * 0.04, sz * 0.14)
      g.closePath()
      g.fill()
    })
    g.fillStyle = 'rgba(10,11,9,.05)'
    ;[0.6, -0.6].forEach((r) => {
      g.save()
      g.rotate(r)
      g.fillRect(-sz * 0.55, sz * 0.36, sz * 1.1, sz * 0.08)
      g.restore()
    })
  }
}

export async function loadPosterScene() {
  const data = await fetch(`${BASE}/scene.json`).then((r) => r.json())
  const load = (src) =>
    new Promise((resolve, reject) => {
      const im = new Image()
      im.onload = () => resolve(im)
      im.onerror = reject
      im.src = src
    })
  const [back, mid, front, ...masks] = await Promise.all([
    load(`${BASE}/back.svg`),
    load(`${BASE}/mid.svg`),
    load(`${BASE}/front.svg`),
    ...data.fingers.map((f) => load(f[3]))
  ])
  // canvas text (watermarks, face letters) needs the web fonts
  if (document.fonts?.ready) await document.fonts.ready
  return { data, imgs: { back, mid, front }, masks }
}

export function createPosterScene(ctx, { data, imgs, masks }) {
  const W0 = data.W
  const H0 = data.H
  const F = W0 / 740
  const CX = W0 / 2
  const rnd = seeded(2014)
  const rasters = {}
  let W = 0
  let H = 0
  let dpr = 1
  let s = 1
  let ox = 0
  let oy = 0

  // panes continued past the poster, following its perspective lines
  const extPanes = []
  ROWS.forEach((r) => {
    const e = r.side < 0 ? 0 : W0 - 1
    const d = r.side
    ;[[e - d * 40, e + d * 170], [e + d * 300, e + d * 860], [e + d * 990, e + d * 1550], [e + d * 1680, e + d * 2240], [e + d * 2370, e + d * 2930]].forEach(([a, b]) =>
      extPanes.push([[a, yAt(...r.T, a)], [b, yAt(...r.T, b)], [b, yAt(...r.B, b)], [a, yAt(...r.B, a)]])
    )
  })
  const sidePanes = [POSTER_PANES[0], POSTER_PANES[1], POSTER_PANES[4], POSTER_PANES[5]]

  // watermarks live on their own layer so knockouts only cut the mark
  const markLayer = document.createElement('canvas')
  markLayer.width = W0 + 5600
  markLayer.height = H0
  ;(() => {
    const g = markLayer.getContext('2d')
    ;[...sidePanes, ...extPanes].forEach((q, i) => {
      const xs = q.map((v) => v[0]).sort((a, b) => a - b)
      const ys = q.map((v) => v[1]).sort((a, b) => a - b)
      const yTop = Math.max((ys[0] + ys[1]) / 2, TOP + 40)
      const yBot = (ys[2] + ys[3]) / 2
      const xL = (xs[0] + xs[1]) / 2
      const xR = (xs[2] + xs[3]) / 2
      const w = xR - xL
      const h = yBot - yTop
      if (w < 320 || h < 320) return
      g.save()
      g.translate((xL + xR) / 2 + 2800, (yTop + yBot) / 2)
      g.rotate((((i * 37) % 9) - 4) * 0.03)
      drawMark(g, MARKS[i % MARKS.length], Math.min(w, h) * 0.58)
      g.restore()
    })
  })()

  // letters inside the face void
  const vc = { x: 372 * F, y: 668 * F, rx: 150 * F, ry: 112 * F }
  const voidChars = []
  for (let y = vc.y - vc.ry; y < vc.y + vc.ry; y += 62)
    for (let x = vc.x - vc.rx; x < vc.x + vc.rx; x += 54)
      if (((x - vc.x) / vc.rx) ** 2 + ((y - vc.y) / vc.ry) ** 2 < 1)
        voidChars.push({ x, y, c: GLYPHS[(rnd() * GLYPHS.length) | 0], a: 0.04 + rnd() * 0.09, p: rnd() * 6.283, sp: 0.0012 + rnd() * 0.0016 })

  // cracks and specks on the wall past the poster
  const cracks = []
  const crack = (x, y, a, len, depth) => {
    const pts = [[x, y]]
    for (let i = 0; i < len; i++) {
      a += (rnd() - 0.5) * 1.1
      const st = 18 + rnd() * 26
      x += Math.cos(a) * st
      y += Math.sin(a) * st
      pts.push([x, y])
      if (depth < 2 && rnd() < 0.2) crack(x, y, a + (rnd() < 0.5 ? -1 : 1) * (0.7 + rnd() * 0.6), Math.max(2, ((len - i) * 0.5) | 0), depth + 1)
    }
    cracks.push({ pts, w: depth ? 3 : 5 })
  }
  ;[[-260, 1900, 0.3], [-900, 2050, -0.2], [-1500, 1880, 0.5], [-2100, 2200, -0.1], [-600, 2500, 0.2],
    [W0 + 260, 1900, 2.8], [W0 + 900, 2080, 3.3], [W0 + 1500, 1900, 2.6], [W0 + 2100, 2250, 3.1], [W0 + 700, 2550, 2.9]]
    .forEach(([x, y, a]) => crack(x, y, a, 6 + ((rnd() * 6) | 0), 0))
  const specks = Array.from({ length: 70 }, () => ({
    x: rnd() < 0.5 ? -2600 + rnd() * 2500 : W0 + 100 + rnd() * 2500,
    y: 1850 + rnd() * 900,
    r: 3 + rnd() * 6,
    lime: rnd() < 0.6
  }))

  // keys and the fingers that press them
  const keys = data.keys.map(([x, y, w, h]) => ({ x, y, w, h, hot: 0 }))
  const fingers = data.fingers.map(([x, y, w], i) => {
    let best = null
    let bd = 1e9
    keys.forEach((k) => {
      const d = Math.hypot(k.x + k.w / 2 - x, k.y + k.h / 2 - (y + 20))
      if (d < bd) {
        bd = d
        best = k
      }
    })
    return { x, y, w, key: best, t0: -1e9, mask: masks[i], cv: document.createElement('canvas') }
  })
  let nextTap = 0
  let lastFinger = -1

  const poly = (q) => {
    ctx.beginPath()
    ctx.moveTo(q[0][0], q[0][1])
    for (let i = 1; i < q.length; i++) ctx.lineTo(q[i][0], q[i][1])
    ctx.closePath()
  }
  const layer = (dx, dy, k = 1) => {
    ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (ox + dx), dpr * (oy + dy))
    if (k !== 1) {
      ctx.translate(CX, 3300)
      ctx.scale(k, k)
      ctx.translate(-CX, -3300)
    }
  }

  function cutFingers() {
    const r0 = rasters.front
    const k = r0.width / W0
    fingers.forEach((f) => {
      const c = f.cv
      c.width = Math.ceil(f.w * k)
      c.height = Math.ceil(214 * k)
      const g = c.getContext('2d')
      g.drawImage(r0, (f.x - f.w / 2) * k, (f.y - 200) * k, f.w * k, 214 * k, 0, 0, c.width, c.height)
      g.globalCompositeOperation = 'destination-in'
      g.drawImage(f.mask, 0, 0, c.width, c.height)
    })
  }
  const press = (f, t) => {
    const e = t - f.t0
    if (e < 0 || e > PRESS + HOLD + LIFT) return 0
    if (e < PRESS) return e / PRESS
    if (e < PRESS + HOLD) return 1
    return 1 - (e - PRESS - HOLD) / LIFT
  }
  function drawFingers(t) {
    const SL = 4
    fingers.forEach((f) => {
      const d = DEPTH * Math.sin((press(f, t) * Math.PI) / 2)
      if (d < 0.2 || !f.cv.width) return
      const c = f.cv
      const k = c.width / f.w
      const x0 = f.x - f.w / 2
      const top = f.y - 200
      // stretch the finger down: the knuckle stays, the tip travels d
      for (let i = 0; i < 214; i += SL) {
        const a = (i / 214) ** 1.6
        const b = ((i + SL) / 214) ** 1.6
        ctx.drawImage(c, 0, i * k, c.width, SL * k, x0, top + i + a * d, f.w, SL + (b - a) * d + 0.6)
      }
    })
  }
  function sideFade(y0) {
    const fw = 300
    const gl = ctx.createLinearGradient(-2, 0, fw, 0)
    gl.addColorStop(0, WALL)
    gl.addColorStop(1, 'rgba(18,19,16,0)')
    const gr = ctx.createLinearGradient(W0 + 2, 0, W0 - fw, 0)
    gr.addColorStop(0, WALL)
    gr.addColorStop(1, 'rgba(18,19,16,0)')
    const bands = 48
    const ramp = 520
    for (let i = 0; i < bands; i++) {
      ctx.globalAlpha = (i + 1) / bands
      const ya = y0 + (ramp * i) / bands
      const yb = i === bands - 1 ? H0 + 10 : y0 + (ramp * (i + 1)) / bands
      ctx.fillStyle = gl
      ctx.fillRect(-2, ya, fw + 2, yb - ya)
      ctx.fillStyle = gr
      ctx.fillRect(W0 - fw, ya, fw + 2, yb - ya)
    }
    ctx.globalAlpha = 1
  }

  return {
    resize(width, height, pixelRatio) {
      W = width
      H = height
      dpr = pixelRatio
      s = W / H > 1 ? Math.max(H / (H0 - TOP), W / (W0 * 2.4)) : Math.max(W / (W0 * 0.86), (H - 230) / H0)
      ox = (W / H > 1.15 ? W * 0.62 : W / 2) - CX * s
      oy = H - H0 * s
      for (const n of ['back', 'mid', 'front']) {
        const q = n === 'front' ? 1.3 : 1
        const c = rasters[n] || (rasters[n] = document.createElement('canvas'))
        c.width = Math.ceil(W0 * s * dpr * q)
        c.height = Math.ceil(H0 * s * dpr * q)
        const g = c.getContext('2d')
        g.clearRect(0, 0, c.width, c.height)
        g.drawImage(imgs[n], 0, 0, c.width, c.height)
      }
      cutFingers()
    },

    frame(t, { px, py, scroll, reduce }) {
      const m = reduce ? 0 : 1
      const sy = Math.min(scroll, H)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = WALL
      ctx.fillRect(0, 0, W * dpr, H * dpr)

      // back: wall, panes, watermarks, cracks
      const dolly = 1 + ((m * sy) / H) * 0.14
      layer(m * (-px * 14), m * (sy * 0.12 - py * 8), dolly)
      ctx.drawImage(rasters.back, 0, 0, W0, H0)
      ctx.fillStyle = LIME
      extPanes.forEach((q) => {
        poly(q)
        ctx.fill()
      })
      sidePanes.forEach((q) => {
        poly(q)
        ctx.fill()
      })
      ctx.drawImage(markLayer, -2800, 0)
      ctx.strokeStyle = 'rgba(200,240,49,.75)'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      cracks.forEach((c) => {
        ctx.lineWidth = c.w
        ctx.beginPath()
        c.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
        ctx.stroke()
      })
      specks.forEach((d) => {
        ctx.fillStyle = d.lime ? 'rgba(200,240,49,.6)' : 'rgba(228,230,218,.5)'
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, 6.283)
        ctx.fill()
      })

      // mid: hood and body, with the blinking letters in the face
      layer(m * (-px * 18), m * (sy * 0.12 - py * 10), dolly)
      ctx.drawImage(rasters.mid, 0, 0, W0, H0)
      ctx.font = '500 40px "IBM Plex Mono", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      voidChars.forEach((v) => {
        if (!reduce && Math.random() < 0.004) v.c = GLYPHS[(Math.random() * GLYPHS.length) | 0]
        const glow = reduce ? 0 : Math.max(0, Math.sin(t * v.sp + v.p)) ** 4
        ctx.fillStyle = `rgba(${(200 + 28 * glow) | 0},${(240 + 10 * glow) | 0},${(49 + 120 * glow) | 0},${v.a + 0.16 * glow})`
        ctx.fillText(v.c, v.x, v.y)
      })

      // front: hands and keyboard, moving with the body
      layer(m * (-px * 18), m * (sy * 0.12 - py * 10), dolly)
      ctx.drawImage(rasters.front, 0, 0, W0, H0)
      drawFingers(t)
      sideFade(2250)
      if (!reduce && t > nextTap) {
        let i
        do i = (Math.random() * fingers.length) | 0
        while (i === lastFinger)
        lastFinger = i
        const f = fingers[i]
        f.t0 = t
        setTimeout(() => {
          if (f.key) f.key.hot = 1
        }, PRESS)
        nextTap = t + 70 + Math.random() * (Math.random() < 0.15 ? 420 : 150)
      }
      keys.forEach((k) => {
        if (k.hot > 0.05) {
          ctx.save()
          ctx.shadowColor = LIME
          ctx.shadowBlur = 60 * k.hot
          ctx.fillStyle = `rgba(236,255,140,${0.75 * k.hot})`
          ctx.fillRect(k.x, k.y, k.w, k.h)
          ctx.restore()
        }
        k.hot *= 0.9
      })
    }
  }
}
