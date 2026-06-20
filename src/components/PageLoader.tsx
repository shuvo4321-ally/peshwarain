'use client'

import { useEffect, useRef } from 'react'

/**
 * Brand page loader.
 *
 * The "P" mark sits still in gold. The PESHWARAIN wordmark lights
 * letter-by-letter and a trilingual counter ticks 0 → 100 below it.
 * Veils slide apart when the hero video signals ready.
 */

const LETTERS = ['P', 'E', 'S', 'H', 'W', 'A', 'R', 'A', 'I', 'N']
const BN = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
const UR = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const toBn = (n: number) => String(n).split('').map(d => BN[+d] ?? d).join('')
const toUr = (n: number) => String(n).split('').map(d => UR[+d] ?? d).join('')

const INTRO_DURATION = 3400

export default function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  /* Counter ticker — rAF loop 0 → 100, cycling Bengali / Urdu / English numerals */
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const elapsed = t - start
      if (elapsed >= INTRO_DURATION) {
        if (counterRef.current) counterRef.current.textContent = toBn(100)
        return
      }
      const n = Math.floor((elapsed / INTRO_DURATION) * 99)
      const script = Math.floor((Date.now() / 280) % 3)
      if (counterRef.current) {
        counterRef.current.textContent =
          script === 0 ? toBn(n) : script === 1 ? toUr(n) : String(n)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* Wait for hero video, then trigger CSS exit */
  useEffect(() => {
    // Disable scroll while loader is active
    document.body.style.overflow = 'hidden'

    const root = rootRef.current
    if (!root) return

    let exitFired = false
    const fireExit = () => {
      if (exitFired) return
      exitFired = true
      root.classList.add('pwr-loader--exit')
      // Restore scroll when loader exits
      setTimeout(() => {
        document.body.style.overflow = ''
      }, 500) // Delay scroll restore slightly for smoother transition
    }

    /* Hold loader at least until the intro animations have run */
    const minDelay = new Promise<void>(r => setTimeout(r, INTRO_DURATION))
    const videoReady = new Promise<void>(r => {
      if ((window as any).pwrVideoLoaded) return r()
      const handler = () => {
        window.removeEventListener('pwr-video-loaded', handler)
        r()
      }
      window.addEventListener('pwr-video-loaded', handler)
      setTimeout(() => {
        window.removeEventListener('pwr-video-loaded', handler)
        r()
      }, 5500)
    })

    let cancelled = false
    Promise.all([minDelay, videoReady]).then(() => {
      if (!cancelled) fireExit()
    })

    return () => {
      cancelled = true
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div ref={rootRef} className="pwr-loader" aria-hidden>
      <div className="pwr-loader-veil-top" />
      <div className="pwr-loader-veil-bot" />

      <div className="pwr-loader-content">
        <span className="pwr-loader-glyph font-logo">P</span>

        <div className="pwr-loader-meta">
          <span className="pwr-loader-wordmark font-mono">
            {LETTERS.map((l, i) => (
              <span
                key={i}
                className="pwr-loader-letter"
                style={{ animationDelay: `${0.4 + i * 0.12}s` }}
              >
                {l}
              </span>
            ))}
          </span>
          <span ref={counterRef} className="font-bangla">০</span>
        </div>
      </div>
    </div>
  )
}
