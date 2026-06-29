import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Ribbon } from './ribbon'

describe('Ribbon', () => {
  it('renders text content', () => {
    render(<Ribbon>GOLD</Ribbon>)
    expect(screen.getByText('GOLD')).toBeInTheDocument()
  })

  it('renders as span element', () => {
    const { container } = render(<Ribbon>GOLD</Ribbon>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('renders with tone="gold"', () => {
    render(<Ribbon tone="gold">GOLD</Ribbon>)
    expect(screen.getByText('GOLD')).toBeInTheDocument()
  })

  it('renders with tone="accent"', () => {
    render(<Ribbon tone="accent">NEW</Ribbon>)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('renders with tone="ink"', () => {
    render(<Ribbon tone="ink">SOLD</Ribbon>)
    expect(screen.getByText('SOLD')).toBeInTheDocument()
  })
})
