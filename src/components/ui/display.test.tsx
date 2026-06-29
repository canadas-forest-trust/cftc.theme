import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Display } from './display'

describe('Display', () => {
  it('renders text content', () => {
    render(<Display>Page Title</Display>)
    expect(screen.getByText('Page Title')).toBeInTheDocument()
  })

  it('renders as h1 by default', () => {
    const { container } = render(<Display>Heading</Display>)
    expect(container.querySelector('h1')).toBeInTheDocument()
  })

  it('renders as h2 when as="h2"', () => {
    const { container } = render(<Display as="h2">Heading</Display>)
    expect(container.querySelector('h2')).toBeInTheDocument()
  })

  it('renders as h3 when as="h3"', () => {
    const { container } = render(<Display as="h3">Heading</Display>)
    expect(container.querySelector('h3')).toBeInTheDocument()
  })

  it('renders with size variants', () => {
    const { rerender } = render(<Display size="md">Medium</Display>)
    expect(screen.getByText('Medium')).toBeInTheDocument()
    rerender(<Display size="lg">Large</Display>)
    expect(screen.getByText('Large')).toBeInTheDocument()
    rerender(<Display size="xl">XLarge</Display>)
    expect(screen.getByText('XLarge')).toBeInTheDocument()
  })

  it('renders with tone variants', () => {
    const { rerender } = render(<Display tone="ink">Ink</Display>)
    expect(screen.getByText('Ink')).toBeInTheDocument()
    rerender(<Display tone="accent">Accent</Display>)
    expect(screen.getByText('Accent')).toBeInTheDocument()
    rerender(<Display tone="inverse">Inverse</Display>)
    expect(screen.getByText('Inverse')).toBeInTheDocument()
  })

  it('accepts an id prop', () => {
    const { container } = render(<Display id="my-heading">Title</Display>)
    expect(container.querySelector('#my-heading')).toBeInTheDocument()
  })
})
