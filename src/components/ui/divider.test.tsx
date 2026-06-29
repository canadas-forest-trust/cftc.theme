import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Divider } from './divider'

describe('Divider', () => {
  it('renders as hr element', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders with tone="hairline"', () => {
    const { container } = render(<Divider tone="hairline" />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders with tone="strong"', () => {
    const { container } = render(<Divider tone="strong" />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders with tone="accent"', () => {
    const { container } = render(<Divider tone="accent" />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('accepts additional className', () => {
    const { container } = render(<Divider className="my-4" />)
    expect(container.querySelector('.my-4')).toBeInTheDocument()
  })
})
