'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Hero() {
  const [backToTop, setBackToTop] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, delay: 0.3 })
        .fromTo('.hero-headline-bn', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, '-=0.3')
        .fromTo('.hero-subtitle-bn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.35')
        .fromTo('.hero-urdu-line', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.25')
    },
    { scope: heroRef }
  )

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen min-h-[640px] overflow-hidden"
      >
        {/* Video background */}
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Vignette overlay — darker edges, lighter center-top so video breathes */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, #120B07 0%, rgba(18,11,7,0.65) 35%, rgba(18,11,7,0.25) 60%, rgba(18,11,7,0.2) 100%),
              radial-gradient(ellipse at center 40%, transparent 0%, rgba(18,11,7,0.25) 100%)
            `,
          }}
        />

        {/* ── Centered content — fills the whole viewport evenly ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-3xl">

            {/* Gold divider */}
            <div
              className="hero-divider mx-auto w-20 h-[2px] mb-8 opacity-0"
              style={{
                background: 'linear-gradient(90deg, transparent, #F8B425, transparent)',
              }}
            />

            {/* Headline */}
            <h1
              className="hero-headline-bn font-bangla text-cream drop-shadow-xl opacity-0"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                lineHeight: 1.15,
                letterSpacing: '0.01em',
              }}
            >
              <span className="text-[#F8B425]">নিহারী</span>{' '}
              থেকে{' '}
              <span className="text-[#F8B425]">কাবাব</span>
              <br className="hidden sm:block" />
              স্বাদে{' '}
              <span className="text-[#F8B425]">আমরাই</span>{' '}
              নবাব!
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtitle-bn font-banglaDisplay text-gold-200/90 mt-6 drop-shadow-lg opacity-0"
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
                lineHeight: 1.6,
              }}
            >
              পেশোয়ারের স্বাদ, এখন ঢাকায়
            </p>

            {/* Urdu */}
            <div className="hero-urdu-line mt-2 opacity-0" dir="rtl" lang="ur">
              <p
                className="font-urdu text-gold-400/60 drop-shadow-md"
                style={{
                  fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
                  lineHeight: 1.8,
                  unicodeBidi: 'isolate',
                }}
              >
                پشاور کا ذائقہ، اب ڈھاکہ میں
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-10"
          style={{ background: 'linear-gradient(to top, #120B07, transparent)' }}
        />
      </section>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-7 right-7 z-40 w-11 h-11 rounded-full border border-gold-700 bg-[#120B07]/90 text-gold-400 flex items-center justify-center transition-all duration-400 hover:bg-gold-500 hover:text-brown-500 hover:border-gold-500 ${
          backToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="উপরে যান"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  )
}
