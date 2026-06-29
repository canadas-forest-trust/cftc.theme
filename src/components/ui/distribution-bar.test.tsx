import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DistributionBar } from './distribution-bar'

const ITEMS = [
  { label: 'Black Spruce', value: 40 },
  { label: 'Trembling Aspen', value: 35 },
  { label: 'Jack Pine', value: 25 },
]

describe('DistributionBar', () => {
  it('renders without crashing', () => {
    const { container } = render(<DistributionBar items={ITEMS} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders item labels', () => {
    render(<DistributionBar items={ITEMS} />)
    expect(screen.getByText('Black Spruce')).toBeInTheDocument()
    expect(screen.getByText('Trembling Aspen')).toBeInTheDocument()
    expect(screen.getByText('Jack Pine')).toBeInTheDocument()
  })

  it('renders percentage values', () => {
    render(<DistributionBar items={ITEMS} />)
    expect(screen.getByText('40%')).toBeInTheDocument()
    expect(screen.getByText('35%')).toBeInTheDocument()
    expect(screen.getByText('25%')).toBeInTheDocument()
  })

  it('clamps values to 0-100', () => {
    render(<DistributionBar items={[{ label: 'Over', value: 150 }, { label: 'Under', value: -10 }]} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('renders with custom color on the fill element', () => {
    const { container } = render(
      <DistributionBar items={[{ label: 'Custom', value: 50, color: '#ff0000' }]} />
    )
    // The fill bar has backgroundColor set inline via style prop
    const fillEl = container.querySelector('div.h-full') as HTMLElement | null
    expect(fillEl).toBeInTheDocument()
    expect(fillEl?.style.backgroundColor).toBe('rgb(255, 0, 0)')
  })
})
