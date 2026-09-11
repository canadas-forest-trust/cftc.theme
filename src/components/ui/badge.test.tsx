import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge>GRAPHICS</Badge>)
    expect(screen.getByText('GRAPHICS')).toBeInTheDocument()
  })

  it('renders with variant solid', () => {
    const { container } = render(<Badge variant="solid">Solid</Badge>)
    expect(container.querySelector('span')).toBeInTheDocument()
    expect(screen.getByText('Solid')).toBeInTheDocument()
  })

  it('renders with variant outline', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toBeInTheDocument()
  })

  it('renders with variant soft', () => {
    render(<Badge variant="soft">Soft</Badge>)
    expect(screen.getByText('Soft')).toBeInTheDocument()
  })

  it('applies soft status tones', () => {
    const { container } = render(
      <Badge variant="soft" tone="success">
        Published
      </Badge>,
    )
    expect(container.firstChild).toHaveClass('bg-success-bg')
    expect(container.firstChild).toHaveClass('text-success-fg')
  })

  it('applies warning, danger, and info soft tones', () => {
    const { rerender, container } = render(
      <Badge variant="soft" tone="warning">
        Due
      </Badge>,
    )
    expect(container.firstChild).toHaveClass('bg-warning-bg')

    rerender(
      <Badge variant="soft" tone="danger">
        Overdue
      </Badge>,
    )
    expect(container.firstChild).toHaveClass('bg-danger-bg')

    rerender(
      <Badge variant="soft" tone="info">
        Info
      </Badge>,
    )
    expect(container.firstChild).toHaveClass('bg-info-bg')
  })

  it('renders a dot when dot prop is true', () => {
    const { container } = render(<Badge dot>Active</Badge>)
    // The dot span is rendered with aria-hidden, find it by its style
    const spans = container.querySelectorAll('span')
    // The outer span + the dot span = 2
    expect(spans.length).toBeGreaterThanOrEqual(2)
  })

  it('does not render a dot when dot prop is false/absent', () => {
    const { container } = render(<Badge>No dot</Badge>)
    // Only 1 span (the badge itself)
    expect(container.querySelectorAll('span').length).toBe(1)
  })
})
