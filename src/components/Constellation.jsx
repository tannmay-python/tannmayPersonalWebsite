import { useRef, useEffect } from 'react'

// A quiet, slow-drifting starfield. Faint by design — it should read as
// texture behind the hero, not decoration. Lines thread toward the cursor.
export default function Constellation() {
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const stars = []
    const mouse = { x: -999, y: -999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.round((w * h) / 14000)
      stars.length = 0
      for (let i = 0; i < target; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.4 + 0.4,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy
        if (s.x < 0 || s.x > w) s.vx *= -1
        if (s.y < 0 || s.y > h) s.vy *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(246, 236, 223, 0.55)'
        ctx.fill()
        const dx = s.x - mouse.x, dy = s.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 130) {
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(241, 162, 34, ${0.45 * (1 - d / 130)})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
      // thin threads between near stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y
          const d = Math.hypot(dx, dy)
          if (d < 96) {
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(246, 236, 223, ${0.14 * (1 - d / 96)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => { mouse.x = -999; mouse.y = -999 }

    resize()
    window.addEventListener('resize', resize)
    canvas.parentElement.addEventListener('mousemove', onMove)
    canvas.parentElement.addEventListener('mouseleave', onLeave)
    if (reduce) { draw(); cancelAnimationFrame(raf) } else { draw() }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.parentElement.removeEventListener('mousemove', onMove)
      canvas.parentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="masthead-canvas" aria-hidden="true" />
}
