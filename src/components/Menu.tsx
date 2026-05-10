'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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

// Placeholder — swap each dish's video path later
const PLACEHOLDER_VIDEO = '/hero-video.mp4'

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
   Portrait video showcase — autoplay, muted, looped
   ═══════════════════════════════════════════════════ */
function DishBlock({ dish, index, total }: { dish: Dish; index: number; total: number }) {
  const isEven = index % 2 === 0
  const num = String(index + 1).padStart(2, '0')
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const crossfadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── IntersectionObserver: controls entire lifecycle per card ──
  // Enter → play video, after delay crossfade from image to video
  // Leave → pause & reset video, snap back to image immediately
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // Start playing the video (still hidden behind image)
          video.muted = true
          video.currentTime = 0
          const p = video.play()
          if (p && typeof p.then === 'function') {
            p.catch(() => {
              const resume = () => {
                video.play().catch(() => {})
                document.removeEventListener('click', resume)
                document.removeEventListener('touchstart', resume)
                document.removeEventListener('scroll', resume)
              }
              document.addEventListener('click', resume, { once: true, passive: true })
              document.addEventListener('touchstart', resume, { once: true, passive: true })
              document.addEventListener('scroll', resume, { once: true, passive: true })
            })
          }

          // After 1.2s delay, crossfade from image → video
          crossfadeTimerRef.current = setTimeout(() => {
            setShowVideo(true)
          }, 1200)
        } else {
          setIsVisible(false)

          // Cancel any pending crossfade
          if (crossfadeTimerRef.current) {
            clearTimeout(crossfadeTimerRef.current)
            crossfadeTimerRef.current = null
          }

          // Reset: pause video, seek to start, snap image back
          video.pause()
          video.currentTime = 0
          setShowVideo(false)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(container)
    return () => {
      observer.disconnect()
      if (crossfadeTimerRef.current) {
        clearTimeout(crossfadeTimerRef.current)
      }
    }
  }, [])

  // Smooth mouse parallax on hover
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    gsap.to(containerRef.current.querySelector('.pwr-dish-visual'), {
      x: x * -6,
      y: y * -6,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return
    gsap.to(containerRef.current.querySelector('.pwr-dish-visual'), {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  return (
    <article className="pwr-menu-block grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

      {/* ── Portrait media showcase ── */}
      <div
        ref={containerRef}
        className={`pwr-menu-media relative overflow-hidden group ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
        style={{ aspectRatio: '3 / 4' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Static image — always shown first, fades out after video takes over */}
        <Image
          src={dish.img}
          alt={dish.name}
          fill
          className={`object-cover transition-opacity duration-[1.4s] ease-in-out ${showVideo ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={index < 2}
          style={{ zIndex: 1 }}
        />

        {/* Portrait video — sits behind image, crossfades in after delay */}
        <video
          ref={videoRef}
          className={`pwr-dish-visual absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.4s] ease-in-out ${showVideo ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={dish.video} type="video/mp4" />
        </video>

        {/* Cinematic overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-500"
          style={{
            background: `
              linear-gradient(to top, rgba(18,11,7,0.82) 0%, rgba(18,11,7,0.15) 45%, transparent 100%),
              linear-gradient(to bottom, rgba(18,11,7,0.5) 0%, transparent 25%)
            `,
          }}
        />

        {/* Accent vignette — dish-specific color tint at edges */}
        <div
          className="absolute inset-0 pointer-events-none z-[11] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            boxShadow: `inset 0 0 80px ${dish.accent}15, inset 0 0 0 1px ${dish.accent}25`,
          }}
        />

        {/* Top-left: Index badge */}
        <div
          className="absolute top-5 left-5 font-sans text-[0.65rem] text-gold-400/80 z-20"
          style={{ letterSpacing: '0.28em' }}
        >
          N° {num}
        </div>

        {/* Top-right: Tag */}
        {dish.tag && (
          <div className="absolute top-5 right-5 z-20">
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
          </div>
        )}

        {/* Bottom overlay — dish name on the video */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20 transition-transform duration-500 group-hover:translate-y-[-4px]">
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

        {/* Film grain texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[25] mix-blend-overlay opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
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

        {/* Divider with accent glow */}
        <div className="relative mt-6 mb-6">
          <div
            className="w-12 h-px"
            style={{ background: `${dish.accent}55` }}
          />
          <div
            className="absolute top-0 left-0 w-12 h-px blur-sm"
            style={{ background: `${dish.accent}35` }}
          />
        </div>

        {/* Description */}
        <p
          className="font-body text-gold-200/70 max-w-[44ch]"
          style={{ fontSize: '1.05rem', lineHeight: 1.65 }}
        >
          {dish.desc}
        </p>
      </div>
    </article>
  )
}
