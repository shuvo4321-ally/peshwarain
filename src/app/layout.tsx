import type { Metadata } from 'next'
import {
  Fraunces,
  Newsreader,
  Inter,
  JetBrains_Mono,
  Noto_Nastaliq_Urdu,
  Noto_Sans_Bengali,
  Tiro_Bangla,
  Rubik_Dirt,
} from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Cursor from '@/components/Cursor'
import PageLoader from '@/components/PageLoader'

const rubikDirt = Rubik_Dirt({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-logo',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

const urdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-urdu',
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bangla-noto',
  display: 'swap',
})

const tiroBangla = Tiro_Bangla({
  subsets: ['bengali'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-bangla-tiro',
  display: 'swap',
})

/* ─── Local Bangla Fonts ─────────────────────────── */

const momenshahiArdha = localFont({
  src: [
    {
      path: '../../public/fonts/MomenshahiArdha-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/MomenshahiArdha-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-bangla',
  display: 'swap',
})

const momenshahiPurna = localFont({
  src: [
    {
      path: '../../public/fonts/MomenshahiPurna-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/MomenshahiPurna-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-bangla-purna',
  display: 'swap',
})

const codepotro = localFont({
  src: '../../public/fonts/Codepotro-AbuSayed.ttf',
  variable: '--font-bangla-display',
  display: 'swap',
})

const hidayatullah = localFont({
  src: '../../public/fonts/hidayatullahDEMO.ttf',
  variable: '--font-hidayatullah',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://peshwarain.com'),
  title: 'পেশোয়ারাইন — খাঁটি পেশোয়ারি রান্না | ঢাকা',
  description:
    'তীব্র মশলা, সমৃদ্ধ ঐতিহ্য এবং অবিস্মরণীয় স্বাদ — পেশোয়ারের হৃদয় থেকে তৈরি। মুরগ মাখানওয়ালা, নিহারি, মালাই বোটি ঢাকায়।',
  openGraph: {
    title: 'পেশোয়ারাইন — খাঁটি পেশোয়ারি রান্না',
    description: 'যেখানে ঐতিহ্য মিলে যায় আগুন ও স্বাদে।',
    images: ['/logo.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      className={`${rubikDirt.variable} ${fraunces.variable} ${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} ${urdu.variable} ${notoSansBengali.variable} ${tiroBangla.variable} ${momenshahiArdha.variable} ${momenshahiPurna.variable} ${codepotro.variable} ${hidayatullah.variable}`}
    >
      <body>
        <PageLoader />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
