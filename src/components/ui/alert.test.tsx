import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Alert } from './alert'

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Alert message content</Alert>)
    expect(screen.getByText('Alert message content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(<Alert title="Important">Some message</Alert>)
    expect(screen.getByText('Important')).toBeInTheDocument()
    expect(screen.getByText('Some message')).toBeInTheDocument()
  })

  it('renders with role="note"', () => {
    render(<Alert>Note content</Alert>)
    expect(screen.getByRole('note')).toBeInTheDocument()
  })

  it('renders with tone="info"', () => {
    render(<Alert tone="info">Info message</Alert>)
    expect(screen.getByRole('note')).toBeInTheDocument()
  })

  it('renders with tone="warning"', () => {
    render(<Alert tone="warning" title="Warning">Warning message</Alert>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('renders with tone="success"', () => {
    render(<Alert tone="success" title="Success">Done!</Alert>)
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('renders with tone="danger"', () => {
    render(<Alert tone="danger" title="Error">Something went wrong</Alert>)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders without title', () => {
    render(<Alert>Just children</Alert>)
    expect(screen.getByText('Just children')).toBeInTheDocument()
  })
})
