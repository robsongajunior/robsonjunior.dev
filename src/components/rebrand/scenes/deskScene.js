// About hero: the desk scene (vector art) with blinking monitors,
// the room continued to both sides (desk, front-end posters) and parallax.

const SW = 1719
const SH = 2445
const Q = 3 // the screen mask is 1/Q of the scene
const FX = 810
const FY = 1140
const INK = '#0a1622'
const BASE = '/static/rebrand/about'
const MONITORS = [[0, 630, 375, 990], [1356, 768, 1719, 1170], [456, 960, 1296, 1482], [75, 1512, 525, 1866], [1254, 1512, 1671, 1866]]

const WALL = '#5d676b'
const DOT = '#2c3a48'
const NAVY = '#09182a'
const GL = '#889598'
const GM = '#76838a'
const GD = '#61686c'
const CY = '#2ac4cc'
const DESK = 1838
const LIP = 2000
const UNDER = 2072
const FLOOR = 2222

// [x, y, w, h, rotation, kind]
const POSTERS = [
  [-760, 180, 520, 640, -0.06, 'js'], [-1500, 420, 460, 560, 0.05, 'tag'], [-2250, 160, 500, 620, -0.03, 'arrow'],
  [-980, 1020, 420, 380, 0.04, 'log'],
  [SW + 200, 200, 500, 620, 0.05, 'braces'], [SW + 930, 420, 460, 560, -0.05, 'css'], [SW + 1640, 180, 520, 640, 0.03, 'async'],
  [SW + 520, 1030, 440, 380, -0.04, 'npm']
]

const font = (w) => `900 ${w}px "Big Shoulders Display", Impact, sans-serif`
const mono = (w) => `500 ${w}px "IBM Plex Mono", monospace`
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

export async function loadDeskScene() {
  const load = (src) =>
    new Promise((resolve, reject) => {
      const im = new Image()
      im.onload = () => resolve(im)
      im.onerror = reject
      im.src = src
    })
  const [scene, screens] = await Promise.all([load(`${BASE}/scene.svg`), load(`${BASE}/screens.png`)])
  if (document.fonts?.ready) await document.fonts.ready
  return { scene, screens }
}

function pattern(ctx, size, bg, dot, r, pts) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  g.fillStyle = bg
  g.fillRect(0, 0, size, size)
  g.fillStyle = dot
  pts.forEach(([x, y]) => {
    g.beginPath()
    g.arc(x, y, r, 0, 6.283)
    g.fill()
  })
  return ctx.createPattern(c, 'repeat')
}

