import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { OtpInput } from './otp-input'

describe('OtpInput', () => {
  it('renders without crashing', () => {
    const { container } = render(<OtpInput />)
    expect(container.querySelector('[role="group"]')).toBeInTheDocument()
  })

  it('renders 5 digit inputs by default', () => {
    render(<OtpInput />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(5)
  })

  it('renders custom number of digit inputs', () => {
    render(<OtpInput length={6} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(6)
  })

  it('renders with default aria-label', () => {
    render(<OtpInput />)
    expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument()
  })

  it('renders with custom aria-label', () => {
    render(<OtpInput aria-label="Enter OTP" />)
    expect(screen.getByRole('group', { name: 'Enter OTP' })).toBeInTheDocument()
  })

  it('calls onChange when a digit is entered', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<OtpInput onChange={onChange} />)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '5')
    expect(onChange).toHaveBeenCalledWith('5')
  })

  it('calls onComplete when all digits are filled', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<OtpInput length={3} onComplete={onComplete} />)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '1')
    await user.type(inputs[1], '2')
    await user.type(inputs[2], '3')
    expect(onComplete).toHaveBeenCalledWith('123')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<OtpInput />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
