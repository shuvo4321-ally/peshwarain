'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Section = 'main' | 'side'
type Tag = "chef's pick" | 'signature' | 'heritage' | 'charcoal' | 'bold'

type Motif = 'pomegranate' | 'skewer' | 'tawa' | 'karahi' | 'salt' | 'flame' | 'rice' | 'cardamom' | 'naan' | 'lachha'

type Dish = {
  id: string
  section: Section
  name: string
  bn: string
  urdu: string
  price: string
  tag?: Tag
  desc: string
  tint: string
  accent: string
  motif: Motif
}

const DISHES: Dish[] = [
  { id: 'chapli',  section: 'main', name: 'Chapli Kebab',     bn: 'চাপলি কাবাব',  urdu: 'چپلی کباب',     price: '420', tag: "chef's pick", desc: 'Hand-minced beef, pomegranate seeds, fresh herbs — seared on a traditional iron tawa.',         tint: 'radial-gradient(circle at 30% 30%, #C15A36 0%, #6B2F18 55%, #2E1810 100%)', accent: '#E85D3A', motif: 'pomegranate' },
  { id: 'seekh',   section: 'main', name: 'Seekh Kebab',       bn: 'সিখ কাবাব',     urdu: 'سیخ کباب',       price: '380', tag: 'charcoal',    desc: 'Spiced mince threaded on skewers, charcoal-grilled over open flame for a true smoky edge.',    tint: 'radial-gradient(circle at 50% 55%, #A87521 0%, #5C3914 55%, #2A180E 100%)', accent: '#D4A843', motif: 'skewer' },
  { id: 'shami',   section: 'main', name: 'Shami Kebab',       bn: 'শামি কাবাব',    urdu: 'شامی کباب',      price: '340',                       desc: 'Slow-cooked mince and lentils, fresh-ground spice, pan-fried to a crisp shell.',                tint: 'radial-gradient(circle at 60% 40%, #8B5E1A 0%, #4A2F10 55%, #241408 100%)', accent: '#C89553', motif: 'tawa' },
  { id: 'karahi',  section: 'main', name: 'Peshawari Karahi',  bn: 'পেশোয়ারি কড়াই', urdu: 'پشاوری کڑاہی',   price: '580', tag: 'bold',         desc: 'Wok-seared meat, ripe tomatoes, green chillies, and a secret Peshawari spice blend.',          tint: 'radial-gradient(circle at 55% 45%, #E85D3A 0%, #7A3A1F 55%, #2E1810 100%)', accent: '#F08858', motif: 'karahi' },
  { id: 'namkeen', section: 'main', name: 'Namkeen Gosht',     bn: 'নমকিন গোশত',   urdu: 'نمکین گوشت',     price: '650', tag: 'heritage',     desc: 'Tender lamb, rock salt, minimal spice — the meat speaks for itself.',                          tint: 'radial-gradient(circle at 40% 50%, #D4A843 0%, #6B4110 55%, #2A180E 100%)', accent: '#F8B425', motif: 'salt' },
  { id: 'charsi',  section: 'main', name: 'Charsi Tikka',      bn: 'চারসি তিক্কা',  urdu: 'چرسی تکہ',       price: '520',                       desc: 'Legendary Khyber-style tikka, slow-marinated, grilled over mesquite and charcoal.',            tint: 'radial-gradient(circle at 45% 60%, #B85A28 0%, #5C2D12 55%, #2A160C 100%)', accent: '#DD7A3F', motif: 'flame' },
  { id: 'kabuli',  section: 'main', name: 'Kabuli Pulao',      bn: 'কাবুলি পোলাও',  urdu: 'کابلی پلاؤ',      price: '480', tag: 'signature',   desc: 'Long-grain basmati slow-cooked in bone broth with caramelised carrot, raisin, and lamb shank.', tint: 'radial-gradient(circle at 50% 40%, #C89553 0%, #6B4418 55%, #2A180E 100%)', accent: '#E8C872', motif: 'rice' },
  { id: 'biryani', section: 'main', name: 'Peshawari Biryani', bn: 'পেশোয়ারি বিরিয়ানি', urdu: 'پشاوری بریانی', price: '450',                  desc: 'Dum-cooked rice layered with saffron, yoghurt-marinated meat, and whole warming spices.',       tint: 'radial-gradient(circle at 55% 55%, #D4923A 0%, #70400F 55%, #2A180E 100%)', accent: '#E8B856', motif: 'cardamom' },
  { id: 'naan',    section: 'side', name: 'Peshawari Naan',    bn: 'পেশোয়ারি নান', urdu: 'پشاوری نان',     price: '80',                        desc: 'Hand-stretched, tandoor-baked, brushed with ghee and dusted with nigella seed.',                tint: 'radial-gradient(circle at 50% 50%, #C89553 0%, #7A5018 55%, #2E1C0E 100%)', accent: '#E0B670', motif: 'naan' },
  { id: 'lachha',  section: 'side', name: 'Lachha Paratha',    bn: 'লাচ্ছা পরোটা',  urdu: 'لچھا پراٹھا',    price: '90',                        desc: 'Flaky, buttery layers — torn, not cut — served piping hot.',                                  tint: 'radial-gradient(circle at 50% 50%, #A87521 0%, #5C3914 55%, #241408 100%)', accent: '#D4A843', motif: 'lachha' },
]

