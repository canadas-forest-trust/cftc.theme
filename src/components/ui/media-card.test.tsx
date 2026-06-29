import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MediaCard } from './media-card'

describe('MediaCard', () => {
  it('renders the title', () => {
    render(<MediaCard title="Let's get growing" />)
    expect(screen.getByText("Let's get growing")).toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(<MediaCard title="Title" eyebrow="FOREST STORY" />)
    expect(screen.getByText('FOREST STORY')).toBeInTheDocument()
  })

  it('renders action when provided', () => {
    render(
      <MediaCard title="Title" action={<a href="/story">READ THE STORY</a>} />
    )
    expect(screen.getByRole('link', { name: 'READ THE STORY' })).toBeInTheDocument()
  })

  it('renders ribbon when provided', () => {
    render(<MediaCard title="Title" ribbon={<span>GOLD</span>} />)
    expect(screen.getByText('GOLD')).toBeInTheDocument()
  })

  it('renders without eyebrow', () => {
    render(<MediaCard title="No eyebrow here" />)
    expect(screen.getByText('No eyebrow here')).toBeInTheDocument()
  })

  it('renders without action', () => {
    render(<MediaCard title="No action" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
