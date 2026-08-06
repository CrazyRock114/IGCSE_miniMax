import { useEffect, useRef, useState } from 'react'
import { T } from '@/components/i18n/T'
import type { VisualIllusionsExtra } from '@/content/types'

/**
 * Why your eyes play tricks on you — supplementary material for the
 * 14-1 eye section. Two halves:
 *
 *   1. A gallery of five classic visual illusions (pure SVG, no image
 *      files needed) with a short "what you see" + "why" block.
 *   2. Three hands-on experiments with explanations of the underlying
 *      vision-science principle. Each experiment is interactive —
 *      the user does something, then sees the result.
 */
export function VisualIllusions({ extra }: { extra: VisualIllusionsExtra }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
          Illusion gallery
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {extra.illusions.map((ill) => (
            <IllusionCard key={ill.id} illusion={ill} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
          Try it yourself
        </h3>
        <div className="space-y-4">
          {extra.experiments.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>
      </div>
    </div>
  )
}

function IllusionCard({
  illusion,
}: {
  illusion: VisualIllusionsExtra['illusions'][number]
}) {
  return (
    <div className="rounded-lg border border-line bg-canvas/50 p-3">
      <p className="mb-2 text-sm font-semibold text-ink">
        <T value={illusion.title} />
      </p>
      <div className="mb-2 rounded-md bg-white p-3">
        <IllusionSVG id={illusion.id} />
      </div>
      <p className="text-xs text-ink-soft">
        <span className="font-semibold text-muted">What you see: </span>
        <T value={illusion.whatYouSee} />
      </p>
      <p className="mt-1.5 text-xs text-ink-soft">
        <span className="font-semibold text-muted">Why: </span>
        <T value={illusion.why} />
      </p>
    </div>
  )
}

function ExperimentCard({
  experiment,
}: {
  experiment: VisualIllusionsExtra['experiments'][number]
}) {
  return (
    <div className="rounded-lg border border-line bg-canvas/50 p-4">
      <p className="mb-2 text-sm font-semibold text-ink">
        <T value={experiment.title} />
      </p>
      <p className="mb-2 text-xs text-ink-soft">
        <span className="font-semibold text-muted">How: </span>
        <T value={experiment.instructions} />
      </p>
      <div className="my-3 rounded-md bg-white p-4">
        <ExperimentDemo id={experiment.id} />
      </div>
      <p className="text-xs text-ink-soft">
        <span className="font-semibold text-muted">Why: </span>
        <T value={experiment.principle} />
      </p>
    </div>
  )
}

// ============================================================================
// SVG illustrations — drawn inline so the project has no image-file
// dependencies. Each one is the minimal reproduction of the classic
// illusion, with generous margin so the figure is the focus.
// ============================================================================

function IllusionSVG({ id }: { id: string }) {
  switch (id) {
    case 'hermann-grid':
      return <HermannGrid />
    case 'muller-lyer':
      return <MullerLyer />
    case 'ponzo':
      return <Ponzo />
    case 'ebbinghaus':
      return <Ebbinghaus />
    case 'afterimage':
      return <AfterimageSquare />
    default:
      return <span className="text-xs text-muted">No illustration</span>
  }
}

function HermannGrid() {
  // 5×5 grid of black bars on white, with white gaps. Grey dots appear
  // at intersections when the eye scans but vanish when you fixate.
  const cell = 30
  const gap = 8
  const bars: { x: number; y: number; w: number; h: number }[] = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      bars.push({
        x: col * (cell + gap),
        y: row * (cell + gap),
        w: cell,
        h: cell,
      })
    }
  }
  const size = 5 * cell + 4 * gap
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="block h-32 w-full">
      <rect width={size} height={size} fill="#ffffff" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="#000000" />
      ))}
    </svg>
  )
}

