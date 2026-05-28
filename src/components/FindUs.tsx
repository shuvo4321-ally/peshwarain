'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ═══════════════════════════════════════════════════
   FIND US — bespoke editorial map illustration.

   A custom-rendered vintage map of Wari (the image
   already contains the gold ember marker at 16/2
   Rankin Street and the "PESHWARAIN · WARI" stamp).
   The component just frames it, animates it in, and
   layers a subtle pulsing halo over the marker for
   continuous life. Google Maps utility is offered as
   a small CTA below for users who want directions.
   ═══════════════════════════════════════════════════ */

/* Direct link to the verified PeshWarain · Wari business listing on Google Maps
   (place_id resolved). Using the canonical place URL gives users the rich
   business card with photos, reviews, hours and the "Directions" button,
   instead of a plain address search. */
const MAPS_OPEN_URL =
  'https://www.google.com/maps/place/PeshWarain+~+Wari/@23.720091,90.4121368,17z/data=!3m1!4b1!4m6!3m5!1s0x3755b9be94ecaa81:0x9915c4f564e16f01!8m2!3d23.7200911!4d90.4170077!16s%2Fg%2F11lm3qnlgg'

export default function FindUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      /* Sub-heading line */
      gsap.fromTo(
        '.fu-subheading > *',
        { opacity: 0, y: 18, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.fu-subheading', start: 'top 88%' },
        }
      )

      gsap.fromTo(
        '.fu-frame',
        { opacity: 0, y: 60, scale: 0.96, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.fu-frame', start: 'top 82%' },
        }
      )

      gsap.fromTo(
        '.fu-address, .fu-cta',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.fu-frame', start: 'top 78%' },
        }
      )

      /* Pulse halo over the ember marker on the map illustration */
      gsap.to('.fu-marker-pulse', {
        scale: 2.4,
        opacity: 0,
        duration: 2.2,
        ease: 'power2.out',
        repeat: -1,
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="findus"
      className="relative z-10 py-24 md:py-36 overflow-x-clip"
      style={{ background: 'linear-gradient(180deg, #120B07 0%, #1A100A 50%, #120B07 100%)' }}
    >
      <div className="max-w-container mx-auto px-6 md:px-12">

        {/* Subheading — sits above the stats banner */}
        <div className="fu-subheading flex flex-col items-center text-center mb-12 md:mb-16 max-w-[44ch] mx-auto">
          <p
            className="font-mono text-gold-400/85 mb-4"
            style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.42em', textTransform: 'uppercase' }}
          >
            Where the fire lives
          </p>
          <h3
            className="font-display italic text-cream letterpress"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.018em',
            }}
          >
            One alleyway. One karahi.<br />Rankin Street, after dark.
          </h3>
        </div>

        {/* Map frame — borderless, dissolves into the page background.
            The whole frame is a hyperlink: clicking anywhere on the
            illustration opens Google Maps in a new tab. */}
        <a
          href={MAPS_OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Peshwarain at 16/2 Rankin Street in Google Maps"
          data-cursor="Map"
          className="fu-frame block relative mx-auto cursor-pointer"
          style={{
            aspectRatio: '16 / 10',
            maxWidth: 1100,
            /* No border, no inset highlights — map merges with page */
          }}
        >
          <Image
            src="/findus-map.png"
            alt="Map of Wari, Old Dhaka — Peshwarain at 16/2 Rankin Street"
            fill
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="object-cover"
            priority={false}
          />

          {/* Strong edge vignette — fades the map into #120B07 page background.
              Layered gradients: radial (corners), linear top, linear bottom.
              Together they create a soft organic dissolve, no visible frame. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, transparent 35%, rgba(18,11,7,0.6) 75%, #120B07 100%),
                linear-gradient(to bottom, #120B07 0%, transparent 12%, transparent 88%, #120B07 100%),
                linear-gradient(to right, #120B07 0%, transparent 8%, transparent 92%, #120B07 100%)
              `,
            }}
          />

          {/* ╔════════════════════════════════════════════════════════════════╗
              ║  EMBER MARKER PULSE — tweak the percentages below to position  ║
              ║  the halo over the gold ember in your map illustration.        ║
              ║                                                                ║
              ║  - left: horizontal position (0% = far left, 100% = far right) ║
              ║  - top:  vertical position   (0% = top,      100% = bottom)    ║
              ║                                                                ║
              ║  Both numbers refer to the ember's CENTER inside the map frame.║
              ╚════════════════════════════════════════════════════════════════╝ */}
          <span
            aria-hidden
            className="fu-marker-pulse absolute pointer-events-none rounded-full"
            style={{
              /* TWEAK THESE TWO VALUES TO ALIGN WITH THE EMBER ↓ */
              left: '50.5%',
              top: '45.5%',
              /* ─────────────────────────────────────────────── */
              width: 36,
              height: 36,
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(248,180,37,0.55)',
              background: 'radial-gradient(circle, rgba(248,180,37,0.18) 0%, transparent 70%)',
              opacity: 0.9,
            }}
          />

        </a>

        {/* Address line */}
        <p
          className="fu-address font-body italic text-gold-200/90 text-center mt-10 max-w-[44ch] mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)' }}
        >
          16/2 Rankin Street · Wari · Dhaka-1203
          <br />
          <span
            className="font-mono text-gold-500/70 not-italic"
            style={{ fontSize: '0.7rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
          >
            Between a tailor and a print shop
          </span>
        </p>

        {/* Open in Google Maps CTA — Google stays a one-click utility, not the visual */}
        <div className="flex justify-center mt-7">
          <a
            href={MAPS_OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fu-cta group inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-gold-300 hover:text-brown-500 hover:bg-gold-500 border border-[rgba(196,145,42,0.45)] hover:border-gold-500 transition-all duration-300"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open in Google Maps
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
