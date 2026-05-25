'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ═══════════════════════════════════════════════════
   STORY — Chronicle of an alleyway.

   Real PeshWarain history in the editorial voice
   Hero and Menu already established. Expanded photo
   surface — 6 archival polaroids + per-row timeline
   thumbnails. Multiple layered animations: fan-out
   entrance, continuous float, mouse parallax, hover
   lift, marker pulse, arrow draw-on.
   ═══════════════════════════════════════════════════ */

type TimelineEntry = {
  year: string
  season: string
  title: string
  body: string
  chip: string | null
  img: string
  imgAlt: string
}

const TIMELINE: TimelineEntry[] = [
  {
    year: 'Dec 2020',
    season: '',
    title: '16/2 Rankin Street, Wari',
    body: 'Shafin Baig opens Peshwarain in a renovated Old Dhaka house. Twelve covers, warm wooden screens, Pashtun motifs on the walls. Doors open at five.',
    chip: 'Opens',
    img: '/old.png',
    imgAlt: 'Rankin Street entrance',
  },
  {
    year: '2022',
    season: '',
    title: 'The flour technique',
    body: 'Dhakai Nihari runs thin. We bind the broth with toasted atta — a Frontier method that lets the spices cling to the gravy and the gravy cling to the naan. The Business Standard takes notice.',
    chip: null,
    img: '/nehari.png',
    imgAlt: 'The Nihari broth',
  },
  {
    year: '2023',
    season: '',
    title: 'Recognised',
    body: 'The Petuk Couple, Rafsan TheChotoBhai, Bahare Vojon — the city’s food writers find us. The 2 Cents Podcast and Channel 24 run the long-form. The room fills by sundown.',
    chip: 'In Press',
    img: '/niggaaas.png',
    imgAlt: 'The dining room',
  },
  {
    year: '2025',
    season: '',
    title: 'Gulshan-1 · with Nitol-Niloy & Cubeinside',
    body: 'A 3,500 sq-ft tribute to Old Dhaka and Peshawari heritage. Designed by Ahmed Firoj Ul Hoque Robin and the Cubeinside team — black anodized aluminum, natural concrete, rustic metal mesh, sweeping arches. Opening soon.',
    chip: 'Coming',
    img: '/nit.png',
    imgAlt: 'The expansion',
  },
]

type Polaroid = {
  src: string
  cap: string
  top: string
  left: string
  width: string
  rotate: number
  z: number
  float: number  // amplitude in px for continuous float
  parallax: number  // mouse-parallax factor
}

