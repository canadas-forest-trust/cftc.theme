import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import { Radio } from './radio'

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio name="choice" label="Correct answer" value="a" />)
    expect(screen.getByRole('radio', { name: 'Correct answer' })).toBeInTheDocument()
  })

  it('fires onChange when selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Radio name="choice" label="Option A" value="a" onChange={onChange} />)
    await user.click(screen.getByRole('radio'))
    expect(onChange).toHaveBeenCalled()
  })

  it('toggles when the label is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Radio name="choice" label="Correct answer" value="a" onChange={onChange} />)
    await user.click(screen.getByText('Correct answer'))
    expect(onChange).toHaveBeenCalled()
  })

  it('supports exclusive selection within a name group', async () => {
    const user = userEvent.setup()
    function Group() {
      const [value, setValue] = useState('a')
      return (
        <div>
          <Radio
            name="correct"
            label="Answer A"
            value="a"
            checked={value === 'a'}
            onChange={() => setValue('a')}
          />
          <Radio
            name="correct"
            label="Answer B"
            value="b"
            checked={value === 'b'}
            onChange={() => setValue('b')}
          />
        </div>
      )
    }
    render(<Group />)
    expect(screen.getByRole('radio', { name: 'Answer A' })).toBeChecked()
    await user.click(screen.getByRole('radio', { name: 'Answer B' }))
    expect(screen.getByRole('radio', { name: 'Answer B' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Answer A' })).not.toBeChecked()
  })

  it('is disabled when disabled prop passed', () => {
    render(<Radio name="choice" label="Disabled" value="x" disabled />)
    expect(screen.getByRole('radio')).toBeDisabled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Radio name="choice" label="Accessible radio" value="a" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
