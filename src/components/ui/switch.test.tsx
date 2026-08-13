import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Switch } from './switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch checked={false} aria-label="Toggle feature" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders with checked=true', () => {
    render(<Switch checked={true} aria-label="Toggle feature" />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
  })

  it('renders with checked=false', () => {
    render(<Switch checked={false} aria-label="Toggle feature" />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
  })

  it('fires onCheckedChange with toggled value when clicked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch checked={false} onCheckedChange={onCheckedChange} aria-label="Toggle" />)
    await user.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('fires onCheckedChange with false when toggled off', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Switch checked={true} onCheckedChange={onCheckedChange} aria-label="Toggle" />)
    await user.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('is disabled when disabled prop passed', () => {
    render(<Switch checked={false} disabled aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('has aria-label', () => {
    render(<Switch checked={false} aria-label="Dark mode" />)
    expect(screen.getByRole('switch', { name: 'Dark mode' })).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Switch checked={false} aria-label="Feature toggle" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('toggles when the label is clicked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Switch
        checked={false}
        onCheckedChange={onCheckedChange}
        label="Show sustainability badge"
      />,
    )
    await user.click(screen.getByText('Show sustainability badge'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })
})
