import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { ColorField } from './color-field'

describe('ColorField', () => {
  it('renders label and hex value', () => {
    render(
      <ColorField label="Accent colour" value="#1B6A3E" onChange={() => undefined} />,
    )
    expect(screen.getByLabelText('Accent colour')).toHaveValue('#1B6A3E')
  })

  it('fires onChange when a preset is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ColorField
        label="Accent"
        value="#111111"
        presets={['#1B6A3E', '#0A3D2A']}
        onChange={onChange}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Use colour #1B6A3E' }))
    expect(onChange).toHaveBeenCalledWith('#1B6A3E')
  })

  it('fires onChange when hex text becomes a full colour', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ColorField label="Accent" value="#111111" onChange={onChange} />)
    const input = screen.getByLabelText('Accent')
    await user.clear(input)
    await user.type(input, 'FF5500')
    expect(onChange).toHaveBeenCalledWith('#FF5500')
  })

  it('exposes a native color picker', () => {
    render(<ColorField label="Accent" value="#1B6A3E" onChange={() => undefined} />)
    expect(screen.getByLabelText('Pick accent')).toHaveAttribute('type', 'color')
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <ColorField label="Accent colour" value="#1B6A3E" onChange={() => undefined} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
