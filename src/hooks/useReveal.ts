'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const items = root.querySelectorAll<HTMLElement>(
        '.reveal, .reveal-left, .reveal-right'
      )

      items.forEach((el) => {
        const isLeft = el.classList.contains('reveal-left')
        const isRight = el.classList.contains('reveal-right')
        const delay = parseFloat(el.dataset.revealDelay || '0')

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: isLeft || isRight ? 0 : 42,
            x: isLeft ? -46 : isRight ? 46 : 0,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.15,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    },
    { scope: ref }
  )

  return ref
}
