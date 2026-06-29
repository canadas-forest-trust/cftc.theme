import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SdgCard } from './sdg-card'

describe('SdgCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<SdgCard goal="15" title="Life on Land" />)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('renders the goal number', () => {
    render(<SdgCard goal="15" title="Life on Land" />)
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('renders numeric goal padded', () => {
    render(<SdgCard goal={2} title="Zero Hunger" />)
    expect(screen.getByText('02')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<SdgCard goal="15" title="Life on Land" />)
    expect(screen.getByText('Life on Land')).toBeInTheDocument()
  })

  it('renders a link when href provided', () => {
    render(<SdgCard goal="15" title="Life on Land" href="https://example.com" />)
    expect(screen.getByRole('link', { name: /Read more/ })).toBeInTheDocument()
  })

  it('renders custom actionLabel', () => {
    render(<SdgCard goal="15" title="Life on Land" href="https://example.com" actionLabel="Learn more" />)
    expect(screen.getByText(/Learn more/)).toBeInTheDocument()
  })

  it('does not render link when no href', () => {
    render(<SdgCard goal="15" title="Life on Land" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders with custom color', () => {
    const { container } = render(<SdgCard goal="15" title="Life on Land" color="#56c02b" />)
    // The color rule is the first child div
    expect(container.querySelector('article')).toBeInTheDocument()
  })
})
