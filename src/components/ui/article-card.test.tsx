import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ArticleCard } from './article-card'

describe('ArticleCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<ArticleCard title="My Article" />)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<ArticleCard title="Forest Growth Report" />)
    expect(screen.getByText('Forest Growth Report')).toBeInTheDocument()
  })

  it('renders excerpt when provided', () => {
    render(<ArticleCard title="Title" excerpt="Article excerpt here" />)
    expect(screen.getByText('Article excerpt here')).toBeInTheDocument()
  })

  it('renders a tag badge when provided', () => {
    render(<ArticleCard title="Title" tag="ARTICLE" />)
    expect(screen.getByText('ARTICLE')).toBeInTheDocument()
  })

  it('renders action link with default label', () => {
    render(<ArticleCard title="Title" />)
    expect(screen.getByRole('link', { name: /Read more/ })).toBeInTheDocument()
  })

  it('renders action link with custom actionLabel', () => {
    render(<ArticleCard title="Title" actionLabel="View article" />)
    expect(screen.getByRole('link', { name: /View article/ })).toBeInTheDocument()
  })

  it('renders link with provided href', () => {
    render(<ArticleCard title="Title" href="/articles/1" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/articles/1')
  })
})
