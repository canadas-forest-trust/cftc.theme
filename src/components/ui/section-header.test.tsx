import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionHeader } from './section-header'

describe('SectionHeader', () => {
  it('renders the eyebrow text', () => {
    render(<SectionHeader eyebrow="FOREST LOCATIONS" />)
    expect(screen.getByText('FOREST LOCATIONS')).toBeInTheDocument()
  })

  it('renders with an optional title', () => {
    render(<SectionHeader eyebrow="SECTION" title="Page Title" />)
    expect(screen.getByText('Page Title')).toBeInTheDocument()
  })

  it('renders with an action', () => {
    render(<SectionHeader eyebrow="SECTION" action={<button>View Map</button>} />)
    expect(screen.getByRole('button', { name: 'View Map' })).toBeInTheDocument()
  })

  it('renders without title when not provided', () => {
    render(<SectionHeader eyebrow="EYEBROW ONLY" />)
    expect(screen.getByText('EYEBROW ONLY')).toBeInTheDocument()
  })

  it('renders without action', () => {
    render(<SectionHeader eyebrow="NO ACTION" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
