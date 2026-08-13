import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SegmentedControl } from './segmented-control'

const OPTIONS = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'All Time', value: 'all' },
]

describe('SegmentedControl', () => {
  it('renders without crashing', () => {
    render(<SegmentedControl options={OPTIONS} value="monthly" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders all options as tabs', () => {
    render(<SegmentedControl options={OPTIONS} value="monthly" />)
    expect(screen.getByRole('tab', { name: 'Monthly' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Yearly' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'All Time' })).toBeInTheDocument()
  })

  it('marks the selected option as aria-selected=true', () => {
    render(<SegmentedControl options={OPTIONS} value="yearly" />)
    expect(screen.getByRole('tab', { name: 'Yearly' })).toHaveAttribute('aria-selected', 'true')
  })

  it('marks other options as aria-selected=false', () => {
    render(<SegmentedControl options={OPTIONS} value="yearly" />)
    expect(screen.getByRole('tab', { name: 'Monthly' })).toHaveAttribute('aria-selected', 'false')
  })

  it('fires onChange with the option value when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SegmentedControl options={OPTIONS} value="monthly" onChange={onChange} />)
    await user.click(screen.getByRole('tab', { name: 'Yearly' }))
    expect(onChange).toHaveBeenCalledWith('yearly')
  })

  it('renders with aria-label on tablist', () => {
    render(<SegmentedControl options={OPTIONS} value="monthly" aria-label="Time period" />)
    expect(screen.getByRole('tablist', { name: 'Time period' })).toBeInTheDocument()
  })

  it('keeps segments square so the group reads as one control', () => {
    const { container } = render(<SegmentedControl options={OPTIONS} value="monthly" />)
    expect(container.firstChild).toHaveClass('overflow-hidden', 'bg-panel')
    for (const tab of screen.getAllByRole('tab')) {
      expect(tab).toHaveClass('rounded-none')
    }
  })
})
