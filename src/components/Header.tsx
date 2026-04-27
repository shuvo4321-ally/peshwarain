'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#menu', label: 'মেনু', en: 'Menu' },
  { href: '#story', label: 'গল্প', en: 'Story' },
  { href: '#gallery', label: 'গ্যালারি', en: 'Gallery' },
  { href: '#reservation', label: 'বুকিং', en: 'Reserve' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#120B07]/95 backdrop-blur-md'
          : 'bg-gradient-to-b from-[#120B07]/80 via-[#120B07]/35 to-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-6 md:px-12 h-[80px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          aria-label="Peshwarain"
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
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-hidayatullah text-gold-200/70 text-lg hover:text-gold-300 transition-colors duration-300 relative group"
              style={{ fontWeight: 400, letterSpacing: '0.04em' }}
            >
              {link.en}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300"
              />
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
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
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(18,11,7,0.96)', backdropFilter: 'blur(16px)' }}
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
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom border line */}
      <div
        className={`h-[1px] w-full transition-opacity duration-500 ${
          scrolled ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent, #C4912A 30%, #E8C872 50%, #C4912A 70%, transparent)',
        }}
      />
    </header>
  )
}