const POLAROIDS: Polaroid[] = [
  { src: '/first_women.png', cap: 'Rankin St, 9:47pm', top: '0%', left: '2%', width: '58%', rotate: -4, z: 6, float: 6, parallax: 38 },
  { src: '/856.png', cap: 'Wari, on Rankin', top: '8%', left: '46%', width: '50%', rotate: 5, z: 4, float: 5, parallax: 58 },
  { src: '/aloki.png', cap: 'Khyber colour', top: '40%', left: '0%', width: '48%', rotate: 2, z: 3, float: 7, parallax: 26 },
  { src: '/369.png', cap: 'Twelve covers', top: '38%', left: '40%', width: '54%', rotate: -3, z: 5, float: 4, parallax: 46 },
  { src: '/589.png', cap: 'On the coals', top: '70%', left: '8%', width: '46%', rotate: 4.5, z: 2, float: 8, parallax: 64 },
  { src: '/1235.png', cap: 'Malai, by the spoon', top: '72%', left: '52%', width: '42%', rotate: -2, z: 1, float: 5, parallax: 42 },
]

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const collageRef = useRef<HTMLDivElement>(null)

  /* ── Mouse parallax on the polaroid collage ─────────────────────── */
  useEffect(() => {
    const collage = collageRef.current
    if (!collage) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let tx = 0, ty = 0
    let cx = 0, cy = 0

    const onMove = (e: MouseEvent) => {
      const r = collage.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const onLeave = () => {
      tx = 0
      ty = 0
    }

    const tick = () => {
      cx += (tx - cx) * 0.07
      cy += (ty - cy) * 0.07
      const cards = collage.querySelectorAll<HTMLElement>('.ss-polaroid')
      cards.forEach((el) => {
        const f = parseFloat(el.dataset.parallax || '30')
        el.style.setProperty('--px', `${cx * -f}px`)
        el.style.setProperty('--py', `${cy * -f}px`)
      })
      raf = requestAnimationFrame(tick)
    }

    collage.addEventListener('mousemove', onMove)
    collage.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      collage.removeEventListener('mousemove', onMove)
      collage.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* ── GSAP entrance + continuous motion ──────────────────────────── */
  useGSAP(
    () => {
      /* ── Locator ── */
      gsap.from('.ss-locator', {
        opacity: 0,
        y: 14,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ss-locator', start: 'top 88%' },
      })

      /* ── Polaroid fan-out entrance ── */
      /* Start: all stacked centered, scale 0.6, rotated 0, opacity 0
         End:   each at its final top/left, rotation, scale 1 */
      gsap.utils.toArray<HTMLElement>('.ss-polaroid').forEach((card, i) => {
        const finalRotate = parseFloat(card.dataset.rotate || '0')
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.55,
            rotate: 0,
            x: -40,
            y: 40,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            scale: 1,
            rotate: finalRotate,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.15,
            delay: i * 0.13,
            ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.ss-collage', start: 'top 78%' },
          }
        )
      })

      /* ── Continuous gentle float on each polaroid (after entrance settles) ── */
      gsap.utils.toArray<HTMLElement>('.ss-polaroid').forEach((card) => {
        const amp = parseFloat(card.dataset.float || '6')
        gsap.to(card, {
          y: -amp,
          duration: 2.6 + Math.random() * 1.4,
          delay: 1.8 + Math.random() * 0.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

      /* ── Chapter hero image — ken-burns slow zoom while in viewport ── */
      gsap.utils.toArray<HTMLElement>('.ss-chapter').forEach((chapter) => {
        const img = chapter.querySelector('.ss-chapter-img-inner')
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.4,
              },
            }
          )
        }
      })

      /* ── Chapter year (display) — big number slides in ── */
      gsap.utils.toArray<HTMLElement>('.ss-chapter').forEach((chapter) => {
        const year = chapter.querySelector('.ss-chapter-year')
        const text = chapter.querySelectorAll('.ss-chapter-text > *')
        const img = chapter.querySelector('.ss-chapter-img')

        if (img) {
          gsap.fromTo(
            img,
            { opacity: 0, scale: 0.94, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.3,
              ease: 'power3.out',
              scrollTrigger: { trigger: chapter, start: 'top 78%' },
            }
          )
        }
        if (year) {
          gsap.fromTo(
            year,
            { opacity: 0, y: 36, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.1,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: chapter, start: 'top 78%' },
            }
          )
        }
        if (text.length) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 22, filter: 'blur(4px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.9,
              stagger: 0.1,
              delay: 0.35,
              ease: 'power3.out',
              scrollTrigger: { trigger: chapter, start: 'top 78%' },
            }
          )
        }
      })

      /* ── Chapter divider rule — draws horizontally on scroll ── */
      gsap.fromTo(
        '.ss-chapter-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.ss-timeline', start: 'top 80%' },
        }
      )

      /* ── Chips ── */
      gsap.fromTo(
        '.ss-chip',
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.18,
          ease: 'back.out(1.6)',
          delay: 0.35,
          scrollTrigger: { trigger: '.ss-timeline', start: 'top 80%' },
        }
      )

      /* ── Year counter shimmer on hover (via CSS); arrow shimmer ── */

      /* ── Quote ── */
      gsap.from('.ss-quote', {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ss-quote', start: 'top 82%' },
      })

      /* ── Watermark ── */
      gsap.from('.ss-watermark', {
        opacity: 0,
        scale: 0.96,
        filter: 'blur(20px)',
        duration: 2.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      /* ── Strong scroll-based parallax — collage drifts UP slower than page ── */
      gsap.to('.ss-collage', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ss-collage',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      /* ── Urdu watermark drifts at its own speed — deep background layer ── */
      gsap.to('.ss-watermark', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
      })
    },
    { scope: sectionRef }
  )


  return (
    <section
      ref={sectionRef}
      id="story"
      className="py-28 md:py-44 relative z-10 overflow-hidden"
    >
      {/* Ambient embers */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 12% 35%, rgba(193,90,54,0.06) 0%, transparent 50%), radial-gradient(ellipse at 88% 65%, rgba(196,145,42,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Urdu watermark */}
      <div
        aria-hidden
        className="ss-watermark hidden lg:block absolute top-[10vh] right-[-4vw] font-urdu text-[#F8B425]/[0.035] select-none pointer-events-none z-0"
        style={{
          fontSize: 'clamp(8rem, 18vw, 18rem)',
          lineHeight: 0.9,
          direction: 'rtl',
          letterSpacing: '-0.04em',
        }}
      >
        وارى
      </div>

      <div className="max-w-container mx-auto px-6 md:px-12 relative z-10">

        {/* ── In-section header — complementary line, not the opener ── */}
        <div className="ss-header flex flex-col items-center text-center mb-14 md:mb-20">
          <p
            className="font-mono text-gold-400/85 mb-4"
            style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.42em', textTransform: 'uppercase' }}
          >
            Chronicle of an alleyway
          </p>
          <h2
            className="font-display italic text-cream letterpress max-w-[28ch]"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.018em',
            }}
          >
            Four years on Rankin Street.
          </h2>
          <div className="mt-7 flex items-center gap-2">
            <span aria-hidden className="block w-10 h-px bg-gold-500/45" />
            <span aria-hidden className="ornament-diamond" />
            <span aria-hidden className="block w-10 h-px bg-gold-500/45" />
          </div>
        </div>

        {/* ── Locator ── */}
        <div className="ss-locator flex flex-wrap items-baseline gap-x-6 gap-y-2 max-w-3xl">
          <span
            className="font-mono text-gold-500/75"
            style={{
              fontSize: '0.66rem',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}
          >
            Position
          </span>
          <span aria-hidden className="block w-12 h-px bg-gold-700/40" />
          <span className="font-body text-gold-200/90" style={{ fontSize: '0.98rem', lineHeight: 1.7 }}>
            <span className="text-cream">16/2 Rankin Street, Wari.</span> A renovated Old Dhaka house — warm wooden screens, Pashtun motifs, Afghan-style lamps. Doors at five, last orders at eleven.
          </span>
        </div>

        {/* ── Collage + Timeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-14 lg:gap-20 items-start mt-20 md:mt-28">

          {/* ── Polaroid collage ── */}
          <div
            ref={collageRef}
            className="ss-collage relative w-full"
            style={{ aspectRatio: '4/5', maxHeight: 760 }}
          >
            {POLAROIDS.map((p, i) => (
              <figure
                key={i}
                className="ss-polaroid absolute will-change-transform group cursor-pointer"
                data-rotate={p.rotate}
                data-float={p.float}
                data-parallax={p.parallax}
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.width,
                  zIndex: p.z,
                  background: '#EFE5C8',
                  padding: '10px 10px 38px 10px',
                  boxShadow:
                    '0 14px 38px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.35)',
                  transform: `translate(var(--px,0), var(--py,0)) rotate(${p.rotate}deg)`,
                  transition: 'box-shadow 0.5s ease, z-index 0s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.zIndex = '10'
                  gsap.to(el, {
                    rotate: 0,
                    scale: 1.08,
                    duration: 0.5,
                    ease: 'power3.out',
                    overwrite: 'auto',
                  })
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  gsap.to(el, {
                    rotate: parseFloat(el.dataset.rotate || '0'),
                    scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    overwrite: 'auto',
                    onComplete: () => {
                      el.style.zIndex = String(p.z)
                    },
                  })
                }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3', background: '#1A100A' }}>
                  <Image
                    src={p.src}
                    alt={p.cap}
                    fill
                    sizes="(min-width: 1024px) 30vw, 70vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 40%, rgba(248,180,37,0.10) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(196,145,42,0.30)' }}
                  />
                </div>
                <figcaption
                  className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between"
                  style={{ color: '#3D2B1F' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.56rem',
                      fontWeight: 500,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      opacity: 0.65,
                    }}
                  >
                    Pl. {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {p.cap}
                  </span>
                </figcaption>
              </figure>
            ))}

          </div>

          {/* ── Timeline / Chapter cards ── */}
          <div className="ss-timeline relative">
            {TIMELINE.map((t, i) => {
              const isReverse = i % 2 === 1
              return (
                <article
                  key={i}
                  className="ss-chapter relative mb-16 md:mb-24 last:mb-0"
                >
                  {/* top rule */}
                  <div className="flex items-center gap-4 mb-7">
                    <span
                      className="font-body italic text-gold-300/85 whitespace-nowrap"
                      style={{
                        fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                        letterSpacing: '0.005em',
                      }}
                    >
                      Chapter {['I', 'II', 'III', 'IV', 'V'][i]}
                    </span>
                    <span
                      aria-hidden
                      className="ss-chapter-rule block flex-1 h-px origin-left"
                      style={{ background: 'rgba(196,145,42,0.45)' }}
                    />
                  </div>

                  {/* Image + text — alternating on desktop, banner+text on mobile */}
                  <div
                    className={`grid grid-cols-[96px,1fr] ${isReverse ? 'md:grid-cols-[1fr,140px]' : 'md:grid-cols-[140px,1fr]'
                      } gap-4 md:gap-7 items-start`}
                  >
                    {/* Hero thumbnail */}
                    <figure
                      className={`ss-chapter-img relative overflow-hidden ${isReverse ? 'md:order-2' : 'md:order-1'
                        }`}
                      style={{
                        aspectRatio: '4/5',
                        background: '#1A100A',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                      }}
                    >
                      <div className="ss-chapter-img-inner absolute inset-0">
                        <Image
                          src={t.img}
                          alt={t.imgAlt}
                          fill
                          sizes="(min-width: 1024px) 140px, 30vw"
                          className="object-cover"
                        />
                      </div>
                      {/* Gold film frame */}
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{ boxShadow: 'inset 0 0 0 1px rgba(196,145,42,0.45)' }}
                      />
                      {/* Warm vignette */}
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(180deg, transparent 50%, rgba(18,11,7,0.55) 100%)',
                        }}
                      />
                      {/* Plate label */}
                      <span
                        className="absolute bottom-2 left-2 font-mono text-gold-300/85"
                        style={{
                          fontSize: '0.52rem',
                          fontWeight: 500,
                          letterSpacing: '0.28em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Pl. {String(i + 1).padStart(2, '0')}
                      </span>
                    </figure>

                    {/* Text */}
                    <div className={`ss-chapter-text ${isReverse ? 'md:order-1 md:text-right md:items-end' : 'md:order-2'} flex flex-col`}>
                      {/* Big display year */}
                      <h3
                        className="ss-chapter-year font-display italic text-cream letterpress leading-none"
                        style={{
                          fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {t.year}
                        {t.season && (
                          <span
                            className="block font-body italic text-gold-300/75 mt-1"
                            style={{ fontSize: '1rem' }}
                          >
                            · {t.season}
                          </span>
                        )}
                      </h3>

                      {/* Chip — heritage stamp with asymmetric corner diamonds */}
                      {t.chip && (
                        <div className={`mt-4 ${isReverse ? 'md:self-end' : ''}`}>
                          <span
                            className="ss-chip relative inline-block"
                            style={{
                              padding: '6px 16px 6px 16px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.56rem',
                              fontWeight: 600,
                              letterSpacing: '0.4em',
                              textTransform: 'uppercase',
                              color: '#F2D78A',
                              background:
                                'linear-gradient(180deg, rgba(248,180,37,0.16) 0%, rgba(196,145,42,0.04) 100%), rgba(18,11,7,0.55)',
                              border: '1px solid rgba(232,200,114,0.55)',
                              boxShadow:
                                'inset 0 1px 0 rgba(255,224,138,0.32), inset 0 -1px 0 rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.5), 0 0 14px rgba(248,180,37,0.10)',
                              backdropFilter: 'blur(6px)',
                              WebkitBackdropFilter: 'blur(6px)',
                            }}
                          >
                            {/* Diamond top-left — punches out of the corner */}
                            <span
                              aria-hidden
                              className="absolute"
                              style={{
                                top: -4,
                                left: -4,
                                width: 7,
                                height: 7,
                                background:
                                  'linear-gradient(135deg, #FFE08A 0%, #F8B425 45%, #C4912A 100%)',
                                transform: 'rotate(45deg)',
                                boxShadow:
                                  '0 1px 3px rgba(0,0,0,0.55), 0 0 8px rgba(248,180,37,0.55), inset 0 0 2px rgba(255,255,255,0.55)',
                              }}
                            />
                            {/* Diamond bottom-right — mirror corner */}
                            <span
                              aria-hidden
                              className="absolute"
                              style={{
                                bottom: -4,
                                right: -4,
                                width: 7,
                                height: 7,
                                background:
                                  'linear-gradient(135deg, #FFE08A 0%, #F8B425 45%, #C4912A 100%)',
                                transform: 'rotate(45deg)',
                                boxShadow:
                                  '0 1px 3px rgba(0,0,0,0.55), 0 0 8px rgba(248,180,37,0.55), inset 0 0 2px rgba(255,255,255,0.55)',
                              }}
                            />
                            {/* Subtle vertical hairline above the text — heritage stamp accent */}
                            <span
                              aria-hidden
                              className="absolute pointer-events-none"
                              style={{
                                top: 2,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 1,
                                height: 3,
                                background: 'rgba(248,180,37,0.5)',
                              }}
                            />
                            {t.chip}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h4
                        className="font-display italic text-cream mt-5 mb-3"
                        style={{
                          fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                          lineHeight: 1.12,
                          letterSpacing: '-0.016em',
                        }}
                      >
                        {t.title}
                      </h4>

                      {/* Body */}
                      <p
                        className="font-body text-gold-200/85 max-w-[44ch]"
                        style={{
                          fontSize: 'clamp(0.97rem, 1.1vw, 1.05rem)',
                          lineHeight: 1.85,
                          ...(isReverse ? { marginLeft: 'auto' } : {}),
                        }}
                      >
                        {t.body}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* ── Pull quote ── */}
        <blockquote className="ss-quote mt-24 md:mt-32 max-w-[68ch] mx-auto text-center relative">
          <div aria-hidden className="text-gold-500/30 font-display italic mb-2" style={{ fontSize: '3rem', lineHeight: 0.6 }}>
            &ldquo;
          </div>
          <p
            className="font-display italic text-cream letterpress"
            style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)', lineHeight: 1.5, letterSpacing: '-0.012em' }}
          >
            The kitchen brilliantly uses flour to naturally thicken the gravy &mdash; keeping the meat tender and the broth rich.
          </p>
          <footer className="mt-7 flex items-center justify-center gap-3">
            <span aria-hidden className="block w-10 h-px bg-gold-500/55" />
            <cite
              className="font-mono not-italic text-gold-400/85"
              style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
              }}
            >
              The Business Standard · 2023
            </cite>
            <span aria-hidden className="block w-10 h-px bg-gold-500/55" />
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
