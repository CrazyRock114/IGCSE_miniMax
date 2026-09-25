import { driver, type Driver, type DriveStep } from 'driver.js'
import type { BiologyTourData, BiologyTourStepData } from '@/content/biologyToursData'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildPopoverTitleHtml(step: BiologyTourStepData): string {
  const badgeHtml = step.badge
    ? `<span class="bio-tour-badge ${step.badgeVariant ?? 'default'}">${escapeHtml(
        step.badge.en
      )}${step.badge.zh ? ` · ${escapeHtml(step.badge.zh)}` : ''}</span>`
    : ''

  const zhSub = step.title.zh
    ? `<div class="bio-tour-title-zh">${escapeHtml(step.title.zh)}</div>`
    : ''

  return `
    <div class="bio-tour-title-wrap">
      <div class="bio-tour-title-row">
        <span class="bio-tour-title-en">${escapeHtml(step.title.en)}</span>
        ${badgeHtml}
      </div>
      ${zhSub}
    </div>
  `
}

function buildPopoverDescriptionHtml(step: BiologyTourStepData): string {
  const zhDesc = step.description.zh
    ? `<p class="bio-tour-desc-zh">${escapeHtml(step.description.zh)}</p>`
    : ''

  return `
    <div class="bio-tour-desc-wrap">
      <p class="bio-tour-desc-en">${escapeHtml(step.description.en)}</p>
      ${zhDesc}
    </div>
  `
}

export interface BiologyTourController {
  /** Start or restart the tour from a given step (default 0) */
  drive: (startIndex?: number) => void
  /** Advance to next step */
  moveNext: () => void
  /** Step back to previous step */
  movePrevious: () => void
  /** Start auto-play mode (default 3800ms per step) */
  startAutoPlay: (intervalMs?: number) => void
  /** Stop auto-play mode */
  stopAutoPlay: () => void
  /** Check if currently auto-playing */
  isAutoPlaying: () => boolean
  /** Destroy the active tour and clean up */
  destroy: () => void
  /** Check if the tour is active */
  isActive: () => boolean
}

export interface TourLaunchOptions {
  onStepChange?: (stepId: string, index: number) => void
  onDestroy?: () => void
  autoPlay?: boolean
  autoPlayIntervalMs?: number
}

/**
 * Creates and starts a Driver.js guided tour for a Cambridge IGCSE Biology topic.
 */
export function createBiologyTour(
  tourData: BiologyTourData,
  options: TourLaunchOptions = {}
): BiologyTourController {
  let timerId: ReturnType<typeof setInterval> | null = null
  let autoPlayActive = Boolean(options.autoPlay)
  let intervalMs = options.autoPlayIntervalMs ?? 3800

  const stopAutoPlay = () => {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
    autoPlayActive = false
  }

  const restartAutoPlayTimer = () => {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
    if (!autoPlayActive) return

    timerId = setInterval(() => {
      if (!driverInstance.isActive()) {
        stopAutoPlay()
        return
      }
      if (driverInstance.isLastStep()) {
        stopAutoPlay()
        setTimeout(() => driverInstance.destroy(), 2000)
      } else {
        driverInstance.moveNext()
      }
    }, intervalMs)
  }

  const steps: DriveStep[] = tourData.steps.map((step, idx) => ({
    element: step.elementSelector,
    popover: {
      title: buildPopoverTitleHtml(step),
      description: buildPopoverDescriptionHtml(step),
      side: step.side ?? 'bottom',
      align: step.align ?? 'start',
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: idx === tourData.steps.length - 1 ? 'Finish ✓' : 'Next →',
      prevBtnText: '← Back',
    },
    onHighlightStarted: () => {
      options.onStepChange?.(step.id, idx)
      if (autoPlayActive) {
        restartAutoPlayTimer()
      }
    },
  }))

  const driverInstance: Driver = driver({
    animate: true,
    duration: 380,
    overlayColor: '#0f172a',
    overlayOpacity: 0.65,
    stagePadding: 8,
    stageRadius: 8,
    allowClose: true,
    smoothScroll: true,
    allowKeyboardControl: true,
    showProgress: true,
    progressText: '{{current}} / {{total}}',
    popoverClass: 'biology-tour-popover',
    steps,
    onDestroyed: () => {
      stopAutoPlay()
      options.onDestroy?.()
    },
  })

  const controller: BiologyTourController = {
    drive: (startIndex = 0) => {
      driverInstance.drive(startIndex)
      if (autoPlayActive) {
        restartAutoPlayTimer()
      }
    },
    moveNext: () => {
      driverInstance.moveNext()
      if (autoPlayActive) restartAutoPlayTimer()
    },
    movePrevious: () => {
      driverInstance.movePrevious()
      if (autoPlayActive) restartAutoPlayTimer()
    },
    startAutoPlay: (newInterval?: number) => {
      if (typeof newInterval === 'number' && newInterval > 0) {
        intervalMs = newInterval
      }
      autoPlayActive = true
      if (!driverInstance.isActive()) {
        driverInstance.drive(0)
      }
      restartAutoPlayTimer()
    },
    stopAutoPlay,
    isAutoPlaying: () => autoPlayActive,
    destroy: () => {
      stopAutoPlay()
      driverInstance.destroy()
    },
    isActive: () => driverInstance.isActive(),
  }

  return controller
}
