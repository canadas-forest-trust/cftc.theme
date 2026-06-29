import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatStrip } from './stat-strip'

const ITEMS = [
  { label: 'SEEDLINGS', value: '2,400' },
  { label: 'TOTAL TREES', value: '6,000' },
  { label: 'PLANTING SOON', value: '1,200' },
]

describe('StatStrip', () => {
  it('renders without crashing', () => {
    const { container } = render(<StatStrip items={ITEMS} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders all stat labels', () => {
    render(<StatStrip items={ITEMS} />)
    expect(screen.getByText('SEEDLINGS')).toBeInTheDocument()
    expect(screen.getByText('TOTAL TREES')).toBeInTheDocument()
    expect(screen.getByText('PLANTING SOON')).toBeInTheDocument()
  })

  it('renders all stat values', () => {
    render(<StatStrip items={ITEMS} />)
    expect(screen.getByText('2,400')).toBeInTheDocument()
    expect(screen.getByText('6,000')).toBeInTheDocument()
    expect(screen.getByText('1,200')).toBeInTheDocument()
  })

  it('renders with a single item', () => {
    render(<StatStrip items={[{ label: 'TREES', value: '100' }]} />)
    expect(screen.getByText('TREES')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })
})
