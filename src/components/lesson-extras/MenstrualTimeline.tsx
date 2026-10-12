import { useState, useEffect } from 'react'
import type { MenstrualTimelineExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { MENSTRUAL_TIMELINE } from '@/lib/lessonExtrasStrings'
import { getHormoneLevels } from '@/content/menstrualCycleData'

export function MenstrualTimeline({ extra }: { extra: MenstrualTimelineExtra }) {
  const [day, setDay] = useState<number>(14)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isPregnant, setIsPregnant] = useState<boolean>(false)

  // Autoplay ticker
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setDay((prev) => (prev >= 28 ? 1 : prev + 1))
    }, 600)
    return () => clearInterval(timer)
  }, [isPlaying])

  const state = getHormoneLevels(day, isPregnant)

  // Generate path data for 28 days for each hormone
  // Coordinate map:
  // x: day 1 -> 50, day 28 -> 680 (width = 630 / 27 = 23.33px per day)
  // y: level 0 -> 190, level 100 -> 30 (height = 160)
  const getX = (d: number) => 50 + ((d - 1) / 27) * 630
  const getY = (val: number) => 190 - (val / 100) * 160

  const allDays = Array.from({ length: 28 }, (_, i) => i + 1)
  const allStates = allDays.map((d) => getHormoneLevels(d, isPregnant))

  const fshPath = allStates.map((s, i) => `${i === 0 ? 'M' : 'L'} ${getX(s.day).toFixed(1)} ${getY(s.fsh).toFixed(1)}`).join(' ')
  const oestrogenPath = allStates.map((s, i) => `${i === 0 ? 'M' : 'L'} ${getX(s.day).toFixed(1)} ${getY(s.oestrogen).toFixed(1)}`).join(' ')
  const lhPath = allStates.map((s, i) => `${i === 0 ? 'M' : 'L'} ${getX(s.day).toFixed(1)} ${getY(s.lh).toFixed(1)}`).join(' ')
  const progPath = allStates.map((s, i) => `${i === 0 ? 'M' : 'L'} ${getX(s.day).toFixed(1)} ${getY(s.progesterone).toFixed(1)}`).join(' ')

  const currentX = getX(day)

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:opacity-90"
          >
            <T value={isPlaying ? MENSTRUAL_TIMELINE.btnPause : MENSTRUAL_TIMELINE.btnPlay} />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false)
              setDay(1)
            }}
            className="rounded-lg border border-line bg-white/5 px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/10"
          >
            <T value={MENSTRUAL_TIMELINE.btnReset} />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false)
              setDay(14)
            }}
            className="rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-sm font-medium text-pink-400 transition-colors hover:bg-pink-500/20"
          >
            ⚡ Day 14 Ovulation
          </button>
        </div>

        {/* Pregnancy Toggle */}
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line bg-white/5 px-3.5 py-2 text-xs font-medium text-ink hover:bg-white/10">
          <input
            type="checkbox"
            checked={isPregnant}
            onChange={(e) => setIsPregnant(e.target.checked)}
            className="h-4 w-4 rounded accent-accent"
          />
          <T value={isPregnant ? MENSTRUAL_TIMELINE.pregnantToggle : MENSTRUAL_TIMELINE.normalToggle} />
        </label>
      </div>

      {/* Main Interactive Graph & Timeline Scrubber */}
      <div className="rounded-xl border border-line bg-surface p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-ink">
            <T value={MENSTRUAL_TIMELINE.hormonesHeading} />
          </h4>
          <span className="font-mono text-xs font-bold text-accent">
            <T value={MENSTRUAL_TIMELINE.dayLabel} /> {day} <T value={MENSTRUAL_TIMELINE.daySuffix} /> ({state.uterusPhase.toUpperCase()})
          </span>
        </div>

        {/* SVG Coordinate Chart */}
        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 720 220" className="w-full min-w-[620px] select-none text-ink">
            {/* Background Phase Bands */}
            {/* Menstruation: Day 1-5 */}
            <rect x="50" y="20" width={getX(5) - 50} height="180" fill="currentColor" fillOpacity="0.04" />
            <text x="54" y="32" fontSize="9" fill="currentColor" fillOpacity="0.5" fontWeight="600">
              Days 1-5 Flow
            </text>

            {/* Follicular: Day 5-13 */}
            <rect x={getX(5)} y="20" width={getX(13) - getX(5)} height="180" fill="#3B82F6" fillOpacity="0.03" />

            {/* Ovulation Window: Day 13-14 */}
            <rect x={getX(13)} y="20" width={getX(14.5) - getX(13)} height="180" fill="#EC4899" fillOpacity="0.12" />
            <text x={getX(13.2)} y="32" fontSize="9" fill="#EC4899" fontWeight="700">
              Day 14 Ovulation
            </text>

            {/* Luteal: Day 14-28 */}
            <rect x={getX(14.5)} y="20" width={680 - getX(14.5)} height="180" fill="#F59E0B" fillOpacity="0.03" />

            {/* Horizontal Grid lines */}
            <line x1="50" y1="30" x2="680" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
            <line x1="50" y1="110" x2="680" y2="110" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
            <line x1="50" y1="190" x2="680" y2="190" stroke="currentColor" strokeOpacity="0.2" />

            {/* Left Y Axis Labels */}
            <text x="42" y="34" fontSize="9" textAnchor="end" fill="currentColor" fillOpacity="0.4">100%</text>
            <text x="42" y="114" fontSize="9" textAnchor="end" fill="currentColor" fillOpacity="0.4">50%</text>
            <text x="42" y="194" fontSize="9" textAnchor="end" fill="currentColor" fillOpacity="0.4">0%</text>

            {/* X-axis Day ticks */}
            {[1, 5, 10, 14, 20, 25, 28].map((d) => (
              <g key={d}>
                <line x1={getX(d)} y1="190" x2={getX(d)} y2="195" stroke="currentColor" strokeOpacity="0.4" />
                <text x={getX(d)} y="207" fontSize="10" textAnchor="middle" fill="currentColor" fillOpacity="0.6">
                  {d}
                </text>
              </g>
            ))}

            {/* Curves */}
            {/* FSH (Blue) */}
            <path d={fshPath} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
            {/* Oestrogen (Green) */}
            <path d={oestrogenPath} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            {/* LH (Pink) */}
            <path d={lhPath} fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
            {/* Progesterone (Amber) */}
            <path d={progPath} fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

            {/* Active Vertical Scrubber Line */}
            <line
              x1={currentX}
              y1="20"
              x2={currentX}
              y2="195"
              stroke="#6366F1"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            {/* Hormone Intersection Points at current day */}
            <circle cx={currentX} cy={getY(state.fsh)} r="4" fill="#3B82F6" stroke="#fff" strokeWidth="1.5" />
            <circle cx={currentX} cy={getY(state.oestrogen)} r="4" fill="#10B981" stroke="#fff" strokeWidth="1.5" />
            <circle cx={currentX} cy={getY(state.lh)} r="5" fill="#EC4899" stroke="#fff" strokeWidth="1.5" />
            <circle cx={currentX} cy={getY(state.progesterone)} r="4" fill="#F59E0B" stroke="#fff" strokeWidth="1.5" />

            {/* Top Indicator Pin */}
            <polygon
              points={`${currentX - 5},12 ${currentX + 5},12 ${currentX},19`}
              fill="#6366F1"
            />
          </svg>
        </div>

        {/* Scrubber Range Slider */}
        <div className="mt-4 px-2">
          <input
            type="range"
            min="1"
            max="28"
            step="1"
            value={day}
            onChange={(e) => {
              setIsPlaying(false)
              setDay(Number(e.target.value))
            }}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-[11px] text-ink/50">
            <span>Day 1 (Menstruation)</span>
            <span>Day 7 (Repair)</span>
            <span className="font-bold text-pink-400">Day 14 (Ovulation)</span>
            <span>Day 21 (Progesterone Peak)</span>
            <span>Day 28</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line/50 pt-3 text-xs sm:grid-cols-4">
          <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 p-2 text-blue-400">
            <span className="h-3 w-3 rounded-full bg-[#3B82F6]" />
            <div className="leading-tight">
              <div className="font-bold">FSH ({state.fsh}%)</div>
              <div className="text-[10px] text-blue-300/80">Pituitary / Stimulates follicle</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
            <span className="h-3 w-3 rounded-full bg-[#10B981]" />
            <div className="leading-tight">
              <div className="font-bold">Oestrogen ({state.oestrogen}%)</div>
              <div className="text-[10px] text-emerald-300/80">Follicle / Repairs lining</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-pink-500/10 p-2 text-pink-400">
            <span className="h-3 w-3 rounded-full bg-[#EC4899]" />
            <div className="leading-tight">
              <div className="font-bold">LH ({state.lh}%)</div>
              <div className="text-[10px] text-pink-300/80">Pituitary / Triggers ovulation</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 p-2 text-amber-400">
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
            <div className="leading-tight">
              <div className="font-bold">Progesterone ({state.progesterone}%)</div>
              <div className="text-[10px] text-amber-300/80">Corpus luteum / Maintains lining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Organ Views: Ovary & Endometrium */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Panel 1: Ovary & Follicle Cycle */}
        <div className="rounded-xl border border-line bg-surface p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-ink">
                <T value={MENSTRUAL_TIMELINE.ovaryHeading} />
              </h4>
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                <T value={state.ovaryPhaseName} />
              </span>
            </div>

            {/* Visual SVG for Follicle Stage */}
            <div className="mt-4 flex h-36 items-center justify-center rounded-lg border border-line bg-white/5 p-4">
              {day <= 5 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/20">
                    <div className="h-4 w-4 rounded-full bg-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-ink">Primary / Primordial Follicle</span>
                  <span className="text-[11px] text-ink/60">Stimulated by rising FSH</span>
                </div>
              )}
              {day > 5 && day <= 12 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-400/60 bg-emerald-500/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300 bg-emerald-400/30">
                      <div className="h-4 w-4 rounded-full bg-emerald-300" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-ink">Growing Graafian Follicle</span>
                  <span className="text-[11px] text-ink/60">Secreting abundant oestrogen</span>
                </div>
              )}
              {(day === 13 || day === 14) && (
                <div className="flex flex-col items-center gap-2 animate-bounce">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-pink-500 bg-pink-500/30" />
                    <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full border-2 border-yellow-300 bg-yellow-400 shadow-lg shadow-yellow-500/50" />
                  </div>
                  <span className="text-xs font-bold text-pink-400">⚡ Ovulation (Egg Released)</span>
                  <span className="text-[11px] text-ink/60">Triggered by sharp LH peak</span>
                </div>
              )}
              {day > 14 && day <= 23 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-500/30 shadow-md">
                    <div className="h-10 w-10 rounded-full bg-amber-400/80" />
                  </div>
                  <span className="text-xs font-semibold text-amber-400">Active Corpus Luteum (Yellow Body)</span>
                  <span className="text-[11px] text-ink/60">Pumping high progesterone</span>
                </div>
              )}
              {day > 23 && (
                <div className="flex flex-col items-center gap-2">
                  {isPregnant ? (
                    <>
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-500/40 shadow-lg">
                        <div className="h-12 w-12 rounded-full bg-emerald-300/80 animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-emerald-400">Sustained Corpus Luteum (Pregnancy)</span>
                      <span className="text-[11px] text-ink/60">Sustained by embryo hCG</span>
                    </>
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5">
                        <div className="h-6 w-6 rounded-full bg-white/20" />
                      </div>
                      <span className="text-xs font-semibold text-ink/60">Corpus Albicans (Degenerating)</span>
                      <span className="text-[11px] text-ink/40">Progesterone drops; lining will shed</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-ink/70">
            <T value={MENSTRUAL_TIMELINE.ovaryPhaseLabel} />: <T value={state.ovaryPhaseName} />
          </div>
        </div>

        {/* Panel 2: Endometrium Cross-section */}
        <div className="rounded-xl border border-line bg-surface p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-ink">
                <T value={MENSTRUAL_TIMELINE.uterusHeading} />
              </h4>
              <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-400">
                <T value={state.uterusPhaseName} />
              </span>
            </div>

            {/* Visual Wall Cross-section */}
            <div className="mt-4 flex h-36 flex-col justify-end rounded-lg border border-line bg-white/5 p-4 relative overflow-hidden">
              {/* Muscle Wall Base */}
              <div className="absolute inset-x-0 bottom-0 h-6 bg-red-950/40 border-t border-red-900/40 flex items-center justify-center text-[10px] text-ink/40">
                Myometrium (Muscle Wall)
              </div>

              {/* Endometrium Dynamic Layer */}
              <div
                className={`relative w-full rounded-t-lg transition-all duration-300 ${
                  day <= 5
                    ? 'bg-rose-900/60 border-t-2 border-dashed border-rose-500'
                    : 'bg-rose-600/40 border-t-2 border-rose-400'
                }`}
                style={{
                  height: `${Math.max(20, (state.liningThicknessMm / 6) * 90)}px`,
                  marginBottom: '24px',
                }}
              >
                {/* Spiral Arteries representation */}
                <div className="absolute inset-0 flex items-center justify-around opacity-40">
                  <div className="h-full w-0.5 bg-red-400" />
                  <div className="h-full w-0.5 bg-red-400" />
                  <div className="h-full w-0.5 bg-red-400" />
                  <div className="h-full w-0.5 bg-red-400" />
                </div>
                {day <= 5 && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center text-[10px] text-rose-300 font-bold animate-pulse">
                    🩸 Shedding (Menstruation)
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-ink/70">
              <T value={MENSTRUAL_TIMELINE.liningThickness} />: <strong className="text-accent font-mono">{state.liningThicknessMm} mm</strong>
            </span>
            <span className="text-[11px] text-ink/50">
              (Range: 1.0 mm flow → 5.6 mm secretory)
            </span>
          </div>
        </div>
      </div>

      {/* Biological Event Note & Paper 4 Exam Cause-Effect Card */}
      <div className="rounded-xl border border-line bg-surface p-4 space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wider">
            <T value={MENSTRUAL_TIMELINE.keyEvents} />
          </h4>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink">
            <T value={state.eventNote} />
          </p>
        </div>

        {/* Paper 4 Exam Causality Box */}
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-3.5 text-xs text-ink/80 leading-relaxed">
          <div className="font-semibold text-accent mb-1 flex items-center gap-1.5">
            <span>📝</span>
            <T value={MENSTRUAL_TIMELINE.examTipTitle} />
          </div>
          <T value={extra.examinerNotes} />
        </div>
      </div>
    </div>
  )
}
