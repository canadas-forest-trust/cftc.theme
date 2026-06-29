import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from './footer'

const LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

describe('Footer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer copyright="© 2024 Canada's Forest Trust" />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer copyright="© 2024 Canada's Forest Trust" />)
    expect(screen.getByText("© 2024 Canada's Forest Trust")).toBeInTheDocument()
  })

  it('renders links when provided', () => {
    render(<Footer copyright="© 2024" links={LINKS} />)
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument()
  })

  it('renders link hrefs correctly', () => {
    render(<Footer copyright="© 2024" links={LINKS} />)
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
  })

  it('renders without links', () => {
    render(<Footer copyright="© 2024" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders nav element when links provided', () => {
    const { container } = render(<Footer copyright="© 2024" links={LINKS} />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
