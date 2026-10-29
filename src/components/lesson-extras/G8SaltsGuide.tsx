import { useState, useMemo } from 'react'
import katex from 'katex'
import { T } from '@/components/i18n/T'
import type { G8SaltsGuideExtra, G8AcidsBasesSection } from '@/content/types'
import { assetUrl } from '@/lib/assetUrl'
import { G8_SALTS_GUIDE } from '@/lib/lessonExtrasStrings'

function renderFormula(latex: string, displayMode = false): string {
  try {
    return katex.renderToString(latex, { displayMode, throwOnError: false })
  } catch {
    return `<code>${latex}</code>`
  }
}

export function G8SaltsGuide({ extra }: { extra: G8SaltsGuideExtra }) {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    extra.sections[0]?.id ?? ''
  )
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState<Record<string, boolean>>({})

  const currentSection: G8AcidsBasesSection | undefined = useMemo(() => {
    return extra.sections.find((s) => s.id === activeSectionId) ?? extra.sections[0]
  }, [extra.sections, activeSectionId])

  if (!currentSection) return null

  const handleSelectOption = (secId: string, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [secId]: optIndex }))
    setShowResults((prev) => ({ ...prev, [secId]: false }))
  }

  const handleCheckAnswer = (secId: string) => {
    setShowResults((prev) => ({ ...prev, [secId]: true }))
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            <T value={G8_SALTS_GUIDE.headerTag} />
          </span>
        </div>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-ink">
          <T value={extra.title} />
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          <T value={extra.hint} />
        </p>

        {/* Section Selector Pills */}
        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-muted">
            <T value={G8_SALTS_GUIDE.selectModulePrompt} />
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {extra.sections.map((sec, idx) => {
              const isActive = sec.id === currentSection.id
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`flex flex-col items-start rounded-lg border px-3 py-2.5 text-left transition-all ${
                    isActive
                      ? 'border-accent bg-accent/10 shadow-sm'
                      : 'border-line bg-canvas hover:border-accent/40 hover:bg-surface'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold ${
                      isActive ? 'text-accent' : 'text-muted'
                    }`}
                  >
                    Route 0{idx + 1}
                  </span>
                  <span
                    className={`mt-0.5 line-clamp-1 text-xs font-medium ${
                      isActive ? 'text-ink' : 'text-ink-soft'
                    }`}
                  >
                    <T value={sec.title} />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active Section Content Card */}
      <article
        key={currentSection.id}
        className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm"
      >
        {/* Title bar */}
        <header className="border-b border-line bg-canvas/60 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <T value={currentSection.badge} />
            </span>
          </div>
          <h3 className="mt-2 text-lg font-bold text-ink">
            <T value={currentSection.title} />
          </h3>
          <p className="mt-1 text-xs text-muted">
            <T value={currentSection.subtitle} />
          </p>
        </header>

        <div className="p-5 space-y-6">
          {/* Original Diagram Figure(s) */}
          <div className="rounded-lg border border-line bg-canvas p-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                <T value={G8_SALTS_GUIDE.officialDiagramTitle} />
              </h4>
              <span className="text-[11px] text-accent font-medium">
                <T value={G8_SALTS_GUIDE.clickToEnlarge} />
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <figure
                className="group relative cursor-pointer overflow-hidden rounded-lg border border-line bg-black/5 dark:bg-black/40"
                onClick={() => setPreviewImage(currentSection.image)}
              >
                <img
                  src={assetUrl(currentSection.image)}
                  alt="Official Diagram"
                  className="block h-52 w-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-ink shadow">
                    <T value={G8_SALTS_GUIDE.clickToEnlarge} />
                  </span>
                </div>
              </figure>

              {currentSection.secondaryImage && (
                <figure
                  className="group relative cursor-pointer overflow-hidden rounded-lg border border-line bg-black/5 dark:bg-black/40"
                  onClick={() => setPreviewImage(currentSection.secondaryImage!)}
                >
                  <img
                    src={assetUrl(currentSection.secondaryImage)}
                    alt="Secondary Diagram"
                    className="block h-52 w-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-ink shadow">
                      <T value={G8_SALTS_GUIDE.clickToEnlarge} />
                    </span>
                  </div>
                </figure>
              )}
            </div>

            <figcaption className="mt-3 text-xs leading-relaxed text-muted border-t border-line pt-2">
              <T value={currentSection.imageCaption} />
            </figcaption>
          </div>

          {/* Overview Description */}
          <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-4 text-sm leading-relaxed text-ink-soft">
            <T value={currentSection.description} />
          </div>

          {/* Bullet points & mechanisms */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              <T value={G8_SALTS_GUIDE.coreMechanismTitle} />
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentSection.bulletPoints.map((point, pIdx) => (
                <div
                  key={pIdx}
                  className="flex flex-col justify-between rounded-lg border border-line bg-canvas p-3.5"
                >
                  <div>
                    <h5 className="text-sm font-semibold text-ink">
                      <T value={point.title} />
                    </h5>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft whitespace-pre-line">
                      <T value={point.body} />
                    </p>
                  </div>
                  {point.equation && (
                    <div className="mt-2.5 overflow-x-auto rounded border border-line bg-surface/80 px-2 py-1.5 text-center text-xs">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderFormula(point.equation, true),
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exam Takeaway Box */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <span className="text-base">💡</span>
              <T value={G8_SALTS_GUIDE.examTakeawayTitle} />
            </div>
            <p className="mt-2 text-xs leading-relaxed font-medium text-ink">
              <T value={currentSection.keyTakeaway} />
            </p>
          </div>

          {/* Checkpoint Quick Quiz */}
          {currentSection.quiz && (
            <div className="rounded-xl border border-line bg-canvas p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
                  <T value={G8_SALTS_GUIDE.checkpointQuizTitle} />
                </span>
              </div>
              <p className="mt-2.5 text-sm font-semibold text-ink">
                <T value={currentSection.quiz.question} />
              </p>

              <div className="mt-3 space-y-2">
                {currentSection.quiz.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentSection.id] === optIdx
                  return (
                    <label
                      key={optIdx}
                      className={`flex cursor-pointer items-center rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        isSelected
                          ? 'border-accent bg-accent/10 text-ink'
                          : 'border-line bg-surface text-ink-soft hover:bg-surface/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`quiz-${currentSection.id}`}
                        value={optIdx}
                        checked={isSelected}
                        onChange={() => handleSelectOption(currentSection.id, optIdx)}
                        className="mr-2.5 text-accent focus:ring-accent"
                      />
                      <span>
                        <T value={opt} />
                      </span>
                    </label>
                  )
                })}
              </div>

              <div className="mt-3.5 flex items-center justify-between">
                <button
                  type="button"
                  disabled={selectedAnswers[currentSection.id] === undefined}
                  onClick={() => handleCheckAnswer(currentSection.id)}
                  className="rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <T value={G8_SALTS_GUIDE.checkAnswerBtn} />
                </button>
              </div>

              {showResults[currentSection.id] && (
                <div
                  className={`mt-3 rounded-lg border p-3 text-xs leading-relaxed ${
                    selectedAnswers[currentSection.id] === currentSection.quiz.correctIndex
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <div className="font-bold">
                    {selectedAnswers[currentSection.id] === currentSection.quiz.correctIndex ? (
                      <T value={G8_SALTS_GUIDE.answeredCorrect} />
                    ) : (
                      <T value={G8_SALTS_GUIDE.answeredIncorrect} />
                    )}
                  </div>
                  <div className="mt-1 text-ink-soft">
                    <T value={currentSection.quiz.explanation} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>

      {/* Image zoom preview modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-xl bg-surface p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-2 border-b border-line">
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="rounded-md bg-canvas px-3 py-1 text-xs font-medium text-ink-soft hover:bg-surface hover:text-ink"
              >
                <T value={G8_SALTS_GUIDE.modalClose} />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto p-2">
              <img
                src={assetUrl(previewImage)}
                alt="Enlarged Diagram"
                className="mx-auto block h-auto max-w-full rounded object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
