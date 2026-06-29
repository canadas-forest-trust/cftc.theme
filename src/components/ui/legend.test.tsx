import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Legend } from './legend'

const ITEMS = [
  { label: 'Black Spruce', color: '#2d6a4f' },
  { label: 'Trembling Aspen', color: '#52b788' },
  { label: 'Jack Pine', color: '#95d5b2' },
]

describe('Legend', () => {
  it('renders without crashing', () => {
    const { container } = render(<Legend items={ITEMS} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders all item labels', () => {
    render(<Legend items={ITEMS} />)
    expect(screen.getByText('Black Spruce')).toBeInTheDocument()
    expect(screen.getByText('Trembling Aspen')).toBeInTheDocument()
    expect(screen.getByText('Jack Pine')).toBeInTheDocument()
  })

  it('renders with empty items', () => {
    const { container } = render(<Legend items={[]} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })
})
