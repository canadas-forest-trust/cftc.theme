import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Eyebrow } from './eyebrow'

describe('Eyebrow', () => {
  it('renders text content', () => {
    render(<Eyebrow>STEP 01</Eyebrow>)
    expect(screen.getByText('STEP 01')).toBeInTheDocument()
  })

  it('renders as span by default', () => {
    const { container } = render(<Eyebrow>label</Eyebrow>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('renders as label element when as="label"', () => {
    const { container } = render(<Eyebrow as="label">My Label</Eyebrow>)
    expect(container.querySelector('label')).toBeInTheDocument()
  })

  it('renders as span element when as="span"', () => {
    const { container } = render(<Eyebrow as="span">My Span</Eyebrow>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('renders as div when as="div"', () => {
    const { container } = render(<Eyebrow as="div">Div Eyebrow</Eyebrow>)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders as p when as="p"', () => {
    const { container } = render(<Eyebrow as="p">Para Eyebrow</Eyebrow>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('accepts tone variants without error', () => {
    render(<Eyebrow tone="accent">Accent</Eyebrow>)
    render(<Eyebrow tone="ink">Ink</Eyebrow>)
    render(<Eyebrow tone="muted">Muted</Eyebrow>)
    expect(screen.getByText('Accent')).toBeInTheDocument()
    expect(screen.getByText('Ink')).toBeInTheDocument()
    expect(screen.getByText('Muted')).toBeInTheDocument()
  })

  it('accepts additional className', () => {
    const { container } = render(<Eyebrow className="custom-class">text</Eyebrow>)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
