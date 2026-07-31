/**
 * Bilingual interface copy.
 *
 * Chrome — button labels, panel headings, fallback guidance — as opposed to course
 * content, which lives in `src/content/`. It sits here rather than inside the
 * components because an ESLint rule forbids CJK literals in `src/components/**` and
 * `src/sim/**`: copy embedded in a component is copy that cannot be translated later.
 */

import type { Bilingual } from '@/content/types'

export const ui = {
  /** Shown in the controls panel when a lesson does not supply its own hint. */
  controlsHintFallback: {
    en: 'Drag a slider and watch the readings change.',
    zh: '拖动滑块，观察读数如何变化。',
  },
  /** Heads the row of one-click scenario buttons. */
  presetsLabel: {
    en: 'Jump to a scenario',
    zh: '一键跳到典型情形',
  },
} satisfies Record<string, Bilingual>
