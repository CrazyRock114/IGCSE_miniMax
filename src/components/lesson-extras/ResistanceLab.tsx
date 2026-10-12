import { useState } from 'react'
import type { ResistanceLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { RESISTANCE_LAB } from '@/lib/lessonExtrasStrings'
import { calculateComponentIV, type ComponentKind } from '@/content/resistanceLabData'

interface ResistanceLabProps {
  extra: ResistanceLabExtra
}

export function ResistanceLab({ extra }: ResistanceLabProps) {
  const [selectedKind, setSelectedKind] = useState<ComponentKind>('resistor')
  const [voltageV, setVoltageV] = useState<number>(4.0)

  const state = calculateComponentIV(selectedKind, voltageV)

  // Generate 20 points for graph curve
  const graphPoints = Array.from({ length: 21 }, (_, idx) => {
    const v = idx * 0.5
    return calculateComponentIV(selectedKind, v)
  })

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

      {/* Component Selector Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {extra.components.map((comp) => (
          <button
            key={comp.id}
            type="button"
            onClick={() => setSelectedKind(comp.id as ComponentKind)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              selectedKind === comp.id
                ? 'bg-accent text-white shadow-sm'
                : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
            }`}
          >
            <T value={comp.name} />
          </button>
        ))}
      </div>

      {/* Circuit & Graph Dual Panel Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Panel: Circuit Schematic (5 cols) */}
        <div className="flex flex-col rounded-xl border border-line bg-surface-elevated p-4 lg:col-span-5">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">
            <T value={RESISTANCE_LAB.circuitHeading} />
          </h4>
          <svg viewBox="0 0 320 280" className="mx-auto w-full max-w-[280px]">
            {/* Main circuit loop wires */}
            <path
              d="M 50,50 L 270,50 L 270,220 L 50,220 Z"
              fill="none"
              stroke="#64748B"
              strokeWidth="2.5"
            />

            {/* Variable DC Power Supply at top (50 to 150) */}
            <rect x="130" y="38" width="60" height="24" fill="#334155" rx="3" />
            <text x="138" y="54" fontSize="11" fill="#FFFFFF" fontWeight="bold">
              DC {voltageV.toFixed(1)}V
            </text>
            {/* Variable rheostat arrow across DC */}
            <line x1="120" y1="68" x2="200" y2="32" stroke="#EF4444" strokeWidth="2" />
            <polygon points="202,30 193,34 198,39" fill="#EF4444" />

            {/* Series Ammeter on right wire (x=270, y=135) */}
            <circle cx="270" cy="135" r="18" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
            <text x="264" y="141" fontSize="16" fill="#0284C7" fontWeight="bold">
              A
            </text>
            <text x="210" y="165" fontSize="9" fill="#0284C7" fontWeight="bold">
              I = {state.currentA.toFixed(2)}A
            </text>

            {/* Component Under Test at bottom wire (x=160, y=220) */}
            <rect x="130" y="208" width="60" height="24" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
            {selectedKind === 'resistor' && (
              <text x="145" y="224" fontSize="11" fill="#0F172A" fontWeight="bold">
                [ R ]
              </text>
            )}
            {selectedKind === 'filament' && (
              <g>
                <circle cx="160" cy="220" r="12" fill="none" stroke="#0F172A" strokeWidth="1.5" />
                <line x1="152" y1="212" x2="168" y2="228" stroke="#0F172A" strokeWidth="1.5" />
                <line x1="152" y1="228" x2="168" y2="212" stroke="#0F172A" strokeWidth="1.5" />
              </g>
            )}
            {selectedKind === 'diode' && (
              <g>
                <polygon points="152,212 152,228 166,220" fill="#0F172A" />
                <line x1="166" y1="212" x2="166" y2="228" stroke="#0F172A" strokeWidth="2" />
              </g>
            )}
            {selectedKind === 'thermistor' && (
              <g>
                <line x1="135" y1="230" x2="150" y2="230" stroke="#0F172A" strokeWidth="1.5" />
                <line x1="150" y1="230" x2="185" y2="210" stroke="#0F172A" strokeWidth="1.5" />
              </g>
            )}

            {/* Parallel Voltmeter branch around bottom component */}
            <path
              d="M 110,220 L 110,260 L 210,260 L 210,220"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <circle cx="160" cy="260" r="15" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <text x="155" y="265" fontSize="14" fill="#D97706" fontWeight="bold">
              V
            </text>
            <text x="180" y="275" fontSize="9" fill="#D97706" fontWeight="bold">
              {voltageV.toFixed(1)}V
            </text>
          </svg>
          <div className="mt-2 text-center text-[10px] text-content-muted">
            <T value={RESISTANCE_LAB.ammeterPlacementNotice} />
          </div>
        </div>

        {/* Right Panel: I-V Curve Graph (7 cols) */}
        <div className="flex flex-col justify-between rounded-xl border border-line bg-surface-elevated p-4 lg:col-span-7">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">
            <T value={RESISTANCE_LAB.graphHeading} />
          </h4>
          <svg viewBox="0 0 360 220" className="w-full" aria-label="I-V Characteristic Curve">
            {/* Axes */}
            <line x1="40" y1="180" x2="340" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="40" y1="180" x2="40" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Axis labels */}
            <text x="315" y="196" fontSize="10" fill="#64748B" fontWeight="bold">
              V (Volts)
            </text>
            <text x="12" y="25" fontSize="10" fill="#64748B" fontWeight="bold">
              I (A)
            </text>

            {/* Ticks on V axis */}
            {[0, 2, 4, 6, 8, 10].map((vTick) => (
              <g key={`v-${vTick}`}>
                <line x1={40 + vTick * 28} y1="180" x2={40 + vTick * 28} y2="185" stroke="#94A3B8" />
                <text x={36 + vTick * 28} y="195" fontSize="8" fill="#94A3B8">
                  {vTick}
                </text>
              </g>
            ))}

            {/* Ticks on I axis */}
            {[0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4].map((iTick) => (
              <g key={`i-${iTick}`}>
                <line x1="35" y1={180 - iTick * 110} x2="40" y2={180 - iTick * 110} stroke="#94A3B8" />
                <text x="18" y={183 - iTick * 110} fontSize="8" fill="#94A3B8">
                  {iTick.toFixed(1)}
                </text>
              </g>
            ))}

            {/* Graph Curve Path */}
            {(() => {
              const dParts = ['M 40,180']
              graphPoints.forEach((pt) => {
                const x = 40 + pt.voltageV * 28
                const y = Math.max(20, 180 - pt.currentA * 110)
                dParts.push(`L ${x},${y}`)
              })
              return (
                <path
                  d={dParts.join(' ')}
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                />
              )
            })()}

            {/* Active Operating Point */}
            <circle
              cx={40 + state.voltageV * 28}
              cy={Math.max(20, 180 - state.currentA * 110)}
              r="6"
              fill="#F59E0B"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>

          {/* Physical Mechanism Description */}
          <div className="mt-3 rounded-lg border border-line bg-surface p-3 text-xs leading-relaxed text-content">
            <T value={state.physicalExplanation} />
          </div>
        </div>
      </div>

      {/* Voltage Slider Control */}
      <div className="mt-6 rounded-xl border border-line bg-surface-muted p-4">
        <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
          <T value={RESISTANCE_LAB.voltageControl} /> {voltageV.toFixed(1)} V
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.2"
          value={voltageV}
          onChange={(e) => setVoltageV(parseFloat(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      {/* Numerical Data Grid */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={RESISTANCE_LAB.voltmeterReadout} />
          </span>
          <p className="text-lg font-bold text-content">{voltageV.toFixed(2)} V</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={RESISTANCE_LAB.ammeterReadout} />
          </span>
          <p className="text-lg font-bold text-content">{state.currentA.toFixed(3)} A</p>
        </div>
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-3">
          <span className="text-xs text-accent">
            <T value={RESISTANCE_LAB.resistanceCalculated} />
          </span>
          <p className="text-2xl font-extrabold text-accent">
            {state.resistanceOhm > 900 ? '> 999 Ω (Non-conducting)' : `${state.resistanceOhm} Ω`}
          </p>
        </div>
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
