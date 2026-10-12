import { useState } from 'react'
import type { LensLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { LENS_LAB } from '@/lib/lessonExtrasStrings'
import { calculateLensImage } from '@/content/lensLabData'

interface LensLabProps {
  extra: LensLabExtra
}

export function LensLab({ extra }: LensLabProps) {
  const [objectDistanceCm, setObjectDistanceCm] = useState<number>(20)
  const [objectHeightCm, setObjectHeightCm] = useState<number>(4)

  const f = extra.focalLengthCm // 10 cm
  const image = calculateLensImage(objectDistanceCm, f, objectHeightCm)

  // Scale: 1 cm on optical bench = 8.5 pixels in SVG. Optical center at x=340, y=140.
  const cx = 340
  const cy = 140
  const scale = 8.5
  const heightScale = 10

  const objX = cx - objectDistanceCm * scale
  const objY = cy - objectHeightCm * heightScale

  // Focal points positions
  const fLeftX = cx - f * scale
  const twoFLeftX = cx - 2 * f * scale
  const fRightX = cx + f * scale
  const twoFRightX = cx + 2 * f * scale

  // Image coordinates
  let imgX = cx
  let imgY = cy
  if (image.imageDistanceCm !== null && image.imageHeightCm !== null) {
    if (image.nature === 'real-inverted') {
      imgX = cx + image.imageDistanceCm * scale
      imgY = cy + image.imageHeightCm * heightScale
    } else if (image.nature === 'virtual-upright') {
      imgX = cx - Math.abs(image.imageDistanceCm) * scale
      imgY = cy - image.imageHeightCm * heightScale
    }
  }

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
            onClick={() => setObjectDistanceCm(preset.objectDistanceCm)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              Math.abs(objectDistanceCm - preset.objectDistanceCm) < 0.5
                ? 'bg-accent text-white shadow-sm'
                : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
            }`}
          >
            <T value={preset.name} />
          </button>
        ))}
      </div>

      {/* Optical Bench SVG Diagram */}
      <div className="mb-6 overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
        <svg
          viewBox="0 0 680 280"
          className="mx-auto w-full max-w-[650px]"
          aria-label="Converging Lens Optical Bench Ray Diagram"
        >
          {/* Principal Axis */}
          <line x1="20" y1={cy} x2="660" y2={cy} stroke="#94A3B8" strokeWidth="1.5" />
          <text x="630" y={cy - 6} fontSize="9" fill="#64748B" fontWeight="bold">
            Axis
          </text>

          {/* Thin Converging Lens (double arrow at center) */}
          <line x1={cx} y1="30" x2={cx} y2="250" stroke="#0284C7" strokeWidth="2.5" />
          <polygon points={`${cx},22 ${cx - 6},34 ${cx + 6},34`} fill="#0284C7" />
          <polygon points={`${cx},258 ${cx - 6},246 ${cx + 6},246`} fill="#0284C7" />
          <circle cx={cx} cy={cy} r="3" fill="#0F172A" />
          <text x={cx + 6} y={cy + 15} fontSize="9" fill="#0F172A" fontWeight="bold">
            C
          </text>

          {/* Focal Points markers */}
          <circle cx={fLeftX} cy={cy} r="3" fill="#D97706" />
          <text x={fLeftX - 4} y={cy + 14} fontSize="9" fill="#D97706" fontWeight="bold">
            F
          </text>
          <circle cx={twoFLeftX} cy={cy} r="3" fill="#64748B" />
          <text x={twoFLeftX - 7} y={cy + 14} fontSize="9" fill="#64748B" fontWeight="bold">
            2F
          </text>

          <circle cx={fRightX} cy={cy} r="3" fill="#D97706" />
          <text x={fRightX - 4} y={cy + 14} fontSize="9" fill="#D97706" fontWeight="bold">
            F
          </text>
          <circle cx={twoFRightX} cy={cy} r="3" fill="#64748B" />
          <text x={twoFRightX - 7} y={cy + 14} fontSize="9" fill="#64748B" fontWeight="bold">
            2F
          </text>

          {/* Object Arrow (Upright Blue) */}
          <line x1={objX} y1={cy} x2={objX} y2={objY} stroke="#2563EB" strokeWidth="3" />
          <polygon points={`${objX},${objY - 4} ${objX - 5},${objY + 6} ${objX + 5},${objY + 6}`} fill="#2563EB" />
          <text x={objX - 16} y={cy + 14} fontSize="9" fill="#2563EB" fontWeight="bold">
            Object
          </text>

          {/* Rays Path Construction */}
          {/* Ray 1: Parallel to axis, then through right focal point F */}
          <line x1={objX} y1={objY} x2={cx} y2={objY} stroke="#EF4444" strokeWidth="1.5" />
          {/* Ray 1 after lens */}
          <line
            x1={cx}
            y1={objY}
            x2={cx + 300}
            y2={objY + (cy - objY) * (300 / (f * scale))}
            stroke="#EF4444"
            strokeWidth="1.5"
          />

          {/* Ray 2: Straight through optical center C */}
          <line
            x1={objX}
            y1={objY}
            x2={cx + 300}
            y2={cy + (cy - objY) * (300 / (objectDistanceCm * scale))}
            stroke="#10B981"
            strokeWidth="1.5"
          />

          {/* Virtual extensions backwards if virtual upright */}
          {image.nature === 'virtual-upright' && image.imageDistanceCm !== null && (
            <g>
              {/* Backward extrapolation of Ray 1 */}
              <line x1={cx} y1={objY} x2={imgX} y2={imgY} stroke="#EF4444" strokeDasharray="3 3" strokeWidth="1.2" />
              {/* Backward extrapolation of Ray 2 */}
              <line x1={cx} y1={cy} x2={imgX} y2={imgY} stroke="#10B981" strokeDasharray="3 3" strokeWidth="1.2" />
            </g>
          )}

          {/* Image Arrow */}
          {image.nature === 'real-inverted' && (
            <g>
              {/* Screen Bar */}
              <line x1={imgX} y1={cy - 50} x2={imgX} y2={cy + 50} stroke="#94A3B8" strokeWidth="3" />
              <text x={imgX - 12} y={cy - 55} fontSize="8" fill="#64748B">
                Screen
              </text>
              {/* Inverted green image arrow */}
              <line x1={imgX} y1={cy} x2={imgX} y2={imgY} stroke="#059669" strokeWidth="3" />
              <polygon points={`${imgX},${imgY + 4} ${imgX - 5},${imgY - 6} ${imgX + 5},${imgY - 6}`} fill="#059669" />
              <text x={imgX - 14} y={cy + 14} fontSize="9" fill="#059669" fontWeight="bold">
                Image
              </text>
            </g>
          )}

          {image.nature === 'virtual-upright' && (
            <g>
              {/* Upright dashed purple image arrow */}
              <line x1={imgX} y1={cy} x2={imgX} y2={imgY} stroke="#9333EA" strokeDasharray="4 3" strokeWidth="3" />
              <polygon points={`${imgX},${imgY - 4} ${imgX - 5},${imgY + 6} ${imgX + 5},${imgY + 6}`} fill="#9333EA" />
              <text x={imgX - 16} y={cy + 14} fontSize="9" fill="#9333EA" fontWeight="bold">
                Virtual Image
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Image Nature Alert Status */}
      <div
        className={`mb-6 rounded-xl border p-4 text-sm font-semibold leading-relaxed ${
          image.nature === 'virtual-upright'
            ? 'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300'
            : image.nature === 'infinity-parallel'
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
        }`}
      >
        {image.nature === 'virtual-upright' ? (
          <T value={LENS_LAB.natureVirtualUpright} />
        ) : image.nature === 'infinity-parallel' ? (
          <T value={LENS_LAB.natureInfinity} />
        ) : (
          <T value={LENS_LAB.natureRealInverted} />
        )}
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface-muted p-4">
          <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
            <T value={LENS_LAB.objectDistanceSlider} /> {objectDistanceCm} cm
          </label>
          <input
            type="range"
            min="4"
            max="36"
            step="1"
            value={objectDistanceCm}
            onChange={(e) => setObjectDistanceCm(parseInt(e.target.value, 10))}
            className="w-full accent-accent"
          />
          <div className="mt-2 text-xs text-content-muted">
            <T value={LENS_LAB.focalLengthInfo} />
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface-muted p-4">
          <label className="mb-2 block text-xs font-semibold uppercase text-content-muted">
            <T value={LENS_LAB.objectHeightSlider} /> {objectHeightCm} cm
          </label>
          <input
            type="range"
            min="2"
            max="6"
            step="0.5"
            value={objectHeightCm}
            onChange={(e) => setObjectHeightCm(parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="mt-2 text-xs text-content-muted">
            Adjust the vertical height of the object arrow.
          </div>
        </div>
      </div>

      {/* Quantitative Optical Metrics Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">Object Distance (u):</span>
          <p className="text-base font-bold text-content">{objectDistanceCm} cm</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={LENS_LAB.imageDistanceLabel} />
          </span>
          <p className="text-base font-bold text-content">
            {image.imageDistanceCm !== null
              ? `${Math.abs(image.imageDistanceCm)} cm ${image.imageDistanceCm < 0 ? '(Virtual)' : '(Real)'}`
              : 'Infinity'}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={LENS_LAB.magnificationLabel} />
          </span>
          <p className="text-base font-bold text-content">
            {image.magnification !== null ? `${image.magnification}× (${image.size})` : 'N/A'}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={LENS_LAB.imageHeightLabel} />
          </span>
          <p className="text-base font-bold text-content">
            {image.imageHeightCm !== null ? `${image.imageHeightCm} cm` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Construction Ray Guide */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-content-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          <T value={LENS_LAB.ray1Desc} />
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <T value={LENS_LAB.ray2Desc} />
        </span>
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
