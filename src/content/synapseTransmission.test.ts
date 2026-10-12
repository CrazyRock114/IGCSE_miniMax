import { describe, expect, it } from 'vitest'
import {
  SYNAPSE_STEPS,
  synapseTransmissionData,
} from './synapseTransmissionData'

describe('Synaptic Transmission 6-Step Kernel', () => {
  it('defines 6 strictly ordered chronological steps', () => {
    expect(SYNAPSE_STEPS.length).toBe(6)
    const numbers = SYNAPSE_STEPS.map((s) => s.stepNumber)
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('demonstrates step 4 is diffusion down concentration gradient', () => {
    const step4 = SYNAPSE_STEPS.find((s) => s.stepNumber === 4)!
    expect(step4.title.en).toContain('Diffusion')
    expect(step4.activeElements.moleculesInCleft).toBe(true)
  })

  it('demonstrates step 5 binds to complementary receptors triggering new post-synaptic impulse', () => {
    const step5 = SYNAPSE_STEPS.find((s) => s.stepNumber === 5)!
    expect(step5.title.en).toContain('Binding to Specific Receptors')
    expect(step5.activeElements.receptorBound).toBe(true)
    expect(step5.activeElements.impulsePost).toBe(true)
  })

  it('demonstrates step 6 has enzymatic breakdown preventing continuous stimulation', () => {
    const step6 = SYNAPSE_STEPS.find((s) => s.stepNumber === 6)!
    expect(step6.title.en).toContain('Enzymatic')
    expect(step6.activeElements.enzymeActive).toBe(true)
  })

  it('validates synapseTransmissionData metadata integrity and unidirectionality notes', () => {
    expect(synapseTransmissionData.type).toBe('synapse-transmission')
    expect(synapseTransmissionData.examinerNotes.en).toContain('ONE DIRECTION ONLY')
    expect(synapseTransmissionData.steps.length).toBe(6)
  })
})
