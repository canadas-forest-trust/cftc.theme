import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders without crashing', () => {
    const { container } = render(<Input />)
    expect(container.querySelector('input')).toBeInTheDocument()
  })

  it('renders with label prop', () => {
    render(<Input label="Email address" id="email" />)
    expect(screen.getByText('Email address')).toBeInTheDocument()
  })

  it('shows error message when error prop provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('sets aria-invalid when invalid prop passed', () => {
    const { container } = render(<Input invalid />)
    expect(container.querySelector('[aria-invalid]')).toBeInTheDocument()
  })

  it('sets aria-invalid when error prop provided', () => {
    const { container } = render(<Input error="Bad value" />)
    expect(container.querySelector('[aria-invalid]')).toBeInTheDocument()
  })

  it('renders with type="email"', () => {
    const { container } = render(<Input type="email" />)
    expect(container.querySelector('input[type="email"]')).toBeInTheDocument()
  })

  it('renders with type="text"', () => {
    const { container } = render(<Input type="text" />)
    expect(container.querySelector('input[type="text"]')).toBeInTheDocument()
  })

  it('renders with box variant', () => {
    const { container } = render(<Input variant="box" />)
    expect(container.querySelector('input')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'Hello')
    expect(input).toHaveValue('Hello')
  })

  it('has no a11y violations with label', async () => {
    const { container } = render(<Input label="Name" id="name" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
