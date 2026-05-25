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

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=16%2F2+Rankin+Street%2C+Wari%2C+Dhaka%2C+Bangladesh'

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

    setStatus('submitting')
    /* Brief beat for the button state, then open WhatsApp in a new tab */
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer')
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
                className={`w-full py-3.5 rounded-full font-sans inline-flex items-center justify-center gap-2.5 transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-[#25D366] text-white border border-[#25D366]'
                    : 'bg-gold-500 text-brown-500 hover:bg-gold-400 border border-gold-400'
                } disabled:opacity-80`}
                style={{ fontWeight: 500 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>
                  {status === 'idle'       && 'Reserve via WhatsApp'}
                  {status === 'submitting' && 'Opening WhatsApp…'}
                  {status === 'success'    && '✓ Continue in WhatsApp'}
                </span>
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
