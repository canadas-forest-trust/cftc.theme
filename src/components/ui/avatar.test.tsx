import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from './avatar'

describe('Avatar', () => {
  it('renders initials', () => {
    render(<Avatar initials="MV" />)
    expect(screen.getByText('MV')).toBeInTheDocument()
  })

  it('renders as span element', () => {
    const { container } = render(<Avatar initials="AB" />)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('renders with tone="accent"', () => {
    render(<Avatar initials="JD" tone="accent" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders with tone="ink"', () => {
    render(<Avatar initials="JD" tone="ink" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders with size="sm"', () => {
    render(<Avatar initials="AB" size="sm" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders with size="lg"', () => {
    render(<Avatar initials="AB" size="lg" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })
})
