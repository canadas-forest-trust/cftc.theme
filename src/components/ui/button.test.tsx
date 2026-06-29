import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop passed', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders with variant solid', () => {
    render(<Button variant="solid">Solid</Button>)
    expect(screen.getByRole('button', { name: 'Solid' })).toBeInTheDocument()
  })

  it('renders with variant ghost', () => {
    render(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button', { name: 'Ghost' })).toBeInTheDocument()
  })

  it('renders with variant link', () => {
    render(<Button variant="link">Link button</Button>)
    expect(screen.getByRole('button', { name: 'Link button' })).toBeInTheDocument()
  })

  it('renders with size sm', () => {
    render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument()
  })

  it('renders with arrow glyph', () => {
    const { container } = render(<Button arrow="right">Go</Button>)
    expect(container.textContent).toContain('→')
  })

  it('renders iconOnly without crashing', () => {
    render(<Button iconOnly aria-label="Close">✕</Button>)
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Disabled</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Button>Accessible button</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
