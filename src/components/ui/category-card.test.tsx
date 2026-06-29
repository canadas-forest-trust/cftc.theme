import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CategoryCard } from './category-card'

describe('CategoryCard', () => {
  it('renders name', () => {
    render(<CategoryCard name="Forestry" />)
    expect(screen.getByText('Forestry')).toBeInTheDocument()
  })

  it('renders count when provided', () => {
    render(<CategoryCard name="Graphics" count={12} />)
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('renders as a button when no href', () => {
    render(<CategoryCard name="Copy" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders as a link when href provided', () => {
    render(<CategoryCard name="Download" href="/downloads" />)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CategoryCard name="Clickable" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders with active state', () => {
    render(<CategoryCard name="Active" active />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders with inactive state', () => {
    render(<CategoryCard name="Inactive" active={false} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders without count', () => {
    render(<CategoryCard name="No Count" />)
    expect(screen.getByText('No Count')).toBeInTheDocument()
  })
})
