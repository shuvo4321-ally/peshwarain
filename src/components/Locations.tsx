'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

export default function Locations() {
  const sectionRef = useReveal<HTMLDivElement>()

  return (
    <section id="locations" className="py-24 md:py-36 relative z-10">
      <div ref={sectionRef} className="max-w-container mx-auto px-6 md:px-12">

        <div className="mb-12 reveal">
          <p className="eyebrow-rule font-sans text-gold-400/90 text-[0.95rem] mb-1" style={{ fontWeight: 500 }}>
            Find Us
          </p>
          <p className="font-bangla text-gold-300/75 text-sm mt-1 ml-11">
            আমাদের ঠিকানা
          </p>
          <p className="font-urdu text-gold-500/55 text-xs mt-1 mb-6 ml-11" style={{ direction: 'rtl' }}>
            ہمارا پتہ
          </p>
          <h2
            className="font-display italic text-cream"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            Visit Our Restaurant
          </h2>
        </div>

        <div className="reveal max-w-3xl" data-reveal-delay="0.1">
          <div
            className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-[rgba(212,168,67,0.12)] hover:border-[rgba(212,168,67,0.25)] transition-all duration-400 group"
            style={{ background: 'rgba(61,43,31,0.35)' }}
          >
            <div className="overflow-hidden">
              <Image
                src="/restaurant-night.webp"
                alt="Peshwarain flagship"
                width={600}
                height={400}
                className="w-full h-60 md:h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms]"
                style={{ minHeight: '260px', filter: 'brightness(0.82)' }}
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <span className="font-sans text-gold-500/85 text-sm mb-3" style={{ fontWeight: 500 }}>Flagship</span>
              <h3
                className="font-display italic text-cream text-2xl mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                Old Dhaka
              </h3>
              <p className="font-bangla text-gold-300/80 text-base mb-1">
                পুরান ঢাকা
              </p>
              <p className="font-urdu text-gold-500/55 text-sm mb-4" style={{ direction: 'rtl' }}>
                پرانی ڈھاکہ
              </p>
              <p className="font-body text-gold-200 text-base leading-relaxed opacity-85 mb-4">
                The original Peshwarain — iconic truck-art decor, rooftop seating, and the full menu experience.
              </p>
              <p className="font-sans text-gold-500/85 text-[0.9rem] mb-6">
                Open daily: 12:00 PM — 12:00 AM
              </p>
              <a
                href="https://maps.google.com/?q=Old+Dhaka+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit font-sans text-base text-gold-400 border-b border-gold-700 pb-1 hover:border-gold-400 hover:text-gold-300 transition-all duration-300"
                style={{ fontWeight: 500 }}
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
