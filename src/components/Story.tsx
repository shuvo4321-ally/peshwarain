'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Each plate has its own mood-tint radial glow that fades in behind the illustration.
const PLATES = [
  {
    src:   '/peshwarain-mascot.png',
    num:   'I',
    label: 'our patron',
    alt:   'Peshawarain mascot — the bearded patron',
    tint:  'rgba(196,145,42,0.22)',   // gold
  },
  {
    src:   '/peshwarain-lady.png',
    num:   'II',
    label: 'the matron',
    alt:   'Peshawarain lady in blue saree',
    tint:  'rgba(72,110,168,0.22)',   // dusty blue
  },
  {
    src:   '/peshwarain-lassi.avif',
    num:   'III',
    label: 'the brew',
    alt:   'Piyo aur peenedo — truck-art lassi',
    tint:  'rgba(223,118,140,0.22)',  // pink
  },
  {
    src:   '/peshwarain-truck.png',
    num:   'IV',
    label: 'the wagon',
    alt:   'Peshawarain truck — the vessel of our journey',
    tint:  'rgba(193,90,54,0.22)',    // terracotta
  },
]

const SLIDE_INTERVAL = 4200

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const railRef    = useRef<HTMLDivElement>(null)
  const anchorRef  = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLElement>(null)
  const plateRef   = useRef<HTMLElement>(null)

  const [plateIdx, setPlateIdx] = useState(0)

  // ── Auto-advance the plate carousel
  useEffect(() => {
    const id = setInterval(() => {
      setPlateIdx(i => (i + 1) % PLATES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [])

  // ── Entrance animations (fromTo + immediateRender:false keeps content visible on misfire)
  useGSAP(
    () => {
      const reveal = (el: HTMLElement | null, from: gsap.TweenVars, delay = 0) => {
        if (!el) return
        gsap.fromTo(
          el,
          from,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay,
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      reveal(railRef.current,   { opacity: 0, y: 14 })
      reveal(anchorRef.current, { opacity: 0, y: 30, scale: 0.97 }, 0.1)
      reveal(textRef.current,   { opacity: 0, y: 26 }, 0.15)
      reveal(plateRef.current,  { opacity: 0, x: 40 }, 0.2)
    },
    { scope: sectionRef }
  )

  const active = PLATES[plateIdx]

  return (
    <section id="story" className="py-24 md:py-36 relative overflow-hidden z-10">
      {/* Ambient section tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 8% 55%, rgba(193,90,54,0.08) 0%, transparent 50%), radial-gradient(ellipse at 92% 10%, rgba(196,145,42,0.06) 0%, transparent 45%)',
        }}
      />

      {/* Vertical chapter label — outside the container, on the far-left edge */}
      <div
        className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 items-center gap-4 pointer-events-none z-10"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="w-px h-12 bg-gold-500/40" />
        <span
          className="font-sans text-gold-400/60 text-[0.68rem]"
          style={{ letterSpacing: '0.38em', textTransform: 'uppercase' }}
        >
          Origin · Peshawar · 1974
        </span>
        <span className="w-px h-12 bg-gold-500/40" />
      </div>

      <div ref={sectionRef} className="max-w-container mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* ─── Masthead rail ──────────────────────────────────────── */}
        <div ref={railRef} className="flex items-center gap-4 mb-14 lg:mb-20">
          <span className="w-10 h-px bg-gold-500/70" />
          <span
            className="font-sans text-gold-300/90 text-[0.78rem] whitespace-nowrap"
            style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}
          >
            The House of Peshwarain
          </span>
          <span className="flex-1 h-px bg-gold-500/15" />
          <span
            className="font-sans text-gold-500/55 text-[0.7rem] whitespace-nowrap hidden sm:inline"
            style={{ letterSpacing: '0.3em', textTransform: 'uppercase' }}
          >
            Chapter I — Heritage
          </span>
        </div>

        {/* ─── Main editorial composition: 4 / 5 / 3 asymmetric ───── */}
        <div className="grid grid-cols-12 gap-x-8 lg:gap-x-10 gap-y-14">

          {/* ANCHOR — massive Urdu display glyph as the decorative pivot */}
          <aside ref={anchorRef} className="col-span-12 lg:col-span-4 lg:pt-2 relative">
            <div
              aria-hidden
              className="font-urdu text-[#F8B425]/[0.18] leading-none select-none"
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
                className="font-sans text-gold-300/85 text-[0.75rem]"
                style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}
              >
                Peshawar
              </span>
            </div>
            <p className="font-bangla text-gold-400/55 text-sm mt-2 ml-[3.25rem]">
              পেশোয়ার
            </p>

            {/* Marginalia — italic sidenote, magazine convention */}
            <div className="mt-10 pl-4 border-l border-gold-500/25 hidden lg:block">
              <p
                className="font-display italic text-gold-300/70"
                style={{ fontSize: '0.96rem', lineHeight: 1.55 }}
              >
                Qissa Khwani Bazaar —<br />
                the Storyteller&apos;s Market.<br />
                Where our flavor began.
              </p>
            </div>
          </aside>

          {/* MAIN — headline, drop-capped narrative, pull-quote */}
          <article ref={textRef} className="col-span-12 lg:col-span-5 lg:pt-6">
            <h2
              className="font-display italic text-cream mb-8"
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              A flavor born in the alleys of{' '}
              <span className="text-[#F8B425]">Peshawar.</span>
            </h2>

            {/* Narrative with a genuine drop cap */}
            <p
              className="font-body text-gold-200/90 mb-6"
              style={{ fontSize: '1.05rem', lineHeight: 1.85 }}
            >
              <span
                className="font-display italic text-[#F8B425] float-left mr-3 mt-1"
                style={{
                  fontSize: '3.6rem',
                  lineHeight: 0.82,
                  letterSpacing: '-0.04em',
                }}
                aria-hidden
              >
                F
              </span>
              <span className="sr-only">F</span>
              rom the smoky lanes of Qissa Khwani Bazaar to your table — Peshwarain brings the
              soul of Peshawar&apos;s unfiltered, fearless cooking to Dhaka.
            </p>

            {/* Pull-quote — breaks column rhythm, sets emotional beat */}
            <blockquote
              className="relative my-9 pl-6 py-1 font-display italic text-cream"
              style={{
                fontSize: 'clamp(1.25rem, 1.7vw, 1.6rem)',
                lineHeight: 1.32,
                letterSpacing: '-0.01em',
                borderLeft: '2px solid rgba(248, 180, 37, 0.55)',
              }}
            >
              <span
                aria-hidden
                className="absolute -left-1 -top-3 font-display text-[#F8B425]/30"
                style={{ fontSize: '3rem', lineHeight: 1 }}
              >
                “
              </span>
              We don&apos;t just cook —<br />
              we forge flavor in fire.
            </blockquote>

            <p
              className="font-body text-gold-200/85"
              style={{ fontSize: '1.02rem', lineHeight: 1.8 }}
            >
              Every dish carries the weight of heritage. Our recipes, preserved across
              generations, travel straight from the hearths of the Khyber Pass — vibrant truck
              art, warm golden light, the scent of a charcoal grill.
            </p>

            {/* Signature flourish */}
            <div className="flex items-center gap-3 mt-10">
              <span className="w-10 h-px bg-gold-500/50" />
              <span
                className="font-display italic text-gold-400/75"
                style={{ fontSize: '0.92rem' }}
              >
                — est. Peshawar, served Dhaka
              </span>
            </div>
          </article>

          {/* PLATE — auto-sliding carousel of 4 illustrations */}
          <figure ref={plateRef} className="col-span-12 lg:col-span-3 lg:pt-8 relative">
            {/* Vertical plate roman numeral badge */}
            <span
              aria-hidden
              className="hidden lg:block absolute -left-4 top-0 font-sans text-gold-500/70 text-[0.66rem] transition-opacity duration-500"
              style={{
                letterSpacing: '0.35em',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              PLATE · {active.num}
            </span>

            {/* Slide-index pagination: 4 tiny ticks stacked on the outer edge */}
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
                transition: 'background 1400ms ease-out',
              }}
            >
              {PLATES.map((plate, i) => (
                <div
                  key={plate.src}
                  className="absolute inset-0"
                  style={{
                    opacity: i === plateIdx ? 1 : 0,
                    transform: i === plateIdx ? 'scale(1)' : 'scale(1.035)',
                    transition:
                      'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1), transform 1600ms cubic-bezier(0.22, 1, 0.36, 1)',
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
            </div>

            <figcaption className="mt-5 flex items-center gap-3 min-h-[1.5rem]">
              <span
                className="font-sans text-gold-400/80 text-[0.7rem]"
                style={{ letterSpacing: '0.3em', textTransform: 'uppercase' }}
              >
                Fig. {active.num}
              </span>
              <span className="flex-1 h-px bg-gold-500/25" />
              <span
                key={active.label}
                className="font-display italic text-gold-300/85 text-[0.92rem] animate-fade-in"
                style={{ animation: 'storyFade 600ms ease-out' }}
              >
                {active.label}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Scoped keyframe for caption crossfade */}
      <style jsx>{`
        @keyframes storyFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </section>
  )
}
