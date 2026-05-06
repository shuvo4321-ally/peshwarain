'use client'

import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { href: '#menu',        id: 'menu',        label: 'মেনু',     en: 'Menu',     urdu: 'مینیو' },
  { href: '#story',       id: 'story',       label: 'গল্প',     en: 'Story',    urdu: 'قصہ' },
  { href: '#reservation', id: 'reservation', label: 'বুকিং',    en: 'Reserve',  urdu: 'بکنگ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string>('home')
  const progressRef = useRef<HTMLDivElement>(null)

  // Scroll-driven state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // progress bar
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? (window.scrollY / max) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`
      }

      // active section
      const sections = ['home', ...NAV_LINKS.map(n => n.id)]
      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= 120 && r.bottom >= 120) {
          current = id
          break
        }
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0604]/85 backdrop-blur-md border-b border-gold-700/15'
          : 'bg-gradient-to-b from-[#120B07]/70 via-[#120B07]/30 to-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-6 md:px-12 h-[80px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          aria-label="Peshwarain"
          data-cursor="Home"
          className="relative inline-flex flex-col items-start select-none"
        >
          <span
            className="font-logo text-[#F8B425] relative inline-block"
            style={{
              fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)',
              letterSpacing: '0.06em',
              lineHeight: 1.1,
              paddingBottom: '6px',
              transform: 'scaleY(1.25)',
              transformOrigin: 'bottom left',
            }}
          >
            PESHWARAIN
            <span
              aria-hidden
              className="absolute left-0 right-0 bottom-0 h-[2px]"
              style={{ background: '#F8B425', opacity: 0.9 }}
            />
          </span>
          <span
            className="font-urdu text-[#9A7640] self-end mt-1"
            style={{ fontSize: '0.7rem', direction: 'rtl', lineHeight: 1 }}
          >
            پشوارین
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = active === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                data-cursor={link.en}
                className="relative group px-4 py-2 transition-colors duration-300"
                style={{ color: isActive ? '#F8B425' : 'rgba(245,237,216,0.7)' }}
              >
                <span
                  className="font-hidayatullah text-lg"
                  style={{ fontWeight: 400, letterSpacing: '0.04em' }}
                >
                  {link.en}
                </span>
                <span
                  className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-px transition-all duration-400"
                  style={{
                    width: isActive ? '70%' : '0%',
                    background: '#F8B425',
                  }}
                />
                {/* Hover Bengali tooltip */}
                <span
                  className="font-bangla absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[0.65rem] text-gold-400/0 group-hover:text-gold-400/80 transition-colors duration-300"
                  aria-hidden
                >
                  {link.label}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          data-cursor="Menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-gold-400 transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-gold-400 transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-gold-400 transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(10,6,4,0.96)', backdropFilter: 'blur(16px)' }}
      >
        <nav className="flex flex-col px-6 py-3">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-3 font-hidayatullah text-gold-200/80 text-xl py-3.5 border-b border-gold-800/15 hover:text-gold-300 transition-colors duration-300"
            >
              {link.en}
              <span className="font-bangla text-gold-500/40 text-sm">{link.label}</span>
              <span className="ml-auto font-urdu text-gold-500/35 text-sm" dir="rtl">{link.urdu}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Scroll progress bar — replaces the static gold rule */}
      <div className="relative h-px w-full overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${scrolled ? 'opacity-25' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(196,145,42,0.5), transparent)',
          }}
        />
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 right-0 origin-left transition-transform duration-100"
          style={{
            background: 'linear-gradient(90deg, #C4912A 0%, #F8B425 50%, #C4912A 100%)',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </header>
  )
}
