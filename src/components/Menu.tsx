'use client'

import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

type Section = 'main' | 'side'

type Dish = {
  id: string
  section: Section
  name: string
  urdu: string
  price: string
  tag?: string
  desc: string
  tint: string
}

const DISHES: Dish[] = [
  { id: 'chapli',   section: 'main', name: 'Chapli Kebab',      urdu: 'چپلی کباب',      price: '420', tag: "Chef's pick",     desc: 'Hand-minced beef, pomegranate seeds, fresh herbs — seared on a traditional iron tawa.',         tint: 'radial-gradient(circle at 30% 30%, #C15A36 0%, #6B2F18 55%, #2E1810 100%)' },
  { id: 'seekh',    section: 'main', name: 'Seekh Kebab',       urdu: 'سیخ کباب',       price: '380', tag: 'Charcoal grilled', desc: 'Spiced mince threaded on skewers, charcoal-grilled over open flame for a true smoky edge.',    tint: 'radial-gradient(circle at 50% 55%, #A87521 0%, #5C3914 55%, #2A180E 100%)' },
  { id: 'shami',    section: 'main', name: 'Shami Kebab',       urdu: 'شامی کباب',       price: '340',                          desc: 'Slow-cooked mince and lentils, fresh-ground spice, pan-fried to a crisp shell.',               tint: 'radial-gradient(circle at 60% 40%, #8B5E1A 0%, #4A2F10 55%, #241408 100%)' },
  { id: 'karahi',   section: 'main', name: 'Peshawari Karahi',  urdu: 'پشاوری کڑاہی',    price: '580', tag: 'Bold & robust',   desc: 'Wok-seared meat, ripe tomatoes, green chillies, and a secret Peshawari spice blend.',          tint: 'radial-gradient(circle at 55% 45%, #E85D3A 0%, #7A3A1F 55%, #2E1810 100%)' },
  { id: 'namkeen',  section: 'main', name: 'Namkeen Gosht',     urdu: 'نمکین گوشت',      price: '650', tag: 'Heritage',        desc: 'Tender lamb, rock salt, minimal spice — the meat speaks for itself.',                          tint: 'radial-gradient(circle at 40% 50%, #D4A843 0%, #6B4110 55%, #2A180E 100%)' },
  { id: 'charsi',   section: 'main', name: 'Charsi Tikka',      urdu: 'چرسی تکہ',        price: '520',                          desc: 'Legendary Khyber-style tikka, slow-marinated, grilled over mesquite and charcoal.',            tint: 'radial-gradient(circle at 45% 60%, #B85A28 0%, #5C2D12 55%, #2A160C 100%)' },
  { id: 'kabuli',   section: 'main', name: 'Kabuli Pulao',      urdu: 'کابلی پلاؤ',       price: '480', tag: 'Signature',       desc: 'Long-grain basmati slow-cooked in bone broth with caramelised carrot, raisin, and lamb shank.', tint: 'radial-gradient(circle at 50% 40%, #C89553 0%, #6B4418 55%, #2A180E 100%)' },
  { id: 'biryani',  section: 'main', name: 'Peshawari Biryani', urdu: 'پشاوری بریانی',   price: '450',                          desc: 'Dum-cooked rice layered with saffron, yoghurt-marinated meat, and whole warming spices.',       tint: 'radial-gradient(circle at 55% 55%, #D4923A 0%, #70400F 55%, #2A180E 100%)' },

  { id: 'naan',     section: 'side', name: 'Peshawari Naan',    urdu: 'پشاوری نان',      price: '80',                           desc: 'Hand-stretched, tandoor-baked, brushed with ghee and dusted with nigella seed.',              tint: 'radial-gradient(circle at 50% 50%, #C89553 0%, #7A5018 55%, #2E1C0E 100%)' },
  { id: 'lachha',   section: 'side', name: 'Lachha Paratha',    urdu: 'لچھا پراٹھا',     price: '90',                           desc: 'Flaky, buttery layers — torn, not cut — served piping hot.',                                  tint: 'radial-gradient(circle at 50% 50%, #A87521 0%, #5C3914 55%, #241408 100%)' },
]

