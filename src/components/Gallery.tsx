'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const ITEMS = [
  { src: '/restaurant-exterior.webp', alt: 'Peshwarain exterior',  caption: 'Iconic Façade',     bangla: 'আইকনিক বহির্ভাগ',     large: true },
  { src: '/restaurant-night.webp',    alt: 'Peshwarain at night',  caption: 'After Dark',        bangla: 'রাতের পরিবেশ' },
  { src: '/restaurant-interior.webp', alt: 'Interior mural',        caption: 'Peshawari Character', bangla: 'পেশোয়ারি চরিত্র' },
  { src: '/truck-art.jpg',            alt: 'Truck art wall',       caption: 'Truck Art Heritage',  bangla: 'ট্রাক আর্ট ঐতিহ্য' },
]

export default function Gallery() {
  const sectionRef = useReveal<HTMLDivElement>()

  return (
    <section id="gallery" className="py-24 md:py-36 relative z-10">
      <div ref={sectionRef} className="max-w-container mx-auto px-6 md:px-12">

        <div className="mb-12 reveal text-center">
          <p className="eyebrow-rule font-sans text-gold-400/90 text-[0.95rem] justify-center mb-1" style={{ fontWeight: 500 }}>
            The Experience
          </p>
          <p className="font-bangla text-gold-300/75 text-sm mt-1">
            অভিজ্ঞতা
          </p>
          <p className="font-urdu text-gold-500/55 text-xs mt-1 mb-6" style={{ direction: 'rtl' }}>
            تجربہ
          </p>
          <h2
            className="font-display italic text-cream"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            Step Inside Peshwarain
          </h2>
          <p className="font-display italic text-gold-300/90 text-lg mt-5 max-w-xl mx-auto">
            Truck art, warm golden light, and the scent of freshly grilled kebabs.
          </p>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.src}
              className={`reveal group relative overflow-hidden rounded-xl border border-[rgba(212,168,67,0.09)] cursor-pointer ${
                item.large
                  ? 'col-span-4 md:col-span-2 md:row-span-2'
                  : 'col-span-4 md:col-span-2'
              }`}
              data-reveal-delay={(i * 0.07).toString()}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={item.large ? 600 : 320}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                  item.large ? 'h-[320px] md:h-full md:min-h-[460px]' : 'h-[240px] md:h-[220px]'
                }`}
                style={{ filter: 'brightness(0.78) saturate(1.05)' }}
              />

              <div
                className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'linear-gradient(to top, rgba(18,11,7,0.8) 0%, transparent 60%)' }}
              >
                <div>
                  <span
                    className="block font-display italic text-cream text-xl md:text-2xl"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {item.caption}
                  </span>
                  <span className="block font-bangla text-gold-300/80 text-sm mt-1">
                    {item.bangla}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
