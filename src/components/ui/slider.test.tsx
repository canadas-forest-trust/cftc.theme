import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Slider } from './slider'

describe('Slider', () => {
  it('renders with label and current value', () => {
    render(
      <Slider label="Minimum score" value={40} min={0} max={100} onValueChange={() => undefined} />,
    )
    expect(screen.getByRole('slider', { name: 'Minimum score' })).toHaveValue('40')
  })

  it('fires onValueChange when moved', () => {
    const onValueChange = vi.fn()
    render(
      <Slider label="Score" value={10} min={0} max={100} onValueChange={onValueChange} />,
    )
    fireEvent.change(screen.getByRole('slider'), { target: { value: '25' } })
    expect(onValueChange).toHaveBeenCalledWith(25)
  })

  it('shows an optional value label', () => {
    render(
      <Slider
        label="Score"
        value={75}
        min={0}
        max={100}
        valueLabel="75%"
        onValueChange={() => undefined}
      />,
    )
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('is disabled when disabled prop passed', () => {
    render(
      <Slider label="Score" value={5} disabled onValueChange={() => undefined} />,
    )
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Slider label="Score" value={50} onValueChange={() => undefined} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
