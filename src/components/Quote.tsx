'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { splitText } from '@/hooks/useSplitText'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Quote() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Split each language line into words
      const targets = ['.qt-en', '.qt-bn', '.qt-ur']
      const wordSets: HTMLElement[][] = []

      targets.forEach(sel => {
        const el = sectionRef.current?.querySelector<HTMLElement>(sel)
        if (!el) return
        const { words } = splitText(el, { chars: false, words: true })
        wordSets.push(words)
        gsap.set(words, { opacity: 0.08, y: 12, filter: 'blur(2px)' })
      })

      if (reduced) {
        wordSets.flat().forEach(w => {
          gsap.set(w, { opacity: 1, y: 0, filter: 'blur(0px)' })
        })
        return
      }

      // Sequential word reveal driven by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.8,
        },
      })

      wordSets.forEach((set, langIdx) => {
        if (!set.length) return
        tl.to(set, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: { amount: 0.9, from: 'start' },
          ease: 'power2.out',
        }, langIdx === 0 ? 0 : '-=0.3')
      })

      // Ember glow pulse driven by scroll velocity
      const glow = sectionRef.current?.querySelector<HTMLElement>('.qt-glow')
      if (glow) {
        gsap.to(glow, {
          scale: 1.25,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }

      // Ornament rule scaleX
      gsap.from('.qt-rule', {
        scaleX: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.qt-cite', {
        opacity: 0,
        y: 14,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 relative overflow-hidden z-10"
    >
      {/* Ember glow */}
      <div
        aria-hidden
        className="qt-glow absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          width: '70vw',
          height: '70vw',
          maxWidth: '900px',
          maxHeight: '900px',
          background:
            'radial-gradient(circle, rgba(248,180,37,0.18) 0%, rgba(193,90,54,0.10) 35%, transparent 70%)',
          opacity: 0.4,
          filter: 'blur(40px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Decorative urdu watermark behind quote */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none font-urdu text-[#F8B425]/[0.04]"
        style={{
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(10rem, 22vw, 22rem)',
          direction: 'rtl',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        آگ
      </div>

      <div className="max-w-3xl mx-auto px-8 text-center relative z-10">

        {/* Top rule */}
        <div className="qt-rule mx-auto mb-10 origin-center" style={{ width: '120px' }}>
          <div className="ornament-line">
            <span className="ornament-diamond" />
          </div>
        </div>

        <blockquote>
          {/* Opening quote glyph */}
          <span
            aria-hidden
            className="block font-display text-[#F8B425]/40 mx-auto mb-2"
            style={{ fontSize: '3.5rem', lineHeight: 0.5 }}
          >
            “
          </span>

          {/* English */}
          <p
            className="qt-en font-display italic text-cream letterpress"
            style={{
              fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
            }}
          >
            Food is the language of love, and in Peshawar, we speak it in fire.
          </p>

          {/* Bengali */}
          <p
            className="qt-bn font-bangla text-gold-200/85 mt-8 letterpress"
            style={{
              fontSize: 'clamp(1.15rem, 1.9vw, 1.55rem)',
              lineHeight: 1.7,
            }}
          >
            খাবার হলো ভালোবাসার ভাষা — পেশোয়ারে আমরা তা আগুনে বলি।
          </p>

          {/* Urdu */}
          <p
            className="qt-ur font-urdu text-gold-400/75 mt-6"
            dir="rtl"
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
              lineHeight: 2.1,
              letterSpacing: '0.02em',
            }}
          >
            کھانا محبت کی زبان ہے، اور پشاور میں ہم اسے آگ سے بولتے ہیں۔
          </p>

          <cite className="qt-cite block mt-12 not-italic">
            <span className="ornament-line max-w-[280px] mx-auto">
              <span className="ornament-diamond" />
            </span>
            <span className="block font-sans text-gold-500/85 text-[0.78rem] mt-4" style={{ letterSpacing: '0.32em', textTransform: 'uppercase' }}>
              The House of Peshwarain
            </span>
            <span className="block font-bangla text-gold-400/55 text-[0.78rem] mt-1">
              পেশোয়ারাইন
            </span>
          </cite>
        </blockquote>
      </div>
    </section>
  )
}
