'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitText } from '@/hooks/useSplitText'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PLATES = [
  { src: '/peshwarain-mascot.png', num: 'I',   label: 'our patron',  year: '1974',
    chapter: 'The Origin',
    bn: 'আদি — পেশোয়ারের গলিতে', urdu: 'آغاز',
    alt: 'Peshwarain mascot', tint: 'rgba(196,145,42,0.28)' },
  { src: '/peshwarain-lady.png', num: 'II',  label: 'the matron',  year: '1992',
    chapter: 'The Hearth',
    bn: 'উনুন — হাতের গন্ধে', urdu: 'چولہا',
    alt: 'Peshwarain lady', tint: 'rgba(72,110,168,0.28)' },
  { src: '/peshwarain-lassi.avif', num: 'III', label: 'the brew', year: '2008',
    chapter: 'The Brew',
    bn: 'লস্যি — বরফ ও বেলাই', urdu: 'شربت',
    alt: 'Truck-art lassi', tint: 'rgba(223,118,140,0.28)' },
  { src: '/peshwarain-truck.png', num: 'IV',  label: 'the wagon',   year: '2026',
    chapter: 'The Journey',
    bn: 'যাত্রা — পেশোয়ার থেকে ঢাকা', urdu: 'سفر',
    alt: 'Peshwarain truck', tint: 'rgba(193,90,54,0.28)' },
]

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [plateIdx, setPlateIdx] = useState(0)

  // ── Pinned scroll-driven scene
  useGSAP(
    () => {
      const section = sectionRef.current
      const scene = sceneRef.current
      if (!section || !scene) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.innerWidth < 1024

      // Skip pin on mobile / reduced motion — fall back to natural scroll
      if (isMobile || reduced) {
        gsap.utils.toArray<HTMLElement>('.story-reveal').forEach(el => {
          gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          })
        })
        return
      }

      // Pull-quote split for word reveal
      const quoteEl = section.querySelector<HTMLElement>('.story-quote')
      let quoteWords: HTMLElement[] = []
      if (quoteEl) {
        const split = splitText(quoteEl, { chars: false, words: true })
        quoteWords = split.words
        gsap.set(quoteWords, { opacity: 0.12 })
      }

      // Urdu glyph reveal (clip-path wipe)
      gsap.set('.story-urdu-glyph', { clipPath: 'inset(0 100% 0 0)' })

      // Set initial states for chapter labels
      const chapters = gsap.utils.toArray<HTMLElement>('.story-chapter-card')
      gsap.set(chapters, { opacity: 0, y: 20 })

      // Pinned scroll timeline
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(PLATES.length - 1, Math.floor(self.progress * PLATES.length * 0.99))
            setPlateIdx(idx)
            if (progressRef.current) {
              progressRef.current.textContent = `${String(Math.round(self.progress * 100)).padStart(3, '0')}`
            }
            if (yearRef.current) {
              const startY = 1974
              const endY = 2026
              const y = Math.round(startY + (endY - startY) * self.progress)
              yearRef.current.textContent = String(y)
            }
          },
        },
      })

      // Phase 1: urdu glyph wipes in
      pinTl.to('.story-urdu-glyph', { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.inOut' }, 0)

      // Phase 2: pull-quote words ignite by progress
      if (quoteWords.length) {
        pinTl.to(quoteWords, { opacity: 1, stagger: { amount: 1.4, from: 'start' }, duration: 0.4 }, 0.2)
      }

      // Phase 3: chapter cards fade in / out per plate
      chapters.forEach((card, i) => {
        const start = i / PLATES.length
        const end = (i + 1) / PLATES.length
        pinTl.to(card, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, start)
        if (i < PLATES.length - 1) {
          pinTl.to(card, { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' }, end - 0.05)
        }
      })
    },
    { scope: sectionRef }
  )

  const active = PLATES[plateIdx]

  return (
    <section ref={sectionRef} id="story" className="relative z-10">
      {/* Ambient tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 8% 55%, rgba(193,90,54,0.08) 0%, transparent 50%), radial-gradient(ellipse at 92% 10%, rgba(196,145,42,0.06) 0%, transparent 45%)',
        }}
      />

      {/* The pinned scene container */}
      <div ref={sceneRef} className="relative min-h-screen overflow-hidden py-24 lg:py-0 lg:h-screen lg:flex lg:items-center">

        {/* Vertical edge label */}
        <div
          className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 items-center gap-4 pointer-events-none z-10"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        >
          <span className="w-px h-10 bg-gold-500/40" />
          <span
            className="font-sans text-gold-400/70 text-[0.62rem]"
            style={{ letterSpacing: '0.42em', textTransform: 'uppercase' }}
          >
            Chapter II — Heritage
          </span>
          <span className="w-px h-10 bg-gold-500/40" />
        </div>

        {/* Right edge: live progress + year ticker */}
        <div className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 pointer-events-none z-10">
          <span className="font-sans text-gold-400/70 text-[0.62rem]" style={{ letterSpacing: '0.42em', writingMode: 'vertical-rl' }}>
            ESTABLISHED
          </span>
          <span className="block w-px h-12 bg-gold-500/40" />
          <span ref={yearRef} className="font-display italic text-[#F8B425] text-2xl tabular-nums">1974</span>
          <span className="block w-px h-12 bg-gold-500/40" />
          <span ref={progressRef} className="font-sans text-gold-400/60 text-[0.6rem] tabular-nums" style={{ letterSpacing: '0.2em' }}>
            000
          </span>
        </div>

        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 relative z-10 w-full">

          {/* Masthead rail */}
          <div className="story-reveal flex items-center gap-4 mb-10 lg:mb-14">
            <span className="w-10 h-px bg-gold-500/70" />
            <span
              className="font-sans text-gold-300/90 text-[0.74rem] whitespace-nowrap"
              style={{ letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500 }}
            >
              The House of Peshwarain
            </span>
            <span className="ornament-diamond" />
            <span className="flex-1 h-px bg-gold-500/15" />
            <span
              className="font-sans text-gold-500/55 text-[0.68rem] whitespace-nowrap hidden sm:inline"
              style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}
            >
              Est. <span className="font-display italic text-[#F8B425] not-italic-baseline">{active.year}</span>
            </span>
          </div>

          {/* Asymmetric editorial — anchor / narrative / plate */}
          <div className="grid grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-0 items-start">

            {/* ANCHOR — huge urdu glyph */}
            <aside className="story-reveal col-span-12 lg:col-span-4 lg:pt-2 relative">
              <div
                className="story-urdu-glyph font-urdu text-[#F8B425]/[0.22] leading-none select-none"
                aria-hidden
                style={{
                  fontSize: 'clamp(7rem, 13vw, 13rem)',
                  direction: 'rtl',
                  textAlign: 'left',
                  letterSpacing: '-0.04em',
                }}
              >
                پشاور
              </div>

              <div className="flex items-center gap-3 mt-6">
                <span className="w-10 h-px bg-gold-500/60" />
                <span
                  className="font-sans text-gold-300/85 text-[0.72rem]"
                  style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}
                >
                  Peshawar · পেশোয়ার
                </span>
              </div>

              {/* Marginalia */}
              <div className="mt-8 pl-4 border-l border-gold-500/25 hidden lg:block">
                <p
                  className="font-display italic text-gold-300/70"
                  style={{ fontSize: '0.92rem', lineHeight: 1.55 }}
                >
                  Qissa Khwani Bazaar —<br />
                  the Storyteller&apos;s Market.<br />
                  Where our flavor began.
                </p>
              </div>

              {/* Mini timeline */}
              <div className="mt-10 hidden lg:block">
                <p className="font-sans text-gold-500/70 text-[0.68rem] mb-3" style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                  Chapters
                </p>
                <ul className="space-y-2">
                  {PLATES.map((p, i) => {
                    const isActive = i === plateIdx
                    return (
                      <li key={p.num} className="flex items-center gap-3 transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0.42 }}>
                        <span
                          className={`block transition-all duration-500 ${isActive ? 'bg-[#F8B425]' : 'bg-gold-700/60'}`}
                          style={{ width: isActive ? '20px' : '8px', height: '1px' }}
                        />
                        <span className="font-display italic text-gold-200 text-sm">
                          {p.num}. {p.chapter}
                        </span>
                        <span className="font-sans text-gold-500/60 text-[0.62rem] tabular-nums" style={{ letterSpacing: '0.18em' }}>
                          {p.year}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>

            {/* NARRATIVE — drop cap + pull quote (ignites with scroll) */}
            <article className="story-reveal col-span-12 lg:col-span-5 lg:pt-4">
              <h2
                className="font-display italic text-cream mb-7"
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                A flavor born in the alleys of{' '}
                <span className="text-[#F8B425]">Peshawar.</span>
              </h2>

              <p
                className="font-body text-gold-200/90 mb-6"
                style={{ fontSize: '1.04rem', lineHeight: 1.85 }}
              >
                <span
                  className="font-display italic text-[#F8B425] float-left mr-3 mt-1"
                  style={{ fontSize: '3.6rem', lineHeight: 0.82, letterSpacing: '-0.04em' }}
                  aria-hidden
                >
                  F
                </span>
                <span className="sr-only">F</span>
                rom the smoky lanes of Qissa Khwani Bazaar to your table — Peshwarain brings the
                soul of Peshawar&apos;s unfiltered, fearless cooking to Dhaka.
              </p>

              {/* Word-by-word ignition pull-quote */}
              <blockquote
                className="story-quote relative my-9 pl-6 py-1 font-display italic text-cream"
                style={{
                  fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)',
                  lineHeight: 1.32,
                  letterSpacing: '-0.01em',
                  borderLeft: '2px solid rgba(248, 180, 37, 0.55)',
                }}
              >
                We don&apos;t just cook — we forge flavor in fire.
              </blockquote>

              <p
                className="font-body text-gold-200/85"
                style={{ fontSize: '1.0rem', lineHeight: 1.8 }}
              >
                Every dish carries the weight of heritage. Recipes preserved across generations,
                straight from the hearths of the Khyber Pass — vibrant truck art, golden light,
                the scent of charcoal grill.
              </p>

              <div className="flex items-center gap-3 mt-9">
                <span className="w-10 h-px bg-gold-500/50" />
                <span
                  className="font-display italic text-gold-400/75"
                  style={{ fontSize: '0.92rem' }}
                >
                  — est. Peshawar, served Dhaka
                </span>
              </div>
            </article>

            {/* PLATE — scroll-driven crossfade with chapter overlay */}
            <figure className="story-reveal col-span-12 lg:col-span-3 lg:pt-2 relative">
              <div className="hidden lg:block absolute -left-4 top-0 z-10">
                <span
                  className="font-sans text-gold-500/70 text-[0.62rem]"
                  style={{ letterSpacing: '0.36em', writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  PLATE · {active.num}
                </span>
              </div>

              <div className="hidden lg:flex absolute -right-5 top-2 flex-col items-center gap-2 z-10">
                {PLATES.map((p, i) => (
                  <span
                    key={p.num}
                    className="block transition-all duration-500 ease-out"
                    style={{
                      width: '1px',
                      height: i === plateIdx ? '22px' : '8px',
                      background: i === plateIdx ? '#F8B425' : 'rgba(212,168,67,0.28)',
                    }}
                  />
                ))}
              </div>

              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: '3 / 5',
                  background: `radial-gradient(ellipse at 50% 42%, ${active.tint} 0%, rgba(193,90,54,0.05) 45%, transparent 72%)`,
                  transition: 'background 1200ms ease-out',
                }}
              >
                {PLATES.map((plate, i) => (
                  <div
                    key={plate.src}
                    className="absolute inset-0"
                    style={{
                      opacity: i === plateIdx ? 1 : 0,
                      transform: i === plateIdx ? 'scale(1)' : 'scale(1.04)',
                      transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 1300ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <Image
                      src={plate.src}
                      alt={plate.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 90vw"
                      className="object-contain p-2"
                      priority={i === 0}
                    />
                  </div>
                ))}

                {/* Chapter card — overlays each plate */}
                {PLATES.map((plate, i) => (
                  <div
                    key={`card-${plate.num}`}
                    className="story-chapter-card absolute bottom-3 left-3 right-3 px-4 py-3"
                    style={{
                      background: 'rgba(10,6,4,0.78)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(248,180,37,0.18)',
                      display: i === plateIdx ? 'block' : 'none',
                    }}
                  >
                    <p className="font-sans text-gold-400/80 text-[0.62rem] mb-1" style={{ letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                      Plate {plate.num} · {plate.year}
                    </p>
                    <p className="font-display italic text-cream text-base" style={{ lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                      {plate.chapter}
                    </p>
                    <p className="font-bangla text-gold-300/75 text-xs mt-0.5">
                      {plate.bn}
                    </p>
                  </div>
                ))}
              </div>

              <figcaption className="mt-4 flex items-center gap-3 min-h-[1.5rem]">
                <span
                  className="font-sans text-gold-400/80 text-[0.68rem]"
                  style={{ letterSpacing: '0.28em' }}
                >
                  FIG. {active.num}
                </span>
                <span className="flex-1 h-px bg-gold-500/25" />
                <span
                  className="font-urdu text-gold-400/70 text-sm"
                  dir="rtl"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {active.urdu}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
