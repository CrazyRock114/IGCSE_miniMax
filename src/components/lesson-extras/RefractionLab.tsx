import { useState } from 'react'
import type { RefractionLabExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { REFRACTION_LAB } from '@/lib/lessonExtrasStrings'
import { calculateRefractionRay } from '@/content/refractionLabData'

interface RefractionLabProps {
  extra: RefractionLabExtra
}

export function RefractionLab({ extra }: RefractionLabProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('crown-glass')
  const [incidentAngleDeg, setIncidentAngleDeg] = useState<number>(30)

  const activeMaterial =
    extra.materials.find((m) => m.id === selectedMaterialId) ?? extra.materials[0]!

  const ray = calculateRefractionRay(incidentAngleDeg, activeMaterial.refractiveIndex)

  // Geometric coordinates on protractor (Center = 320, 200; Radius = 150)
  const cx = 320
  const cy = 200
  const r = 150

  // Incident ray comes from bottom (inside medium) at angle i to the vertical normal
  const iRad = (incidentAngleDeg * Math.PI) / 180
  const incidentStartX = cx - r * Math.sin(iRad)
  const incidentStartY = cy + r * Math.cos(iRad)

  // Reflected ray goes down to the right at angle i to normal
  const reflectedEndX = cx + r * Math.sin(iRad)
  const reflectedEndY = cy + r * Math.cos(iRad)

  // Refracted ray goes up into air at angle r to normal (if present)
  let refractedEndX = cx
  let refractedEndY = cy - r
  if (ray.refractedAngleDeg !== null) {
    const rRad = (ray.refractedAngleDeg * Math.PI) / 180
    refractedEndX = cx + r * Math.sin(rRad)
    refractedEndY = cy - r * Math.cos(rRad)
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

      {/* Material Selection Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {extra.materials.map((mat) => (
          <button
            key={mat.id}
            type="button"
            onClick={() => setSelectedMaterialId(mat.id)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              selectedMaterialId === mat.id
                ? 'bg-accent text-white shadow-sm'
                : 'border border-line bg-surface-muted text-content hover:bg-surface-elevated'
            }`}
          >
            <T value={mat.name} />
          </button>
        ))}
      </div>

      {/* SVG Protractor & Semicircular Block Workstation */}
      <div className="mb-6 overflow-x-auto rounded-xl border border-line bg-surface-elevated p-4">
        <svg
          viewBox="0 0 640 400"
          className="mx-auto w-full max-w-[600px]"
          aria-label="Semicircular Glass Block Protractor Bench"
        >
          {/* Circular Protractor Ring */}
          <circle cx={cx} cy={cy} r={r + 20} fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />

          {/* Protractor degree ticks */}
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map((deg) => {
            const rad = ((deg - 90) * Math.PI) / 180
            const x1 = cx + r * Math.cos(rad)
            const y1 = cy + r * Math.sin(rad)
            const x2 = cx + (r + 15) * Math.cos(rad)
            const y2 = cy + (r + 15) * Math.sin(rad)
            return (
              <g key={`deg-${deg}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94A3B8" strokeWidth="1" />
                <text
                  x={cx + (r + 28) * Math.cos(rad) - 6}
                  y={cy + (r + 28) * Math.sin(rad) + 4}
                  fontSize="8"
                  fill="#64748B"
                >
                  {deg}°
                </text>
              </g>
            )
          })}

          {/* Normal Line (vertical dashed line perpendicular to interface) */}
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#64748B" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x={cx + 6} y={cy - r + 15} fontSize="9" fill="#64748B" fontWeight="bold">
            Normal (0°)
          </text>

          {/* Semicircular Dense Medium Block (bottom half, y >= cy) */}
          <path
            d={`M ${cx - r},${cy} A ${r} ${r} 0 0 0 ${cx + r},${cy} Z`}
            fill="#38BDF8"
            fillOpacity="0.25"
            stroke="#0284C7"
            strokeWidth="2.5"
          />
          <text x={cx - 130} y={cy + 40} fontSize="11" fill="#0369A1" fontWeight="bold">
            {activeMaterial.name.en} (Denser)
          </text>
          <text x={cx - 130} y={cy - 20} fontSize="11" fill="#64748B" fontWeight="bold">
            Air (Less Dense, n = 1.00)
          </text>

          {/* Critical Angle dashed marker lines inside block */}
          {(() => {
            const cRad = (ray.criticalAngleDeg * Math.PI) / 180
            const cX = cx - r * Math.sin(cRad)
            const cY = cy + r * Math.cos(cRad)
            return (
              <g>
                <line x1={cx} y1={cy} x2={cX} y2={cY} stroke="#F59E0B" strokeDasharray="3 3" strokeWidth="1.5" />
                <text x={cX - 20} y={cY + 12} fontSize="9" fill="#D97706" fontWeight="bold">
                  c = {ray.criticalAngleDeg}°
                </text>
              </g>
            )
          })()}

          {/* Incident Laser Ray (Red) */}
          <line
            x1={incidentStartX}
            y1={incidentStartY}
            x2={cx}
            y2={cy}
            stroke="#DC2626"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Laser source diode marker */}
          <circle cx={incidentStartX} cy={incidentStartY} r="5" fill="#991B1B" />
          <text x={incidentStartX - 15} y={incidentStartY + 16} fontSize="9" fill="#DC2626" fontWeight="bold">
            Laser (i = {incidentAngleDeg}°)
          </text>

          {/* Reflected Ray inside medium */}
          <line
            x1={cx}
            y1={cy}
            x2={reflectedEndX}
            y2={reflectedEndY}
            stroke="#DC2626"
            strokeWidth={ray.behavior === 'tir' ? '3.5' : '1.5'}
            strokeDasharray={ray.behavior === 'tir' ? 'none' : '4 4'}
            opacity={ray.behavior === 'tir' ? 1.0 : 0.4}
          />
          {ray.behavior === 'tir' && (
            <text x={reflectedEndX - 10} y={reflectedEndY + 16} fontSize="9" fill="#DC2626" fontWeight="bold">
              100% TIR (r = {incidentAngleDeg}°)
            </text>
          )}

          {/* Refracted Ray in air (if not in TIR) */}
          {ray.refractedAngleDeg !== null && (
            <g>
              <line
                x1={cx}
                y1={cy}
                x2={refractedEndX}
                y2={refractedEndY}
                stroke="#DC2626"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x={refractedEndX + (ray.refractedAngleDeg > 45 ? 6 : -40)}
                y={refractedEndY - 6}
                fontSize="9"
                fill="#DC2626"
                fontWeight="bold"
              >
                Refracted (r = {ray.refractedAngleDeg}°)
              </text>
            </g>
          )}

          {/* Boundary Center Point */}
          <circle cx={cx} cy={cy} r="4" fill="#0F172A" />
        </svg>
      </div>

      {/* Behavior Status Banner */}
      <div
        className={`mb-6 rounded-xl border p-4 text-sm font-semibold leading-relaxed ${
          ray.behavior === 'tir'
            ? 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300'
            : ray.behavior === 'critical'
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
        }`}
      >
        {ray.behavior === 'tir' ? (
          <T value={REFRACTION_LAB.modeTir} />
        ) : ray.behavior === 'critical' ? (
          <T value={REFRACTION_LAB.modeCritical} />
        ) : (
          <T value={REFRACTION_LAB.modeRefraction} />
        )}
      </div>

      {/* Interactive Incident Angle Controls */}
      <div className="space-y-4 rounded-xl border border-line bg-surface-muted p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-semibold uppercase text-content-muted">
            <T value={REFRACTION_LAB.incidentAngleSlider} /> {incidentAngleDeg}°
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIncidentAngleDeg(0)}
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-content hover:bg-surface-elevated"
            >
              Normal (0°)
            </button>
            <button
              type="button"
              onClick={() => setIncidentAngleDeg(30)}
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-content hover:bg-surface-elevated"
            >
              i = 30°
            </button>
            <button
              type="button"
              onClick={() => setIncidentAngleDeg(Math.round(ray.criticalAngleDeg))}
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-content hover:bg-surface-elevated"
            >
              Critical c ({Math.round(ray.criticalAngleDeg)}°)
            </button>
            <button
              type="button"
              onClick={() => setIncidentAngleDeg(55)}
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-content hover:bg-surface-elevated"
            >
              TIR (55°)
            </button>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="75"
          step="1"
          value={incidentAngleDeg}
          onChange={(e) => setIncidentAngleDeg(parseInt(e.target.value, 10))}
          className="w-full accent-accent"
        />
      </div>

      {/* Quantitative Optical Data Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">Refractive Index (n):</span>
          <p className="text-base font-bold text-content">{activeMaterial.refractiveIndex.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
          <span className="text-xs text-amber-600 dark:text-amber-400">
            <T value={REFRACTION_LAB.criticalAngleLabel} />
          </span>
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{ray.criticalAngleDeg}°</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={REFRACTION_LAB.refractedAngleLabel} />
          </span>
          <p className="text-base font-bold text-content">
            {ray.refractedAngleDeg !== null ? `${ray.refractedAngleDeg}°` : 'None (TIR)'}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface-muted p-3">
          <span className="text-xs text-content-muted">
            <T value={REFRACTION_LAB.speedInMedium} />
          </span>
          <p className="text-base font-bold text-content">{ray.speedInMediumKmS.toLocaleString()} km/s</p>
        </div>
      </div>

      {/* Optical Fibre Notice */}
      <div className="mt-4 rounded-xl border border-line bg-surface-muted p-3 text-xs leading-relaxed text-content">
        <T value={REFRACTION_LAB.applicationFibre} />
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
