import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Select } from './select'

const OPTIONS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]

describe('Select', () => {
  it('renders without crashing', () => {
    const { container } = render(<Select options={OPTIONS} />)
    expect(container.querySelector('select')).toBeInTheDocument()
  })

  it('renders all options from options prop', () => {
    render(<Select options={OPTIONS} />)
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option C' })).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Select options={OPTIONS} label="Category" id="cat" />)
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('fires onChange when selection changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select options={OPTIONS} onChange={onChange} />)
    await user.selectOptions(screen.getByRole('combobox'), 'b')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders with filter variant', () => {
    const { container } = render(<Select options={OPTIONS} variant="filter" />)
    expect(container.querySelector('select')).toBeInTheDocument()
  })

  it('has no a11y violations with label', async () => {
    const { container } = render(<Select options={OPTIONS} label="Choose" id="choose" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
