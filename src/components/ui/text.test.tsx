import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from './text'

describe('Text', () => {
  it('renders text content', () => {
    render(<Text>Body copy here</Text>)
    expect(screen.getByText('Body copy here')).toBeInTheDocument()
  })

  it('renders as p by default', () => {
    const { container } = render(<Text>paragraph</Text>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('renders as span when as="span"', () => {
    const { container } = render(<Text as="span">span text</Text>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('renders as div when as="div"', () => {
    const { container } = render(<Text as="div">div text</Text>)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders with size variants', () => {
    const { rerender } = render(<Text size="sm">Small</Text>)
    expect(screen.getByText('Small')).toBeInTheDocument()
    rerender(<Text size="base">Base</Text>)
    expect(screen.getByText('Base')).toBeInTheDocument()
    rerender(<Text size="lg">Large</Text>)
    expect(screen.getByText('Large')).toBeInTheDocument()
  })

  it('renders with tone variants', () => {
    const { rerender } = render(<Text tone="ink">Ink</Text>)
    expect(screen.getByText('Ink')).toBeInTheDocument()
    rerender(<Text tone="soft">Soft</Text>)
    expect(screen.getByText('Soft')).toBeInTheDocument()
    rerender(<Text tone="muted">Muted</Text>)
    expect(screen.getByText('Muted')).toBeInTheDocument()
  })
})
