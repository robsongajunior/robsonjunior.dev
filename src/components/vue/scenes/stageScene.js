// Talks hero: a stage drawn in code, in the flat, inked, halftone look of the
// home and about scenes. A projection screen cycles through the real talk titles,
// the speaker gestures under a spotlight and the audience (backs to us) holds up
// phones that light up. Three parallax layers: wall/screen, stage, audience.

const SW = 1800
const SH = 1100
const FLOOR = 860
const SCREEN = { x: 500, y: 110, w: 900, h: 510 }
const SPEAKER = { x: 1490, feet: FLOOR }
const SLIDE_MS = 5200

const font = (w) => `900 ${w}px "Big Shoulders Display", Impact, sans-serif`
const mono = (w) => `500 ${w}px "IBM Plex Mono", monospace`

function themeColors() {
  const css = getComputedStyle(document.documentElement)
  const v = (name, fallback) => css.getPropertyValue(name).trim() || fallback
  return { ink: v('--ink', '#0f0b1c'), accent: v('--accent', '#c4b0ff'), line: v('--line', '#2a2342') }
}

export async function loadStageScene(titles = []) {
  if (document.fonts?.load) {
    await Promise.all([document.fonts.load(font(80)), document.fonts.load(mono(20))]).catch(() => {})
  }
  return { titles: titles.length ? titles : ['Palestras'], colors: themeColors() }
}

// small tiled dot pattern, like the halftone of the other scenes
function pattern(ctx, size, bg, dot, r) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  g.fillStyle = bg
  g.fillRect(0, 0, size, size)
  g.fillStyle = dot
  ;[[size / 4, size / 4], [(size * 3) / 4, (size * 3) / 4]].forEach(([x, y]) => {
    g.beginPath()
    g.arc(x, y, r, 0, 6.283)
    g.fill()
  })
  return ctx.createPattern(c, 'repeat')
}

function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function wrap(ctx, text, maxWidth) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  words.forEach((word) => {
    const next = line ? line + ' ' + word : word
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else line = next
  })
  if (line) lines.push(line)
  return lines
}

