'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitText } from '@/hooks/useSplitText'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const emberCanvasRef = useRef<HTMLCanvasElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [backToTop, setBackToTop] = useState(false)

  // Back-to-top
  useEffect(() => {
    const onScroll = () => setBackToTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ember particles — reduced to 25, sharper
  useEffect(() => {
    const canvas = emberCanvasRef.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const fit = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.scale(dpr, dpr)
    }
    fit()
    window.addEventListener('resize', fit)

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; hue: number }
    const particles: Particle[] = []
    const COUNT = 25

    const spawn = (): Particle => {
      const r = canvas.getBoundingClientRect()
      return {
        x: Math.random() * r.width,
        y: r.height + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(0.4 + Math.random() * 0.8),
        r: 0.8 + Math.random() * 1.2,
        life: 0,
        max: 320 + Math.random() * 280,
        hue: 36 + Math.random() * 14,
      }
    }
    for (let i = 0; i < COUNT; i++) particles.push({ ...spawn(), life: Math.random() * 200 })

    let raf = 0
    const tick = () => {
      const r = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, r.width, r.height)
      ctx.globalCompositeOperation = 'lighter'

      for (const p of particles) {
        p.life += 1
        p.x += p.vx
        p.y += p.vy
        p.vx += (Math.random() - 0.5) * 0.015

        const t = p.life / p.max
        const alpha = Math.sin(t * Math.PI) * 0.6

        // Sharp core
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha * 0.9})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        // Soft glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 60%, ${alpha * 0.4})`)
        grad.addColorStop(1, `hsla(${p.hue}, 95%, 50%, 0)`)
        ctx.beginPath()
        ctx.fillStyle = grad
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fill()

        if (p.life > p.max || p.y < -20) Object.assign(p, spawn())
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', fit)
    }
  }, [])

  // Cinematic entrance — dramatic word-level reveal with blur, 3D, and shimmer
  useGSAP(
    () => {
      const headline = headlineRef.current
      const sub = subRef.current
      if (!headline || !sub) return

      // Word-level animation — avoids breaking Bengali conjuncts
      const line1Words = Array.from(headline.children[0]?.querySelectorAll<HTMLElement>('.pwr-hl-word') ?? [])
      const line2Words = Array.from(headline.children[1]?.querySelectorAll<HTMLElement>('.pwr-hl-word') ?? [])
      const goldWords = headline.querySelectorAll<HTMLElement>('.letterpress')

      const subSplit = splitText(sub, { chars: false, words: true })

      // ── Initial states ──
      gsap.set([...line1Words, ...line2Words], {
        yPercent: 160,
        opacity: 0,
        scale: 0.6,
        filter: 'blur(16px)',
        rotateX: 70,
      })
      gsap.set(subSplit.words, { yPercent: 50, opacity: 0, filter: 'blur(10px)' })

      // ── Timeline ──
      const tl = gsap.timeline({ delay: 0.4, defaults: { ease: 'power4.out' } })

      // 1 · Video zoom settle — dramatic pull-back
      tl.fromTo('[data-parallax]',
        { scale: 1.35 },
        { scale: 1.05, duration: 3, ease: 'power2.out' },
        0
      )

        // 2 · Line 1 words — dramatic 3D rise with blur clear
        .to(line1Words, {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration: 1.4,
          stagger: 0.14,
          ease: 'expo.out',
        }, 0.7)

        // 3 · Line 2 words — cascading entrance, slightly delayed
        .to(line2Words, {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration: 1.4,
          stagger: 0.14,
          ease: 'expo.out',
        }, 1.2)

        // 4 · Subtitle — blur-to-sharp word reveal
        .to(subSplit.words, {
          yPercent: 0, opacity: 1, filter: 'blur(0px)',
          duration: 1, stagger: 0.07, ease: 'power3.out',
        }, 1.9)
    },
    { scope: heroRef }
  )

  // ── Dramatic hero exit on scroll ──
  useGSAP(
    () => {
      const contentEl = heroRef.current?.querySelector('.relative.z-20')
      if (!contentEl) return

      // Hero text — clean fade-out with gentle lift
      gsap.to(contentEl.children, {
        opacity: 0,
        y: -50,
        scale: 0.92,
        filter: 'blur(10px)',
        stagger: 0.06,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'bottom bottom',
          end: 'bottom 50%',
          scrub: 0.5,
        },
      })

      // Video — subtle darken and zoom
      gsap.to('[data-parallax]', {
        scale: 1.2,
        yPercent: -15,
        filter: 'brightness(0.2) saturate(0.4)',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: heroRef }
  )

  // ── Dramatic split-screen reveal ──
  useGSAP(() => {
    const splitReveal = document.querySelector('.pwr-split-reveal')
    if (!splitReveal) return

    // Initial states
    gsap.set('.pwr-stagger-item', { opacity: 0, y: 60, scale: 0.8, filter: 'blur(14px)' })
    gsap.set('.pwr-gold-flash', { opacity: 0, scale: 0.5 })

    // Pin the reveal section for dramatic effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitReveal,
        start: 'top 70%',
        end: 'bottom 20%',
        scrub: 0.4,
      },
    })

    // 1 · Curtains — 3D perspective slide with slight rotation
    tl.to('.pwr-curtain-left', {
      xPercent: -105,
      rotateY: 15,
      transformOrigin: 'left center',
      ease: 'power4.inOut',
    }, 0)
      .to('.pwr-curtain-right', {
        xPercent: 105,
        rotateY: -15,
        transformOrigin: 'right center',
        ease: 'power4.inOut',
      }, 0)

      // 2 · Gold seam — flash then dissolve
      .to('.pwr-curtain-seam', {
        scaleY: 1.3,
        opacity: 1,
        duration: 0.15,
      }, 0)
      .to('.pwr-curtain-seam', {
        scaleY: 0,
        opacity: 0,
        ease: 'power2.in',
        duration: 0.35,
      }, 0.15)

      // 3 · Gold flash burst at center
      .to('.pwr-gold-flash', {
        opacity: 1,
        scale: 1.5,
        duration: 0.2,
        ease: 'power2.out',
      }, 0.05)
      .to('.pwr-gold-flash', {
        opacity: 0,
        scale: 3,
        duration: 0.4,
        ease: 'power2.in',
      }, 0.25)

      // 4 · Staggered text — dramatic scale-up entrance from below
      .to('.pwr-stagger-item', {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.4)',
      }, 0.2)
  })

  // Subtle mouse parallax — video only
  useEffect(() => {
    const root = heroRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let tx = 0, ty = 0
    let cx = 0, cy = 0

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      const layers = root.querySelectorAll<HTMLElement>('[data-parallax]')
      layers.forEach(el => {
        const f = parseFloat(el.dataset.parallax ?? '8')
        el.style.transform = `translate3d(${cx * f}px, ${cy * f}px, 0) scale(1.05)`
      })
      raf = requestAnimationFrame(tick)
    }
    root.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      root.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen min-h-[720px] overflow-hidden cinema-vignette"
      >
        {/* Video background */}
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.5s] scale-105 ${videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => {
            setVideoLoaded(true)
              ; (window as any).pwrVideoLoaded = true
            window.dispatchEvent(new Event('pwr-video-loaded'))
          }}
          data-parallax="-8"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient — simplified, deeper at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to top, #0A0604 0%, rgba(10,6,4,0.82) 25%, rgba(10,6,4,0.28) 55%, rgba(10,6,4,0.5) 100%),
              radial-gradient(ellipse at center, transparent 40%, rgba(10,6,4,0.4) 100%)
            `,
          }}
        />

        {/* Ember particles */}
        <canvas
          ref={emberCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'screen', opacity: 0.7 }}
          aria-hidden
        />

        {/* Decorative Urdu watermark — huge, behind text */}
        <div
          aria-hidden
          className="absolute hidden lg:block right-[-2vw] top-[8vh] font-urdu text-[#F8B425]/[0.04] select-none pointer-events-none z-10"
          style={{
            fontSize: 'clamp(14rem, 28vw, 28rem)',
            lineHeight: 0.9,
            direction: 'rtl',
            letterSpacing: '-0.04em',
          }}
          data-parallax="-6"
        >
          پشاور
        </div>

        {/* ── Content ── */}
        <div className="relative z-20 h-full flex flex-col justify-end pb-[12vh] md:pb-[14vh] px-8 md:px-20 lg:px-28">


          {/* Headline — left-aligned, Tiro Bangla serif */}
          <h1
            ref={headlineRef}
            className="pwr-hero-headline font-bangla"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 3.6rem)',
              lineHeight: 1.18,
              letterSpacing: '0.01em',
              perspective: '800px',
              color: '#E7DED1',
            }}
          >
            <span className="block">
              <span className="pwr-hl-word inline-block pwr-hero-gold">নেহারী</span>
              <span className="pwr-hl-word inline-block mx-[0.15em]">থেকে</span>
              <span className="pwr-hl-word inline-block pwr-hero-gold">কাবাব</span>
            </span>
            <span className="block mt-1 md:mt-2">
              <span className="pwr-hl-word inline-block">স্বাদে</span>
              <span className="pwr-hl-word inline-block mx-[0.15em] pwr-hero-gold">আমরাই</span>
              <span className="pwr-hl-word inline-block">নবাব</span>
            </span>
          </h1>


          {/* Subtitle — Tiro Bangla italic, literary feel */}
          <p
            ref={subRef}
            className="font-banglaDisplay text-gold-200/70 mt-5 md:mt-6 max-w-[36ch]"
            style={{
              fontSize: 'clamp(0.88rem, 1.3vw, 1.15rem)',
              lineHeight: 1.7,
              letterSpacing: '0.015em',
              textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            }}
          >
            পেশোয়ারের চারকোল আগুন, কাঁচামরিচের তীক্ষ্ণতা — এখন ঢাকায়।
          </p>


        </div>



        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #120B07, transparent)' }}
        />
      </section>

      {/* ── Split-Screen Reveal Transition ── */}
      <div className="pwr-split-reveal relative h-[35vh] md:h-[40vh] overflow-hidden" style={{ background: '#120B07', perspective: '1200px' }}>
        {/* Left curtain — thicker with inner shadow */}
        <div
          className="pwr-curtain-left absolute top-0 left-0 w-[52%] h-full z-10"
          style={{
            background: 'linear-gradient(135deg, #0A0604 0%, #1A100A 40%, #120B07 100%)',
            boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.6)',
          }}
        />
        {/* Right curtain */}
        <div
          className="pwr-curtain-right absolute top-0 right-0 w-[52%] h-full z-10"
          style={{
            background: 'linear-gradient(225deg, #0A0604 0%, #1A100A 40%, #120B07 100%)',
            boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.6)',
          }}
        />

        {/* Gold seam line — thicker, glowing */}
        <div
          className="pwr-curtain-seam absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full z-20"
          style={{
            background: 'linear-gradient(to bottom, transparent 10%, #F8B425 50%, transparent 90%)',
            boxShadow: '0 0 20px rgba(248,180,37,0.6), 0 0 60px rgba(248,180,37,0.2)',
          }}
        />

        {/* Gold flash burst — radial glow at the split point */}
        <div
          className="pwr-gold-flash absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(248,180,37,0.5) 0%, rgba(248,180,37,0.15) 40%, transparent 70%)',
          }}
        />

        {/* Revealed content behind curtains */}
        <div className="pwr-reveal-content absolute inset-0 z-0 flex flex-col items-center justify-center gap-5">
          <span
            className="pwr-stagger-item font-sans text-gold-400/60 text-[0.65rem]"
            style={{ letterSpacing: '0.5em', textTransform: 'uppercase' }}
          >
            Peshwarain Exclusive
          </span>
          <span
            className="pwr-stagger-item font-display italic text-cream"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Our Signature Dishes
          </span>
          <span
            className="pwr-stagger-item font-bangla text-gold-300/60"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', direction: 'ltr' as const }}
          >
            আমাদের বিশেষ খাবারসমূহ
          </span>
          <span
            className="pwr-stagger-item font-urdu text-gold-400/50 text-lg"
            dir="rtl"
          >
            ہمارے خاص پکوان
          </span>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-cursor="Top"
        className={`fixed bottom-7 right-7 z-40 w-11 h-11 rounded-full border border-gold-700/40 bg-[#120B07]/90 text-gold-400 flex items-center justify-center transition-all duration-500 hover:bg-[#F8B425] hover:text-[#120B07] hover:border-[#F8B425] hover:shadow-[0_0_20px_rgba(248,180,37,0.3)] ${backToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        aria-label="উপরে যান"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  )
}