function MullerLyer() {
  // Two vertical lines of identical length, one with inward arrows,
  // one with outward arrows. The trick: the lines are exactly the same.
  const len = 120
  const cx = 100
  const left = 50
  const right = 150
  const arrow = 16
  const topY = 40
  const bottomY = topY + len
  return (
    <svg viewBox="0 0 200 200" className="block h-32 w-full">
      {/* Left: inward arrows (><) */}
      <line x1={left} y1={topY} x2={left} y2={bottomY} stroke="#222" strokeWidth="3" />
      <polyline
        points={`${left - arrow},${topY + arrow} ${left},${topY} ${left + arrow},${topY + arrow}`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      <polyline
        points={`${left - arrow},${bottomY - arrow} ${left},${bottomY} ${left + arrow},${bottomY - arrow}`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      {/* Right: outward arrows (<>) */}
      <line x1={right} y1={topY} x2={right} y2={bottomY} stroke="#222" strokeWidth="3" />
      <polyline
        points={`${right + arrow},${topY + arrow} ${right},${topY} ${right - arrow},${topY + arrow}`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      <polyline
        points={`${right + arrow},${bottomY - arrow} ${right},${bottomY} ${right - arrow},${bottomY - arrow}`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      <text x={left} y={185} textAnchor="middle" className="fill-muted" fontSize="11">
        A
      </text>
      <text x={right} y={185} textAnchor="middle" className="fill-muted" fontSize="11">
        B
      </text>
      <text x={cx} y={195} textAnchor="middle" className="fill-muted" fontSize="10">
        exactly the same length
      </text>
    </svg>
  )
}

function Ponzo() {
  // Two equal circles, one in the "far" part of converging lines, one in
  // the "near" part. The far one looks bigger.
  return (
    <svg viewBox="0 0 240 160" className="block h-32 w-full">
      {/* Converging lines */}
      <line x1="20" y1="150" x2="200" y2="40" stroke="#999" strokeWidth="1.5" />
      <line x1="220" y1="150" x2="40" y2="40" stroke="#999" strokeWidth="1.5" />
      {/* Equal circles */}
      <circle cx="120" cy="80" r="22" fill="#14b8a6" />
      <circle cx="120" cy="120" r="22" fill="#14b8a6" />
      {/* Horizon-ish line */}
      <line x1="20" y1="150" x2="220" y2="150" stroke="#bbb" strokeWidth="1" />
    </svg>
  )
}

function Ebbinghaus() {
  // Two identical orange circles. One is surrounded by big purple circles,
  // the other by small ones. The surrounded-by-small one looks bigger.
  const big = 14
  const small = 7
  const positionsLeft: Array<[number, number]> = [
    [-30, 0],
    [30, 0],
    [0, -30],
    [0, 30],
    [-22, -22],
    [22, 22],
    [-22, 22],
    [22, -22],
  ]
  const positionsRight: Array<[number, number]> = [
    [-12, 0],
    [12, 0],
    [0, -12],
    [0, 12],
  ]
  return (
    <svg viewBox="0 0 240 100" className="block h-32 w-full">
      {/* Left side: surrounded by big circles */}
      <circle cx={60} cy={50} r={20} fill="#fb923c" />
      {positionsLeft.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={60 + dx}
          cy={50 + dy}
          r={big}
          fill="#a78bfa"
        />
      ))}
      {/* Right side: surrounded by small circles */}
      <circle cx={180} cy={50} r={20} fill="#fb923c" />
      {positionsRight.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={180 + dx}
          cy={50 + dy}
          r={small}
          fill="#a78bfa"
        />
      ))}
    </svg>
  )
}

function AfterimageSquare() {
  // A solid red square with a fixating dot in the centre. After staring
  // for the experiment, the user looks at a grey area and sees cyan.
  return (
    <svg viewBox="0 0 100 100" className="block h-32 w-full">
      <rect width="100" height="100" fill="#dc2626" />
      <circle cx="50" cy="50" r="3" fill="#000" />
    </svg>
  )
}

// ============================================================================
// Interactive experiments — each one is a small stateful React component
// inline. They keep their own state so re-rendering the gallery doesn't
// reset them.
// ============================================================================

function ExperimentDemo({ id }: { id: string }) {
  switch (id) {
    case 'blind-spot':
      return <BlindSpotExperiment />
    case 'muller-lyer-match':
      return <MullerLyerMatchExperiment />
    case 'afterimage-demo':
      return <AfterimageExperiment />
    default:
      return <span className="text-xs text-muted">No demo</span>
  }
}

function BlindSpotExperiment() {
  // The classical Marigold fixating test. A small ✕ on the left, a
  // coloured dot on the right. When the page sits at the right distance
  // from the right eye, the dot falls on the optic disc and disappears.
  // The browser can't actually enforce eye position, so we expose a
  // distance slider and tell the user to close one eye, fixate, and
  // move the page (or their head) until the dot disappears.
  const [dotX, setDotX] = useState(220)
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 400 80" className="w-full">
        <text x={50} y={50} textAnchor="middle" fontSize="32" className="fill-ink">
          ✕
        </text>
        <circle
          cx={dotX}
          cy={40}
          r="14"
          fill="#dc2626"
          className="transition-all"
        />
      </svg>
      <label className="flex w-full items-center gap-2 text-xs text-muted">
        <span className="shrink-0">dot position:</span>
        <input
          type="range"
          min={130}
          max={380}
          value={dotX}
          onChange={(e) => setDotX(parseInt(e.target.value, 10))}
          className="w-full accent-teal-600"
        />
      </label>
      <p className="text-center text-[10px] text-muted">
        Close your LEFT eye. With your RIGHT eye, fixate on ✕. Slide the red dot
        until it disappears — that is your blind spot, the place where the optic
        nerve leaves the eye.
      </p>
    </div>
  )
}