export function createStageScene(ctx, { titles, colors }) {
  const INK = colors.ink
  const OUT = '#07050e' // ink outlines
  const WALL = '#191430'
  const GREY = '#77718f'
  const GREY_D = '#4f4a66'
  const GREY_L = '#a7a2bd'
  const wallPat = pattern(ctx, 30, WALL, '#231c40', 4.5)
  const screenPat = pattern(ctx, 14, colors.accent, 'rgba(15,11,28,.16)', 2.2)
  const stagePat = pattern(ctx, 22, '#120e22', '#1b1631', 3)
  const shadePat = pattern(ctx, 12, 'rgba(0,0,0,0)', 'rgba(7,5,14,.45)', 2)

  let W = 0
  let H = 0
  let dpr = 1
  let s = 1
  let ox = 0
  let oy = 0

  // audience: two rows of heads and shoulders, some holding phones
  const rand = seeded(7)
  const audience = []
  ;[
    { y: 990, r: 40, gap: 132, tone: '#151029', z: 1.35 },
    { y: 1090, r: 54, gap: 176, tone: OUT, z: 1.8 }
  ].forEach((row, ri) => {
    for (let x = -700 + ri * 60; x < SW + 700; x += row.gap * (0.85 + rand() * 0.3)) {
      audience.push({
        x,
        y: row.y + rand() * 18,
        r: row.r * (0.9 + rand() * 0.2),
        tone: row.tone,
        z: row.z,
        phone: rand() < 0.22 ? { lit: 0, side: rand() < 0.5 ? -1 : 1 } : null
      })
    }
  })
  const phones = audience.filter((a) => a.phone)

  let slide = 0
  let slideAt = 0
  let lastFlash = 0

  function layer(dx, dy) {
    ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (ox + dx), dpr * (oy + dy))
  }

  function drawScreen(t, reduce) {
    const { x, y, w, h } = SCREEN
    // rigging
    ctx.strokeStyle = OUT
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(x + 120, -400)
    ctx.lineTo(x + 120, y)
    ctx.moveTo(x + w - 120, -400)
    ctx.lineTo(x + w - 120, y)
    ctx.stroke()
    // shadow + frame
    ctx.fillStyle = 'rgba(7,5,14,.55)'
    ctx.fillRect(x + 22, y + 22, w, h)
    ctx.fillStyle = screenPat
    ctx.fillRect(x, y, w, h)
    ctx.lineWidth = 12
    ctx.strokeRect(x, y, w, h)

    // slide content: label, title, footer with the slide number
    if (!reduce && t - slideAt > SLIDE_MS) {
      slide = (slide + 1) % titles.length
      slideAt = t
    }
    const p = reduce ? 1 : Math.min(1, (t - slideAt) / 450) // wipe in
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w * p, h)
    ctx.clip()
    ctx.fillStyle = INK
    ctx.textBaseline = 'top'
    ctx.font = mono(22)
    ctx.fillText('robson júnior', x + 56, y + 50)
    ctx.font = font(78)
    const lines = wrap(ctx, titles[slide].toUpperCase(), w - 140).slice(0, 4)
    lines.forEach((line, i) => ctx.fillText(line, x + 56, y + 108 + i * 74))
    ctx.fillRect(x + 56, y + h - 74, w - 112, 4)
    ctx.font = mono(22)
    ctx.fillText(`${String(slide + 1).padStart(2, '0')} / ${String(titles.length).padStart(2, '0')}`, x + 56, y + h - 54)
    ctx.textAlign = 'right'
    ctx.fillText('↗', x + w - 56, y + h - 54)
    ctx.textAlign = 'left'
    ctx.restore()
  }

  function drawStage() {
    ctx.fillStyle = stagePat
    ctx.fillRect(-1200, FLOOR, SW + 2400, SH)
    ctx.fillStyle = colors.line
    ctx.fillRect(-1200, FLOOR, SW + 2400, 8)
    // lectern with a glowing laptop
    ctx.fillStyle = GREY_D
    ctx.strokeStyle = OUT
    ctx.lineWidth = 7
    ctx.beginPath()
    ctx.moveTo(1640, 700)
    ctx.lineTo(1810, 700)
    ctx.lineTo(1790, FLOOR)
    ctx.lineTo(1660, FLOOR)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = GREY
    ctx.fillRect(1626, 686, 198, 22)
    ctx.strokeRect(1626, 686, 198, 22)
    ctx.fillStyle = colors.accent
    ctx.beginPath()
    ctx.moveTo(1660, 686)
    ctx.lineTo(1690, 630)
    ctx.lineTo(1790, 630)
    ctx.lineTo(1780, 686)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  function limb(points, width, color) {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = OUT
    ctx.lineWidth = width + 12
    ctx.beginPath()
    points.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)))
    ctx.stroke()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()
  }

  function drawSpeaker(t, reduce) {
    const { x, feet } = SPEAKER
    const k = reduce ? 0 : 1
    const sway = Math.sin(t / 900) * 6 * k
    const hx = x + sway * 0.6

    // spotlight cone + pool
    const cone = ctx.createLinearGradient(0, -300, 0, FLOOR)
    cone.addColorStop(0, 'rgba(196,176,255,0)')
    cone.addColorStop(1, 'rgba(196,176,255,.16)')
    ctx.fillStyle = cone
    ctx.beginPath()
    ctx.moveTo(x - 60, -300)
    ctx.lineTo(x + 60, -300)
    ctx.lineTo(x + 230, FLOOR + 30)
    ctx.lineTo(x - 230, FLOOR + 30)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = 'rgba(196,176,255,.14)'
    ctx.beginPath()
    ctx.ellipse(x, FLOOR + 22, 240, 34, 0, 0, 6.283)
    ctx.fill()

    // legs
    limb([[x - 34, 640], [x - 44, feet - 6]], 40, '#2b2640')
    limb([[x + 30, 640], [x + 42, feet - 6]], 40, '#2b2640')
    // shoes
    ctx.fillStyle = OUT
    ctx.beginPath()
    ctx.ellipse(x - 58, feet - 4, 34, 13, 0, 0, 6.283)
    ctx.ellipse(x + 56, feet - 4, 34, 13, 0, 0, 6.283)
    ctx.fill()

    // torso
    ctx.fillStyle = GREY
    ctx.strokeStyle = OUT
    ctx.lineWidth = 7
    ctx.beginPath()
    ctx.moveTo(x - 72 + sway * 0.4, 500)
    ctx.quadraticCurveTo(x, 482, x + 72 + sway * 0.4, 500)
    ctx.lineTo(x + 58, 660)
    ctx.lineTo(x - 58, 660)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    // halftone shading on the torso side away from the light
    ctx.save()
    ctx.clip()
    ctx.fillStyle = shadePat
    ctx.fillRect(x - 80, 480, 70, 200)
    ctx.restore()
    // other arm: hand-held mic up by the chin
    limb([[x + 52, 515], [x + 88, 600], [hx + 34, 556]], 30, GREY_D)
    ctx.fillStyle = OUT
    ctx.save()
    ctx.translate(hx + 30, 552)
    ctx.rotate(-0.45)
    ctx.fillRect(-7, -40, 14, 44)
    ctx.beginPath()
    ctx.arc(0, -44, 12, 0, 6.283)
    ctx.fill()
    ctx.restore()

    // head + hair, rim light toward the screen
    ctx.strokeStyle = OUT
    ctx.lineWidth = 7
    ctx.fillStyle = GREY_L
    ctx.beginPath()
    ctx.arc(hx, 440, 40, 0, 6.283)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#2b2640'
    ctx.beginPath()
    ctx.arc(hx + 6, 436, 42, Math.PI * 0.95, Math.PI * 2.1)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.strokeStyle = colors.accent
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(hx, 440, 46, Math.PI * 0.75, Math.PI * 1.25)
    ctx.stroke()

    // front arm: points at the screen, the hand moves between gestures
    const g = (Math.sin(t / 1400) + 1) / 2
    const ex = x - 120 - 30 * g * k
    const ey = 560 - 60 * g * k
    limb([[x - 50, 515], [ex, ey], [ex - 90 - 20 * g * k, ey - 70 - 40 * g * k]], 30, GREY)
    // rim line on the torso edge facing the screen
    ctx.strokeStyle = colors.accent
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(x - 80 + sway * 0.4, 508)
    ctx.lineTo(x - 66, 650)
    ctx.stroke()
  }

  function drawAudience(t, reduce) {
    if (!reduce && t - lastFlash > 420) {
      lastFlash = t
      phones[(Math.random() * phones.length) | 0].phone.lit = 1
    }
    audience.forEach((a) => {
      // phone held up beside the head
      if (a.phone) {
        const px = a.x + a.phone.side * a.r * 0.9
        const py = a.y - a.r * 2.6
        limb([[a.x + a.phone.side * a.r * 0.8, a.y], [px, py + a.r * 0.7]], a.r * 0.32, a.tone)
        ctx.fillStyle = OUT
        ctx.fillRect(px - a.r * 0.32, py - a.r * 0.3, a.r * 0.64, a.r * 1.06)
        const lit = reduce ? 0.8 : 0.45 + a.phone.lit * 0.55
        ctx.fillStyle = `rgba(196,176,255,${lit})`
        ctx.fillRect(px - a.r * 0.25, py - a.r * 0.23, a.r * 0.5, a.r * 0.9)
        if (!reduce) a.phone.lit *= 0.96
      }
      // shoulders + head, seen from behind
      ctx.fillStyle = a.tone
      ctx.strokeStyle = colors.line
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.ellipse(a.x, a.y + a.r * 1.6, a.r * 2.1, a.r * 1.3, 0, Math.PI, 0)
      ctx.fill()
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(a.x, a.y - a.r * 0.15, a.r, 0, 6.283)
      ctx.fill()
      ctx.stroke()
    })
  }

  return {
    resize(width, height, pixelRatio) {
      W = width
      H = height
      dpr = pixelRatio
      const wide = W / H > 1
      s = wide ? H / (SH * 0.92) : Math.max((H * 0.62) / SH, W / (SW * 0.62))
      // desktop: the stage sits right of the title; mobile: speaker centred, below the copy
      const fx = wide ? 1150 : 1320
      ox = (wide ? W * 0.64 : W / 2) - fx * s
      oy = H - SH * s * (wide ? 1 : 0.98)
    },

    frame(t, { px, py, scroll, reduce }) {
      const m = reduce ? 0 : 1
      const sy = Math.min(scroll, H)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.fillStyle = wallPat
      ctx.fillRect(0, 0, W * dpr, H * dpr)

      layer(m * -px * 10, m * (sy * 0.15 - py * 6))
      drawScreen(t, reduce)

      layer(m * -px * 22, m * (sy * 0.3 - py * 12))
      drawStage()
      drawSpeaker(t, reduce)

      layer(m * -px * 40, m * (sy * 0.5 - py * 20))
      drawAudience(t, reduce)
    }
  }
}
