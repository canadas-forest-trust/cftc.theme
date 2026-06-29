import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Stat } from './stat'

describe('Stat', () => {
  it('renders label', () => {
    render(<Stat label="CARBON SEQUESTERED" value="809.73" />)
    expect(screen.getByText('CARBON SEQUESTERED')).toBeInTheDocument()
  })

  it('renders value', () => {
    render(<Stat label="Trees planted" value="6,000" />)
    expect(screen.getByText('6,000')).toBeInTheDocument()
  })

  it('renders unit when provided', () => {
    render(<Stat label="CO2" value="500" unit="kg" />)
    expect(screen.getByText('kg')).toBeInTheDocument()
  })

  it('renders without unit', () => {
    render(<Stat label="Trees" value="100" />)
    expect(screen.getByText('Trees')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders with size variants', () => {
    const { rerender } = render(<Stat label="Size" value="42" size="md" />)
    expect(screen.getByText('42')).toBeInTheDocument()
    rerender(<Stat label="Size" value="42" size="xl" />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders with tone variants', () => {
    const { rerender } = render(<Stat label="Tone" value="100" tone="accent" />)
    expect(screen.getByText('100')).toBeInTheDocument()
    rerender(<Stat label="Tone" value="100" tone="inverse" />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })
})
