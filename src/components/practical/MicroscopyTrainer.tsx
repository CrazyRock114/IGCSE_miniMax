import { useState } from 'react'
import { T } from '@/components/i18n/T'
import {
  OBJECTIVES,
  SPECIMEN_SLIDES,
  calculateMagnification,
  checkNumericAnswer,
  type MicroscopeObjective,
  type SpecimenSlide,
} from '@/content/practical/microscopy'
import { PRACTICAL } from '@/lib/practicalStrings'

export function MicroscopyTrainer() {
  const [selectedSlideId, setSelectedSlideId] = useState<string>('onion-epidermis')
  const [selectedPower, setSelectedPower] = useState<number>(10)
  const [showStageMicrometer, setShowStageMicrometer] = useState<boolean>(false)
  const [showGraticule, setShowGraticule] = useState<boolean>(true)
  const [graticuleOffset, setGraticuleOffset] = useState<number>(50) // offset 0-100%

  // Workout state
  const [step, setStep] = useState<'calibrate' | 'measure' | 'calculate'>('calibrate')
  const [userCalibration, setUserCalibration] = useState<string>('')
  const [calibResult, setCalibResult] = useState<'idle' | 'ok' | 'bad'>('idle')

  const [userActualSize, setUserActualSize] = useState<string>('')
  const [actualResult, setActualResult] = useState<'idle' | 'ok' | 'bad'>('idle')

  const [userMag, setUserMag] = useState<string>('')
  const [magResult, setMagResult] = useState<'idle' | 'ok' | 'bad'>('idle')

  const currentSlide: SpecimenSlide =
    SPECIMEN_SLIDES.find((s) => s.id === selectedSlideId) ?? SPECIMEN_SLIDES[0]!
  const currentObj: MicroscopeObjective =
    OBJECTIVES.find((o) => o.power === selectedPower) ?? OBJECTIVES[1]!

  const trueCalibration = currentObj.umPerGraticuleDiv
  const expectedGraticuleDivs = Math.round(currentSlide.targetActualSizeUm / trueCalibration)
  const expectedActualSizeUm = currentSlide.targetActualSizeUm
  const expectedMag = calculateMagnification(currentSlide.examDrawingSizeMm, currentSlide.targetActualSizeUm)

  const handleCheckCalibration = () => {
    const val = Number.parseFloat(userCalibration)
    const isOk = checkNumericAnswer(val, trueCalibration, 5)
    setCalibResult(isOk ? 'ok' : 'bad')
  }

  const handleCheckActualSize = () => {
    const val = Number.parseFloat(userActualSize)
    const isOk = checkNumericAnswer(val, expectedActualSizeUm, 6)
    setActualResult(isOk ? 'ok' : 'bad')
  }

  const handleCheckMag = () => {
    const val = Number.parseFloat(userMag)
    const isOk = checkNumericAnswer(val, expectedMag, 6)
    setMagResult(isOk ? 'ok' : 'bad')
  }

  const handleResetDrill = () => {
    setUserCalibration('')
    setCalibResult('idle')
    setUserActualSize('')
    setActualResult('idle')
    setUserMag('')
    setMagResult('idle')
  }

  // Specimen visual scaling inside SVG viewport (center is 200, 200, radius 180)
  // Scale factor based on power: 4x is broad, 10x is medium, 40x is zoomed in
  const zoomScale = currentObj.power / 10

  return (
    <div className="space-y-6">
      {/* Top Banner & Introduction */}
      <section className="rounded-xl border border-line bg-surface p-5">
        <h3 className="text-lg font-semibold text-ink">
          <T value={PRACTICAL.microscopyHeading} />
        </h3>
        <p className="mt-1 text-sm text-ink/70" data-zh>
          <T value={PRACTICAL.microscopyIntro} />
        </p>

        {/* Controls: Slide selector & Objective powers */}
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line/60 pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-ink/60">
              <T value={PRACTICAL.selectSlide} />
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SPECIMEN_SLIDES.map((slide) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    setSelectedSlideId(slide.id)
                    handleResetDrill()
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedSlideId === slide.id
                      ? 'bg-ink text-white'
                      : 'border border-line bg-white/5 text-ink/80 hover:bg-white/10'
                  }`}
                >
                  {slide.name.en}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-ink/60">
              <T value={PRACTICAL.selectObjective} />
            </span>
            <div className="flex gap-1.5">
              {OBJECTIVES.map((obj) => (
                <button
                  key={obj.power}
                  type="button"
                  onClick={() => {
                    setSelectedPower(obj.power)
                    handleResetDrill()
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedPower === obj.power
                      ? 'bg-accent text-white'
                      : 'border border-line bg-white/5 text-ink/80 hover:bg-white/10'
                  }`}
                >
                  {obj.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-ink/80 cursor-pointer">
              <input
                type="checkbox"
                checked={showGraticule}
                onChange={(e) => setShowGraticule(e.target.checked)}
                className="rounded border-line"
              />
              <T value={PRACTICAL.graticuleToggle} />
            </label>
            <label className="flex items-center gap-1.5 text-xs text-ink/80 cursor-pointer">
              <input
                type="checkbox"
                checked={showStageMicrometer}
                onChange={(e) => setShowStageMicrometer(e.target.checked)}
                className="rounded border-line"
              />
              <T value={PRACTICAL.stageMicrometerToggle} />
            </label>
          </div>
        </div>
      </section>

      {/* Main Interactive Stage & Data Dock */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Microscope Eyepiece Viewport (7 cols) */}
        <div className="flex flex-col items-center rounded-xl border border-line bg-surface p-5 lg:col-span-7">
          <div className="relative flex items-center justify-center p-3">
            {/* Outer brass / dark microscope eyepiece rim */}
            <div className="relative h-80 w-80 sm:h-96 sm:w-96 rounded-full border-8 border-ink/80 bg-neutral-950 p-1 shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Circular Illuminated Field of View */}
              <svg viewBox="0 0 400 400" className="h-full w-full rounded-full bg-[#f8fafc]">
                <defs>
                  {/* Subtle bright-field illumination gradient */}
                  <radialGradient id="fieldLight" cx="50%" cy="50%" r="50%">
                    <stop offset="60%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="95%" stopColor="#f1f5f9" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.8" />
                  </radialGradient>
                  {/* Clip to circular aperture */}
                  <clipPath id="circleClip">
                    <circle cx="200" cy="200" r="190" />
                  </clipPath>
                </defs>

                <rect width="400" height="400" fill="url(#fieldLight)" clipPath="url(#circleClip)" />

                {/* Biological Specimen Art */}
                <g clipPath="url(#circleClip)" transform={`scale(${zoomScale}) translate(${200 * (1 - zoomScale) / zoomScale}, ${200 * (1 - zoomScale) / zoomScale})`}>
                  {selectedSlideId === 'onion-epidermis' && (
                    <g>
                      {/* Brick-like onion cells with nuclei */}
                      <rect x="40" y="80" width="180" height="70" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" rx="3" />
                      <circle cx="130" cy="115" r="9" fill="#d97706" opacity="0.85" />
                      <circle cx="132" cy="113" r="3" fill="#78350f" />

                      <rect x="220" y="80" width="160" height="70" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" rx="3" />
                      <circle cx="300" cy="115" r="8" fill="#d97706" opacity="0.85" />

                      {/* Highlighted Cell A */}
                      <rect x="70" y="150" width="200" height="85" fill="#fde68a" stroke="#d97706" strokeWidth="3.5" rx="4" />
                      <circle cx="170" cy="192" r="12" fill="#b45309" opacity="0.9" />
                      <circle cx="172" cy="190" r="4" fill="#78350f" />
                      {/* Cytoplasm granules */}
                      <circle cx="110" cy="180" r="2" fill="#d97706" opacity="0.5" />
                      <circle cx="230" cy="200" r="2.5" fill="#d97706" opacity="0.5" />
                      <circle cx="140" cy="215" r="2" fill="#d97706" opacity="0.5" />

                      <rect x="270" y="150" width="150" height="85" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" rx="3" />
                      <circle cx="340" cy="192" r="9" fill="#d97706" opacity="0.85" />

                      <rect x="30" y="235" width="190" height="75" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" rx="3" />
                      <circle cx="120" cy="272" r="8" fill="#d97706" opacity="0.85" />

                      <rect x="220" y="235" width="170" height="75" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" rx="3" />
                      <circle cx="310" cy="272" r="9" fill="#d97706" opacity="0.85" />

                      {/* Measurement pointers for target Cell A */}
                      <line x1="70" y1="140" x2="70" y2="245" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="270" y1="140" x2="270" y2="245" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="70" y1="245" x2="270" y2="245" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                      <text x="170" y="260" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                        Cell A (Length)
                      </text>
                    </g>
                  )}

                  {selectedSlideId === 'stomata-guard-cells' && (
                    <g>
                      {/* Jigsaw background cells */}
                      <path d="M50 80 Q100 60 160 90 T250 80 T350 90" fill="none" stroke="#65a30d" strokeWidth="2" />
                      <path d="M40 310 Q110 330 180 300 T290 320 T360 300" fill="none" stroke="#65a30d" strokeWidth="2" />

                      {/* Paired guard cells */}
                      {/* Left guard cell */}
                      <path d="M175 140 C140 160 140 240 175 260 C160 230 160 170 175 140 Z" fill="#84cc16" stroke="#4d7c0f" strokeWidth="3" />
                      {/* Right guard cell */}
                      <path d="M225 140 C260 160 260 240 225 260 C240 230 240 170 225 140 Z" fill="#84cc16" stroke="#4d7c0f" strokeWidth="3" />
                      {/* Thick inner walls bordering the pore */}
                      <path d="M175 140 C165 170 165 230 175 260" fill="none" stroke="#365314" strokeWidth="4" />
                      <path d="M225 140 C235 170 235 230 225 260" fill="none" stroke="#365314" strokeWidth="4" />
                      {/* Open stoma aperture */}
                      <ellipse cx="200" cy="200" rx="16" ry="38" fill="#ecfccb" opacity="0.9" />

                      {/* Chloroplasts inside guard cells */}
                      <circle cx="155" cy="180" r="3.5" fill="#15803d" />
                      <circle cx="152" cy="210" r="3.5" fill="#15803d" />
                      <circle cx="162" cy="235" r="3.5" fill="#15803d" />
                      <circle cx="245" cy="180" r="3.5" fill="#15803d" />
                      <circle cx="248" cy="210" r="3.5" fill="#15803d" />
                      <circle cx="238" cy="235" r="3.5" fill="#15803d" />

                      {/* Dimension lines */}
                      <line x1="140" y1="140" x2="260" y2="140" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="140" y1="260" x2="260" y2="260" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="275" y1="140" x2="275" y2="260" stroke="#ef4444" strokeWidth="2" />
                      <text x="290" y="205" fill="#ef4444" fontSize="12" fontWeight="bold">
                        Height
                      </text>
                    </g>
                  )}

                  {selectedSlideId === 'plasmolysed-cells' && (
                    <g>
                      {/* Rigid outer cell walls */}
                      <rect x="80" y="120" width="240" height="160" fill="#f8fafc" stroke="#64748b" strokeWidth="4" rx="4" />
                      {/* Sucrose solution in the gap */}
                      <rect x="83" y="123" width="234" height="154" fill="#e0f2fe" opacity="0.6" />

                      {/* Shrunken protoplast with curved corners */}
                      <path
                        d="M130 145 Q200 135 270 145 Q295 190 285 240 Q200 255 125 245 Q105 190 130 145 Z"
                        fill="#d8b4fe"
                        stroke="#7e22ce"
                        strokeWidth="3"
                      />
                      {/* Concentrated purple anthocyanin vacuole */}
                      <ellipse cx="205" cy="195" rx="55" ry="38" fill="#9333ea" opacity="0.85" />
                      <circle cx="150" cy="190" r="8" fill="#581c87" />

                      {/* Gap label indicator */}
                      <text x="100" y="140" fill="#0284c7" fontSize="11" fontWeight="bold">
                        Sucrose solution
                      </text>
                      <line x1="130" y1="110" x2="130" y2="265" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="285" y1="110" x2="285" y2="265" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="130" y1="270" x2="285" y2="270" stroke="#ef4444" strokeWidth="2" />
                      <text x="207" y="285" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                        Protoplast length
                      </text>
                    </g>
                  )}

                  {selectedSlideId === 'human-blood-smear' && (
                    <g>
                      {/* Red Blood Cells (Biconcave discs, pink, pale center) */}
                      {[
                        { cx: 90, cy: 110 },
                        { cx: 150, cy: 100 },
                        { cx: 220, cy: 95 },
                        { cx: 290, cy: 120 },
                        { cx: 70, cy: 180 },
                        { cx: 130, cy: 170 },
                        { cx: 80, cy: 260 },
                        { cx: 140, cy: 250 },
                        { cx: 210, cy: 270 },
                        { cx: 280, cy: 260 },
                        { cx: 330, cy: 190 },
                      ].map((pos, i) => (
                        <g key={i}>
                          <circle cx={pos.cx} cy={pos.cy} r="18" fill="#fda4af" stroke="#e11d48" strokeWidth="1.5" />
                          <circle cx={pos.cx} cy={pos.cy} r="8" fill="#ffe4e6" opacity="0.9" />
                        </g>
                      ))}

                      {/* Highlighted RBC for measurement */}
                      <circle cx="210" cy="180" r="20" fill="#fb7185" stroke="#be123c" strokeWidth="3" />
                      <circle cx="210" cy="180" r="9" fill="#fff1f2" />
                      <line x1="190" y1="180" x2="230" y2="180" stroke="#ef4444" strokeWidth="2" />
                      <text x="210" y="215" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                        Target RBC
                      </text>

                      {/* Neutrophil WBC (larger, lobed nucleus) */}
                      <circle cx="280" cy="185" r="34" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" opacity="0.9" />
                      {/* 3 Lobes of nucleus */}
                      <ellipse cx="268" cy="175" rx="8" ry="12" fill="#4338ca" />
                      <ellipse cx="290" cy="172" rx="9" ry="10" fill="#4338ca" />
                      <ellipse cx="280" cy="198" rx="10" ry="8" fill="#4338ca" />
                      {/* Nuclear bridges */}
                      <path d="M272 178 Q280 173 286 174" stroke="#4338ca" strokeWidth="4" />
                      <path d="M288 178 Q287 188 284 194" stroke="#4338ca" strokeWidth="4" />
                    </g>
                  )}
                </g>

                {/* Stage Micrometer (1 mm = 100 divisions, 10 µm each) */}
                {showStageMicrometer && (
                  <g transform="translate(40, 240)">
                    {/* Glass slide body */}
                    <rect x="0" y="0" width="320" height="46" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" rx="2" opacity="0.95" />
                    <text x="6" y="14" fill="#0369a1" fontSize="10" fontWeight="bold">
                      Stage Micrometer (1 div = 10 µm)
                    </text>
                    {/* Scale tick marks */}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const x = 10 + i * 10
                      const isMajor = i % 10 === 0
                      const isMid = i % 5 === 0 && !isMajor
                      const h = isMajor ? 24 : isMid ? 18 : 12
                      return (
                        <g key={i}>
                          <line x1={x} y1={46} x2={x} y2={46 - h} stroke="#0284c7" strokeWidth={isMajor ? 2 : 1} />
                          {isMajor && (
                            <text x={x} y={46 - h - 2} textAnchor="middle" fill="#0369a1" fontSize="9">
                              {i * 10}
                            </text>
                          )}
                        </g>
                      )
                    })}
                  </g>
                )}

                {/* Eyepiece Graticule (0 to 100 units scale overlay) */}
                {showGraticule && (
                  <g transform={`translate(${20 + (graticuleOffset - 50) * 1.5}, 160)`}>
                    {/* Graticule baseline */}
                    <line x1="20" y1="40" x2="340" y2="40" stroke="#0f172a" strokeWidth="1.5" />
                    {Array.from({ length: 101 }).map((_, i) => {
                      if (i % 2 !== 0 && i % 10 !== 0) return null
                      const x = 20 + i * 3.2
                      const isMajor = i % 10 === 0
                      const isMid = i % 5 === 0 && !isMajor
                      const h = isMajor ? 22 : isMid ? 14 : 8
                      return (
                        <g key={i}>
                          <line x1={x} y1={40} x2={x} y2={40 - h} stroke="#0f172a" strokeWidth={isMajor ? 1.5 : 0.75} />
                          {isMajor && (
                            <text x={x} y={40 - h - 3} textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="500">
                              {i}
                            </text>
                          )}
                        </g>
                      )
                    })}
                    {/* Center crosshair indicator */}
                    <line x1="180" y1="35" x2="180" y2="45" stroke="#ef4444" strokeWidth="1.5" />
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Graticule Position Slider */}
          <div className="mt-3 w-full max-w-sm px-4">
            <div className="flex items-center justify-between text-xs text-ink/60">
              <T value={PRACTICAL.graticuleDragTip} />
              <span className="font-mono">{graticuleOffset}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={graticuleOffset}
              onChange={(e) => setGraticuleOffset(Number(e.target.value))}
              className="mt-1 w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Slide Description & Stain Note */}
          <div className="mt-4 w-full rounded-lg bg-white/5 border border-line p-3 text-xs text-ink/80 space-y-1">
            <p>
              <strong className="text-ink">{currentSlide.name.en}</strong>{' '}
              <em className="text-ink/60">({currentSlide.scientificName})</em>
            </p>
            <p className="text-ink/60" data-zh>
              {currentSlide.name.zh}
            </p>
            <p className="pt-1 text-ink/70">
              <span className="font-semibold text-accent"><T value={PRACTICAL.stainMethod} />:</span>{' '}
              {currentSlide.stain.en}
            </p>
            <p className="text-ink/50" data-zh>
              {currentSlide.stain.zh}
            </p>
          </div>
        </div>

        {/* Right: Data Dock & Examination Workout (5 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Step Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1 rounded-lg bg-white/5 p-1 border border-line" role="tablist">
            {(['calibrate', 'measure', 'calculate'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                className={`rounded-md py-1.5 text-xs font-medium transition-colors ${
                  step === s ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                <T
                  value={
                    s === 'calibrate'
                      ? PRACTICAL.modeCalibrate
                      : s === 'measure'
                        ? PRACTICAL.modeMeasure
                        : PRACTICAL.modeCalculateM
                  }
                />
              </button>
            ))}
          </div>

          {/* Interactive Steps Card */}
          <div className="rounded-xl border border-line bg-surface p-5 space-y-4">
            {step === 'calibrate' && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-ink">
                    <T value={PRACTICAL.modeCalibrate} />
                  </h4>
                  <p className="mt-1 text-xs text-ink/70">
                    Switch on the <strong>Stage micrometer</strong> (1 div = 10 µm). Count how many stage divisions match the graticule divisions to determine the calibration factor for <strong>{currentObj.label}</strong>.
                  </p>
                </div>

                <div className="rounded-lg bg-accent/10 border border-accent/20 p-3 text-xs text-accent space-y-1">
                  <p className="font-semibold">Formula: µm per division = (Stage divs × 10 µm) ÷ Graticule divs</p>
                  <p>At <strong>{currentObj.power}×</strong>, 10 stage divs (100 µm) align with exactly {Math.round(100 / trueCalibration)} graticule divs.</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-ink/80">
                    <T value={PRACTICAL.calibrationFactorPrompt} />:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 10.0"
                      value={userCalibration}
                      onChange={(e) => {
                        setUserCalibration(e.target.value)
                        setCalibResult('idle')
                      }}
                      className="w-32 rounded-md border border-line bg-white/5 px-2.5 py-1.5 font-mono text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCheckCalibration}
                      className="rounded-md bg-ink px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
                    >
                      <T value={PRACTICAL.submit} />
                    </button>
                  </div>
                  {calibResult === 'ok' && (
                    <p className="text-xs text-emerald-500 font-medium">
                      ✓ Correct! At {currentObj.label}, 1 graticule division = {trueCalibration} µm.
                    </p>
                  )}
                  {calibResult === 'bad' && (
                    <p className="text-xs text-rose-500">
                      ✗ Not quite. Expected {trueCalibration} µm / division.
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 'measure' && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-ink">
                    <T value={PRACTICAL.modeMeasure} />
                  </h4>
                  <p className="mt-1 text-xs text-ink/70">
                    Align the graticule markers across the highlighted structure: <strong>{currentSlide.featureName.en}</strong>.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 border border-line p-3 text-xs space-y-1.5 text-ink/80">
                  <p>
                    <span className="font-medium text-ink"><T value={PRACTICAL.targetFeature} />:</span>{' '}
                    {currentSlide.featureName.en}
                  </p>
                  <p>
                    <span className="font-medium text-ink"><T value={PRACTICAL.graticuleReading} />:</span>{' '}
                    <strong className="font-mono text-accent">{expectedGraticuleDivs}</strong> divisions
                  </p>
                  <p>
                    <span className="font-medium text-ink"><T value={PRACTICAL.calibratedFactor} />:</span>{' '}
                    <strong className="font-mono">{trueCalibration} µm / div</strong>
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-ink/80">
                    <T value={PRACTICAL.actualSizePrompt} />:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      placeholder={`e.g. ${expectedActualSizeUm}`}
                      value={userActualSize}
                      onChange={(e) => {
                        setUserActualSize(e.target.value)
                        setActualResult('idle')
                      }}
                      className="w-32 rounded-md border border-line bg-white/5 px-2.5 py-1.5 font-mono text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCheckActualSize}
                      className="rounded-md bg-ink px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
                    >
                      <T value={PRACTICAL.submit} />
                    </button>
                  </div>
                  {actualResult === 'ok' && (
                    <p className="text-xs text-emerald-500 font-medium">
                      ✓ Correct! Actual size A = {expectedGraticuleDivs} × {trueCalibration} = {expectedActualSizeUm} µm.
                    </p>
                  )}
                  {actualResult === 'bad' && (
                    <p className="text-xs text-rose-500">
                      ✗ Not quite. A = {expectedGraticuleDivs} divs × {trueCalibration} µm/div = {expectedActualSizeUm} µm.
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 'calculate' && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-ink">
                    <T value={PRACTICAL.modeCalculateM} />
                  </h4>
                  <p className="mt-1 text-xs text-ink/70">
                    In Paper 5/6, you measure the drawing on your paper with a ruler in millimetres (I), and use actual size (A) to find M.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 border border-line p-3 text-xs space-y-1.5 text-ink/80">
                  <p>
                    <span className="font-medium text-ink"><T value={PRACTICAL.examDrawingLabel} />:</span>{' '}
                    <strong className="font-mono text-accent">{currentSlide.examDrawingSizeMm} mm</strong>
                  </p>
                  <p>
                    <span className="font-medium text-ink"><T value={PRACTICAL.actualSize} />:</span>{' '}
                    <strong className="font-mono">{currentSlide.targetActualSizeUm} µm</strong>
                  </p>
                  <p className="text-xs text-rose-400 font-medium">
                    <T value={PRACTICAL.unitConversionWarning} />
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-ink/80">
                    <T value={PRACTICAL.magnificationPrompt} />:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      placeholder={`e.g. ${expectedMag}`}
                      value={userMag}
                      onChange={(e) => {
                        setUserMag(e.target.value)
                        setMagResult('idle')
                      }}
                      className="w-32 rounded-md border border-line bg-white/5 px-2.5 py-1.5 font-mono text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCheckMag}
                      className="rounded-md bg-ink px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
                    >
                      <T value={PRACTICAL.submit} />
                    </button>
                  </div>
                  {magResult === 'ok' && (
                    <p className="text-xs text-emerald-500 font-medium">
                      ✓ Spot on! M = ({currentSlide.examDrawingSizeMm} × 1000) ÷ {currentSlide.targetActualSizeUm} = ×{expectedMag}.
                    </p>
                  )}
                  {magResult === 'bad' && (
                    <p className="text-xs text-rose-500">
                      ✗ Not quite. M = ({currentSlide.examDrawingSizeMm} × 1000) ÷ {currentSlide.targetActualSizeUm} = ×{expectedMag}.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Examiner's Marking Criteria Card */}
          <div className="rounded-xl border border-line bg-surface p-4 text-xs space-y-2">
            <h4 className="font-semibold text-ink flex items-center gap-1.5">
              <span>📋</span> <T value={PRACTICAL.examinerBoxTitle} />
            </h4>
            <p className="font-mono font-semibold text-accent">
              <T value={PRACTICAL.formulaTriangle} />
            </p>
            <div className="rounded bg-white/5 p-2.5 text-ink/80 border border-line/60 space-y-1">
              <p className="font-medium text-ink">{currentSlide.examinerTip.en}</p>
              <p className="text-ink/60" data-zh>
                {currentSlide.examinerTip.zh}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