type Filter = 'all' | 'main' | 'side' | 'signature'

const FILTERS: { id: Filter; label: string; ur: string }[] = [
  { id: 'all',       label: 'All',        ur: 'سب' },
  { id: 'main',      label: 'Mains',      ur: 'اصل' },
  { id: 'side',      label: 'Breads',     ur: 'روٹی' },
  { id: 'signature', label: 'Signatures', ur: 'خاص' },
]

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [activeId, setActiveId] = useState<string>(DISHES[0].id)
  const [filter, setFilter] = useState<Filter>('all')
  const previewRef = useRef<HTMLDivElement>(null)
  const previewState = useRef({ x: 0, y: 0, tx: 0, ty: 0, visible: false })

  const visibleDishes = DISHES.filter(d => {
    if (filter === 'all') return true
    if (filter === 'signature') return d.tag === 'signature' || d.tag === "chef's pick" || d.tag === 'heritage'
    return d.section === filter
  })

  const featured = DISHES.find(d => d.id === activeId) ?? DISHES[0]

  // ── Eye-line tracking for sticky panel
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const rows = Array.from(list.querySelectorAll<HTMLLIElement>('li[data-dish-id]'))

    const pickClosest = () => {
      const viewportCenter = window.innerHeight / 2
      let closestId = visibleDishes[0]?.id ?? DISHES[0].id
      let closestDist = Infinity
      rows.forEach(row => {
        const rect = row.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - viewportCenter)
        if (dist < closestDist) {
          closestDist = dist
          closestId = row.dataset.dishId ?? closestId
        }
      })
      setActiveId(prev => (prev === closestId ? prev : closestId))
    }

    const io = new IntersectionObserver(pickClosest, {
      rootMargin: '-30% 0% -30% 0%',
      threshold: [0, 0.5, 1],
    })
    rows.forEach(r => io.observe(r))
    const onScroll = () => pickClosest()
    window.addEventListener('scroll', onScroll, { passive: true })
    pickClosest()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [filter, visibleDishes])

  // ── Cursor-following preview card (desktop only)
  useEffect(() => {
    const preview = previewRef.current
    if (!preview) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      previewState.current.tx = e.clientX
      previewState.current.ty = e.clientY
    }
    const tick = () => {
      const s = previewState.current
      s.x += (s.tx - s.x) * 0.18
      s.y += (s.ty - s.y) * 0.18
      preview.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const showPreview = (id: string) => {
    setActiveId(id)
    if (!previewRef.current) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    previewRef.current.dataset.visible = 'true'
    previewState.current.visible = true
  }
  const hidePreview = () => {
    if (!previewRef.current) return
    previewRef.current.dataset.visible = 'false'
    previewState.current.visible = false
  }

  // ── Entrance animations
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.menu-row').forEach(row => {
        gsap.from(row, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 92%', toggleActions: 'play none none reverse' },
        })
      })
    },
    { scope: sectionRef, dependencies: [filter] }
  )

  return (
    <section id="menu" ref={sectionRef} className="py-24 md:py-36 relative z-10">
      {/* Floating cursor preview */}
      <div
        ref={previewRef}
        data-visible="false"
        className="pwr-menu-preview pointer-events-none fixed top-0 left-0 z-30 hidden lg:block"
        aria-hidden
      >
        <div
          className="relative"
          style={{
            width: '260px',
            height: '320px',
            background: featured.tint,
            border: '1px solid rgba(248,180,37,0.2)',
            transition: 'background 450ms ease',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <IngredientArt motif={featured.motif} accent={featured.accent} compact />
          </div>
          <div className="absolute top-3 left-3 font-sans text-gold-400/80 text-[0.6rem]" style={{ letterSpacing: '0.25em' }}>
            N° {String(DISHES.indexOf(featured) + 1).padStart(2, '0')}
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="font-display italic text-cream text-lg" style={{ letterSpacing: '-0.01em', lineHeight: 1.05 }}>
              {featured.name}
            </p>
            <p className="font-sans text-gold-300/85 text-[0.7rem] mt-1" style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              ৳ {featured.price}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 md:px-12">

        {/* Eyebrow trio */}
        <div className="mb-3 reveal">
          <p className="eyebrow-rule font-sans text-gold-400/90 text-[0.92rem]" style={{ fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            From Our Kitchen
          </p>
        </div>

        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12 pb-8 border-b border-gold-700/25 mb-10">
          <h2
            className="font-display italic text-cream"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
            }}
          >
            The Menu
            <span className="block font-urdu text-gold-400/55 mt-3" style={{ fontSize: '0.32em', direction: 'rtl', lineHeight: 1.2 }}>
              مینیو
            </span>
          </h2>

          <div className="flex flex-col items-end gap-1">
            <p
              className="font-sans text-gold-500/70 text-[0.78rem]"
              style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}
            >
              {String(visibleDishes.length).padStart(2, '0')} / {String(DISHES.length).padStart(2, '0')} Dishes
            </p>
            <p className="font-urdu text-gold-400/55 text-[0.78rem]" dir="rtl">
              منتخب
            </p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2.5 mb-14">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              data-active={filter === f.id}
              data-cursor={f.label}
              className="chip-magnet"
            >
              <span>{f.label}</span>
              <span className="font-urdu opacity-70 normal-case" dir="rtl" style={{ letterSpacing: '0.04em', fontSize: '0.85em' }}>
                {f.ur}
              </span>
            </button>
          ))}
        </div>

        {/* Editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Sticky featured panel */}
          <aside className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4 / 5',
                  maxHeight: 'calc(100vh - 14rem)',
                  background: featured.tint,
                  borderTop: '1px solid rgba(196,145,42,0.25)',
                  borderBottom: '1px solid rgba(196,145,42,0.25)',
                  transition: 'background 600ms ease',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <IngredientArt motif={featured.motif} accent={featured.accent} />
                </div>

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(18,11,7,0.55) 100%)' }}
                />

                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                  <div>
                    <p className="font-sans text-gold-400/80 text-[0.7rem]" style={{ letterSpacing: '0.28em' }}>
                      N° {String(DISHES.indexOf(featured) + 1).padStart(2, '0')} / {String(DISHES.length).padStart(2, '0')}
                    </p>
                    <p className="font-sans text-gold-500/55 text-[0.65rem] mt-1" style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                      {featured.section === 'main' ? 'Main Course' : 'Bread / Side'}
                    </p>
                  </div>
                  {featured.tag && (
                    <span
                      className="font-sans text-[0.62rem] px-2.5 py-1 rounded-full border border-gold-500/40 text-gold-300/90"
                      style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                    >
                      {featured.tag}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="font-display italic text-cream" style={{ fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      {featured.name}
                    </p>
                    <p className="font-urdu text-gold-300/80 text-base mt-1" dir="rtl">
                      {featured.urdu}
                    </p>
                  </div>
                  <p
                    className="font-display italic text-[#F8B425]"
                    style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}
                  >
                    ৳{featured.price}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="font-sans text-gold-500/55 text-[0.7rem]" style={{ letterSpacing: '0.28em' }}>
                  NOW SHOWING
                </span>
                <span className="flex-1 h-px bg-gold-700/35" />
                <span className="font-urdu text-gold-400/70 text-base" dir="rtl">
                  {featured.urdu}
                </span>
              </div>
            </div>
          </aside>

          {/* Dish list */}
          <div className="lg:col-span-7">
            <ul ref={listRef}>
              {visibleDishes.map((d, i) => {
                const isActive = d.id === activeId
                return (
                  <li
                    key={d.id}
                    data-dish-id={d.id}
                    data-cursor="View"
                    onMouseEnter={() => showPreview(d.id)}
                    onMouseLeave={hidePreview}
                    onTouchStart={() => setActiveId(d.id)}
                    className="menu-row group relative py-7 md:py-8 border-b border-gold-700/15 cursor-pointer"
                  >
                    {/* Big italic index — left of row, scroll-triggered */}
                    <span
                      className={`hidden md:block absolute -left-12 top-7 font-display italic transition-colors duration-500 ${
                        isActive ? 'text-[#F8B425]' : 'text-gold-700/50'
                      }`}
                      style={{ fontSize: '1.3rem', letterSpacing: '-0.02em' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Mobile-only inline art */}
                    <div
                      className="lg:hidden w-full mb-4 overflow-hidden relative"
                      style={{ aspectRatio: '16 / 9', background: d.tint }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IngredientArt motif={d.motif} accent={d.accent} compact />
                      </div>
                    </div>

                    {/* Title row */}
                    <div className="flex items-baseline gap-4">
                      <h3
                        className={`font-display italic transition-colors duration-300 ${
                          isActive ? 'text-[#F8B425]' : 'text-cream group-hover:text-gold-200'
                        }`}
                        style={{
                          fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
                          lineHeight: 1.05,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {d.name}
                      </h3>

                      <span
                        aria-hidden
                        className="flex-1 h-[1px] mb-2 transition-opacity duration-500"
                        style={{
                          background: 'repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 7px)',
                          color: isActive ? '#F8B425' : '#8B5E1A',
                          opacity: isActive ? 0.6 : 0.35,
                        }}
                      />

                      <span
                        className={`font-display italic whitespace-nowrap transition-colors duration-300 ${
                          isActive ? 'text-[#F8B425]' : 'text-gold-300'
                        }`}
                        style={{ fontSize: '1.25rem', letterSpacing: '-0.01em' }}
                      >
                        ৳{d.price}
                      </span>
                    </div>

                    {/* Urdu name */}
                    <div className="flex items-baseline gap-4 mt-1.5">
                      <span className="font-urdu text-gold-200/75 text-base" dir="rtl" style={{ unicodeBidi: 'isolate' }}>
                        {d.urdu}
                      </span>
                    </div>

                    <p className="font-body text-gold-200/75 mt-3 max-w-[52ch]" style={{ fontSize: '0.98rem', lineHeight: 1.55 }}>
                      {d.desc}
                    </p>

                    {d.tag && (
                      <span
                        className="inline-flex items-center gap-2 mt-3 font-sans text-[0.7rem] text-gold-500/85"
                        style={{ letterSpacing: '0.22em', textTransform: 'uppercase' }}
                      >
                        <span className="w-3 h-px bg-gold-500/85" />
                        {d.tag}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-14 flex flex-col md:flex-row md:justify-between gap-3 pt-6 border-t border-gold-700/15">
          <p className="font-sans text-[0.78rem] text-gold-500/55 max-w-[52ch]" style={{ letterSpacing: '0.04em' }}>
            All prices in BDT (৳). Service charge & VAT additional. Most dishes can be adjusted for dietary preferences.
          </p>
          <p className="font-urdu text-gold-500/45 text-[0.85rem]" dir="rtl" style={{ letterSpacing: '0.05em' }}>
            تمام قیمتیں بنگلہ دیشی ٹکا میں
          </p>
        </div>
      </div>

      <style jsx>{`
        .pwr-menu-preview {
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }
        .pwr-menu-preview[data-visible='true'] {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}

/* ─── Procedural ingredient art per dish ───────────── */
/** Deterministic seeded PRNG so server & client render identical SVGs (no hydration drift). */
function makeRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}
function motifSeed(motif: Motif) {
  let h = 0
  for (let i = 0; i < motif.length; i++) h = ((h << 5) - h + motif.charCodeAt(i)) | 0
  return Math.abs(h) || 1
}

/** Round to 2dp so floats serialize identically on server & client (no hydration drift). */
const f = (v: number) => Math.round(v * 100) / 100

function IngredientArt({ motif, accent, compact = false }: { motif: Motif; accent: string; compact?: boolean }) {
  const size = compact ? 200 : 360
  const stroke = compact ? 1.2 : 1.5
  const dim = `${accent}55`
  const rng = makeRng(motifSeed(motif))

  switch (motif) {
    case 'pomegranate':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = (i / 28) * Math.PI * 2 + (i % 3)
            const radius = 40 + (i % 4) * 16
            const x = f(100 + Math.cos(angle) * radius)
            const y = f(100 + Math.sin(angle) * radius)
            const r = f(2.2 + (i % 3) * 1.4)
            return <circle key={i} cx={x} cy={y} r={r} fill={accent} opacity={f(0.5 + (i % 3) * 0.15)} />
          })}
          <circle cx={100} cy={100} r={6} fill={accent} opacity={0.9} />
        </svg>
      )

    case 'skewer':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          <line x1="20" y1="100" x2="180" y2="100" stroke={accent} strokeWidth={stroke} opacity={0.7} />
          {[60, 90, 120].map((cx, i) => (
            <ellipse key={i} cx={cx} cy={100} rx={16} ry={11} fill={dim} stroke={accent} strokeWidth={stroke} opacity={0.85} />
          ))}
          {/* smoke wisps */}
          {[40, 75, 110, 145].map((x, i) => (
            <path
              key={`s${i}`}
              d={`M ${x} 80 Q ${x + 4} 60, ${x - 2} 40 T ${x + 2} 10`}
              stroke={accent}
              strokeWidth={0.7}
              opacity={0.3}
              fill="none"
            />
          ))}
        </svg>
      )

    case 'tawa':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          {[80, 60, 40, 20].map((r, i) => (
            <circle
              key={i}
              cx={100}
              cy={100}
              r={r}
              stroke={accent}
              strokeWidth={stroke}
              fill="none"
              opacity={0.2 + i * 0.18}
              strokeDasharray={i === 0 ? '4 4' : undefined}
            />
          ))}
          <circle cx={100} cy={100} r={6} fill={accent} />
        </svg>
      )

    case 'karahi':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          <path d="M 40 80 Q 100 180, 160 80" stroke={accent} strokeWidth={stroke * 1.5} fill={dim} opacity={0.85} />
          <line x1="20" y1="80" x2="40" y2="80" stroke={accent} strokeWidth={stroke} />
          <line x1="180" y1="80" x2="160" y2="80" stroke={accent} strokeWidth={stroke} />
          {/* steam */}
          {[70, 100, 130].map((x, i) => (
            <path
              key={i}
              d={`M ${x} 70 Q ${x + 8} 50, ${x - 4} 30 T ${x + 6} 5`}
              stroke={accent}
              strokeWidth={0.8}
              opacity={0.45}
              fill="none"
            />
          ))}
          {/* chillis */}
          <ellipse cx={75} cy={95} rx={3.5} ry={1.5} fill="#7AB04A" opacity={0.7} transform="rotate(20 75 95)" />
          <ellipse cx={125} cy={100} rx={3.5} ry={1.5} fill="#7AB04A" opacity={0.7} transform="rotate(-30 125 100)" />
        </svg>
      )

    case 'salt':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          {Array.from({ length: 50 }).map((_, i) => {
            const x = f(30 + rng() * 140)
            const y = f(30 + rng() * 140)
            const r = f(0.8 + rng() * 1.6)
            return <circle key={i} cx={x} cy={y} r={r} fill={accent} opacity={f(0.4 + rng() * 0.5)} />
          })}
          <circle cx={100} cy={100} r={48} stroke={accent} strokeWidth={stroke} opacity={0.45} fill="none" strokeDasharray="2 6" />
        </svg>
      )

    case 'flame':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          {[0.2, 0.4, 0.6, 0.85].map((o, i) => (
            <path
              key={i}
              d={`M 100 ${160 - i * 8}
                  Q ${85 - i * 4} ${130 - i * 14}, 100 ${100 - i * 18}
                  Q ${115 + i * 4} ${130 - i * 14}, 100 ${160 - i * 8} Z`}
              fill={accent}
              opacity={o * 0.4}
            />
          ))}
          {/* embers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const x = f(70 + rng() * 60)
            const y = f(40 + rng() * 50)
            return <circle key={i} cx={x} cy={y} r={1.2} fill={accent} opacity={f(0.6 + rng() * 0.4)} />
          })}
        </svg>
      )

    case 'rice':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          {Array.from({ length: 60 }).map((_, i) => {
            const x = f(30 + rng() * 140)
            const y = f(30 + rng() * 140)
            const angle = f(rng() * 360)
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx={4}
                ry={1.4}
                fill={accent}
                opacity={f(0.55 + rng() * 0.35)}
                transform={`rotate(${angle} ${x} ${y})`}
              />
            )
          })}
          {/* raisins */}
          {Array.from({ length: 6 }).map((_, i) => {
            const x = f(50 + rng() * 100)
            const y = f(50 + rng() * 100)
            return <circle key={`r${i}`} cx={x} cy={y} r={3} fill="#5C2D12" opacity={0.85} />
          })}
        </svg>
      )

    case 'cardamom':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const x = f(100 + Math.cos(angle) * 55)
            const y = f(100 + Math.sin(angle) * 55)
            const rot = f((angle * 180) / Math.PI + 90)
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
                <ellipse cx={0} cy={0} rx={6} ry={11} stroke={accent} strokeWidth={stroke} fill={dim} opacity={0.85} />
                <line x1="0" y1="-11" x2="0" y2="-18" stroke={accent} strokeWidth={stroke} opacity={0.7} />
              </g>
            )
          })}
          {/* center star */}
          <g transform="translate(100 100)">
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={f(Math.cos((i / 8) * Math.PI * 2) * 18)}
                y2={f(Math.sin((i / 8) * Math.PI * 2) * 18)}
                stroke={accent}
                strokeWidth={stroke}
                opacity={0.55}
              />
            ))}
          </g>
        </svg>
      )

    case 'naan':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          <ellipse cx={100} cy={100} rx={75} ry={50} stroke={accent} strokeWidth={stroke * 1.5} fill={dim} opacity={0.75} />
          <ellipse cx={100} cy={100} rx={60} ry={38} stroke={accent} strokeWidth={stroke * 0.7} fill="none" opacity={0.55} />
          {Array.from({ length: 22 }).map((_, i) => {
            const angle = rng() * Math.PI * 2
            const r = rng() * 55
            const x = f(100 + Math.cos(angle) * r)
            const y = f(100 + Math.sin(angle) * (r * 0.65))
            return <circle key={i} cx={x} cy={y} r={1.2} fill="#1A100A" opacity={0.7} />
          })}
        </svg>
      )

    case 'lachha':
      return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
          {Array.from({ length: 28 }).map((_, i) => {
            const r = 8 + i * 2.4
            return (
              <circle
                key={i}
                cx={100}
                cy={100}
                r={r}
                stroke={accent}
                strokeWidth={stroke * 0.5}
                fill="none"
                opacity={0.18 + (i % 3) * 0.18}
                strokeDasharray={`${i + 4} ${i * 2 + 8}`}
              />
            )
          })}
          <circle cx={100} cy={100} r={4} fill={accent} />
        </svg>
      )

    default:
      return null
  }
}