export default function Menu() {
  const sectionRef = useReveal<HTMLDivElement>()
  const listRef = useRef<HTMLUListElement>(null)
  const [activeId, setActiveId] = useState<string>(DISHES[0].id)

  const featured = DISHES.find(d => d.id === activeId) ?? DISHES[0]
  const firstSideIndex = DISHES.findIndex(d => d.section === 'side')

  /* ── Track which dish is closest to the reader's eye line ─────
     IntersectionObserver with a 35%/35% rootMargin treats the
     middle third of the viewport as the "read zone". The row whose
     center sits closest to viewport center wins. No transforms,
     no pinning — the page just scrolls naturally. */
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const rows = Array.from(list.querySelectorAll<HTMLLIElement>('li[data-dish-id]'))

    const pickClosest = () => {
      const viewportCenter = window.innerHeight / 2
      let closestId = DISHES[0].id
      let closestDist = Infinity
      rows.forEach(row => {
        const rect = row.getBoundingClientRect()
        // Only consider rows actually on-screen
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

    // Also re-pick on scroll for smooth updates between observer fires
    const onScroll = () => pickClosest()
    window.addEventListener('scroll', onScroll, { passive: true })
    pickClosest()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section id="menu" className="py-24 md:py-36 relative z-10">
      <div ref={sectionRef} className="max-w-container mx-auto px-6 md:px-12">

        {/* Eyebrow */}
        <div className="mb-3 reveal">
          <p className="eyebrow-rule font-sans text-gold-400/90 text-[0.95rem]" style={{ fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            From Our Kitchen
          </p>
        </div>

        {/* Title + meta row */}
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12 pb-8 border-b border-gold-700/25 mb-12">
          <h2
            className="font-display italic text-cream"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            The Menu
            <span className="block font-urdu text-gold-400/60 mt-3" style={{ fontSize: '0.35em', direction: 'rtl', lineHeight: 1.2 }}>
              مینیو
            </span>
          </h2>

          <p
            className="font-sans text-gold-500/70 text-[0.78rem] pb-2"
            style={{ letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            {String(DISHES.length).padStart(2, '0')} Selections
          </p>
        </div>

        {/* ─── Editorial split: sticky featured panel + flowing list ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Sticky featured panel — stays put as the list scrolls past */}
          <aside className="hidden lg:block lg:col-span-6">
            <div className="sticky top-28">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4 / 5',
                  maxHeight: 'calc(100vh - 14rem)',
                  background: featured.tint,
                  borderTop:    '1px solid rgba(196,145,42,0.25)',
                  borderBottom: '1px solid rgba(196,145,42,0.25)',
                  transition: 'background 450ms ease',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-logo text-[#F8B425]/15 select-none"
                    style={{ fontSize: 'clamp(8rem, 16vw, 14rem)', letterSpacing: '0.08em', lineHeight: 1 }}
                  >
                    P
                  </span>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(18,11,7,0.55) 100%)' }}
                />
                <div className="absolute top-4 left-4 font-sans text-gold-400/75 text-[0.75rem]" style={{ letterSpacing: '0.2em' }}>
                  N° {String(DISHES.indexOf(featured) + 1).padStart(2, '0')} / {String(DISHES.length).padStart(2, '0')}
                </div>
                <div className="absolute top-4 right-4 font-sans text-gold-400/75 text-[0.7rem]" style={{ letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                  {featured.section === 'main' ? 'Main' : 'Side'}
                </div>
              </div>

              <div className="mt-5">
                <p className="font-sans text-gold-500/60 text-[0.72rem] mb-1" style={{ letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  Now Showing
                </p>
                <h3 className="font-display italic text-cream" style={{ fontSize: '1.8rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {featured.name}
                </h3>
                <p className="font-urdu text-gold-400/70 text-lg mt-1" style={{ direction: 'rtl', textAlign: 'left', unicodeBidi: 'isolate' }}>
                  {featured.urdu}
                </p>
              </div>

            </div>
          </aside>

          {/* Dish list — flows naturally, page scroll handles everything */}
          <div className="lg:col-span-6">
            <ul ref={listRef}>
              {DISHES.map((d, i) => {
                const isActive = d.id === activeId
                const showSectionBreak = i === firstSideIndex && firstSideIndex > 0
                return (
                  <li
                    key={d.id}
                    data-dish-id={d.id}
                    onMouseEnter={() => setActiveId(d.id)}
                    className="relative py-6 md:py-7 border-b border-gold-700/15"
                  >
                    {showSectionBreak && (
                      <div className="-mt-6 mb-8 pt-0 flex items-center gap-6">
                        <span className="h-px flex-1 bg-gold-700/25" />
                        <span
                          className="font-sans text-gold-400/80 text-[0.72rem]"
                          style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}
                        >
                          Breads & Accompaniments
                        </span>
                        <span className="h-px flex-1 bg-gold-700/25" />
                      </div>
                    )}

                    <span
                      className={`hidden md:block absolute -left-10 top-7 font-sans text-[0.72rem] transition-colors duration-300 ${
                        isActive ? 'text-gold-400' : 'text-gold-600/60'
                      }`}
                      style={{ letterSpacing: '0.18em' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Mobile-only inline placeholder */}
                    <div
                      className="lg:hidden w-full mb-4 overflow-hidden"
                      style={{ aspectRatio: '16 / 9', background: d.tint }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-logo text-[#F8B425]/15" style={{ fontSize: '5rem', letterSpacing: '0.08em' }}>P</span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-4">
                      <h3
                        className={`font-display italic transition-colors duration-300 ${
                          isActive ? 'text-[#F8B425]' : 'text-cream'
                        }`}
                        style={{
                          fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)',
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {d.name}
                      </h3>

                      <span
                        aria-hidden
                        className="flex-1 h-[1px] mb-2 opacity-40"
                        style={{
                          background: 'repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 7px)',
                          color: '#8B5E1A',
                        }}
                      />

                      <span
                        className="font-sans text-gold-300 whitespace-nowrap"
                        style={{ fontSize: '1.05rem', fontWeight: 500, letterSpacing: '0.02em' }}
                      >
                        ৳ {d.price}
                      </span>
                    </div>

                    <p className="font-urdu text-gold-400/70 mt-1" style={{ direction: 'rtl', fontSize: '1rem', lineHeight: 1.4 }}>
                      {d.urdu}
                    </p>

                    <p className="font-body text-gold-200/75 mt-2.5 max-w-[52ch]" style={{ fontSize: '0.98rem', lineHeight: 1.55 }}>
                      {d.desc}
                    </p>

                    {d.tag && (
                      <span
                        className="inline-block mt-3 font-sans text-[0.72rem] text-gold-500/85"
                        style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                      >
                        · {d.tag}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Footnote — flows after the grid, can never overlap */}
        <p className="mt-10 font-sans text-[0.78rem] text-gold-500/55 max-w-[52ch]" style={{ letterSpacing: '0.08em' }}>
          All prices in BDT (৳). Service charge and VAT additional. Please inform us of dietary
          preferences — most dishes can be adjusted.
        </p>
      </div>
    </section>
  )
}
