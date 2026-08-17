import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CopyField } from './copy-field'

describe('CopyField', () => {
  it('renders without crashing', () => {
    render(<CopyField value="https://example.com/link" />)
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('renders the value in the input', () => {
    render(<CopyField value="https://example.com/link" />)
    expect(screen.getByDisplayValue('https://example.com/link')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<CopyField value="code" label="Share link" />)
    expect(screen.getByText('Share link')).toBeInTheDocument()
  })

  it('renders multiline mode with code block', () => {
    const { container } = render(<CopyField value="<script>embed()</script>" multiline />)
    expect(container.querySelector('pre')).toBeInTheDocument()
    expect(container.querySelector('code')).toBeInTheDocument()
  })

  it('renders copy button', () => {
    render(<CopyField value="test" />)
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('renders input as readOnly', () => {
    const { container } = render(<CopyField value="readonly-value" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('readonly')
  })

  it('marks the share row so admin layout can leave it full width', () => {
    const { container } = render(<CopyField value="https://example.com/long-path" />)
    expect(container.querySelector('[data-copy-field]')).toBeInTheDocument()
    expect(container.querySelector('input')).toHaveClass('max-w-none')
  })
})
