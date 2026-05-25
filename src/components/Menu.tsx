'use client'

import { useCallback, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ── Dish data ─────────────────────────────────────── */
type Dish = {
  id: string
  name: string
  bn: string
  urdu: string
  desc: string
  craft: string
  img: string
  accent: string
}

const DISHES: Dish[] = [
  {
    id: 'murgh-makkhanwala',
    name: 'Murgh Makkhanwala',
    bn: 'মুরগ মাখানওয়ালা',
    urdu: 'مرغ مکھنوالا',
    desc:
      'Tender chicken in a velvety tomato-butter gravy, finished with cream and fenugreek — a milder counterpoint to the kitchen’s aggressive nihari spice profile.',
    craft: 'Mughlai butter gravy, mildly spiced — built to cool the palate between bites of Pashtun heat.',
    img: '/menu/murgh-makkhanwala.png',
    accent: '#E85D3A',
  },
  {
    id: 'bakri-nihari',
    name: 'Bakri Ki Nihari',
    bn: 'বাকরি কি নিহারি',
    urdu: 'بکری کی نہاری',
    desc:
      'Slow-cooked goat in a deeply spiced marrow broth, served with crisp ginger, green chilli, and fresh lime — the Pashtun spice matrix kept undiluted.',
    craft: 'Cuts from shank and bone-in segments. Hours of slow braise release natural gelatin into the broth.',
    img: '/menu/bakri-nihari.png',
    accent: '#C4912A',
  },
  {
    id: 'gosht-nihari',
    name: 'Nalli Gosht Nihari',
    bn: 'নল্লি গোশত নিহারি',
    urdu: 'نلی گوشت نہاری',
    desc:
      'Beef shank and marrow bone, patient-simmered through the night in our nihari masala. Marrow, meat, and natural gelatin meet in a single, viscous broth.',
    craft: 'Flour-thickened gravy binds the spices to the meat juices — recognised by The Business Standard. Served in insulated steel so the fats never solidify.',
    img: '/menu/gosht-nihari.png',
    accent: '#D4A843',
  },
  {
    id: 'malai-boti',
    name: 'Malai Boti',
    bn: 'মালাই বোটি',
    urdu: 'ملائی بوٹی',
    desc:
      'Cream-marinated chicken, charcoal-grilled to a golden blister — silken within, smoky without.',
    craft: 'Overnight cream marinade, open-fire char. Plated within minutes of leaving the coals.',
    img: '/menu/malai-boti.png',
    accent: '#F8B425',
  },
  {
    id: 'malai-lassi',
    name: 'Malai Lassi',
    bn: 'মালাই লাচ্ছি',
    urdu: 'ملائی لسّی',
    desc:
      'Hand-churned yoghurt crowned with fresh malai, crushed pistachio, and a whisper of saffron — the cooling counterpart to the heavy gravies.',
    craft: 'Thick enough to stand a spoon in. Drunk slow, after the naan.',
    img: '/menu/malai-lassi.png',
    accent: '#E8C872',
  },
]

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.pwr-menu-block').forEach((block) => {
        const media = block.querySelector('.pwr-menu-media')
        const text = block.querySelector('.pwr-menu-text')

        if (media) {
          gsap.from(media, {
            opacity: 0,
            scale: 1.06,
            y: 50,
            filter: 'blur(6px)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        }

        if (text) {
          gsap.from(text.children, {
            opacity: 0,
            y: 40,
            filter: 'blur(6px)',
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="menu" ref={sectionRef} className="py-24 md:py-36 relative z-10">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* In-section header — a complementary line, not a repeat of the opener */}
        <div className="pwr-menu-header flex flex-col items-center text-center mb-20 md:mb-28">
          <p
            className="font-mono text-gold-400/85 mb-4"
            style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.42em', textTransform: 'uppercase' }}
          >
            Tonight's Table
          </p>
          <h2
            className="font-display italic text-cream letterpress max-w-[24ch]"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.018em',
            }}
          >
            A short menu.<br />A long fire.
          </h2>
          <div className="mt-7 flex items-center gap-2">
            <span aria-hidden className="block w-10 h-px bg-gold-500/45" />
            <span aria-hidden className="ornament-diamond" />
            <span aria-hidden className="block w-10 h-px bg-gold-500/45" />
          </div>
        </div>

        <div className="flex flex-col gap-24 md:gap-36">
          {DISHES.map((dish, i) => (
            <DishBlock key={dish.id} dish={dish} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   DishBlock — one editorial row per dish
   Single still photo with slow Ken-Burns zoom +
   mouse parallax. No video, no crossfade.
   ═══════════════════════════════════════════════════ */
function DishBlock({ dish, index }: { dish: Dish; index: number }) {
  const isEven = index % 2 === 0
  const containerRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)

  // ── Ken-Burns: slow scale-down as the dish scrolls through viewport ──
  useGSAP(
    () => {
      const img = imgWrapRef.current?.querySelector('img')
      if (!img) return

      gsap.fromTo(
        img,
        { scale: 1.14 },
        {
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        },
      )
    },
    { scope: containerRef },
  )

  // ── Subtle mouse parallax on the image ──
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgWrapRef.current
    if (!el) return
    const rect = containerRef.current!.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(el, {
      x: x * -8,
      y: y * -8,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = imgWrapRef.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })
  }, [])

  return (
    <article className="pwr-menu-block grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* ── Photo media ── */}
      <div
        ref={containerRef}
        className={`pwr-menu-media relative overflow-hidden group ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
        style={{ aspectRatio: '3 / 4', background: '#1A100A' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image wrapper for parallax — the inner Image scales via Ken-Burns */}
        <div ref={imgWrapRef} className="absolute inset-0 will-change-transform">
          <Image
            src={dish.img}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={index < 2}
            style={{ filter: 'brightness(0.92) saturate(1.02)' }}
          />
        </div>

        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `
              linear-gradient(to top, rgba(18,11,7,0.78) 0%, rgba(18,11,7,0.12) 45%, transparent 100%),
              linear-gradient(to bottom, rgba(18,11,7,0.4) 0%, transparent 25%)
            `,
          }}
        />

        {/* Accent vignette — appears on hover */}
        <div
          className="absolute inset-0 pointer-events-none z-[11] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            boxShadow: `inset 0 0 80px ${dish.accent}1A, inset 0 0 0 1px ${dish.accent}30`,
          }}
        />

        {/* Bottom dish name */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20 transition-transform duration-500 group-hover:translate-y-[-4px]">
          <p
            className="font-display italic text-cream"
            style={{
              fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {dish.name}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-urdu text-gold-300/80 text-sm" dir="rtl">
              {dish.urdu}
            </span>
          </div>
        </div>

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none z-[25] mix-blend-overlay opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Text ── */}
      <div
        className={`pwr-menu-text flex flex-col justify-center ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <p
          className="font-urdu text-gold-400/60 text-base mb-2"
          dir="rtl"
          style={{ letterSpacing: '0.05em' }}
        >
          {dish.urdu}
        </p>

        <h3
          className="font-display italic text-cream"
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          {dish.name}
        </h3>

        <p
          className="font-bangla text-gold-300/70 mt-2"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
        >
          {dish.bn}
        </p>

        <div className="relative mt-6 mb-6">
          <div className="w-12 h-px" style={{ background: `${dish.accent}55` }} />
          <div
            className="absolute top-0 left-0 w-12 h-px blur-sm"
            style={{ background: `${dish.accent}35` }}
          />
        </div>

        <p
          className="font-body text-gold-200/70 max-w-[44ch]"
          style={{ fontSize: '1.05rem', lineHeight: 1.65 }}
        >
          {dish.desc}
        </p>

        {/* Kitchen craft note */}
        <div className="mt-7 flex items-start gap-4 max-w-[46ch]">
          <span
            className="font-mono text-gold-500/65 flex-shrink-0 mt-0.5"
            style={{
              fontSize: '0.62rem',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}
          >
            From<br />the kitchen
          </span>
          <span aria-hidden className="block w-px self-stretch bg-gold-700/30" />
          <p className="font-body italic text-gold-300/75" style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
            {dish.craft}
          </p>
        </div>
      </div>
    </article>
  )
}
