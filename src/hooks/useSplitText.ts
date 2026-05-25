'use client'

/**
 * Free SplitText alternative.
 * Splits a node's text into <span class="char"> wrappers nested inside
 * <span class="word"> wrappers. Returns char & word arrays for GSAP.
 *
 * Each char is wrapped in a `.char-mask` parent with overflow:hidden
 * so you can do clip reveals without measuring lines.
 */
export function splitText(el: HTMLElement, opts: { chars?: boolean; words?: boolean } = { chars: true, words: true }) {
  const text = el.textContent ?? ''
  const wantChars = opts.chars !== false
  const wantWords = opts.words !== false

  el.textContent = ''
  const chars: HTMLSpanElement[] = []
  const words: HTMLSpanElement[] = []

  // Split on whitespace but keep them
  const tokens = text.split(/(\s+)/)

  tokens.forEach(token => {
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token))
      return
    }
    const word = document.createElement('span')
    word.className = 'split-word'
    word.style.display = 'inline-block'
    if (wantWords) words.push(word)

    if (wantChars) {
      // Use Intl.Segmenter to properly handle Bengali conjuncts (যুক্তবর্ণ)
      // Array.from() breaks multi-codepoint grapheme clusters like স্ব, ক্ষ্ণ
      const segmenter = new Intl.Segmenter('bn', { granularity: 'grapheme' })
      const segments = segmenter.segment(token)
      const graphemes: string[] = []
      const iterator = segments[Symbol.iterator]()
      let result = iterator.next()
      while (!result.done) {
        graphemes.push(result.value.segment)
        result = iterator.next()
      }
      graphemes.forEach(ch => {
        const mask = document.createElement('span')
        mask.className = 'split-char-mask'
        mask.style.display = 'inline-block'
        mask.style.overflow = 'hidden'
        mask.style.verticalAlign = 'baseline'

        const span = document.createElement('span')
        span.className = 'split-char'
        span.style.display = 'inline-block'
        span.textContent = ch
        chars.push(span)

        mask.appendChild(span)
        word.appendChild(mask)
      })
    } else {
      word.textContent = token
    }

    el.appendChild(word)
  })

  return { chars, words }
}
