'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useReveal } from '@/hooks/useReveal'

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: 'Address',
    value: 'Old Dhaka, Dhaka Division, Bangladesh',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Call Us',
    value: '+880 1XXX-XXXXXX',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Hours',
    value: '12:00 PM — 12:00 AM, daily',
  },
]

type Status = 'idle' | 'submitting' | 'success'

export default function Reservation() {
  const sectionRef = useReveal<HTMLDivElement>()
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const el = document.getElementById('res-date') as HTMLInputElement | null
    if (el) el.min = new Date().toISOString().split('T')[0]
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        ;(e.target as HTMLFormElement).reset()
      }, 3000)
    }, 1400)
  }

  return (
    <section
      id="reservation"
      className="py-24 md:py-36 relative z-10"
      style={{ background: 'linear-gradient(180deg, #120B07 0%, #1A100A 50%, #120B07 100%)' }}
    >
      <div ref={sectionRef} className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Info */}
          <div className="reveal-left">
            <p className="eyebrow-rule font-sans text-gold-400/90 text-[0.95rem] mb-1" style={{ fontWeight: 500 }}>
              Book Your Experience
            </p>
            <p className="font-bangla text-gold-300/75 text-sm mt-1 ml-11">
              আপনার অভিজ্ঞতা বুক করুন
            </p>
            <p className="font-urdu text-gold-500/55 text-xs mt-1 mb-6 ml-11" style={{ direction: 'rtl' }}>
              اپنا تجربہ بک کریں
            </p>
            <h2
              className="font-display italic text-cream mb-5"
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 3.3rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              Reserve Your Table
            </h2>
            <p className="font-body text-gold-200 text-lg leading-relaxed opacity-90 mb-10">
              Gather the people you love for an unforgettable feast. Book a table — we'll handle the rest.
            </p>

            <div className="space-y-7">
              {CONTACT_ITEMS.map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-0.5 text-gold-500 flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-sans text-[0.85rem] text-gold-500/85 mb-0.5" style={{ fontWeight: 500 }}>
                      {item.label}
                    </p>
                    <p className="font-sans text-gold-200 text-base opacity-85">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[rgba(212,168,67,0.12)] p-7 md:p-9"
              style={{ background: 'rgba(61,43,31,0.3)', backdropFilter: 'blur(12px)' }}
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field id="res-name"  label="Full Name" type="text" placeholder="Your name" required />
                <Field id="res-phone" label="Phone"     type="tel"  placeholder="+880"      required />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field id="res-date" label="Date" type="date" required />
                <Field id="res-time" label="Time" type="time" required />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field id="res-guests" label="Guests" as="select" required>
                  <option value="">Select</option>
                  <option>1 – 2 people</option>
                  <option>3 – 4 people</option>
                  <option>5 – 6 people</option>
                  <option>7 – 10 people</option>
                  <option>10+ (private)</option>
                </Field>
                <Field id="res-occasion" label="Occasion" as="select">
                  <option value="">Optional</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Family Gathering</option>
                  <option>Corporate Dinner</option>
                  <option>Other</option>
                </Field>
              </div>
              <div className="mb-5">
                <label htmlFor="res-message" className="block font-sans text-[0.85rem] text-gold-500/85 mb-2" style={{ fontWeight: 500 }}>
                  Special Requests
                </label>
                <textarea
                  id="res-message"
                  rows={3}
                  placeholder="Dietary preferences, special arrangements..."
                  className="field-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-3.5 rounded-full font-sans transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-[#5C6B3C] text-cream border border-[#7A8B5C]'
                    : 'bg-gold-500 text-brown-500 hover:bg-gold-400 border border-gold-400'
                } disabled:opacity-70`}
                style={{ fontWeight: 500 }}
              >
                {status === 'idle'       && 'Reserve Table'}
                {status === 'submitting' && 'Reserving…'}
                {status === 'success'    && '✓ Reservation Confirmed'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  id, label, type, placeholder, required, as, children,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  as?: 'select' | 'input'
  children?: React.ReactNode
}) {
  return (
    <div className="col-span-1">
      <label htmlFor={id} className="block font-sans text-[0.85rem] text-gold-500/85 mb-2" style={{ fontWeight: 500 }}>
        {label}
      </label>
      {as === 'select' || children ? (
        <select id={id} required={required} className="field-input">
          {children}
        </select>
      ) : (
        <input id={id} type={type} placeholder={placeholder} required={required} className="field-input" />
      )}
    </div>
  )
}
