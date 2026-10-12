import { useState, useEffect } from 'react'
import type { SynapseTransmissionExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { SYNAPSE_TRANSMISSION } from '@/lib/lessonExtrasStrings'
import { SYNAPSE_STEPS, type SynapticStepDetail } from '@/content/synapseTransmissionData'

type ActiveTab = 'interactive' | 'unidirectional' | 'tips'

export function SynapseTransmission({ extra }: { extra: SynapseTransmissionExtra }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('interactive')
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // Autoplay ticker (1.5s per step)
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev >= 5 ? 0 : prev + 1))
    }, 1600)
    return () => clearInterval(timer)
  }, [isPlaying])

  const currentStep: SynapticStepDetail = SYNAPSE_STEPS[stepIndex] ?? SYNAPSE_STEPS[0]!

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-line">
        <button
          type="button"
          onClick={() => setActiveTab('interactive')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'interactive'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={SYNAPSE_TRANSMISSION.tabInteractive} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('unidirectional')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'unidirectional'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={SYNAPSE_TRANSMISSION.tabUnidirectional} />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tips')}
          className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'tips'
              ? 'border-accent text-accent'
              : 'border-transparent text-ink/60 hover:text-ink'
          }`}
        >
          <T value={SYNAPSE_TRANSMISSION.tabExamTips} />
        </button>
      </div>

      {activeTab === 'interactive' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Synapse Interactive SVG Animation (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-xl border border-line bg-surface p-4 select-none">
              <svg viewBox="0 0 540 360" className="w-full text-ink">
                {/* Background */}
                <rect x="0" y="0" width="540" height="360" fill="currentColor" fillOpacity="0.02" rx="10" />

                {/* Pre-synaptic Knob (Top bulbous structure) */}
                <path
                  d="M 180 0 L 180 50 C 180 140 120 180 120 200 L 420 200 C 420 180 360 140 360 50 L 360 0 Z"
                  fill="#1E293B"
                  fillOpacity="0.8"
                  stroke="#64748B"
                  strokeWidth="2.5"
                />
                <text x="270" y="30" fontSize="11" textAnchor="middle" fill="#94A3B8" fontWeight="bold">
                  Pre-synaptic Terminal (Axon Knob)
                </text>

                {/* Mitochondria in knob (ATP source) */}
                <g transform="translate(160, 60)" opacity="0.6">
                  <ellipse cx="25" cy="15" rx="20" ry="12" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
                  <path d="M 12 15 Q 25 10 38 15" fill="none" stroke="#F59E0B" strokeWidth="1" />
                  <text x="25" y="18" fontSize="7" textAnchor="middle" fill="#F59E0B">Mito (ATP)</text>
                </g>

                {/* Step 1: Incoming Electrical Impulse */}
                {stepIndex === 0 && (
                  <g transform="translate(270, 70)" className="animate-pulse">
                    <polygon points="0,-25 -8,0 2,0 -5,25 12,-2 0,-2" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
                    <text x="25" y="5" fontSize="10" fill="#EAB308" fontWeight="bold">⚡ Electrical Impulse Arrives</text>
                  </g>
                )}

                {/* Synaptic Vesicles containing Neurotransmitter */}
                {/* Vesicle 1 */}
                <g
                  transform={`translate(200, ${stepIndex >= 1 ? 175 : 120})`}
                  className="transition-transform duration-500"
                >
                  <circle cx="12" cy="12" r="14" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
                  <circle cx="9" cy="9" r="2.5" fill="#EF4444" />
                  <circle cx="15" cy="9" r="2.5" fill="#EF4444" />
                  <circle cx="12" cy="15" r="2.5" fill="#EF4444" />
                </g>
                {/* Vesicle 2 */}
                <g
                  transform={`translate(260, ${stepIndex >= 1 ? 180 : 130})`}
                  className="transition-transform duration-500"
                >
                  <circle cx="12" cy="12" r="14" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
                  <circle cx="9" cy="9" r="2.5" fill="#EF4444" />
                  <circle cx="15" cy="9" r="2.5" fill="#EF4444" />
                  <circle cx="12" cy="15" r="2.5" fill="#EF4444" />
                </g>
                {/* Vesicle 3 */}
                <g
                  transform={`translate(320, ${stepIndex >= 1 ? 175 : 120})`}
                  className="transition-transform duration-500"
                >
                  <circle cx="12" cy="12" r="14" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
                  <circle cx="9" cy="9" r="2.5" fill="#EF4444" />
                  <circle cx="15" cy="9" r="2.5" fill="#EF4444" />
                  <circle cx="12" cy="15" r="2.5" fill="#EF4444" />
                </g>

                {/* Synaptic Cleft (Between y=200 and y=240, 40px scale for ~20 nm) */}
                <rect x="80" y="200" width="380" height="40" fill="#38BDF8" fillOpacity="0.06" />
                <text x="90" y="224" fontSize="9" fill="currentColor" fillOpacity="0.4" fontWeight="600">
                  Synaptic Cleft (~20 nm)
                </text>

                {/* Free Neurotransmitter molecules diffusing in Cleft (Steps 2, 3, 4) */}
                {(stepIndex === 2 || stepIndex === 3) && (
                  <g className="animate-pulse">
                    {[180, 205, 225, 245, 265, 285, 305, 325, 345, 365].map((x, i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={stepIndex === 2 ? 212 : 225}
                        r="3"
                        fill="#EF4444"
                      />
                    ))}
                    <text x="270" y="235" fontSize="9" textAnchor="middle" fill="#EF4444" fontWeight="bold">
                      Diffusion down concentration gradient →
                    </text>
                  </g>
                )}

                {/* Post-synaptic Membrane (Bottom structure y=240 to 360) */}
                <path
                  d="M 100 240 L 440 240 L 440 360 L 100 360 Z"
                  fill="#0F172A"
                  fillOpacity="0.9"
                  stroke="#64748B"
                  strokeWidth="2.5"
                />
                <text x="270" y="340" fontSize="11" textAnchor="middle" fill="#94A3B8" fontWeight="bold">
                  Post-synaptic Neurone (Dendrite / Cell Body)
                </text>

                {/* Receptors embedded in post-synaptic membrane (at y=240) */}
                {[190, 240, 290, 340].map((rx, idx) => (
                  <g key={idx} transform={`translate(${rx}, 235)`}>
                    {/* Receptor cup shape */}
                    <path
                      d="M -8 5 L -8 0 C -8 -6 8 -6 8 0 L 8 5"
                      fill="none"
                      stroke={stepIndex >= 4 ? '#10B981' : '#F59E0B'}
                      strokeWidth="2.5"
                    />
                    {/* Docked Neurotransmitter molecule when stepIndex === 4 */}
                    {stepIndex === 4 && (
                      <circle cx="0" cy="-2" r="3" fill="#EF4444" />
                    )}
                  </g>
                ))}

                {/* Step 5: New Electrical Impulse triggered on Post-synaptic membrane */}
                {stepIndex === 4 && (
                  <g transform="translate(270, 290)" className="animate-bounce">
                    <polygon points="0,-15 -6,2 2,2 -4,18 10,-2 0,-2" fill="#10B981" stroke="#059669" strokeWidth="1" />
                    <text x="22" y="5" fontSize="10" fill="#10B981" fontWeight="bold">⚡ NEW Impulse Generated!</text>
                  </g>
                )}

                {/* Step 6: Acetylcholinesterase enzymatic breakdown */}
                {stepIndex === 5 && (
                  <g transform="translate(270, 220)">
                    <circle cx="-50" cy="0" r="8" fill="#F59E0B" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="-50" y="3" fontSize="8" textAnchor="middle" fill="#F59E0B" fontWeight="bold">Enzyme</text>
                    <text x="20" y="4" fontSize="10" textAnchor="middle" fill="#F59E0B" fontWeight="bold">
                      🧹 Acetylcholinesterase destroys neurotransmitter
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Stepper Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={stepIndex === 0}
                  onClick={() => {
                    setIsPlaying(false)
                    setStepIndex((prev) => Math.max(0, prev - 1))
                  }}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-white/10 disabled:opacity-40"
                >
                  <T value={SYNAPSE_TRANSMISSION.btnPrev} />
                </button>
                <button
                  type="button"
                  disabled={stepIndex === 5}
                  onClick={() => {
                    setIsPlaying(false)
                    setStepIndex((prev) => Math.min(5, prev + 1))
                  }}
                  className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white shadow transition-all hover:opacity-90 disabled:opacity-40"
                >
                  <T value={SYNAPSE_TRANSMISSION.btnNext} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-lg border border-line bg-white/5 px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-white/10"
                >
                  <T value={isPlaying ? SYNAPSE_TRANSMISSION.btnPause : SYNAPSE_TRANSMISSION.btnAutoPlay} />
                </button>
              </div>

              {/* Step counter */}
              <span className="font-mono text-xs font-bold text-accent">
                <T value={SYNAPSE_TRANSMISSION.stepLabel} /> {stepIndex + 1} <T value={SYNAPSE_TRANSMISSION.stepSuffix} />
              </span>
            </div>

            {/* Step navigation pills */}
            <div className="grid grid-cols-6 gap-2">
              {SYNAPSE_STEPS.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false)
                    setStepIndex(idx)
                  }}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    stepIndex === idx
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-line bg-surface text-ink/60 hover:bg-white/5 hover:text-ink'
                  }`}
                >
                  Step {s.stepNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Step Details & Molecular Mechanism (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Event Description
              </span>
              <h4 className="text-base font-bold text-ink">
                <T value={currentStep.title} />
              </h4>

              <div className="rounded-lg bg-accent/10 p-3 text-xs leading-relaxed text-ink/90 font-medium">
                <T value={currentStep.description} />
              </div>

              <div className="border-t border-line/50 pt-2 text-xs leading-relaxed text-ink/70">
                <strong className="text-ink/50 block mb-1">Microscopic Molecular Detail:</strong>
                <T value={currentStep.detail} />
              </div>
            </div>

            {/* Structure Glossary Summary */}
            <div className="rounded-xl border border-line bg-surface p-4 space-y-2 text-xs">
              <h5 className="font-semibold text-ink/60 uppercase tracking-wide">
                Key Synaptic Structures
              </h5>
              <div className="space-y-1.5 text-ink/80">
                <div>
                  <strong className="text-accent">Synaptic vesicles:</strong> Storage sacs in pre-synaptic bulb holding neurotransmitter.
                </div>
                <div>
                  <strong className="text-accent">Synaptic cleft:</strong> The 20 nm microscopic liquid gap between neurones.
                </div>
                <div>
                  <strong className="text-accent">Receptor molecules:</strong> Membrane proteins with complementary binding sites on post-synaptic membrane.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'unidirectional' && (
        <div className="rounded-xl border border-line bg-surface p-6 space-y-4">
          <h4 className="text-base font-bold text-ink flex items-center gap-2">
            <span>🛡️</span>
            The Synaptic One-Way Valve Principle (Why Impulses Travel in ONE Direction Only)
          </h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-lg border border-line bg-white/5 p-4 space-y-2">
              <strong className="text-accent text-sm block">1. Pre-synaptic Asymmetry</strong>
              <p className="leading-relaxed text-ink/80">
                Synaptic vesicles containing neurotransmitter molecules are <strong>ONLY synthesised and stored in the pre-synaptic neurone</strong>. The post-synaptic neurone has no neurotransmitter vesicles to release backwards.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-white/5 p-4 space-y-2">
              <strong className="text-accent text-sm block">2. Post-synaptic Receptor Asymmetry</strong>
              <p className="leading-relaxed text-ink/80">
                Specific complementary receptor proteins are <strong>ONLY located on the post-synaptic membrane</strong>. Even if transmitter was released backwards, the pre-synaptic neurone has no receptors to trigger a response.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 text-xs text-ink/80 leading-relaxed">
            <strong className="text-accent block mb-1">Biological Significance:</strong>
            Ensures that sensory signals strictly travel from receptors towards the central nervous system, and motor signals strictly travel from the CNS towards effectors (muscles and glands), preventing chaotic signal collision.
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-xs text-ink/80 leading-relaxed space-y-2">
          <strong className="text-accent block text-sm">
            📝 Cambridge IGCSE Paper 4 Examiner Traps & Model Sequence:
          </strong>
          <T value={extra.examinerNotes} />
        </div>
      )}
    </div>
  )
}
