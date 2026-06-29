import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Panel } from './panel'

describe('Panel', () => {
  it('renders children', () => {
    render(<Panel>Panel content</Panel>)
    expect(screen.getByText('Panel content')).toBeInTheDocument()
  })

  it('renders as div by default', () => {
    const { container } = render(<Panel>Content</Panel>)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders as section when as="section"', () => {
    const { container } = render(<Panel as="section">Section content</Panel>)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('renders as article when as="article"', () => {
    const { container } = render(<Panel as="article">Article content</Panel>)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('renders with variant inset', () => {
    render(<Panel variant="inset">Inset</Panel>)
    expect(screen.getByText('Inset')).toBeInTheDocument()
  })

  it('renders with variant accent', () => {
    render(<Panel variant="accent">Accent</Panel>)
    expect(screen.getByText('Accent')).toBeInTheDocument()
  })

  it('renders with padding variants', () => {
    const { rerender } = render(<Panel padding="none">None</Panel>)
    expect(screen.getByText('None')).toBeInTheDocument()
    rerender(<Panel padding="sm">Small</Panel>)
    expect(screen.getByText('Small')).toBeInTheDocument()
    rerender(<Panel padding="lg">Large</Panel>)
    expect(screen.getByText('Large')).toBeInTheDocument()
  })
})
