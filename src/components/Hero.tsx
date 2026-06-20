'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [backToTop, setBackToTop] = useState(false)

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setBackToTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Cinematic entrance — site-grammar motion (blur-in, opacity, y-lift) ──
  useGSAP(
    () => {
      const headline = headlineRef.current
      if (!headline) return

      const headlineWords = headline.querySelectorAll<HTMLElement>('.pwr-hl-word')

      const tl = gsap.timeline({ delay: 0.4, defaults: { ease: 'power3.out' } })

      // 1. Video — slow settle from very subtle zoom
      tl.fromTo(
        '[data-parallax]',
        { scale: 1.12 },
        { scale: 1.04, duration: 2.6, ease: 'power2.out' },
        0,
      )

        // 2. Eyebrow ritual — same opening device as every section
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 18, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95 },
          0.55,
        )

        // 3. Headline — site-standard blur-in word stagger
        .fromTo(
          headlineWords,
          { opacity: 0, y: 28, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.12,
          },
          0.85,
        )

        // 4. Urdu echo — quiet RTL counterpoint
        .fromTo(
          '.pwr-hero-urdu',
          { opacity: 0, y: 18, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          1.7,
        )

        // 5. Subtitle
        .fromTo(
          '.pwr-hero-sub',
          { opacity: 0, y: 16, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0 },
          1.95,
        )
    },
    { scope: heroRef },
  )

  // ── Restrained hero exit on scroll ──
  useGSAP(
    () => {
      const content = heroRef.current?.querySelector<HTMLDivElement>('.pwr-hero-content')

      if (content) {
        /* Animate the whole content container as one unit on scroll-out.
           This avoids per-child opacity fights with the entrance fromTo
           that target the same children. Reversing on scroll-up always
           restores the container to opacity 1, regardless of where any
           individual child's tween was. */
        gsap.fromTo(
          content,
          { opacity: 1, y: 0, filter: 'blur(0px)' },
          {
            opacity: 0,
            y: -36,
            filter: 'blur(6px)',
            ease: 'power2.in',
            immediateRender: false,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'bottom bottom',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          },
        )
      }

      gsap.to('[data-parallax]', {
        scale: 1.18,
        yPercent: -12,
        filter: 'brightness(0.22) saturate(0.45)',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: heroRef },
  )

  // ── Subtle mouse parallax — video only, reduced intensity ──
  useEffect(() => {
    const root = heroRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let tx = 0,
      ty = 0
    let cx = 0,
      cy = 0

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      const layers = root.querySelectorAll<HTMLElement>('[data-parallax]')
      layers.forEach((el) => {
        const f = parseFloat(el.dataset.parallax ?? '22')
        el.style.transform = `translate3d(${cx * f}px, ${cy * f}px, 0) scale(1.04)`
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] scale-105 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => {
            setVideoLoaded(true)
            ;(window as any).pwrVideoLoaded = true
            window.dispatchEvent(new Event('pwr-video-loaded'))
          }}
          onCanPlayThrough={() => {
            setVideoLoaded(true)
            ;(window as any).pwrVideoLoaded = true
            window.dispatchEvent(new Event('pwr-video-loaded'))
          }}
          data-parallax="-22"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient — lighter than before, lets video breathe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to top, #0A0604 0%, rgba(10,6,4,0.78) 22%, rgba(10,6,4,0.18) 58%, rgba(10,6,4,0.42) 100%),
              radial-gradient(ellipse at center, transparent 45%, rgba(10,6,4,0.35) 100%)
            `,
          }}
        />

        {/* Decorative Urdu watermark — huge, faint, sits behind the headline */}
        <div
          aria-hidden
          className="absolute hidden lg:block right-[-2vw] top-[8vh] font-urdu text-[#F8B425]/[0.04] select-none pointer-events-none z-10"
          style={{
            fontSize: 'clamp(14rem, 28vw, 28rem)',
            lineHeight: 0.9,
            direction: 'rtl',
            letterSpacing: '-0.04em',
          }}
          data-parallax="-38"
        >
          پشاور
        </div>

        {/* ── Bottom-aligned editorial content ── */}
        <div className="pwr-hero-content relative z-20 h-full flex flex-col justify-end pb-[16vh] md:pb-[18vh] px-8 md:px-20 lg:px-28">
          {/* Eyebrow ritual — same device as Menu's 'From Our Kitchen' */}
          <p
            ref={eyebrowRef}
            className="pwr-hero-eyebrow eyebrow-rule font-mono text-gold-400/90 !hidden md:!inline-flex"
            style={{
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}
          >
            Wari · Rankin Street · Since 2020
          </p>

          {/* Headline — Bengali couplet, gold gradient on each word (palette: #FFE08A → #F8B425 → #C4912A) */}
          <h1
            ref={headlineRef}
            className="pwr-hero-headline font-bangla mt-6 md:mt-7"
            style={{
              fontSize: 'clamp(2rem, 4.6vw, 4.2rem)',
              lineHeight: 1.18,
              letterSpacing: '0.01em',
            }}
          >
            <span className="block">
              <span className="pwr-hl-word inline-block gradient-gold-text">নেহারী</span>
              <span className="pwr-hl-word inline-block gradient-gold-text mx-[0.15em]">থেকে</span>
              <span className="pwr-hl-word inline-block gradient-gold-text">কাবাব</span>
            </span>
            <span className="block mt-1 md:mt-2">
              <span className="pwr-hl-word inline-block gradient-gold-text">স্বাদে</span>
              <span className="pwr-hl-word inline-block gradient-gold-text mx-[0.15em]">আমরাই</span>
              <span className="pwr-hl-word inline-block gradient-gold-text">নবাব</span>
            </span>
          </h1>

          {/* Urdu echo — same treatment as Menu's 'مینیو' */}
          <p
            className="pwr-hero-urdu font-urdu text-gold-400/55 mt-4 md:mt-5"
            dir="rtl"
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
              lineHeight: 1.5,
              letterSpacing: '0.02em',
            }}
          >
            ذائقے میں نواب
          </p>

          {/* Subtitle — Bengali serif, single literary line */}
          <p
            ref={subRef}
            className="pwr-hero-sub font-bangla text-gold-200/70 mt-7 md:mt-8 max-w-[38ch]"
            style={{
              fontSize: 'clamp(0.92rem, 1.3vw, 1.12rem)',
              lineHeight: 1.75,
              letterSpacing: '0.015em',
            }}
          >
            পেশোয়ারের চারকোল আগুন, কাঁচামরিচের তীক্ষ্ণতা — এখন ঢাকায়।
          </p>
        </div>



        {/* Bottom fade — eases handoff into the chapter card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #120B07, transparent)' }}
        />
      </section>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-cursor="Top"
        className={`fixed bottom-7 right-7 z-40 w-11 h-11 rounded-full border border-gold-700/40 bg-[#120B07]/90 text-gold-400 flex items-center justify-center transition-all duration-500 hover:bg-[#F8B425] hover:text-[#120B07] hover:border-[#F8B425] hover:shadow-[0_0_20px_rgba(248,180,37,0.3)] ${
          backToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="উপরে যান"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  )
}
