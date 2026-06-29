import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Pagination } from './pagination'

describe('Pagination', () => {
  it('renders without crashing', () => {
    render(<Pagination page={1} pageCount={5} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders page buttons for each page', () => {
    render(<Pagination page={1} pageCount={5} />)
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
  })

  it('renders next button', () => {
    render(<Pagination page={1} pageCount={5} />)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
  })

  it('marks the current page with aria-current="page"', () => {
    render(<Pagination page={3} pageCount={5} />)
    expect(screen.getByRole('button', { name: '3' })).toHaveAttribute('aria-current', 'page')
  })

  it('does not mark other pages with aria-current', () => {
    render(<Pagination page={3} pageCount={5} />)
    expect(screen.getByRole('button', { name: '1' })).not.toHaveAttribute('aria-current')
  })

  it('fires onPageChange with correct page when page button clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={1} pageCount={5} onPageChange={onPageChange} />)
    await user.click(screen.getByRole('button', { name: '3' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('fires onPageChange with next page when Next clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />)
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('disables next button on last page', () => {
    render(<Pagination page={5} pageCount={5} />)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Pagination page={1} pageCount={5} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
