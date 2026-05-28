export default function Footer() {
  return (
    <footer className="relative z-10" style={{ background: '#0A0604' }}>
      <div
        className="w-full h-8 md:h-12"
        style={{
          backgroundImage: 'url("/footer-border.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'contain',
          backgroundPosition: 'left center'
        }}
      />

      <div className="max-w-container mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="Peshwarain"
              className="inline-flex flex-col items-start mb-5 select-none"
            >
              <span
                className="font-logo text-[#F8B425] relative inline-block"
                style={{
                  fontSize: '1.45rem',
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
                style={{ fontSize: '0.65rem', direction: 'rtl', lineHeight: 1 }}
              >
                پشوارین
              </span>
            </a>
            <p className="font-display italic text-gold-300 text-base opacity-75 mb-1">
              Peshawari kitchen · Wari · since 2020
            </p>
            <p className="font-bangla text-gold-300/70 text-sm mb-1">
              পেশোয়ারি রান্নাঘর · ওয়ারী · ২০২০ থেকে
            </p>
            <p className="font-urdu text-gold-500/55 text-xs" style={{ direction: 'rtl' }}>
              پشواری باورچی خانہ · واری · ۲۰۲۰ سے
            </p>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-mono text-[0.9rem] text-gold-500/85 mb-5" style={{ fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Visit</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.google.com/maps/place/PeshWarain+~+Wari/@23.720091,90.4121368,17z/data=!3m1!4b1!4m6!3m5!1s0x3755b9be94ecaa81:0x9915c4f564e16f01!8m2!3d23.7200911!4d90.4170077!16s%2Fg%2F11lm3qnlgg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-3 font-body text-gold-200 opacity-80 leading-relaxed hover:opacity-100 hover:text-gold-300 transition-all duration-300"
                  style={{ fontSize: '0.98rem' }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-[5px] flex-shrink-0 text-gold-500/75 group-hover:text-gold-400 transition-colors duration-300"
                    aria-hidden
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    16/2 Rankin Street<br />
                    Wari, Dhaka-1203
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801756853532"
                  className="group inline-flex items-center gap-3 font-body text-gold-200 opacity-80 hover:opacity-100 hover:text-gold-300 transition-all duration-300"
                  style={{ fontSize: '0.98rem' }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 text-gold-500/75 group-hover:text-gold-400 transition-colors duration-300"
                    aria-hidden
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  +880 1756-853532
                </a>
              </li>
              <li className="font-body text-gold-200 opacity-80 inline-flex items-center gap-3" style={{ fontSize: '0.98rem' }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 text-gold-500/75"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Daily · 5:00 PM – 11:00 PM
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-mono text-[0.9rem] text-gold-500/85 mb-5" style={{ fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Social Media</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.instagram.com/peshwarain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-gold-200 opacity-80 hover:opacity-100 hover:text-gold-300 transition-all duration-300"
                >
                  <span
                    className="w-9 h-9 rounded-full border border-[rgba(212,168,67,0.25)] flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-brown-500 group-hover:border-gold-500 transition-all duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display italic text-gold-300 text-base leading-tight">Instagram</span>
                    <span className="font-mono text-gold-500/55 text-[0.65rem] mt-0.5" style={{ letterSpacing: '0.18em' }}>@peshwarain</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Peshwarain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-gold-200 opacity-80 hover:opacity-100 hover:text-gold-300 transition-all duration-300"
                >
                  <span
                    className="w-9 h-9 rounded-full border border-[rgba(212,168,67,0.25)] flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-brown-500 group-hover:border-gold-500 transition-all duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display italic text-gold-300 text-base leading-tight">Facebook</span>
                    <span className="font-mono text-gold-500/55 text-[0.65rem] mt-0.5" style={{ letterSpacing: '0.18em' }}>/peshwarain</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(212,168,67,0.07)] py-5 px-6 md:px-12">
        <p className="font-sans text-sm text-gold-300 opacity-40 text-center">
          © 2026 Peshwarain · All rights reserved.
        </p>
      </div>
    </footer>
  )
}
