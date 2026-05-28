'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ═══════════════════════════════════════════════════
   SECTION OPENER — Nusr-Et-style chapter card.

   Pins to the viewport for ~90% of one screen of scroll,
   plays a dramatic theatrical reveal (massive ghost number
   behind, big section title scaling/blurring in, trilingual
   stack, gold rule drawing across), then unpins so the
   actual section content begins. Impossible to miss as a
   moment of arrival between sections.
   ═══════════════════════════════════════════════════ */

type Props = {
  /** Roman numeral or short id, e.g. "I", "II", "III" */
  number: string
  /** Section name in English, e.g. "The Menu", "The Story", "Reserve" */
  name: string
  /** Bangla rendering */
  bn: string
  /** Urdu (nastaliq) rendering */
  urdu: string
  /** Optional small caps subtitle line */
  tagline?: string
  /** ID of the section to scroll to when this opener is tapped on mobile */
  targetId?: string
}

export default function SectionOpener({ number, name, bn, urdu, tagline, targetId }: Props) {
  const ref = useRef<HTMLElement>(null)

  /* Mobile-only: tap anywhere on the chapter card → smooth scroll
     past the pin and into the actual section, offset by the 80px
     fixed header. Desktop keeps the pinned scroll-reveal as-is. */
  const handleSkipToSection = () => {
    if (!targetId) return
    const el = document.getElementById(targetId)
    if (!el) return
    const headerOffset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useGSAP(
    () => {
      gsap.set('.so-ghost', { opacity: 0, scale: 0.85 })
      gsap.set('.so-eyebrow', { opacity: 0, y: 12, filter: 'blur(6px)' })
      gsap.set('.so-rule', { scaleX: 0, opacity: 0, transformOrigin: 'center center' })
      gsap.set('.so-name', { opacity: 0, y: 60, scale: 0.92, filter: 'blur(18px)' })
      gsap.set('.so-bn', { opacity: 0, y: 24, filter: 'blur(6px)' })
      gsap.set('.so-urdu', { opacity: 0, y: 24, filter: 'blur(6px)' })
      gsap.set('.so-tagline', { opacity: 0, y: 12 })
      gsap.set('.so-bg', { opacity: 0 })

      /* On mobile, the chapter card felt like it took too much scroll
         to "play through". Halve the pinned scroll distance so the
         reveal still lands but the user reaches actual content sooner. */
      const isMobile =
        typeof window !== 'undefined' && window.innerWidth < 768

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: isMobile ? '+=50%' : '+=100%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl
        .to('.so-bg', { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0)
        .to('.so-ghost', { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 0.05)
        .to('.so-eyebrow', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }, 0.15)
        .to('.so-rule', { scaleX: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.25)
        .to('.so-name', { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }, 0.3)
        .to('.so-bn', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }, 0.5)
        .to('.so-urdu', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }, 0.58)
        .to('.so-tagline', { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, 0.66)
        /* Hold the full reveal */
        .to({}, { duration: 0.35 })
        /* Exit — content lifts away with parallax */
        .to('.so-content', { y: -80, opacity: 0, scale: 0.96, filter: 'blur(10px)', duration: 0.4, ease: 'power2.in' })
        .to('.so-ghost', { scale: 1.4, opacity: 0, duration: 0.4, ease: 'power2.in' }, '<')
        .to('.so-bg', { opacity: 0, duration: 0.35 }, '-=0.25')
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      aria-label={name}
      className="relative overflow-hidden h-[65vh] md:h-screen"
      style={{
        /* Top and bottom edges feather into #120B07 — the warm brown
           that every neighbouring section starts/ends with — so the
           join between sections dissolves instead of showing a seam.
           The deep #0A0604 "stage" still occupies the middle of the
           card where the chapter title sits. */
        background:
          'linear-gradient(to bottom, #120B07 0%, #0A0604 22%, #0A0604 78%, #120B07 100%)',
      }}
    >
      {/* Warm ember glow — radial only, no opaque base, so the
          section's own top/bottom gradient stays visible at the
          edges and the seam with neighbouring sections dissolves. */}
      <div
        aria-hidden
        className="so-bg absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at center, rgba(193,90,54,0.16) 0%, rgba(248,180,37,0.06) 30%, transparent 70%)',
        }}
      />

      {/* Massive ghost numeral behind the content */}
      <div
        aria-hidden
        className="so-ghost absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-display italic"
          style={{
            fontSize: 'clamp(20rem, 55vw, 56rem)',
            lineHeight: 1,
            color: 'rgba(248,180,37,0.045)',
            letterSpacing: '-0.05em',
            textShadow: '0 0 80px rgba(248,180,37,0.15)',
          }}
        >
          {number}
        </span>
      </div>

      <div className="so-content relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow chapter label */}
        <p
          className="so-eyebrow font-mono text-gold-400/80 mb-6"
          style={{
            fontSize: '0.78rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
          }}
        >
          Chapter {number}
        </p>

        {/* Gold rule */}
        <div
          aria-hidden
          className="so-rule h-px mb-8"
          style={{
            width: 'min(80%, 540px)',
            background:
              'linear-gradient(to right, transparent, rgba(248,180,37,0.6) 50%, transparent)',
          }}
        />

        {/* Massive section name */}
        <h2
          className="so-name font-display italic text-cream letterpress"
          style={{
            fontSize: 'clamp(3.5rem, 13vw, 11rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.038em',
          }}
        >
          {name}
        </h2>

        {/* Trilingual subtitle stack */}
        <p
          className="so-bn font-bangla text-gold-300/85 mt-7"
          style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)', letterSpacing: '0.01em' }}
        >
          {bn}
        </p>
        <p
          className="so-urdu font-urdu text-gold-400/70 mt-2"
          dir="rtl"
          style={{ fontSize: 'clamp(1.15rem, 2.1vw, 1.8rem)', lineHeight: 1.6 }}
        >
          {urdu}
        </p>

        {tagline && (
          <p
            className="so-tagline font-mono text-gold-500/70 mt-9"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
            }}
          >
            {tagline}
          </p>
        )}
      </div>

      {/* Mobile-only invisible tap target — covers the whole card so
          a tap anywhere skips into the actual section. Hidden on md+
          where the pinned scroll-reveal is the intended experience. */}
      {targetId && (
        <button
          type="button"
          onClick={handleSkipToSection}
          aria-label={`Skip to ${name}`}
          className="md:hidden absolute inset-0 z-30 w-full h-full bg-transparent cursor-pointer"
        />
      )}
    </section>
  )
}
