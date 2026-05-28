'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useReveal } from '@/hooks/useReveal'

type ContactItem = {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}

/* Direct link to the verified PeshWarain · Wari business listing on Google Maps */
const MAPS_URL =
  'https://www.google.com/maps/place/PeshWarain+~+Wari/@23.720091,90.4121368,17z/data=!3m1!4b1!4m6!3m5!1s0x3755b9be94ecaa81:0x9915c4f564e16f01!8m2!3d23.7200911!4d90.4170077!16s%2Fg%2F11lm3qnlgg'

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: 'Address',
    value: '16/2 Rankin Street, Wari, Old Dhaka',
    href: MAPS_URL,
    external: true,
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Call Us',
    value: '+880 1756-853532',
    href: 'tel:+8801756853532',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Hours',
    value: '5:00 PM — 11:00 PM, daily',
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
    if (status !== 'idle') return

    const form = e.target as HTMLFormElement
    const val = (id: string) =>
      (document.getElementById(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value?.trim() || ''

    const name = val('res-name')
    const phone = val('res-phone')
    const date = val('res-date')
    const time = val('res-time')
    const guests = val('res-guests')
    const arrangementVal = val('res-arrangement')
    const occasion = val('res-occasion')
    const message = val('res-message')

    /* Map arrangement value -> human label */
    const ARRANGEMENT_LABELS: Record<string, string> = {
      standard: 'Standard Dining',
      family: 'Family Platter (Nalli Gosht Nihari, Naan, Lassi)',
      iftar: 'Iftar Package (Saffron Jalebi, Haleem, Chapli)',
      catering: 'Catering enquiry — chefs from Pakistan',
    }
    const arrangement = ARRANGEMENT_LABELS[arrangementVal] ?? arrangementVal

    /* Build a clean editorial WhatsApp message */
    const lines = [
      '*Peshwarain · Reservation Request*',
      '_Wari · 16/2 Rankin Street_',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Date:* ${date}`,
      `*Time:* ${time}`,
      `*Guests:* ${guests}`,
      `*Arrangement:* ${arrangement}`,
    ]
    if (occasion) lines.push(`*Occasion:* ${occasion}`)
    if (message) {
      lines.push('')
      lines.push(`*Notes:*\n${message}`)
    }

    const text = encodeURIComponent(lines.join('\n'))
    const url = `https://wa.me/8801756853532?text=${text}`

    /* Open WhatsApp IMMEDIATELY — must be synchronous inside the click
       handler so the user-gesture is preserved (browsers block popups
       opened from setTimeout/async callbacks). */
    const popup = window.open(url, '_blank', 'noopener,noreferrer')

    /* If the popup was blocked anyway, fall back to same-tab navigation */
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      window.location.href = url
      return
    }

    /* Visual feedback only — the popup is already open */
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        form.reset()
      }, 4000)
    }, 380)
  }

  return (
    <section
      id="reservation"
      className="py-24 md:py-36 relative z-10 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #120B07 0%, #1A100A 50%, #120B07 100%)' }}
    >
      <div ref={sectionRef} className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Info */}
          <div className="reveal-left">
            <p
              className="font-mono text-gold-400/85 mb-4"
              style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.42em', textTransform: 'uppercase' }}
            >
              A table waits
            </p>
            <h2
              className="font-display italic text-cream letterpress mb-6 max-w-[20ch]"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                lineHeight: 1.18,
                letterSpacing: '-0.018em',
              }}
            >
              Pull a chair.<br />Stay till eleven.
            </h2>
            <p className="font-body italic text-gold-200 text-lg leading-relaxed opacity-90 mb-10 max-w-[42ch]">
              Gather the people you love for an unforgettable feast. The night kitchen runs until eleven.
            </p>

            <div className="space-y-7">
              {CONTACT_ITEMS.map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-0.5 text-gold-500 flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-mono text-[0.7rem] text-gold-500/85 mb-0.5" style={{ fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="font-body text-gold-200 opacity-90 hover:opacity-100 hover:text-gold-300 transition-all duration-300 inline-block"
                        style={{ fontSize: '1.05rem', letterSpacing: '0.005em' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-gold-200 opacity-90" style={{ fontSize: '1.05rem', letterSpacing: '0.005em' }}>{item.value}</p>
                    )}
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
                <Field id="res-arrangement" label="Arrangement" as="select" required>
                  <option value="standard">Standard Dining</option>
                  <option value="family">Family Platter — Nalli Gosht Nihari, Naan, Lassi</option>
                  <option value="iftar">Iftar Package — Saffron Jalebi, Haleem, Chapli</option>
                  <option value="catering">Catering enquiry — chefs from Pakistan</option>
                </Field>
              </div>
              <div className="mb-4">
                <Field id="res-occasion" label="Occasion" as="select">
                  <option value="">Optional (Birthday, Anniversary, etc.)</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Family Gathering</option>
                  <option>Corporate Dinner</option>
                  <option>Other</option>
                </Field>
              </div>
              <div className="mb-5">
                <label htmlFor="res-message" className="block font-mono text-[0.7rem] text-gold-500/85 mb-2" style={{ fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
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
                data-cursor="Reserve"
                disabled={status !== 'idle'}
                className={`w-full py-3.5 rounded-full font-sans transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-[#5C6B3C] text-cream border border-[#7A8B5C]'
                    : 'bg-gold-500 text-brown-500 hover:bg-gold-400 border border-gold-400'
                } disabled:opacity-80`}
                style={{ fontWeight: 500 }}
              >
                {status === 'idle'       && 'Reserve'}
                {status === 'submitting' && 'Opening…'}
                {status === 'success'    && '✓ Reservation sent'}
              </button>
              <p className="font-mono text-gold-500/55 text-[0.6rem] mt-3 text-center" style={{ letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                Sent to +880 1756-853532
              </p>
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
      <label htmlFor={id} className="block font-mono text-[0.7rem] text-gold-500/85 mb-2" style={{ fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
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
