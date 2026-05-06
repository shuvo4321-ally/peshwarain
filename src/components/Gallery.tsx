'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Item = {
  src: string
  alt: string
  caption: string
  bn: string
  urdu: string
  /** column-span × row-span for the broken grid */
  span: { col: string; row: string }
  /** absolute offset to break the grid rhythm */
  offset?: { translateY?: string; translateX?: string; rotate?: string }
  fig: string
}

const ITEMS: Item[] = [
  {
    src: '/restaurant-exterior.webp',
    alt: 'Iconic façade',
    caption: 'Iconic Façade',
    bn: 'আইকনিক বহির্ভাগ',
    urdu: 'مشہور پیشانی',
    span: { col: 'md:col-span-7', row: 'md:row-span-2' },
    offset: { translateY: 'md:translate-y-0', rotate: 'md:rotate-[-0.6deg]' },
    fig: 'I',
  },
  {
    src: '/restaurant-night.webp',
    alt: 'After dark',
    caption: 'After Dark',
    bn: 'রাতের পরিবেশ',
    urdu: 'رات کا منظر',
    span: { col: 'md:col-span-5', row: 'md:row-span-1' },
    offset: { translateY: 'md:translate-y-12', rotate: 'md:rotate-[0.4deg]' },
    fig: 'II',
  },
  {
    src: '/restaurant-interior.webp',
    alt: 'Peshawari interior',
    caption: 'Peshawari Character',
    bn: 'পেশোয়ারি চরিত্র',
    urdu: 'پشاوری مزاج',
    span: { col: 'md:col-span-5', row: 'md:row-span-1' },
    offset: { translateY: 'md:translate-y-4', rotate: 'md:rotate-[-0.4deg]' },
    fig: 'III',
  },
  {
    src: '/truck-art.jpg',
    alt: 'Truck art heritage',
    caption: 'Truck Art Heritage',
    bn: 'ট্রাক আর্ট ঐতিহ্য',
    urdu: 'ٹرک آرٹ',
    span: { col: 'md:col-span-7', row: 'md:row-span-1' },
    offset: { translateY: 'md:-translate-y-6', rotate: 'md:rotate-[0.5deg]' },
    fig: 'IV',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  // ── Entrance reveal
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.gallery-item')
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          scale: 0.96,
          duration: 1.0,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })

      const headline = headlineRef.current
      if (headline) {
        gsap.from(headline, {
          opacity: 0,
          y: 30,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: headline, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      }

      // Subtle parallax on image inner
      gsap.utils.toArray<HTMLElement>('.gallery-item-inner').forEach(inner => {
        gsap.to(inner, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: inner.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  // ── Cursor-driven 3D tilt per card
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    const cards = document.querySelectorAll<HTMLElement>('.gallery-item')
    const cleanups: Array<() => void> = []

    cards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const rx = (py - 0.5) * -8
        const ry = (px - 0.5) * 10
        card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      }
      const onLeave = () => {
        card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)'
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') setLightbox(i => (i! - 1 + ITEMS.length) % ITEMS.length)
      if (e.key === 'ArrowRight') setLightbox(i => (i! + 1) % ITEMS.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-36 relative z-10">
      <div className="max-w-container mx-auto px-6 md:px-12">

        {/* Editorial header */}
        <div className="mb-14 md:mb-20 grid grid-cols-12 gap-x-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-10 h-px bg-gold-500/70" />
              <span
                className="font-sans text-gold-300/90 text-[0.74rem]"
                style={{ letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500 }}
              >
                The Experience
              </span>
              <span className="ornament-diamond" />
              <span className="font-bangla text-gold-300/70 text-sm">অভিজ্ঞতা</span>
            </div>

            <h2
              ref={headlineRef}
              className="font-display italic text-cream"
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              Step inside the <span className="text-[#F8B425]">house</span> of Peshwarain.
              <span className="block font-urdu text-gold-400/55 mt-3" style={{ fontSize: '0.32em', direction: 'rtl', lineHeight: 1.2 }}>
                ہمارے گھر میں
              </span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pl-8 lg:border-l lg:border-gold-700/25 mt-6 lg:mt-0">
            <p className="font-display italic text-gold-300/85 text-lg leading-relaxed">
              Truck art, warm golden light, the scent of freshly grilled kebabs.
              A room where Peshawar&apos;s storyteller bazaars bleed into Dhaka&apos;s rooftops.
            </p>
            <div className="mt-5 flex items-center gap-3 font-sans text-gold-500/65 text-[0.7rem]" style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}>
              <span>04 Plates</span>
              <span className="block w-8 h-px bg-gold-500/45" />
              <span>Old Dhaka</span>
            </div>
          </div>
        </div>

        {/* Broken asymmetric grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5"
          style={{ gridAutoRows: 'minmax(220px, auto)' }}
        >
          {ITEMS.map((item, i) => (
            <button
              key={item.src}
              type="button"
              data-cursor="View"
              onClick={() => setLightbox(i)}
              className={`gallery-item group relative overflow-hidden col-span-1 ${item.span.col} ${item.span.row} ${item.offset?.translateY ?? ''} ${item.offset?.rotate ?? ''} cursor-pointer text-left`}
              style={{
                aspectRatio: i === 0 ? '4 / 5' : '4 / 3',
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Inner image (parallax target) */}
              <div className="gallery-item-inner absolute inset-0">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{ filter: 'brightness(0.78) saturate(1.05)' }}
                />
              </div>

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,6,4,0.85) 0%, rgba(10,6,4,0.2) 45%, transparent 70%)',
                }}
              />

              {/* Top-left fig label */}
              <div className="absolute top-4 left-4 flex items-center gap-2.5 z-10">
                <span
                  className="font-sans text-gold-300/90 text-[0.62rem] px-2.5 py-1 rounded-full border border-gold-500/35"
                  style={{ letterSpacing: '0.28em', background: 'rgba(10,6,4,0.55)', backdropFilter: 'blur(8px)' }}
                >
                  FIG. {item.fig}
                </span>
              </div>

              {/* Bottom caption — clip-path sweep reveal on hover */}
              <div className="absolute inset-x-4 bottom-4 z-10 overflow-hidden">
                <div
                  className="transition-all duration-500 ease-out"
                  style={{
                    transform: 'translateY(8px)',
                  }}
                >
                  <p
                    className="font-display italic text-cream"
                    style={{
                      fontSize: 'clamp(1.2rem, 1.8vw, 1.7rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.05,
                    }}
                  >
                    {item.caption}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="font-bangla text-gold-300/85 text-sm">{item.bn}</span>
                    <span className="block w-6 h-px bg-gold-500/55" />
                    <span className="font-urdu text-gold-400/70 text-base" dir="rtl">{item.urdu}</span>
                  </div>
                </div>

                {/* Hover-only "view" link sweep */}
                <div
                  className="mt-3 overflow-hidden transition-[max-height] duration-500 ease-out group-hover:max-h-10"
                  style={{ maxHeight: 0 }}
                >
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[0.7rem] text-[#F8B425]"
                    style={{ letterSpacing: '0.28em', textTransform: 'uppercase' }}
                  >
                    Open
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Corner ornament */}
              <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold-500/40" />
              <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold-500/40 hidden md:block" />
            </button>
          ))}
        </div>

        {/* Footer band */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6 border-t border-gold-700/15">
          <p className="font-sans text-[0.72rem] text-gold-500/55" style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            Photographed in Old Dhaka
          </p>
          <p className="font-display italic text-gold-300/65 text-sm">
            Every frame, a chapter.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ background: 'rgba(10,6,4,0.94)', backdropFilter: 'blur(18px)' }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
            data-cursor="Close"
            className="absolute top-6 right-6 w-11 h-11 rounded-full border border-gold-500/40 text-gold-300 flex items-center justify-center hover:bg-gold-500 hover:text-brown-500 transition-all duration-300"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i! - 1 + ITEMS.length) % ITEMS.length) }}
            data-cursor="Prev"
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold-500/40 text-gold-300 flex items-center justify-center hover:bg-gold-500 hover:text-brown-500 transition-all duration-300"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i! + 1) % ITEMS.length) }}
            data-cursor="Next"
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold-500/40 text-gold-300 flex items-center justify-center hover:bg-gold-500 hover:text-brown-500 transition-all duration-300"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div
            className="relative w-[min(92vw,1080px)] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ITEMS[lightbox].src}
              alt={ITEMS[lightbox].alt}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
            <div className="absolute -bottom-14 left-0 right-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-display italic text-cream text-xl" style={{ letterSpacing: '-0.01em' }}>
                  {ITEMS[lightbox].caption}
                </p>
                <p className="font-bangla text-gold-300/80 text-sm mt-0.5">
                  {ITEMS[lightbox].bn} · <span className="font-urdu" dir="rtl">{ITEMS[lightbox].urdu}</span>
                </p>
              </div>
              <p className="font-sans text-gold-400/70 text-[0.7rem] tabular-nums" style={{ letterSpacing: '0.28em' }}>
                FIG. {ITEMS[lightbox].fig} · {String(lightbox + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
