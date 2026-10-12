import { useState } from 'react'
import type { MomentsLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { MOMENTS_LAB } from '@/lib/lessonExtrasStrings'
import { calculateMomentsEquilibrium, type MomentLoadItem } from '@/content/momentsLabData'

interface MomentsLabProps {
  extra: MomentsLabExtra
}

export function MomentsLab({ extra }: MomentsLabProps) {
  const [leftMassG, setLeftMassG] = useState<number>(200)
  const [leftDistCm, setLeftDistCm] = useState<number>(30)

  const [rightMassG, setRightMassG] = useState<number>(300)
  const [rightDistCm, setRightDistCm] = useState<number>(20)

  const currentLoads: MomentLoadItem[] = [
    { id: 'left-1', massG: leftMassG, distanceCm: leftDistCm, side: 'left' },
    { id: 'right-1', massG: rightMassG, distanceCm: rightDistCm, side: 'right' },
  ]

  const result = calculateMomentsEquilibrium(currentLoads)

  const leftForceN = Number(((leftMassG / 1000) * 9.8).toFixed(2))
  const rightForceN = Number(((rightMassG / 1000) * 9.8).toFixed(2))

  return (
    <div className="my-8 rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-1 border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
            Core & Extended Practical
          </span>
          <h3 className="text-xl font-bold text-content">
            <T value={extra.title} />
          </h3>
        </div>
        <p className="text-sm text-content-muted">
          <T value={extra.hint} />
        </p>
      </div>

      {/* Preset Quick Actions */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setLeftMassG(200)
            setLeftDistCm(30)
            setRightMassG(300)
            setRightDistCm(20)
          }}
          className="rounded-md border border-line bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content hover:bg-accent/10"
        >
          <T value={MOMENTS_LAB.presetBalanced} />
        </button>
        <button
          type="button"
          onClick={() => {
            setLeftMassG(100)
            setLeftDistCm(20)
            setRightMassG(400)
            setRightDistCm(25)
          }}
          className="rounded-md border border-line bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content hover:bg-accent/10"
        >
          <T value={MOMENTS_LAB.presetTilted} />
        </button>
      </div>

      {/* Interactive Seesaw SVG Diagram */}
      <div className="mb-6 overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
        <svg
          viewBox="0 0 700 280"
          className="mx-auto w-full max-w-[680px]"
          aria-label="Moments Seesaw Equilibrium Bench"
        >
          {/* Base Stand & Knife-edge Fulcrum (at x=350, y=140) */}
          <rect x="310" y="220" width="80" height="15" fill="#475569" rx="2" />
          <rect x="345" y="150" width="10" height="70" fill="#64748B" />
          <polygon points="350,140 335,160 365,160" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          <circle cx="350" cy="140" r="3" fill="#DC2626" />
          <text x="358" y="165" fontSize="10" fill="#0F172A" fontWeight="bold">
            Pivot (50.0 cm)
          </text>

          {/* Upward Reaction Force Arrow */}
          <line x1="350" y1="130" x2="350" y2="75" stroke="#10B981" strokeWidth="2.5" />
          <polygon points="350,70 345,80 355,80" fill="#10B981" />
          <text x="356" y="85" fontSize="10" fill="#10B981" fontWeight="bold">
            Reaction R = {result.totalDownwardForceN} N
          </text>

          {/* Rotating Beam Assembly (rotates around pivot 350, 140) */}
          <g transform={`rotate(${result.tiltAngleDeg}, 350, 140)`}>
            {/* Metre Ruler Beam (500px length = 100cm, 5px per cm) */}
            <rect
              x="100"
              y="134"
              width="500"
              height="12"
              fill="#FEF08A"
              stroke="#CA8A04"
              strokeWidth="1.5"
              rx="2"
            />

            {/* Ruler cm markings */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((cm) => (
              <g key={`beam-tick-${cm}`}>
                <line
                  x1={100 + cm * 5}
                  y1="134"
                  x2={100 + cm * 5}
                  y2={cm === 50 ? '146' : '140'}
                  stroke="#854D0E"
                  strokeWidth={cm === 50 ? '2' : '1'}
                />
                <text x={95 + cm * 5} y="130" fontSize="8" fill="#854D0E">
                  {cm}
                </text>
              </g>
            ))}

            {/* Left Load Assembly (at 350 - leftDistCm * 5) */}
            {(() => {
              const xPos = 350 - leftDistCm * 5
              const massCount = Math.max(1, Math.round(leftMassG / 100))
              return (
                <g>
                  {/* Distance line & label */}
                  <line x1={xPos} y1="120" x2="350" y2="120" stroke="#0284C7" strokeWidth="1" strokeDasharray="2 2" />
                  <text x={(xPos + 350) / 2 - 15} y="115" fontSize="9" fill="#0284C7" fontWeight="bold">
                    d₁ = {leftDistCm} cm
                  </text>

                  {/* Thread loop */}
                  <line x1={xPos} y1="146" x2={xPos} y2="175" stroke="#475569" strokeWidth="1.5" />
                  {/* Mass discs */}
                  {Array.from({ length: massCount }).map((_, idx) => (
                    <rect
                      key={`left-disc-${idx}`}
                      x={xPos - 14}
                      y={175 + idx * 6}
                      width="28"
                      height="5"
                      fill="#64748B"
                      stroke="#334155"
                      rx="1"
                    />
                  ))}
                  {/* Downward Force Vector */}
                  <line x1={xPos} y1={175 + massCount * 6 + 5} x2={xPos} y2={175 + massCount * 6 + 35} stroke="#DC2626" strokeWidth="2" />
                  <polygon
                    points={`${xPos},${175 + massCount * 6 + 40} ${xPos - 4},${175 + massCount * 6 + 32} ${xPos + 4},${175 + massCount * 6 + 32}`}
                    fill="#DC2626"
                  />
                  <text x={xPos - 22} y={175 + massCount * 6 + 52} fontSize="9" fill="#DC2626" fontWeight="bold">
                    W₁ = {leftForceN} N
                  </text>
                </g>
              )
            })()}

            {/* Right Load Assembly (at 350 + rightDistCm * 5) */}
            {(() => {
              const xPos = 350 + rightDistCm * 5
              const massCount = Math.max(1, Math.round(rightMassG / 100))
              return (
                <g>
                  {/* Distance line & label */}
                  <line x1="350" y1="120" x2={xPos} y2="120" stroke="#0284C7" strokeWidth="1" strokeDasharray="2 2" />
                  <text x={(xPos + 350) / 2 - 15} y="115" fontSize="9" fill="#0284C7" fontWeight="bold">
                    d₂ = {rightDistCm} cm
                  </text>

                  {/* Thread loop */}
                  <line x1={xPos} y1="146" x2={xPos} y2="175" stroke="#475569" strokeWidth="1.5" />
                  {/* Mass discs */}
                  {Array.from({ length: massCount }).map((_, idx) => (
                    <rect
                      key={`right-disc-${idx}`}
                      x={xPos - 14}
                      y={175 + idx * 6}
                      width="28"
                      height="5"
                      fill="#64748B"
                      stroke="#334155"
                      rx="1"
                    />
                  ))}
                  {/* Downward Force Vector */}
                  <line x1={xPos} y1={175 + massCount * 6 + 5} x2={xPos} y2={175 + massCount * 6 + 35} stroke="#DC2626" strokeWidth="2" />
                  <polygon
                    points={`${xPos},${175 + massCount * 6 + 40} ${xPos - 4},${175 + massCount * 6 + 32} ${xPos + 4},${175 + massCount * 6 + 32}`}
                    fill="#DC2626"
                  />
                  <text x={xPos - 22} y={175 + massCount * 6 + 52} fontSize="9" fill="#DC2626" fontWeight="bold">
                    W₂ = {rightForceN} N
                  </text>
                </g>
              )
            })()}
          </g>
        </svg>
      </div>

      {/* Equilibrium Status Banner */}
      <div
        className={`mb-6 rounded-xl border p-4 text-sm font-semibold ${
          result.isBalanced
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
            : result.netMomentNCm > 0
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            : 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300'
        }`}
      >
        {result.isBalanced ? (
          <T value={MOMENTS_LAB.equilibriumBalanced} />
        ) : result.netMomentNCm > 0 ? (
          <T value={MOMENTS_LAB.equilibriumUnbalancedCw} />
        ) : (
          <T value={MOMENTS_LAB.equilibriumUnbalancedAcw} />
        )}
      </div>

      {/* Interactive Controls & Calculation Matrix */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Side Controls (Anticlockwise) */}
        <div className="space-y-4 rounded-xl border border-line bg-surface-muted p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-content">
            <T value={MOMENTS_LAB.anticlockwiseHeading} />
          </h4>
          <div>
            <label className="mb-1 block text-xs text-content-muted">
              <T value={MOMENTS_LAB.load1Mass} /> {leftMassG} g ({leftForceN} N)
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={leftMassG}
              onChange={(e) => setLeftMassG(parseInt(e.target.value, 10))}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-content-muted">
              <T value={MOMENTS_LAB.load1Dist} /> {leftDistCm} cm ({(leftDistCm / 100).toFixed(2)} m)
            </label>
            <input
              type="range"
              min="5"
              max="45"
              step="5"
              value={leftDistCm}
              onChange={(e) => setLeftDistCm(parseInt(e.target.value, 10))}
              className="w-full accent-accent"
            />
          </div>
          <div className="rounded-lg border border-line bg-surface p-3">
            <span className="text-xs text-content-muted">Anticlockwise Moment (F₁ × d₁):</span>
            <p className="text-lg font-bold text-accent">
              {leftForceN} N × {leftDistCm} cm = {result.anticlockwiseMomentNCm} N·cm ({(result.anticlockwiseMomentNCm / 100).toFixed(3)} N·m)
            </p>
          </div>
        </div>

        {/* Right Side Controls (Clockwise) */}
        <div className="space-y-4 rounded-xl border border-line bg-surface-muted p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-content">
            <T value={MOMENTS_LAB.clockwiseHeading} />
          </h4>
          <div>
            <label className="mb-1 block text-xs text-content-muted">
              <T value={MOMENTS_LAB.load2Mass} /> {rightMassG} g ({rightForceN} N)
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={rightMassG}
              onChange={(e) => setRightMassG(parseInt(e.target.value, 10))}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-content-muted">
              <T value={MOMENTS_LAB.load2Dist} /> {rightDistCm} cm ({(rightDistCm / 100).toFixed(2)} m)
            </label>
            <input
              type="range"
              min="5"
              max="45"
              step="5"
              value={rightDistCm}
              onChange={(e) => setRightDistCm(parseInt(e.target.value, 10))}
              className="w-full accent-accent"
            />
          </div>
          <div className="rounded-lg border border-line bg-surface p-3">
            <span className="text-xs text-content-muted">Clockwise Moment (F₂ × d₂):</span>
            <p className="text-lg font-bold text-accent">
              {rightForceN} N × {rightDistCm} cm = {result.clockwiseMomentNCm} N·cm ({(result.clockwiseMomentNCm / 100).toFixed(3)} N·m)
            </p>
          </div>
        </div>
      </div>

      {/* Upward Support Force Card */}
      <div className="mt-4 rounded-xl border border-line bg-surface-muted p-4 text-xs text-content">
        <span className="font-semibold text-accent">
          <T value={MOMENTS_LAB.pivotForce} />
        </span>{' '}
        R = {leftForceN} N + {rightForceN} N = {result.totalDownwardForceN} N (Satisfies translational equilibrium: ΣF_up = ΣF_down).
      </div>

      {/* Examiner Notes */}
      <div className="mt-6 border-t border-line pt-4">
        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
          Examiner Practical Takeaway
        </h4>
        <p className="text-xs leading-relaxed text-content-muted">
          <T value={extra.examinerNotes} />
        </p>
      </div>
    </div>
  )
}