export function createDeskScene(ctx, { scene, screens }) {
  const wallPat = pattern(ctx, 36, WALL, DOT, 5.5, [[9, 9], [27, 27]])
  const dotPat = pattern(ctx, 22, GD, 'rgba(42,196,204,.55)', 3.2, [[5, 5], [16, 16]])
  const raster = document.createElement('canvas')
  const fx = document.createElement('canvas')
  fx.width = SW / Q
  fx.height = SH / Q
  const fc = fx.getContext('2d')
  let W = 0
  let H = 0
  let dpr = 1
  let s = 1
  let ox = 0
  let oy = 0
  let lastBlink = 0

  let rs = 11
  const rr = () => {
    rs = (rs * 16807) % 2147483647
    return rs / 2147483647
  }
  const circuits = []
  ;[-1, 1].forEach((d) => {
    for (let i = 0; i < 8; i++) {
      const x = d < 0 ? -2600 + rr() * 2500 : SW + 100 + rr() * 2500
      const y = 120 + rr() * 1400
      const len = 120 + rr() * 380
      circuits.push(rr() < 0.6 ? [x, y, x + len, y] : [x, y, x, y + len * 0.7])
    }
  })
  const monitors = MONITORS.map(([x0, y0, x1, y1]) => ({ x: x0 / Q, y: y0 / Q, w: (x1 - x0) / Q, h: (y1 - y0) / Q, hot: 0, wins: [] }))

  function poster([x, y, w, h, r, kind]) {
    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(r)
    ctx.fillStyle = 'rgba(9,24,42,.35)'
    ctx.fillRect(-w / 2 + 18, -h / 2 + 18, w, h)
    ctx.fillStyle = GD
    ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = dotPat
    ctx.fillRect(-w / 2, h / 6, w, h / 3)
    ctx.strokeStyle = NAVY
    ctx.lineWidth = 9
    ctx.strokeRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = 'rgba(200,205,205,.55)'
    ;[[-w / 2, -h / 2], [w / 2, -h / 2]].forEach(([tx, ty]) => {
      ctx.save()
      ctx.translate(tx, ty)
      ctx.rotate(tx < 0 ? -0.6 : 0.6)
      ctx.fillRect(-46, -16, 92, 32)
      ctx.restore()
    })
    ctx.fillStyle = CY
    ctx.strokeStyle = CY
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const t = (str, sz, dy = 0) => {
      ctx.font = font(sz)
      ctx.fillText(str, 0, dy)
    }
    const lines = (arr) => {
      ctx.textAlign = 'left'
      ctx.font = mono(w * 0.085)
      arr.forEach((str, i) => ctx.fillText(str, -w * 0.4, -h * 0.3 + i * h * 0.19))
    }
    if (kind === 'js') {
      ctx.fillRect(-w * 0.32, -h * 0.32, w * 0.64, w * 0.64)
      ctx.fillStyle = GD
      ctx.textAlign = 'right'
      ctx.textBaseline = 'alphabetic'
      ctx.font = font(w * 0.36)
      ctx.fillText('JS', w * 0.27, -h * 0.32 + w * 0.6)
      ctx.fillStyle = CY
      ctx.textAlign = 'center'
      t('JAVASCRIPT', w * 0.13, h * 0.36)
    }
    if (kind === 'tag') {
      t('</>', w * 0.5, -h * 0.08)
      t('FRONT-END', w * 0.14, h * 0.34)
    }
    if (kind === 'arrow') {
      t('() =>', w * 0.32, -h * 0.12)
      t('{ ship }', w * 0.2, h * 0.12)
      t('FOLLOW', w * 0.12, h * 0.38)
    }
    if (kind === 'log') lines(['console', '.log(', '"hello', ' world")'])
    if (kind === 'braces') {
      t('{ }', w * 0.55, -h * 0.1)
      t('WEB', w * 0.2, h * 0.34)
    }
    if (kind === 'css') {
      ctx.lineWidth = 12
      ctx.strokeRect(-w * 0.3, -h * 0.34, w * 0.6, w * 0.42)
      ctx.strokeRect(-w * 0.18, -h * 0.34 + w * 0.12, w * 0.46, w * 0.42)
      t('display: flex;', w * 0.1, h * 0.22)
      t('CSS', w * 0.16, h * 0.38)
    }
    if (kind === 'async') {
      t('ASYNC', w * 0.26, -h * 0.22)
      t('AWAIT', w * 0.26, h * 0.04)
      t('render()', w * 0.13, h * 0.32)
    }
    if (kind === 'npm') lines(['$ npm run', '  build', '✓ deployed', '  on edge'])
    ctx.restore()
  }

  function mug(x) {
    ctx.fillStyle = GL
    ctx.strokeStyle = NAVY
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.roundRect(x, DESK - 170, 130, 170, [6, 6, 22, 22])
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x + 138, DESK - 92, 34, -1.4, 1.4)
    ctx.stroke()
    ctx.fillStyle = CY
    ctx.font = font(64)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('JS', x + 65, DESK - 86)
  }
  function books(x) {
    ;[[0, 260, GM], [16, 230, GD], [-10, 280, GL]].forEach(([dx, w, c], i) => {
      const y = DESK - 44 * (i + 1)
      ctx.fillStyle = c
      ctx.fillRect(x + dx, y, w, 44)
      ctx.strokeStyle = NAVY
      ctx.lineWidth = 7
      ctx.strokeRect(x + dx, y, w, 44)
      ctx.fillStyle = CY
      ctx.fillRect(x + dx + 24, y + 14, w * 0.3, 14)
    })
  }
  function plant(x) {
    ctx.strokeStyle = NAVY
    ctx.lineWidth = 7
    ctx.fillStyle = CY
    ;[[-1.1, 150], [-0.6, 190], [-0.1, 210], [0.4, 185], [0.9, 150]].forEach(([a, l]) => {
      ctx.save()
      ctx.translate(x + 70, DESK - 140)
      ctx.rotate(a)
      ctx.beginPath()
      ctx.ellipse(0, -l / 2, 26, l / 2, 0, 0, 6.283)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    })
    ctx.fillStyle = GM
    ctx.beginPath()
    ctx.moveTo(x, DESK - 150)
    ctx.lineTo(x + 140, DESK - 150)
    ctx.lineTo(x + 120, DESK)
    ctx.lineTo(x + 20, DESK)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  function drawRoom() {
    ctx.fillStyle = wallPat
    ctx.fillRect(-3200, -400, 3200, FLOOR + 400)
    ctx.fillRect(SW, -400, 3200, FLOOR + 400)
    ctx.strokeStyle = CY
    ctx.lineWidth = 7
    ctx.lineCap = 'round'
    circuits.forEach(([a, b, c, d]) => {
      ctx.beginPath()
      ctx.moveTo(a, b)
      ctx.lineTo(c, d)
      ctx.stroke()
    })
    POSTERS.forEach(poster)
    ;[[-3200, 0], [SW, SW + 3200]].forEach(([a, b]) => {
      const w = b - a
      ctx.fillStyle = 'rgba(9,24,42,.55)'
      ctx.fillRect(a, UNDER, w, FLOOR - UNDER)
      ctx.fillStyle = GL
      ctx.fillRect(a, DESK, w, LIP - DESK)
      ctx.strokeStyle = 'rgba(9,24,42,.5)'
      ctx.lineWidth = 5
      for (let x = a + 60; x < b; x += 340) {
        ctx.beginPath()
        ctx.moveTo(x, DESK + 30)
        ctx.lineTo(x + 120, DESK + 30)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x + 170, DESK + 100)
        ctx.lineTo(x + 300, DESK + 100)
        ctx.stroke()
      }
      ctx.fillStyle = GM
      ctx.fillRect(a, LIP, w, UNDER - LIP)
      ctx.strokeStyle = NAVY
      ctx.lineWidth = 9
      ;[DESK, LIP, UNDER].forEach((y) => {
        ctx.beginPath()
        ctx.moveTo(a, y)
        ctx.lineTo(b, y)
        ctx.stroke()
      })
      ctx.fillStyle = NAVY
      ctx.fillRect(a, FLOOR, w, 2000)
    })
    ;[-2300, SW + 2300].forEach((x) => {
      ctx.fillStyle = GM
      ctx.fillRect(x - 40, UNDER, 80, FLOOR - UNDER)
      ctx.strokeStyle = NAVY
      ctx.lineWidth = 8
      ctx.strokeRect(x - 40, UNDER, 80, FLOOR - UNDER)
    })
    mug(-620)
    books(-1500)
    plant(SW + 380)
    mug(SW + 1300)
    books(SW + 1900)
  }

  // fade the scene's cut edges into the wall and the desk
  function seams() {
    const fw = 80
    const n = 10
    for (let i = 0; i < n; i++) {
      ctx.globalAlpha = 1 - i / n
      const ww = fw / n + 1
      ;[(i * fw) / n, SW - ((i + 1) * fw) / n].forEach((x) => {
        ctx.fillStyle = wallPat
        ctx.fillRect(x, -400, ww, DESK + 400)
        ctx.fillStyle = GL
        ctx.fillRect(x, DESK, ww, LIP - DESK)
        ctx.fillStyle = GM
        ctx.fillRect(x, LIP, ww, UNDER - LIP)
        ctx.fillStyle = '#0e2134'
        ctx.fillRect(x, UNDER, ww, FLOOR - UNDER)
        ctx.fillStyle = NAVY
        ctx.fillRect(x, FLOOR, ww, 2000)
      })
    }
    ctx.globalAlpha = 1
    ctx.strokeStyle = NAVY
    ctx.lineWidth = 9
    ;[DESK, LIP, UNDER].forEach((y) => {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(fw, y)
      ctx.moveTo(SW - fw, y)
      ctx.lineTo(SW, y)
      ctx.stroke()
    })
  }

  const layer = (dx, dy, k = 1) => {
    ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (ox + dx), dpr * (oy + dy))
    if (k !== 1) {
      ctx.translate(FX, FY)
      ctx.scale(k, k)
      ctx.translate(-FX, -FY)
    }
  }

  return {
    resize(width, height, pixelRatio) {
      W = width
      H = height
      dpr = pixelRatio
      s = W / H > 1 ? H / (SH * 0.9) : Math.max(H / (SH * 0.92), W / SW)
      ox = (W / H > 1 ? W * 0.6 : W / 2) - FX * s
      oy = clamp(H * 0.5 - FY * s, H - SH * s, 0)
      raster.width = Math.ceil(SW * s * dpr)
      raster.height = Math.ceil(SH * s * dpr)
      raster.getContext('2d').drawImage(scene, 0, 0, raster.width, raster.height)
    },

    frame(t, { px, py, scroll, reduce }) {
      const m = reduce ? 0 : 1
      const sy = Math.min(scroll, H)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = INK
      ctx.fillRect(0, 0, W * dpr, H * dpr)

      layer(m * (-px * 24), m * (sy * 0.35 - py * 14), 1 + ((m * sy) / H) * 0.08)
      drawRoom()
      ctx.drawImage(raster, 0, 0, SW, SH)
      seams()

      // monitors flash and open little windows, clipped to the screens
      if (!reduce && t - lastBlink > 110) {
        lastBlink = t
        const mo = monitors[(Math.random() * monitors.length) | 0]
        mo.hot = 1
        if (mo.wins.length < 4) {
          const w = mo.w * (0.12 + Math.random() * 0.22)
          const h = mo.h * (0.12 + Math.random() * 0.25)
          mo.wins.push({ x: mo.x + Math.random() * (mo.w - w), y: mo.y + Math.random() * (mo.h - h), w, h, life: 1 })
        }
      }
      fc.globalCompositeOperation = 'source-over'
      fc.clearRect(0, 0, fx.width, fx.height)
      monitors.forEach((mo) => {
        mo.wins.forEach((wi) => {
          fc.fillStyle = `rgba(141,148,150,${wi.life})`
          fc.fillRect(wi.x, wi.y, wi.w, wi.h)
          wi.life *= 0.985
        })
        mo.wins = mo.wins.filter((wi) => wi.life > 0.05)
        if (mo.hot > 0.03) {
          fc.fillStyle = `rgba(150,240,248,${0.38 * mo.hot})`
          fc.fillRect(mo.x, mo.y, mo.w, mo.h)
        }
        mo.hot *= 0.88
      })
      fc.globalCompositeOperation = 'destination-in'
      fc.drawImage(screens, 0, 0)
      ctx.drawImage(fx, 0, 0, SW, SH)
    }
  }
}
