import { useState } from 'react'
import type { TransformerLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { TRANSFORMER_LAB } from '@/lib/lessonExtrasStrings'
import { calculateTransformer } from '@/content/transformerLabData'

interface TransformerLabProps {
  extra: TransformerLabExtra
}

export function TransformerLab({ extra }: TransformerLabProps) {
  const [primaryTurns, setPrimaryTurns] = useState<number>(100)
  const [secondaryTurns, setSecondaryTurns] = useState<number>(400)
  const [primaryVoltageV, setPrimaryVoltageV] = useState<number>(20)

  const result = calculateTransformer(primaryTurns, secondaryTurns, primaryVoltageV)

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
        {extra.presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => {
              setPrimaryTurns(preset.primaryTurns)
              setSecondaryTurns(preset.secondaryTurns)
              setPrimaryVoltageV(preset.primaryVoltageV)
            }}
            className="rounded-lg border border-line bg-surface-muted px-3 py-1.5 text-xs font-medium text-content transition-colors hover:bg-surface-elevated"
          >
            <T value={preset.name} />
          </button>
        ))}
      </div>

      {/* Transformer Core & Coils SVG Schematic */}
      <div className="mb-6 overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
        <svg
          viewBox="0 0 680 300"
          className="mx-auto w-full max-w-[620px]"
          aria-label="Electromagnetic Transformer Soft Iron Core and Coils"
        >
          {/* Laminated Soft Iron Core Outer Loop */}
          <rect x="140" y="40" width="400" height="220" rx="10" fill="#475569" stroke="#334155" strokeWidth="3" />
          {/* Inner Core Cutout */}
          <rect x="220" y="85" width="240" height="130" rx="6" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />

          {/* Lamination Stripe Texture */}
          {[160, 200, 480, 520].map((xLine) => (
            <line key={`lam-${xLine}`} x1={xLine} y1="40" x2={xLine} y2="260" stroke="#64748B" strokeWidth="1" />
          ))}

          {/* Core Label */}
          <text x="245" y="155" fontSize="11" fill="#64748B" fontWeight="bold">
            Soft Iron Core (Guides Flux)
          </text>

          {/* Magnetic Flux Path Loop (Dashed Orange Loop) */}
          <rect
            x="180"
            y="62"
            width="320"
            height="176"
            rx="8"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <polygon points="340,62 330,57 330,67" fill="#F59E0B" />
          <polygon points="340,238 350,233 350,243" fill="#F59E0B" />
          <text x="315" y="78" fontSize="10" fill="#D97706" fontWeight="bold">
            Flux Φ
          </text>

          {/* Primary Coil (Left Leg: x = 140 to 220) */}
          <g>
            <rect x="125" y="75" width="30" height="150" fill="#B45309" opacity="0.15" rx="4" />
            {Array.from({ length: Math.min(14, Math.max(4, Math.round(primaryTurns / 30))) }).map((_, idx) => (
              <g key={`pri-turn-${idx}`}>
                <ellipse cx="140" cy={90 + idx * 10} rx="18" ry="5" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
              </g>
            ))}
            {/* Primary input terminals */}
            <line x1="60" y1="90" x2="135" y2="90" stroke="#1E293B" strokeWidth="2" />
            <line x1="60" y1="210" x2="135" y2="210" stroke="#1E293B" strokeWidth="2" />
            {/* AC Symbol circle */}
            <circle cx="50" cy="150" r="16" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
            <text x="44" y="155" fontSize="16" fill="#0284C7" fontWeight="bold">
              ~
            </text>
            <text x="20" y="185" fontSize="10" fill="#0284C7" fontWeight="bold">
              Vₚ = {result.primaryVoltageV} V
            </text>
            <text x="20" y="200" fontSize="9" fill="#64748B">
              Iₚ = {result.primaryCurrentA} A
            </text>
            <text x="110" y="250" fontSize="10" fill="#B45309" fontWeight="bold">
              Nₚ = {primaryTurns} turns
            </text>
          </g>

          {/* Secondary Coil (Right Leg: x = 460 to 540) */}
          <g>
            <rect x="525" y="75" width="30" height="150" fill="#B45309" opacity="0.15" rx="4" />
            {Array.from({ length: Math.min(14, Math.max(4, Math.round(secondaryTurns / 40))) }).map((_, idx) => (
              <g key={`sec-turn-${idx}`}>
                <ellipse cx="540" cy={90 + idx * 10} rx="18" ry="5" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
              </g>
            ))}
            {/* Secondary output terminals */}
            <line x1="545" y1="90" x2="620" y2="90" stroke="#1E293B" strokeWidth="2" />
            <line x1="545" y1="210" x2="620" y2="210" stroke="#1E293B" strokeWidth="2" />
            {/* Load lamp / voltmeter symbol */}
            <circle cx="630" cy="150" r="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <text x="624" y="155" fontSize="14" fill="#D97706" fontWeight="bold">
              Vₛ
            </text>
            <text x="590" y="185" fontSize="10" fill="#D97706" fontWeight="bold">
              Vₛ = {result.secondaryVoltageV} V
            </text>
            <text x="590" y="200" fontSize="9" fill="#64748B">
              Iₛ = {result.secondaryCurrentA} A
            </text>
            <text x="490" y="250" fontSize="10" fill="#B45309" fontWeight="bold">
              Nₛ = {secondaryTurns} turns
            </text>
          </g>
        </svg>
      </div>

      {/* Step-Up / Step-Down Status Banner */}
      <div
        className={`mb-6 rounded-xl border p-4 text-sm font-semibold ${
          result.isStepUp
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            : 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300'
        }`}
      >
        {result.isStepUp ? (
          <T value={TRANSFORMER_LAB.badgeStepUp} />
        ) : (
          <T value={TRANSFORMER_LAB.badgeStepDown} />
        )}
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface-muted p-4">
          <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
            <T value={TRANSFORMER_LAB.primaryTurnsSlider} /> {primaryTurns}
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={primaryTurns}
            onChange={(e) => setPrimaryTurns(parseInt(e.target.value, 10))}
            className="w-full accent-accent"
          />
        </div>

        <div className="rounded-xl border border-line bg-surface-muted p-4">
          <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
            <T value={TRANSFORMER_LAB.secondaryTurnsSlider} /> {secondaryTurns}
          </label>
          <input
            type="range"
            min="20"
            max="1000"
            step="20"
            value={secondaryTurns}
            onChange={(e) => setSecondaryTurns(parseInt(e.target.value, 10))}
            className="w-full accent-accent"
          />
        </div>

        <div className="rounded-xl border border-line bg-surface-muted p-4">
          <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
            <T value={TRANSFORMER_LAB.primaryVoltageSlider} /> {primaryVoltageV} V
          </label>
          <input
            type="range"
            min="10"
            max="240"
            step="5"
            value={primaryVoltageV}
            onChange={(e) => setPrimaryVoltageV(parseInt(e.target.value, 10))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      {/* Quantitative Voltage & Current Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">Turns Ratio (Nₛ/Nₚ):</span>
          <p className="text-base font-bold text-content">{result.turnsRatio}×</p>
        </div>
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-3">
          <span className="text-xs text-accent">
            <T value={TRANSFORMER_LAB.secondaryVoltageLabel} />
          </span>
          <p className="text-xl font-extrabold text-accent">{result.secondaryVoltageV} V</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={TRANSFORMER_LAB.primaryCurrentLabel} />
          </span>
          <p className="text-base font-bold text-content">{result.primaryCurrentA} A</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={TRANSFORMER_LAB.secondaryCurrentLabel} />
          </span>
          <p className="text-base font-bold text-content">{result.secondaryCurrentA} A</p>
        </div>
      </div>

      {/* National Grid High-Voltage Transmission Energy Efficiency Card */}
      <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
          <T value={TRANSFORMER_LAB.gridLossHeading} />
        </h4>
        <p className="mb-3 text-xs text-content-muted">
          <T value={TRANSFORMER_LAB.gridLossCompare} />
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-surface p-3">
            <span className="text-[11px] text-content-muted">Cable Loss at Low Vₚ ({result.primaryVoltageV}V):</span>
            <p className="text-sm font-bold text-red-600 dark:text-red-400">
              ({result.primaryCurrentA}A)² × 4Ω = {result.lossAtVpW} W
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-3">
            <span className="text-[11px] text-content-muted">Cable Loss at Stepped-Up Vₛ ({result.secondaryVoltageV}V):</span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              ({result.secondaryCurrentA}A)² × 4Ω = {result.lossAtVsW} W
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-3">
            <span className="text-[11px] text-content-muted">Loss Reduction Factor:</span>
            <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {result.lossReductionRatio}× Less Waste!
            </p>
          </div>
        </div>
      </div>

      {/* AC Necessity Notice */}
      <div className="mt-4 rounded-xl border border-line bg-surface-muted p-3 text-xs leading-relaxed text-content-muted">
        <T value={TRANSFORMER_LAB.acNotice} />
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
