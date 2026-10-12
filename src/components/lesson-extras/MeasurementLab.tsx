import { useState } from 'react'
import type { MeasurementLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { MEASUREMENT_LAB } from '@/lib/lessonExtrasStrings'
import {
  calculateMicrometerReading,
  calculateVernierReading,
  calculatePendulumTiming,
} from '@/content/measurementLabData'

interface MeasurementLabProps {
  extra: MeasurementLabExtra
}

export function MeasurementLab({ extra }: MeasurementLabProps) {
  const [activeTab, setActiveTab] = useState<'micrometer' | 'vernier' | 'pendulum'>('micrometer')

  // Micrometer state
  const [sleeveMm, setSleeveMm] = useState<number>(3.5)
  const [thimbleDiv, setThimbleDiv] = useState<number>(24)
  const [micrometerZeroError, setMicrometerZeroError] = useState<number>(0.02)

  // Vernier state
  const [mainScaleMm, setMainScaleMm] = useState<number>(18)
  const [vernierDiv, setVernierDiv] = useState<number>(6)
  const [vernierZeroError, setVernierZeroError] = useState<number>(0.0)

  // Pendulum state
  const [pendulumLengthM, setPendulumLengthM] = useState<number>(0.5)
  const [isSwinging, setIsSwinging] = useState<boolean>(false)
  const [elapsed20Time, setElapsed20Time] = useState<number | null>(null)

  const micrometerResult = calculateMicrometerReading(sleeveMm, thimbleDiv, micrometerZeroError)
  const vernierResult = calculateVernierReading(mainScaleMm, vernierDiv, vernierZeroError)
  const pendulumResult = calculatePendulumTiming(pendulumLengthM)

  const handleStartPendulum = () => {
    setIsSwinging(true)
    setElapsed20Time(null)
    setTimeout(() => {
      setElapsed20Time(pendulumResult.time20Oscillations)
      setIsSwinging(false)
    }, 1200)
  }

  const handleResetPendulum = () => {
    setIsSwinging(false)
    setElapsed20Time(null)
  }

  return (
    <div className="my-8 rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-1 border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
            Paper 5 / Paper 6 Practical
          </span>
          <h3 className="text-xl font-bold text-content">
            <T value={extra.title} />
          </h3>
        </div>
        <p className="text-sm text-content-muted">
          <T value={extra.hint} />
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('micrometer')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'micrometer'
              ? 'bg-accent text-white shadow-sm'
              : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
          }`}
        >
          <T value={MEASUREMENT_LAB.tabMicrometer} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('vernier')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'vernier'
              ? 'bg-accent text-white shadow-sm'
              : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
          }`}
        >
          <T value={MEASUREMENT_LAB.tabVernier} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pendulum')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'pendulum'
              ? 'bg-accent text-white shadow-sm'
              : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
          }`}
        >
          <T value={MEASUREMENT_LAB.tabPendulum} />
        </button>
      </div>

      {/* Tab 1: Micrometer Screw Gauge */}
      {activeTab === 'micrometer' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSleeveMm(2.0)
                setThimbleDiv(38)
                setMicrometerZeroError(0.0)
              }}
              className="rounded-md border border-line bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content hover:bg-accent/10"
            >
              <T value={MEASUREMENT_LAB.btnPresetWire} />
            </button>
            <button
              type="button"
              onClick={() => {
                setSleeveMm(6.5)
                setThimbleDiv(34)
                setMicrometerZeroError(0.0)
              }}
              className="rounded-md border border-line bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content hover:bg-accent/10"
            >
              <T value={MEASUREMENT_LAB.btnPresetBearing} />
            </button>
          </div>

          {/* Micrometer SVG Diagram */}
          <div className="overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
            <svg
              viewBox="0 0 700 220"
              className="mx-auto w-full max-w-[650px]"
              aria-label="Micrometer Screw Gauge Scale"
            >
              {/* Frame */}
              <path
                d="M 60,60 C 20,90 20,150 60,180 L 160,180 C 120,150 120,90 160,60 Z"
                fill="#475569"
                stroke="#334155"
                strokeWidth="2"
              />
              <text x="75" y="125" fill="#94A3B8" fontSize="12" fontWeight="bold">
                0 - 25 mm
              </text>
              {/* Anvil */}
              <rect x="150" y="75" width="20" height="30" fill="#94A3B8" stroke="#64748B" />
              {/* Gap / object under test */}
              <rect
                x="170"
                y="78"
                width={Math.min(50, Math.max(5, micrometerResult.correctedReadingMm * 5))}
                height="24"
                fill="#F59E0B"
                opacity="0.8"
                rx="2"
              />
              {/* Spindle */}
              <rect
                x={170 + Math.min(50, Math.max(5, micrometerResult.correctedReadingMm * 5))}
                y="80"
                width="80"
                height="20"
                fill="#CBD5E1"
                stroke="#64748B"
              />
              {/* Sleeve (datum line and mm marks) */}
              <rect x="270" y="65" width="160" height="50" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
              <line x1="270" y1="90" x2="420" y2="90" stroke="#0F172A" strokeWidth="2" />
              {/* Millimeter ticks on sleeve */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => (
                <g key={`sleeve-tick-${tick}`}>
                  <line
                    x1={280 + tick * 12}
                    y1="75"
                    x2={280 + tick * 12}
                    y2="90"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                  />
                  {tick % 2 === 0 && (
                    <text x={276 + tick * 12} y="72" fontSize="9" fill="#0F172A" fontWeight="bold">
                      {tick}
                    </text>
                  )}
                  {/* Half mm tick */}
                  {tick < 10 && (
                    <line
                      x1={286 + tick * 12}
                      y1="90"
                      x2={286 + tick * 12}
                      y2="105"
                      stroke="#0F172A"
                      strokeWidth="1"
                    />
                  )}
                </g>
              ))}
              {/* Thimble */}
              <rect x="410" y="55" width="90" height="70" rx="4" fill="#64748B" stroke="#334155" strokeWidth="2" />
              {/* Thimble bevel and division ticks */}
              <path d="M 400,60 L 415,55 L 415,125 L 400,120 Z" fill="#94A3B8" stroke="#475569" />
              {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
                const tickNum = (thimbleDiv + offset + 50) % 50
                const yPos = 90 - offset * 9
                return (
                  <g key={`thimble-tick-${offset}`}>
                    <line x1="400" y1={yPos} x2="415" y2={yPos} stroke="#0F172A" strokeWidth="1.5" />
                    <text x="420" y={yPos + 3} fontSize="10" fill="#FFFFFF" fontWeight="bold">
                      {tickNum}
                    </text>
                  </g>
                )
              })}
              {/* Ratchet knob */}
              <rect x="500" y="70" width="40" height="40" fill="#475569" stroke="#334155" rx="2" />
              <line x1="510" y1="70" x2="510" y2="110" stroke="#64748B" />
              <line x1="520" y1="70" x2="520" y2="110" stroke="#64748B" />
              <line x1="530" y1="70" x2="530" y2="110" stroke="#64748B" />
            </svg>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={MEASUREMENT_LAB.sleeveReading} /> {sleeveMm.toFixed(1)} mm
              </label>
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={sleeveMm}
                onChange={(e) => setSleeveMm(parseFloat(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-2 text-xs text-content-muted">
                (Whole mm on top line + 0.5 mm tick on bottom line)
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={MEASUREMENT_LAB.thimbleReading} /> {thimbleDiv} div ({(thimbleDiv * 0.01).toFixed(2)} mm)
              </label>
              <input
                type="range"
                min="0"
                max="49"
                step="1"
                value={thimbleDiv}
                onChange={(e) => setThimbleDiv(parseInt(e.target.value, 10))}
                className="w-full accent-accent"
              />
              <div className="mt-2 text-xs text-content-muted">
                (50 divisions around circumference = 0.5 mm pitch)
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={MEASUREMENT_LAB.zeroErrorSetting} /> {micrometerZeroError > 0 ? `+${micrometerZeroError.toFixed(2)}` : micrometerZeroError.toFixed(2)} mm
              </label>
              <input
                type="range"
                min="-0.04"
                max="0.04"
                step="0.01"
                value={micrometerZeroError}
                onChange={(e) => setMicrometerZeroError(parseFloat(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-2 text-xs text-content-muted">
                <T value={MEASUREMENT_LAB.zeroErrorHint} />
              </div>
            </div>
          </div>

          {/* Reading Summary Card */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <span className="text-xs text-content-muted">
                  <T value={MEASUREMENT_LAB.rawReading} />
                </span>
                <p className="text-lg font-bold text-content">
                  {sleeveMm.toFixed(2)} + {(thimbleDiv * 0.01).toFixed(2)} = {micrometerResult.rawReadingMm.toFixed(2)} mm
                </p>
              </div>
              <div>
                <span className="text-xs text-content-muted">
                  <T value={MEASUREMENT_LAB.zeroErrorSetting} />
                </span>
                <p className="text-lg font-bold text-content">
                  {micrometerZeroError >= 0 ? `+${micrometerZeroError.toFixed(2)}` : micrometerZeroError.toFixed(2)} mm
                </p>
              </div>
              <div>
                <span className="text-xs text-accent">
                  <T value={MEASUREMENT_LAB.correctedReading} />
                </span>
                <p className="text-2xl font-extrabold text-accent">
                  {micrometerResult.correctedReadingMm.toFixed(2)} mm
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vernier Callipers */}
      {activeTab === 'vernier' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setMainScaleMm(24)
                setVernierDiv(7)
                setVernierZeroError(0.0)
              }}
              className="rounded-md border border-line bg-surface-elevated px-3 py-1.5 text-xs font-medium text-content hover:bg-accent/10"
            >
              <T value={MEASUREMENT_LAB.btnPresetTube} />
            </button>
          </div>

          {/* Vernier SVG Diagram */}
          <div className="overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
            <svg
              viewBox="0 0 700 200"
              className="mx-auto w-full max-w-[650px]"
              aria-label="Vernier Calliper Scale"
            >
              {/* Main beam */}
              <rect x="40" y="40" width="620" height="70" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
              {/* Fixed Jaw */}
              <path d="M 40,40 L 40,170 L 65,170 L 65,110 L 80,110 L 80,40 Z" fill="#94A3B8" stroke="#475569" />
              {/* Main scale markings (0 to 50 mm) */}
              {[...Array(35)].map((_, i) => (
                <g key={`main-scale-${i}`}>
                  <line
                    x1={80 + i * 16}
                    y1="100"
                    x2={80 + i * 16}
                    y2={i % 10 === 0 ? '75' : i % 5 === 0 ? '82' : '88'}
                    stroke="#0F172A"
                    strokeWidth={i % 5 === 0 ? '2' : '1'}
                  />
                  {i % 10 === 0 && (
                    <text x={76 + i * 16} y="70" fontSize="10" fill="#0F172A" fontWeight="bold">
                      {i}
                    </text>
                  )}
                </g>
              ))}

              {/* Sliding Vernier Vernier Jaw */}
              <g transform={`translate(${mainScaleMm * 16 + vernierDiv * 1.6}, 0)`}>
                <path
                  d="M 80,105 L 80,170 L 105,170 L 105,115 L 260,115 L 260,105 Z"
                  fill="#64748B"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Vernier Scale window and 10 markings */}
                <rect x="80" y="105" width="170" height="35" fill="#CBD5E1" stroke="#475569" />
                <text x="85" y="132" fontSize="9" fill="#0F172A" fontWeight="bold">
                  0
                </text>
                <text x="235" y="132" fontSize="9" fill="#0F172A" fontWeight="bold">
                  10
                </text>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((vTick) => {
                  const isCoincident = vTick === vernierDiv
                  return (
                    <g key={`vernier-tick-${vTick}`}>
                      <line
                        x1={85 + vTick * 14.4}
                        y1="105"
                        x2={85 + vTick * 14.4}
                        y2={vTick % 5 === 0 ? '120' : '115'}
                        stroke={isCoincident ? '#DC2626' : '#0F172A'}
                        strokeWidth={isCoincident ? '2.5' : '1.2'}
                      />
                      {isCoincident && (
                        <circle cx={85 + vTick * 14.4} cy="125" r="3" fill="#DC2626" />
                      )}
                    </g>
                  )
                })}
              </g>
            </svg>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={MEASUREMENT_LAB.mainScale} /> {mainScaleMm} mm
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={mainScaleMm}
                onChange={(e) => setMainScaleMm(parseInt(e.target.value, 10))}
                className="w-full accent-accent"
              />
              <div className="mt-2 text-xs text-content-muted">
                (Look at the position immediately to the left of vernier zero mark)
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={MEASUREMENT_LAB.vernierCoincidence} /> {vernierDiv} ({(vernierDiv * 0.1).toFixed(1)} mm)
              </label>
              <input
                type="range"
                min="0"
                max="9"
                step="1"
                value={vernierDiv}
                onChange={(e) => setVernierDiv(parseInt(e.target.value, 10))}
                className="w-full accent-accent"
              />
              <div className="mt-2 text-xs text-content-muted">
                (The red-highlighted line that aligns continuously with a main scale mark)
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-muted p-4">
              <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                <T value={MEASUREMENT_LAB.zeroErrorSetting} /> {vernierZeroError > 0 ? `+${vernierZeroError.toFixed(1)}` : vernierZeroError.toFixed(1)} mm
              </label>
              <input
                type="range"
                min="-0.3"
                max="0.3"
                step="0.1"
                value={vernierZeroError}
                onChange={(e) => setVernierZeroError(parseFloat(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-2 text-xs text-content-muted">
                <T value={MEASUREMENT_LAB.zeroErrorHint} />
              </div>
            </div>
          </div>

          {/* Reading Summary Card */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <span className="text-xs text-content-muted">
                  <T value={MEASUREMENT_LAB.rawReading} />
                </span>
                <p className="text-lg font-bold text-content">
                  {mainScaleMm} + {(vernierDiv * 0.1).toFixed(1)} = {vernierResult.rawReadingMm.toFixed(1)} mm
                </p>
              </div>
              <div>
                <span className="text-xs text-content-muted">
                  <T value={MEASUREMENT_LAB.zeroErrorSetting} />
                </span>
                <p className="text-lg font-bold text-content">
                  {vernierZeroError >= 0 ? `+${vernierZeroError.toFixed(1)}` : vernierZeroError.toFixed(1)} mm
                </p>
              </div>
              <div>
                <span className="text-xs text-accent">
                  <T value={MEASUREMENT_LAB.correctedReading} />
                </span>
                <p className="text-2xl font-extrabold text-accent">
                  {vernierResult.correctedReadingMm.toFixed(1)} mm
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Simple Pendulum Timing */}
      {activeTab === 'pendulum' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-surface-muted p-4 text-sm text-content">
            <T value={MEASUREMENT_LAB.reactionTimeNotice} />
          </div>

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            {/* Animated Pendulum SVG */}
            <div className="flex h-64 items-center justify-center rounded-xl border border-line bg-surface-elevated p-4">
              <svg viewBox="0 0 300 240" className="h-full w-full max-w-[280px]">
                {/* Stand & Clamp */}
                <rect x="20" y="20" width="10" height="200" fill="#64748B" />
                <rect x="10" y="215" width="80" height="15" fill="#475569" rx="2" />
                <rect x="20" y="20" width="130" height="8" fill="#64748B" />
                {/* Pivot point */}
                <circle cx="150" cy="24" r="4" fill="#0F172A" />

                {/* Equilibrium Fiducial Marker */}
                <line x1="150" y1="24" x2="150" y2="210" stroke="#94A3B8" strokeDasharray="4 4" strokeWidth="1" />
                <polygon points="145,210 155,210 150,200" fill="#EF4444" />
                <text x="160" y="205" fontSize="10" fill="#EF4444" fontWeight="bold">
                  Fiducial Marker (Equilibrium)
                </text>

                {/* String and Bob with swing animation */}
                <g
                  style={{
                    transformOrigin: '150px 24px',
                    animation: isSwinging ? 'pendulumSwing 1.2s ease-in-out infinite alternate' : 'none',
                  }}
                >
                  <line
                    x1="150"
                    y1="24"
                    x2="150"
                    y2={50 + pendulumLengthM * 120}
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="150"
                    cy={50 + pendulumLengthM * 120}
                    r="12"
                    fill="#3B82F6"
                    stroke="#1D4ED8"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>

            {/* Controls and Stopwatch */}
            <div className="space-y-4">
              <div className="rounded-xl border border-line bg-surface-muted p-4">
                <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
                  <T value={MEASUREMENT_LAB.pendulumLength} /> {pendulumLengthM.toFixed(2)} m
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="1.2"
                  step="0.05"
                  value={pendulumLengthM}
                  onChange={(e) => {
                    setPendulumLengthM(parseFloat(e.target.value))
                    handleResetPendulum()
                  }}
                  className="w-full accent-accent"
                />
                <div className="mt-2 text-xs text-content-muted">
                  Theory: T = 2π√(L/g). Longer string produces greater period T.
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleStartPendulum}
                  disabled={isSwinging}
                  className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 disabled:opacity-50"
                >
                  <T value={MEASUREMENT_LAB.startStopwatch} />
                </button>
                <button
                  type="button"
                  onClick={handleResetPendulum}
                  className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-content hover:bg-surface-elevated"
                >
                  <T value={MEASUREMENT_LAB.resetStopwatch} />
                </button>
              </div>

              {/* Stopwatch Results Display */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-content-muted">
                      <T value={MEASUREMENT_LAB.totalTime20} />
                    </span>
                    <p className="text-xl font-bold text-content">
                      {elapsed20Time !== null ? `${elapsed20Time.toFixed(2)} s` : isSwinging ? 'Timing...' : '--'}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-accent">
                      <T value={MEASUREMENT_LAB.periodCalculated} />
                    </span>
                    <p className="text-2xl font-extrabold text-accent">
                      {elapsed20Time !== null
                        ? `${(elapsed20Time / 20).toFixed(2)} s`
                        : '--'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
