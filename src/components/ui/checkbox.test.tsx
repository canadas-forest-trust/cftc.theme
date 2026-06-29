import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    const { container } = render(<Checkbox />)
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(<Checkbox label="Enable feature" description="This enables feature X" />)
    expect(screen.getByText('This enables feature X')).toBeInTheDocument()
  })

  it('fires onChange when checked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Check me" onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalled()
  })

  it('fires onChange when unchecked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Check me" defaultChecked onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalled()
  })

  it('is checked when defaultChecked passed', () => {
    render(<Checkbox label="Pre-checked" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('is disabled when disabled prop passed', () => {
    render(<Checkbox label="Disabled" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Checkbox label="Accessible checkbox" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
