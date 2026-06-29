import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './progress-bar'

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProgressBar value={50} />)
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument()
  })

  it('has correct aria-valuenow', () => {
    const { container } = render(<ProgressBar value={75} />)
    const progressbar = container.querySelector('[role="progressbar"]')
    expect(progressbar).toHaveAttribute('aria-valuenow', '75')
  })

  it('has aria-valuemin=0 and aria-valuemax=100', () => {
    const { container } = render(<ProgressBar value={50} />)
    const progressbar = container.querySelector('[role="progressbar"]')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
  })

  it('renders with label', () => {
    render(<ProgressBar value={60} label="Progress" />)
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  it('renders with valueLabel', () => {
    render(<ProgressBar value={60} valueLabel="4,500" />)
    expect(screen.getByText('4,500')).toBeInTheDocument()
  })

  it('clamps value to 0 minimum', () => {
    const { container } = render(<ProgressBar value={-10} />)
    const progressbar = container.querySelector('[role="progressbar"]')
    expect(progressbar).toHaveAttribute('aria-valuenow', '0')
  })

  it('clamps value to 100 maximum', () => {
    const { container } = render(<ProgressBar value={200} />)
    const progressbar = container.querySelector('[role="progressbar"]')
    expect(progressbar).toHaveAttribute('aria-valuenow', '100')
  })

  it('renders with tone variants', () => {
    const { rerender } = render(<ProgressBar value={50} tone="accent" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    rerender(<ProgressBar value={50} tone="soft" />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<ProgressBar value={60} label="Forest coverage" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
