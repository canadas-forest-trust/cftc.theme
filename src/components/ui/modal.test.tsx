import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './modal'

describe('Modal', () => {
  it('does not render when open=false', () => {
    render(<Modal open={false} onClose={vi.fn()} title="My Modal">Content</Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders dialog when open=true', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal">Content</Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Test Title">Body</Modal>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Title">Modal body content</Modal>)
    expect(screen.getByText('Modal body content')).toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Title" eyebrow="ABOUT THIS FEATURE">
        Content
      </Modal>
    )
    expect(screen.getByText('ABOUT THIS FEATURE')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Title" footer={<button>Confirm</button>}>
        Content
      </Modal>
    )
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose} title="Title">Content</Modal>)
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when Escape key pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose} title="Title">Content</Modal>)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('has aria-modal="true"', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Title">Content</Modal>)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('defaults to max-w-2xl (size lg)', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Title">Content</Modal>)
    expect(screen.getByRole('dialog').className).toContain('max-w-2xl')
  })

  it('applies size md as max-w-lg', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Title" size="md">
        Content
      </Modal>,
    )
    expect(screen.getByRole('dialog').className).toContain('max-w-lg')
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Modal open={true} onClose={vi.fn()} title="Accessible Modal">
        Modal content here
      </Modal>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
