import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TopBar } from './top-bar'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Reports', href: '/reports' },
  { label: 'Settings', href: '/settings' },
]

describe('TopBar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TopBar cftMark={<span>CFT</span>} />
    )
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('renders the cft mark', () => {
    render(<TopBar cftMark={<span>CFT Logo</span>} />)
    expect(screen.getByText('CFT Logo')).toBeInTheDocument()
  })

  it('renders partner mark when provided', () => {
    render(<TopBar cftMark={<span>CFT</span>} partnerMark={<span>Partner</span>} />)
    expect(screen.getByText('Partner')).toBeInTheDocument()
  })

  it('renders nav items when provided', () => {
    render(<TopBar cftMark={<span>CFT</span>} nav={NAV_ITEMS} />)
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Reports' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument()
  })

  it('marks active nav item with aria-current="page"', () => {
    render(<TopBar cftMark={<span>CFT</span>} nav={NAV_ITEMS} />)
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders account initials when provided', () => {
    render(<TopBar cftMark={<span>CFT</span>} accountInitials="MV" />)
    expect(screen.getByText('MV')).toBeInTheDocument()
  })

  it('renders without nav when not provided', () => {
    render(<TopBar cftMark={<span>CFT</span>} />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })
})
