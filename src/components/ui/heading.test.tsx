import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Heading } from './heading'

describe('Heading', () => {
  it('renders text content', () => {
    render(<Heading>My Heading</Heading>)
    expect(screen.getByText('My Heading')).toBeInTheDocument()
  })

  it('renders as h2 by default', () => {
    const { container } = render(<Heading>Heading</Heading>)
    expect(container.querySelector('h2')).toBeInTheDocument()
  })

  it('renders as h3 when as="h3"', () => {
    const { container } = render(<Heading as="h3">H3</Heading>)
    expect(container.querySelector('h3')).toBeInTheDocument()
  })

  it('renders as h4 when as="h4"', () => {
    const { container } = render(<Heading as="h4">H4</Heading>)
    expect(container.querySelector('h4')).toBeInTheDocument()
  })

  it('renders with size variants', () => {
    const { rerender } = render(<Heading size="sm">Small</Heading>)
    expect(screen.getByText('Small')).toBeInTheDocument()
    rerender(<Heading size="md">Medium</Heading>)
    expect(screen.getByText('Medium')).toBeInTheDocument()
    rerender(<Heading size="lg">Large</Heading>)
    expect(screen.getByText('Large')).toBeInTheDocument()
  })

  it('renders with tone variants', () => {
    const { rerender } = render(<Heading tone="ink">Ink</Heading>)
    expect(screen.getByText('Ink')).toBeInTheDocument()
    rerender(<Heading tone="soft">Soft</Heading>)
    expect(screen.getByText('Soft')).toBeInTheDocument()
    rerender(<Heading tone="accent">Accent</Heading>)
    expect(screen.getByText('Accent')).toBeInTheDocument()
  })
})
