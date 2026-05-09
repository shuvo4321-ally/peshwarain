'use client'

import { useRef, useState } from 'react'
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
  price: string
  tag?: string
  desc: string
  img: string
  video: string
  accent: string
}

const PLACEHOLDER_VIDEO = '/menu/placeholder.mp4'

const DISHES: Dish[] = [
  {
    id: 'chapli', name: 'Chapli Kebab', bn: 'চাপলি কাবাব', urdu: 'چپلی کباب',
    price: '420', tag: "Chef's Pick",
    desc: 'Hand-minced beef, pomegranate seeds, fresh herbs — seared on a traditional iron tawa.',
    img: '/menu/chapli.png', video: PLACEHOLDER_VIDEO, accent: '#E85D3A',
  },
  {
    id: 'seekh', name: 'Seekh Kebab', bn: 'সিখ কাবাব', urdu: 'سیخ کباب',
    price: '380', tag: 'Charcoal',
    desc: 'Spiced mince threaded on skewers, charcoal-grilled over open flame for a true smoky edge.',
    img: '/menu/seekh.png', video: PLACEHOLDER_VIDEO, accent: '#D4A843',
  },
  {
    id: 'shami', name: 'Shami Kebab', bn: 'শামি কাবাব', urdu: 'شامی کباب',
    price: '340',
    desc: 'Slow-cooked mince and lentils, fresh-ground spice, pan-fried to a crisp shell.',
    img: '/menu/shami.png', video: PLACEHOLDER_VIDEO, accent: '#C89553',
  },
  {
    id: 'karahi', name: 'Peshawari Karahi', bn: 'পেশোয়ারি কড়াই', urdu: 'پشاوری کڑاہی',
    price: '580', tag: 'Bold',
    desc: 'Wok-seared meat, ripe tomatoes, green chillies, and a secret Peshawari spice blend.',
    img: '/menu/karahi.png', video: PLACEHOLDER_VIDEO, accent: '#F08858',
  },
  {
    id: 'namkeen', name: 'Namkeen Gosht', bn: 'নমকিন গোশত', urdu: 'نمکین گوشت',
    price: '650', tag: 'Heritage',
    desc: 'Tender lamb, rock salt, minimal spice — the meat speaks for itself.',
    img: '/menu/namkeen.png', video: PLACEHOLDER_VIDEO, accent: '#F8B425',
  },
  {
    id: 'charsi', name: 'Charsi Tikka', bn: 'চারসি তিক্কা', urdu: 'چرسی تکہ',
    price: '520',
    desc: 'Legendary Khyber-style tikka, slow-marinated, grilled over mesquite and charcoal.',
    img: '/menu/charsi.png', video: PLACEHOLDER_VIDEO, accent: '#DD7A3F',
  },
  {
    id: 'kabuli', name: 'Kabuli Pulao', bn: 'কাবুলি পোলাও', urdu: 'کابلی پلاؤ',
    price: '480', tag: 'Signature',
    desc: 'Long-grain basmati slow-cooked in bone broth with caramelised carrot, raisin, and lamb shank.',
    img: '/menu/kabuli.png', video: PLACEHOLDER_VIDEO, accent: '#E8C872',
  },
  {
    id: 'biryani', name: 'Peshawari Biryani', bn: 'পেশোয়ারি বিরিয়ানি', urdu: 'پشاوری بریانی',
    price: '450',
    desc: 'Dum-cooked rice layered with saffron, yoghurt-marinated meat, and whole warming spices.',
    img: '/menu/biryani.png', video: PLACEHOLDER_VIDEO, accent: '#E8B856',
  },
  {
    id: 'naan', name: 'Peshawari Naan', bn: 'পেশোয়ারি নান', urdu: 'پشاوری نان',
    price: '80',
    desc: 'Hand-stretched, tandoor-baked, brushed with ghee and dusted with nigella seed.',
    img: '/menu/naan.png', video: PLACEHOLDER_VIDEO, accent: '#E0B670',
  },
  {
    id: 'lachha', name: 'Lachha Paratha', bn: 'লাচ্ছা পরোটা', urdu: 'لچھا پراٹھا',
    price: '90',
    desc: 'Flaky, buttery layers — torn, not cut — served piping hot.',
    img: '/menu/lachha.png', video: PLACEHOLDER_VIDEO, accent: '#D4A843',
  },
]

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null)

  // ── Scroll-triggered entrance animations ──
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.pwr-menu-block').forEach((block) => {
        const media = block.querySelector('.pwr-menu-media')
        const text = block.querySelector('.pwr-menu-text')

        if (media) {
          gsap.from(media, {
            opacity: 0,
            scale: 1.06,
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
    { scope: sectionRef }
  )

  return (
    <section id="menu" ref={sectionRef} className="py-24 md:py-36 relative z-10">
      <div className="max-w-container mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className="mb-6 reveal">
          <p
            className="eyebrow-rule font-sans text-gold-400/90 text-[0.92rem]"
            style={{ fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            From Our Kitchen
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12 pb-8 border-b border-gold-700/25 mb-16 md:mb-24">
          <h2
            className="font-display italic text-cream"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
            }}
          >
            The Menu
            <span
              className="block font-urdu text-gold-400/55 mt-3"
              style={{ fontSize: '0.32em', direction: 'rtl', lineHeight: 1.2 }}
            >
              مینیو
            </span>
          </h2>

          <p
            className="font-sans text-gold-500/70 text-[0.78rem]"
            style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}
          >
            {String(DISHES.length).padStart(2, '0')} Dishes
          </p>
        </div>

        {/* ── Editorial dish blocks — alternating layout ── */}
        <div className="flex flex-col gap-24 md:gap-36">
          {DISHES.map((dish, i) => (
            <DishBlock key={dish.id} dish={dish} index={i} total={DISHES.length} />
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-20 md:mt-28 flex flex-col md:flex-row md:justify-between gap-3 pt-6 border-t border-gold-700/15">
          <p
            className="font-sans text-[0.78rem] text-gold-500/55 max-w-[52ch]"
            style={{ letterSpacing: '0.04em' }}
          >
            Every dish can be adjusted for dietary preferences. Ask your server for details.
          </p>
          <p
            className="font-urdu text-gold-500/45 text-[0.85rem]"
            dir="rtl"
            style={{ letterSpacing: '0.05em' }}
          >
            تمام قیمتیں بنگلہ دیشی ٹکا میں
          </p>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════
   DishBlock — one editorial row per dish
   Portrait video showcase with image/video toggle
   ═══════════════════════════════════════════════════ */
function DishBlock({ dish, index, total }: { dish: Dish; index: number; total: number }) {
  const isEven = index % 2 === 0
  const num = String(index + 1).padStart(2, '0')
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleToggle = () => {
    if (!showVideo) {
      setShowVideo(true)
      // wait for render then play
      setTimeout(() => videoRef.current?.play(), 50)
    } else {
      videoRef.current?.pause()
      setShowVideo(false)
    }
  }

  return (
    <article className="pwr-menu-block grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

      {/* ── Portrait media showcase ── */}
      <div
        className={`pwr-menu-media relative overflow-hidden group ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
        style={{ aspectRatio: '3 / 4' }}
      >
        {/* Static image — poster / fallback */}
        <Image
          src={dish.img}
          alt={dish.name}
          fill
          className={`object-cover transition-opacity duration-700 ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Portrait video — full cover */}
        {showVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          >
            <source src={dish.video} type="video/mp4" />
          </video>
        )}

        {/* Cinematic overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `
              linear-gradient(to top, rgba(18,11,7,0.75) 0%, transparent 40%),
              linear-gradient(to bottom, rgba(18,11,7,0.45) 0%, transparent 25%)
            `,
          }}
        />

        {/* Top-left: Index badge */}
        <div
          className="absolute top-5 left-5 font-sans text-[0.65rem] text-gold-400/80 z-20"
          style={{ letterSpacing: '0.28em' }}
        >
          N° {num}
        </div>

        {/* Top-right: Tag + Play/Pause toggle */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
          {dish.tag && (
            <span
              className="font-sans text-[0.6rem] px-3 py-1.5 rounded-full border text-gold-300/90"
              style={{
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderColor: `${dish.accent}55`,
                background: 'rgba(18,11,7,0.7)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {dish.tag}
            </span>
          )}

          {/* Video toggle button */}
          <button
            onClick={handleToggle}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: showVideo ? `${dish.accent}cc` : 'rgba(18,11,7,0.7)',
              border: `1px solid ${dish.accent}55`,
              backdropFilter: 'blur(8px)',
              color: showVideo ? '#120B07' : dish.accent,
            }}
            aria-label={showVideo ? 'Pause video' : 'Play video'}
          >
            {showVideo ? (
              /* Pause icon */
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              /* Play icon */
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom overlay — dish name + price on the image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20">
          <p
            className="font-display italic text-cream"
            style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {dish.name}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-urdu text-gold-300/80 text-sm" dir="rtl">{dish.urdu}</span>
          </div>
        </div>

        {/* Video playing indicator */}
        {showVideo && (
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: dish.accent }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: dish.accent }} />
            </span>
            <span className="font-sans text-[0.6rem] text-gold-300/80" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Playing
            </span>
          </div>
        )}
      </div>

      {/* ── Text content ── */}
      <div
        className={`pwr-menu-text flex flex-col justify-center ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Dish number */}
        <p
          className="font-sans text-gold-500/50 text-[0.7rem] mb-4"
          style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}
        >
          {num} / {String(total).padStart(2, '0')}
        </p>

        {/* Urdu name */}
        <p
          className="font-urdu text-gold-400/60 text-base mb-2"
          dir="rtl"
          style={{ letterSpacing: '0.05em' }}
        >
          {dish.urdu}
        </p>

        {/* English name */}
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

        {/* Bengali name */}
        <p
          className="font-bangla text-gold-300/70 mt-2"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
        >
          {dish.bn}
        </p>

        {/* Divider */}
        <div
          className="w-12 h-px mt-6 mb-6"
          style={{ background: `${dish.accent}55` }}
        />

        {/* Description */}
        <p
          className="font-body text-gold-200/70 max-w-[44ch]"
          style={{ fontSize: '1.05rem', lineHeight: 1.65 }}
        >
          {dish.desc}
        </p>



        {/* Watch video CTA */}
        <button
          onClick={handleToggle}
          className="mt-6 inline-flex items-center gap-3 group/cta w-fit"
        >
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover/cta:scale-110"
            style={{
              border: `1px solid ${dish.accent}55`,
              background: showVideo ? `${dish.accent}22` : 'transparent',
              color: dish.accent,
            }}
          >
            {showVideo ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </span>
          <span
            className="font-sans text-[0.75rem] transition-colors duration-300"
            style={{
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: showVideo ? dish.accent : 'rgba(196,145,42,0.7)',
            }}
          >
            {showVideo ? 'Pause Video' : 'Watch Preparation'}
          </span>
        </button>
      </div>
    </article>
  )
}
