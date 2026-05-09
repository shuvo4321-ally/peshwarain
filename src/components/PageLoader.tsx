'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * Brand-mark page loader. ~1.6s reveal, then unmounts.
 * Bengali numeral counts to 100, golden seam wipes open the page.
 */
export default function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const counter = counterRef.current
    if (!root || !counter) return

    const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯']
    const toBn = (n: number) => String(n).split('').map(d => bnDigits[+d] ?? d).join('')

    const obj = { v: 0 }
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.pwr-loader-mark', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo('.pwr-loader-bar', { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power2.inOut' }, '-=0.3')
      .to(obj, {
        v: 99,
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = toBn(Math.round(obj.v))
        },
      }, '-=1.0')
      .add(() => {
        let isFinishing = false
        const finishLoading = () => {
          if (isFinishing) return
          isFinishing = true
          gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to(obj, {
              v: 100,
              duration: 0.2,
              onUpdate: () => {
                if (counterRef.current) counterRef.current.textContent = toBn(Math.round(obj.v))
              }
            })
            .to('.pwr-loader-content', { opacity: 0, y: -10, duration: 0.45, ease: 'power2.in' }, '+=0.15')
            .to('.pwr-loader-veil-top', { y: '-100%', duration: 0.85, ease: 'power3.inOut' }, '-=0.15')
            .to('.pwr-loader-veil-bot', { y: '100%', duration: 0.85, ease: 'power3.inOut' }, '<')
            .add(() => setDone(true))
        }

        if ((window as any).pwrVideoLoaded) {
          finishLoading()
        } else {
          const handler = () => {
            window.removeEventListener('pwr-video-loaded', handler)
            finishLoading()
          }
          window.addEventListener('pwr-video-loaded', handler)
          
          // Fallback to avoid infinite loading
          setTimeout(() => {
            window.removeEventListener('pwr-video-loaded', handler)
            finishLoading()
          }, 6000)
        }
      })

    return () => { tl.kill() }
  }, [])

  if (done) return null

  return (
    <div ref={rootRef} className="pwr-loader" aria-hidden>
      <div className="pwr-loader-veil-top" />
      <div className="pwr-loader-veil-bot" />
      <div className="pwr-loader-content">
        <div className="pwr-loader-mark">
          <span className="pwr-loader-glyph font-logo">P</span>
          <span className="pwr-loader-urdu font-urdu" dir="rtl">پشوارین</span>
        </div>
        <div className="pwr-loader-bar" />
        <div className="pwr-loader-meta">
          <span className="font-sans">PESHWARAIN</span>
          <span ref={counterRef} className="font-bangla">০</span>
        </div>
      </div>
    </div>
  )
}
