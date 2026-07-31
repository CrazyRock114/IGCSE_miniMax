import { useMemo } from 'react'
import type { SimResult, SimSeries, SimSpec } from '@/content/types'
import { niceAxisMax, niceAxisMin } from '@/lib/units'
import { Plot2D } from './plot2d/Plot2D'
import { RayTrace } from './raytrace/RayTrace'
import { Beam } from './beam/Beam'
import { Particles } from './particles/Particles'
import { Waves } from './waves/Waves'
import { Circuit } from './circuit/Circuit'
import { Field2D } from './field2d/Field2D'
import { Atom } from './atom/Atom'

export interface SimViewProps {
  result: SimResult
  params: Record<string, number>
  /** Lets a primitive write a parameter back — dragging a ray, a weight, a handle. */
  onParamChange: (key: string, value: number) => void
  spec: SimSpec
}

const SERIES_COLOURS = ['#2563eb', '#0d9488', '#7c3aed', '#c2410c']

/**
 * Chooses the renderer for a simulation.
 *
 * Every lesson goes through here, so `LessonPage` never learns about individual
 * primitives. Adding a primitive means adding a case, not touching the lesson page.
 */
export function SimStage(props: SimViewProps) {
  switch (props.spec.primitive) {
    case 'raytrace':
      return <RayTrace {...props} />
    case 'beam':
      return <Beam {...props} />
    case 'particles':
      return <Particles {...props} />
    case 'waves':
      return <Waves {...props} />
    case 'circuit':
      return <Circuit {...props} />
    case 'field2d':
      return <Field2D {...props} />
    case 'atom':
      return <Atom {...props} />
    case 'plot2d':
      return <PlotGrid {...props} />
    default:
      // A lesson referencing a primitive that has not been built yet should say so
      // rather than render an empty box.
      return (
        <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
          The “{props.spec.primitive}” visualisation has not been built yet.
        </p>
      )
  }
}

/**
 * Signed axis range for a set of values, snapped to round numbers.
 *
 * Three cases:
 * - all non-negative (a speed–time graph): keep a zero baseline, so a shaded area under
 *   the curve still means something.
 * - roughly balanced about zero (an I–V characteristic): use a symmetric range, so the
 *   origin sits where the axes cross and all four quadrants read naturally.
 * - dips below zero but is not centred on it (a heating curve from −25 °C to 125 °C):
 *   round each end separately. Mirroring the maximum here would give −200 to 200 and
 *   squash the curve into the middle third of the plot.
 */
function axisRange(values: number[]): { min: number; max: number } {
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  if (lo >= 0) return { min: 0, max: niceAxisMax(hi) }

  const balanced = Math.abs(lo) > 0.4 * Math.abs(hi) && Math.abs(hi) > 0.4 * Math.abs(lo)
  if (balanced) {
    const bound = niceAxisMax(Math.max(Math.abs(lo), Math.abs(hi)))
    return { min: -bound, max: bound }
  }
  return { min: niceAxisMin(lo), max: niceAxisMax(hi) }
}

/** Series shown as areas rather than plain lines, keyed by series id. */
const FILLED_SERIES = ['speed']

/**
 * Plots the result's series.
 *
 * Curves that share both axis units go on one set of axes; curves measuring different
 * things get a panel each. That split matters — most of these lessons ask the student to
 * compare two runs, and a comparison spread across two independently scaled panels shows
 * nothing.
 */
function PlotGrid({ result }: SimViewProps) {
  const { series: allSeries } = result

  const groups = useMemo(() => {
    // Group by axis units, preserving the order the kernel emitted them in.
    const byUnit = new Map<string, SimSeries[]>()
    for (const s of allSeries) {
      const key = `${s.unit.x}|${s.unit.y}`
      const existing = byUnit.get(key)
      if (existing) existing.push(s)
      else byUnit.set(key, [s])
    }

    return Array.from(byUnit.values()).map((series) => {
      // A series may pin its own y range where the quantity has natural bounds the data
      // does not reach — pH stops at 14 whether or not any point gets there.
      const pinned = series.find((s) => s.yBounds)?.yBounds
      return {
        series,
        x: axisRange(series.flatMap((s) => s.points.map(([x]) => x))),
        y: pinned ?? axisRange(series.flatMap((s) => s.points.map(([, y]) => y))),
      }
    })
  }, [allSeries])

  return (
    <div className={'grid gap-4 ' + (groups.length > 1 ? 'sm:grid-cols-2' : '')}>
      {groups.map((g) => (
        <Plot2D
          key={g.series.map((s) => s.key).join('+')}
          series={g.series}
          xMin={g.x.min}
          xMax={g.x.max}
          yMin={g.y.min}
          yMax={g.y.max}
          colours={SERIES_COLOURS}
          fillKeys={FILLED_SERIES}
          height={groups.length === 1 ? 300 : 240}
        />
      ))}
    </div>
  )
}
