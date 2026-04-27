import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FFF8E7',
          200: '#F5E6B8',
          300: '#E8C872',
          400: '#D4A843',
          500: '#C4912A',
          600: '#A87521',
          700: '#8B5E1A',
          800: '#6B4713',
        },
        brown: {
          100: '#3D2B1F',
          200: '#2E1F15',
          300: '#231710',
          400: '#1A100A',
          500: '#120B07',
          600: '#0A0604',
        },
        cream: '#F5EDD8',
        terracotta: '#C15A36',
      },
      fontFamily: {
        logo: ['var(--font-logo)', 'Impact', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        bangla: ['var(--font-bangla)', 'serif'],
        banglaPurna: ['var(--font-bangla-purna)', 'serif'],
        banglaDisplay: ['var(--font-bangla-display)', 'sans-serif'],
        urdu: ['var(--font-urdu)', 'serif'],
        hidayatullah: ['var(--font-hidayatullah)', 'serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