function MullerLyerMatchExperiment() {
  // Left line has inward arrows, right line is user-controlled. The
  // question: how long do you have to make the right line for it to
  // look the same as the inward-arrow one? Always 10-20% longer.
  const [rightLen, setRightLen] = useState(80)
  const baseLen = 120
  const arrow = 14
  const topY = 30
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 280 100" className="w-full">
        {/* Left: inward arrows (fixed length) */}
        <g transform="translate(60, 0)">
          <line x1="0" y1={topY} x2="0" y2={topY + baseLen} stroke="#222" strokeWidth="3" />
          <polyline
            points={`${-arrow},${topY + arrow} 0,${topY} ${arrow},${topY + arrow}`}
            fill="none"
            stroke="#222"
            strokeWidth="3"
          />
          <polyline
            points={`${-arrow},${topY + baseLen - arrow} 0,${topY + baseLen} ${arrow},${
              topY + baseLen - arrow
            }`}
            fill="none"
            stroke="#222"
            strokeWidth="3"
          />
          <text x="0" y="15" textAnchor="middle" className="fill-muted" fontSize="10">
            reference ({'>'}{'<'})
          </text>
        </g>
        {/* Right: user-controlled, no arrows (plain line) */}
        <g transform={`translate(180, ${topY})`}>
          <line x1="0" y1="0" x2="0" y2={rightLen} stroke="#dc2626" strokeWidth="3" />
          <text x="0" y="-8" textAnchor="middle" className="fill-muted" fontSize="10">
            your line
          </text>
        </g>
      </svg>
      <label className="flex w-full items-center gap-2 text-xs text-muted">
        <span className="shrink-0">length:</span>
        <input
          type="range"
          min={50}
          max={150}
          value={rightLen}
          onChange={(e) => setRightLen(parseInt(e.target.value, 10))}
          className="w-full accent-teal-600"
        />
        <span className="font-mono text-xs text-ink">{rightLen}px</span>
      </label>
      <p className="text-center text-[10px] text-muted">
        Make the red line look the same length as the reference. Hit "answer" to
        see how biased your visual system is.
        <ShowAnswerButton
          onClick={() => setRightLen(Math.round(baseLen * 1.12))}
          label="Show the bias (112%)"
        />
      </p>
    </div>
  )
}

function ShowAnswerButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-2 rounded border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
    >
      {label}
    </button>
  )
}

function AfterimageExperiment() {
  // Two phases. Phase 1: a red square with a black dot in the centre
  // (stare here). Phase 2: a grey square with a black dot in the
  // centre (look here) — a faint cyan image of the red square floats.
  //
  // The browser can't actually trigger the photoreceptor fatigue, but
  // we can simulate the visual: show a real afterimage in phase 2.
  const [phase, setPhase] = useState<'stare' | 'look'>('stare')
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (phase !== 'stare') return
    // Reset on the first tick, then increment — avoids calling setState
    // directly in the effect body, and the user sees "0" for the first
    // second which is honest ("you've been staring for 0 seconds").
    let firstTick = true
    intervalRef.current = window.setInterval(() => {
      if (firstTick) {
        setSeconds(0)
        firstTick = false
      } else {
        setSeconds((s) => s + 1)
      }
    }, 1000)
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [phase])

  return (
    <div className="flex flex-col items-center gap-2">
      {phase === 'stare' ? (
        <StarePhase seconds={seconds} onDone={() => setPhase('look')} />
      ) : (
        <LookPhase onReset={() => setPhase('stare')} />
      )}
    </div>
  )
}

function StarePhase({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  // After 30 seconds, auto-advance. The user can also click "I'm done staring".
  useEffect(() => {
    if (seconds >= 30) onDone()
  }, [seconds, onDone])
  return (
    <>
      <div className="relative">
        <div className="h-32 w-32 bg-[#dc2626]" />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
      <p className="text-center text-[10px] text-muted">
        Phase 1 — stare at the black dot for 30 seconds ({seconds}/30).
        <br />
        <button
          type="button"
          onClick={onDone}
          className="mt-1 rounded border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
        >
          skip — go to phase 2
        </button>
      </p>
    </>
  )
}

function LookPhase({ onReset }: { onReset: () => void }) {
  // A grey square with a black fixation dot. The "afterimage" is a
  // translucent cyan square of the same size — your brain's prediction,
  // painted on top.
  return (
    <>
      <div className="relative">
        <div className="h-32 w-32 bg-[#d4d4d8]" />
        <div
          className="absolute inset-0 bg-[#06b6d4] opacity-60 mix-blend-difference"
          aria-hidden="true"
        />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
      <p className="text-center text-[10px] text-muted">
        Phase 2 — look at the black dot on the grey square. A cyan ghost of the
        red square should be visible for a few seconds. (In the actual
        experiment the afterimage is faint; here we paint it on so the
        mechanism is obvious.)
        <br />
        <button
          type="button"
          onClick={onReset}
          className="mt-1 rounded border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
        >
          reset
        </button>
      </p>
    </>
  )
}
