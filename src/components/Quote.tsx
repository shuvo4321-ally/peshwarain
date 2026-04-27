export default function Quote() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden z-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212,168,67,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
        <blockquote>
          <p
            className="font-display italic text-gold-200"
            style={{
              fontSize: 'clamp(1.7rem, 3.8vw, 2.6rem)',
              lineHeight: 1.35,
              letterSpacing: '-0.02em',
            }}
          >
            &ldquo;Food is the language of love,<br className="hidden md:block" />
            and in Peshawar, we speak it in fire.&rdquo;
          </p>

          <p className="font-bangla text-gold-300/80 text-lg md:text-xl mt-7" style={{ lineHeight: 1.6 }}>
            খাবার হলো ভালোবাসার ভাষা,<br className="hidden md:block" />
            আর পেশোয়ারে, আমরা তা আগুনে বলি।
          </p>

          <p
            className="font-urdu text-gold-400/70 text-sm md:text-base mt-5"
            style={{ direction: 'rtl', lineHeight: 2 }}
          >
            کھانا محبت کی زبان ہے،<br className="hidden md:block" />
            اور پشاور میں ہم اسے آگ سے بولتے ہیں۔
          </p>

          <cite className="block mt-10 font-sans text-gold-500/80 text-sm not-italic">
            — পেশোয়ারাইন
          </cite>
        </blockquote>

        <div
          className="mx-auto mt-10 h-px w-24 opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, #C4912A, transparent)' }}
        />
      </div>
    </section>
  )
}
