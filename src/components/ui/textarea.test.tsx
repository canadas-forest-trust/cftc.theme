import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders without crashing', () => {
    const { container } = render(<Textarea />)
    expect(container.querySelector('textarea')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Textarea label="Description" id="desc" />)
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Textarea error="Field is required" />)
    expect(screen.getByText('Field is required')).toBeInTheDocument()
  })

  it('sets aria-invalid when error prop provided', () => {
    const { container } = render(<Textarea error="Error" />)
    expect(container.querySelector('[aria-invalid]')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Textarea placeholder="Write here" />)
    const textarea = screen.getByPlaceholderText('Write here')
    await user.type(textarea, 'Some text')
    expect(textarea).toHaveValue('Some text')
  })

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter your message..." />)
    expect(screen.getByPlaceholderText('Enter your message...')).toBeInTheDocument()
  })
})
