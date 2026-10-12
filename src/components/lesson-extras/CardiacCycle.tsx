import { useState, useEffect } from 'react'
import type { CardiacCycleExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { CARDIAC_CYCLE } from '@/lib/lessonExtrasStrings'
import {
  CARDIAC_PHASES,
  getCardiacStateAtTime,
} from '@/content/cardiacCycleData'

type ActiveTab = 'animation' | 'pressure' | 'matrix'

export function CardiacCycle({ extra }: { extra: CardiacCycleExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('animation')
  const [timeSec, setTimeSec] = useState<number>(0.2)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // Autoplay ticker
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setTimeSec((prev) => {
        const next = Number((prev + 0.02).toFixed(2))
        return next >= 0.8 ? 0.0 : next
      })
    }, 50)
    return () => clearInterval(timer)
  }, [isPlaying])

  const state = getCardiacStateAtTime(timeSec)
  const currentPhase = state.phase

  // Pressure chart calculations
  // X: 0.0 to 0.8s mapped to 60px -> 620px (700px per second)
  // Y: 0 to 140 mmHg mapped to 190px -> 20px
  const getX = (t: number) => 60 + (t / 0.8) * 560
  const getY = (val: number) => 190 - (val / 140) * 170

  const timeSamples = Array.from({ length: 41 }, (_, i) => Number((i * 0.02).toFixed(2)))
  const sampleStates = timeSamples.map((t) => getCardiacStateAtTime(t))

  const lvPath = sampleStates
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${getX(s.time).toFixed(1)} ${getY(s.lvPressure).toFixed(1)}`)
    .join(' ')
  const aortaPath = sampleStates
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${getX(s.time).toFixed(1)} ${getY(s.aortaPressure).toFixed(1)}`)
    .join(' ')
  const laPath = sampleStates
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${getX(s.time).toFixed(1)} ${getY(s.laPressure).toFixed(1)}`)
    .join(' ')

  const cursorX = getX(timeSec)

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-line">
        <button
          type="button"
          onClick={() => setActiveTab('animation')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'animation'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={CARDIAC_CYCLE.tabAnimation} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pressure')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'pressure'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={CARDIAC_CYCLE.tabPressure} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'matrix'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={CARDIAC_CYCLE.tabValvesTable} />
        </button>
      </div>

      {activeTab === 'animation' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Heart SVG & Scrubber (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-xl border border-line bg-surface p-4 select-none">
              <svg viewBox="0 0 520 380" className="w-full text-ink">
                {/* Background */}
                <rect x="0" y="0" width="520" height="380" fill="currentColor" fillOpacity="0.02" rx="10" />

                {/* Heart Base Anatomy Diagram */}
                {/* Aorta (Arches over left) */}
                <path
                  d="M 270 170 C 270 80 340 70 380 110 L 390 120 L 370 135 C 345 105 295 110 295 170 Z"
                  fill="#DC2626"
                  fillOpacity="0.35"
                  stroke="#DC2626"
                  strokeWidth="2"
                />
                <text x="360" y="90" fontSize="10" fill="#DC2626" fontWeight="bold">Aorta</text>

                {/* Pulmonary Artery */}
                <path
                  d="M 230 170 C 230 90 160 80 130 110 L 120 120 L 140 135 C 160 110 205 115 205 170 Z"
                  fill="#0284C7"
                  fillOpacity="0.35"
                  stroke="#0284C7"
                  strokeWidth="2"
                />
                <text x="100" y="90" fontSize="10" fill="#0284C7" fontWeight="bold">Pulmonary Artery</text>

                {/* Outer Heart Silhouette */}
                <path
                  d="M 140 160 C 140 130 200 130 260 140 C 320 130 380 130 380 160 C 380 230 340 330 260 360 C 180 330 140 230 140 160 Z"
                  fill="#881337"
                  fillOpacity="0.15"
                  stroke="#9F1239"
                  strokeWidth="3"
                />

                {/* Central Septum separating left and right ventricles */}
                <path
                  d="M 252 170 L 252 350 L 268 350 L 268 170 Z"
                  fill="#BE123C"
                  fillOpacity="0.4"
                  stroke="#9F1239"
                  strokeWidth="1.5"
                />
                <text x="260" y="368" fontSize="9" textAnchor="middle" fill="currentColor" fillOpacity="0.5">
                  Septum
                </text>

                {/* Thick Myocardium Outer Wall of Left Ventricle */}
                <path
                  d="M 345 200 C 375 230 365 310 268 350 L 268 335 C 345 300 350 230 330 200 Z"
                  fill="#E11D48"
                  fillOpacity="0.4"
                />
                <text x="390" y="270" fontSize="9" fill="#E11D48" fontWeight="600">
                  Thick LV Wall
                </text>

                {/* Left Atrium & Right Atrium cavity outlines */}
                {/* Right Atrium (left side of diagram) */}
                <rect x="155" y="145" width="85" height="55" rx="8" fill="#0284C7" fillOpacity="0.1" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 2" />
                <text x="195" y="175" fontSize="10" textAnchor="middle" fill="#0284C7" fontWeight="bold">Right Atrium</text>

                {/* Left Atrium (right side of diagram) */}
                <rect x="280" y="145" width="85" height="55" rx="8" fill="#DC2626" fillOpacity="0.1" stroke="#DC2626" strokeWidth="1" strokeDasharray="3 2" />
                <text x="325" y="175" fontSize="10" textAnchor="middle" fill="#DC2626" fontWeight="bold">Left Atrium</text>

                {/* Left Ventricle cavity */}
                <path
                  d="M 275 220 C 275 280 310 300 330 250 C 340 220 320 220 275 220 Z"
                  fill="#DC2626"
                  fillOpacity={currentPhase.id === 'ventricular-systole' ? 0.35 : 0.15}
                />
                <text x="315" y="250" fontSize="11" textAnchor="middle" fill="#DC2626" fontWeight="bold">Left Ventricle</text>

                {/* Right Ventricle cavity */}
                <path
                  d="M 190 220 C 190 280 230 300 245 250 C 250 220 235 220 190 220 Z"
                  fill="#0284C7"
                  fillOpacity={currentPhase.id === 'ventricular-systole' ? 0.35 : 0.15}
                />
                <text x="220" y="250" fontSize="11" textAnchor="middle" fill="#0284C7" fontWeight="bold">Right Ventricle</text>

                {/* VALVES ANIMATION STATE */}
                {/* 1. Atrioventricular (AV) Valves (between Atria and Ventricles) */}
                {/* Right AV (Tricuspid) Valve */}
                <g transform="translate(195, 202)">
                  {currentPhase.avValves === 'open' ? (
                    <g stroke="#0284C7" strokeWidth="2.5">
                      {/* Open flaps pointing down */}
                      <line x1="-12" y1="0" x2="-4" y2="12" />
                      <line x1="12" y1="0" x2="4" y2="12" />
                      <text x="0" y="-4" fontSize="8" textAnchor="middle" fill="#10B981" fontWeight="bold">OPEN</text>
                    </g>
                  ) : (
                    <g stroke="#EF4444" strokeWidth="3">
                      {/* Closed flaps meeting in center */}
                      <line x1="-14" y1="0" x2="1" y2="2" />
                      <line x1="14" y1="0" x2="-1" y2="2" />
                      <text x="0" y="-4" fontSize="8" textAnchor="middle" fill="#EF4444" fontWeight="bold">SHUT</text>
                    </g>
                  )}
                </g>

                {/* Left AV (Bicuspid / Mitral) Valve */}
                <g transform="translate(325, 202)">
                  {currentPhase.avValves === 'open' ? (
                    <g stroke="#DC2626" strokeWidth="2.5">
                      <line x1="-12" y1="0" x2="-4" y2="12" />
                      <line x1="12" y1="0" x2="4" y2="12" />
                      <text x="0" y="-4" fontSize="8" textAnchor="middle" fill="#10B981" fontWeight="bold">OPEN</text>
                    </g>
                  ) : (
                    <g stroke="#EF4444" strokeWidth="3">
                      <line x1="-14" y1="0" x2="1" y2="2" />
                      <line x1="14" y1="0" x2="-1" y2="2" />
                      <text x="0" y="-4" fontSize="8" textAnchor="middle" fill="#EF4444" fontWeight="bold">SHUT</text>
                    </g>
                  )}
                  <text x="45" y="3" fontSize="9" fill="currentColor" fillOpacity="0.7">AV Valve</text>
                </g>

                {/* 2. Semilunar (SL) Valves (Aortic & Pulmonary) */}
                {/* Aortic Semilunar Valve */}
                <g transform="translate(285, 168)">
                  {currentPhase.slValves === 'open' ? (
                    <g stroke="#10B981" strokeWidth="2.5">
                      <line x1="-8" y1="0" x2="-2" y2="-10" />
                      <line x1="8" y1="0" x2="2" y2="-10" />
                      <text x="0" y="10" fontSize="8" textAnchor="middle" fill="#10B981" fontWeight="bold">OPEN</text>
                    </g>
                  ) : (
                    <g stroke="#EF4444" strokeWidth="3">
                      {/* Pocket cusps closed */}
                      <path d="M -8 0 Q 0 6 8 0" fill="none" />
                      <text x="0" y="12" fontSize="8" textAnchor="middle" fill="#EF4444" fontWeight="bold">SHUT</text>
                    </g>
                  )}
                  <text x="-35" y="5" fontSize="8" fill="currentColor" fillOpacity="0.7">SL Valve</text>
                </g>

                {/* Blood flow vector arrows in Ventricular Systole */}
                {currentPhase.id === 'ventricular-systole' && (
                  <g stroke="#EF4444" strokeWidth="3" fill="#EF4444">
                    <line x1="320" y1="230" x2="300" y2="150" strokeDasharray="4 2" />
                    <polygon points="300,145 295,155 305,155" />
                    <line x1="220" y1="230" x2="225" y2="150" strokeDasharray="4 2" stroke="#0284C7" />
                    <polygon points="225,145 220,155 230,155" fill="#0284C7" />
                  </g>
                )}

                {/* Heart Sound Auscultation Flash Banner */}
                {currentPhase.heartSound && (
                  <g transform="translate(260, 45)" className="animate-pulse">
                    <rect x="-110" y="-18" width="220" height="32" rx="16" fill="#F43F5E" fillOpacity="0.9" />
                    <text x="0" y="3" fontSize="11" textAnchor="middle" fill="#FFFFFF" fontWeight="bold">
                      🔔 {currentPhase.id === 'ventricular-systole' ? 'LUB (1st Sound)' : 'DUB (2nd Sound)'}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Scrubber Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:opacity-90"
                >
                  <T value={isPlaying ? CARDIAC_CYCLE.btnPause : CARDIAC_CYCLE.btnPlay} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false)
                    setTimeSec(0.0)
                  }}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/10"
                >
                  <T value={CARDIAC_CYCLE.btnReset} />
                </button>
              </div>

              {/* Time in cycle & Phase jump buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false)
                    setTimeSec(0.05)
                  }}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                    currentPhase.id === 'atrial-systole' ? 'bg-accent text-white' : 'bg-white/5 text-ink/70'
                  }`}
                >
                  0.05s Atrial
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false)
                    setTimeSec(0.25)
                  }}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                    currentPhase.id === 'ventricular-systole' ? 'bg-accent text-white' : 'bg-white/5 text-ink/70'
                  }`}
                >
                  0.25s Ventricular
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false)
                    setTimeSec(0.6)
                  }}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                    currentPhase.id === 'diastole' ? 'bg-accent text-white' : 'bg-white/5 text-ink/70'
                  }`}
                >
                  0.60s Diastole
                </button>
              </div>
            </div>

            {/* Range Slider */}
            <div className="px-2">
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.02"
                value={timeSec}
                onChange={(e) => {
                  setIsPlaying(false)
                  setTimeSec(Number(e.target.value))
                }}
                className="w-full accent-accent cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[11px] text-ink/50">
                <span>0.0s (Atrial Systole)</span>
                <span>0.1s (Ventricular Systole)</span>
                <span>0.4s (Diastole)</span>
                <span>0.8s (Complete Cycle)</span>
              </div>
            </div>
          </div>

          {/* Telemetry Panel (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            {/* Phase Badge & Readout */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-ink/60">
                  <T value={CARDIAC_CYCLE.phaseLabel} />
                </span>
                <span className="font-mono text-sm font-bold text-accent">
                  {timeSec.toFixed(2)}s / 0.80s
                </span>
              </div>
              <h4 className="text-base font-bold text-ink">
                <T value={currentPhase.name} />
              </h4>

              {/* Valves Status Cards */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="rounded-lg border border-line bg-white/5 p-2.5">
                  <span className="text-[11px] text-ink/60 block">
                    <T value={CARDIAC_CYCLE.avValvesLabel} />
                  </span>
                  <span
                    className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-bold ${
                      currentPhase.avValves === 'open'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    <T value={currentPhase.avValves === 'open' ? CARDIAC_CYCLE.valveOpen : CARDIAC_CYCLE.valveClosed} />
                  </span>
                </div>

                <div className="rounded-lg border border-line bg-white/5 p-2.5">
                  <span className="text-[11px] text-ink/60 block">
                    <T value={CARDIAC_CYCLE.slValvesLabel} />
                  </span>
                  <span
                    className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-bold ${
                      currentPhase.slValves === 'open'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    <T value={currentPhase.slValves === 'open' ? CARDIAC_CYCLE.valveOpen : CARDIAC_CYCLE.valveClosed} />
                  </span>
                </div>
              </div>

              {/* Heart Sound Auscultation */}
              <div className="rounded-lg bg-pink-500/10 border border-pink-500/20 p-2.5 text-xs">
                <span className="text-pink-400/80 font-medium block">
                  <T value={CARDIAC_CYCLE.heartSoundLabel} />:
                </span>
                <span className="font-bold text-pink-300 mt-0.5 block">
                  {currentPhase.heartSound ? <T value={currentPhase.heartSound} /> : 'No valve closure sound (silent flow)'}
                </span>
              </div>
            </div>

            {/* Blood Flow & Mechanics */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-2 text-xs">
              <h5 className="font-semibold text-accent uppercase tracking-wide">
                <T value={CARDIAC_CYCLE.bloodFlowLabel} />
              </h5>
              <p className="leading-relaxed text-ink/80">
                <T value={currentPhase.bloodFlow} />
              </p>
              <h5 className="font-semibold text-accent uppercase tracking-wide pt-2">
                <T value={CARDIAC_CYCLE.pressureChangesLabel} />
              </h5>
              <p className="leading-relaxed text-ink/80">
                <T value={currentPhase.pressureNote} />
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pressure' && (
        <div className="space-y-4 rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-ink">
              <T value={CARDIAC_CYCLE.tabPressure} /> (0.0 — 0.8s)
            </h4>
            <span className="font-mono text-xs font-bold text-accent">
              LV: {state.lvPressure} mmHg | Aorta: {state.aortaPressure} mmHg
            </span>
          </div>

          {/* SVG Coordinate Wiggers Chart */}
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 680 230" className="w-full min-w-[580px] select-none text-ink">
              {/* Background grid */}
              <rect x="60" y="20" width="560" height="170" fill="currentColor" fillOpacity="0.02" />

              {/* Phase Background Shading */}
              <rect x="60" y="20" width={getX(0.1) - 60} height="170" fill="#3B82F6" fillOpacity="0.05" />
              <rect x={getX(0.1)} y="20" width={getX(0.4) - getX(0.1)} height="170" fill="#EF4444" fillOpacity="0.08" />
              <rect x={getX(0.4)} y="20" width={getX(0.8) - getX(0.4)} height="170" fill="#10B981" fillOpacity="0.04" />

              {/* Horizontal mmHg grid lines */}
              {[0, 20, 40, 80, 120].map((p) => (
                <g key={p}>
                  <line x1="60" y1={getY(p)} x2="620" y2={getY(p)} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                  <text x="52" y={getY(p) + 3} fontSize="9" textAnchor="end" fill="currentColor" fillOpacity="0.5">
                    {p}
                  </text>
                </g>
              ))}

              {/* X-axis tick labels */}
              {[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((t) => (
                <g key={t}>
                  <line x1={getX(t)} y1="190" x2={getX(t)} y2="195" stroke="currentColor" strokeOpacity="0.3" />
                  <text x={getX(t)} y="208" fontSize="10" textAnchor="middle" fill="currentColor" fillOpacity="0.6">
                    {t.toFixed(1)}s
                  </text>
                </g>
              ))}

              {/* Pressure curves */}
              {/* Left Ventricle (Red) */}
              <path d={lvPath} fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
              {/* Aorta (Blue) */}
              <path d={aortaPath} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
              {/* Left Atrium (Purple) */}
              <path d={laPath} fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 2" />

              {/* Vertical Scrubber Line */}
              <line x1={cursorX} y1="20" x2={cursorX} y2="195" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx={cursorX} cy={getY(state.lvPressure)} r="4" fill="#EF4444" stroke="#fff" strokeWidth="1.5" />
              <circle cx={cursorX} cy={getY(state.aortaPressure)} r="4" fill="#3B82F6" stroke="#fff" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs pt-2 border-t border-line/50">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
              <span className="font-semibold text-ink">Left Ventricle Pressure (peaks at 120 mmHg)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#3B82F6]" />
              <span className="font-semibold text-ink">Aorta Pressure (80 — 120 mmHg)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#A855F7]" />
              <span className="font-semibold text-ink">Left Atrium Pressure (low, ~4 — 10 mmHg)</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Summary Table */}
          <div className="rounded-xl border border-line bg-surface p-4">
            <h4 className="text-sm font-semibold text-ink mb-3">
              <T value={CARDIAC_CYCLE.tabValvesTable} />
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line text-ink/60">
                    <th className="py-2.5">Phase</th>
                    <th className="py-2.5">Duration</th>
                    <th className="py-2.5">AV Valves</th>
                    <th className="py-2.5">Semilunar Valves</th>
                    <th className="py-2.5">Heart Sound</th>
                  </tr>
                </thead>
                <tbody>
                  {CARDIAC_PHASES.map((p) => (
                    <tr key={p.id} className="border-b border-line/40">
                      <td className="py-3 font-semibold text-ink"><T value={p.name} /></td>
                      <td className="py-3 font-mono">{p.durationSec}s</td>
                      <td className="py-3">
                        <span className={`rounded px-2 py-0.5 font-bold ${p.avValves === 'open' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                          {p.avValves.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`rounded px-2 py-0.5 font-bold ${p.slValves === 'open' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                          {p.slValves.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-pink-400">
                        {p.heartSound ? <T value={p.heartSound} /> : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paper 4 Exam Tip Box */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs text-ink/80 leading-relaxed">
            <strong className="text-accent block text-sm mb-1">
              📝 Cambridge IGCSE Paper 4 Model Answer:
            </strong>
            <T value={extra.examinerNotes} />
          </div>
        </div>
      )}
    </div>
  )
}
