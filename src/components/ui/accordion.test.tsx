import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Accordion } from './accordion'

const ITEMS = [
  { number: '01', title: 'PAGE HEADING', content: 'Content for page heading section' },
  { number: '02', title: 'IMPACT DATA', content: 'Content for impact data section' },
  { number: '03', title: 'STORIES', content: 'Content for stories section' },
]

describe('Accordion', () => {
  it('renders without crashing', () => {
    const { container } = render(<Accordion items={ITEMS} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders all item titles', () => {
    render(<Accordion items={ITEMS} />)
    expect(screen.getByText('PAGE HEADING')).toBeInTheDocument()
    expect(screen.getByText('IMPACT DATA')).toBeInTheDocument()
    expect(screen.getByText('STORIES')).toBeInTheDocument()
  })

  it('renders item numbers', () => {
    render(<Accordion items={ITEMS} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
  })

  it('collapses all items by default', () => {
    render(<Accordion items={ITEMS} />)
    expect(screen.queryByText('Content for page heading section')).not.toBeInTheDocument()
    expect(screen.queryByText('Content for impact data section')).not.toBeInTheDocument()
  })

  it('expands item when title clicked', async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} />)
    await user.click(screen.getByRole('button', { name: /PAGE HEADING/ }))
    expect(screen.getByText('Content for page heading section')).toBeInTheDocument()
  })

  it('collapses expanded item when title clicked again', async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} />)
    const btn = screen.getByRole('button', { name: /PAGE HEADING/ })
    await user.click(btn)
    expect(screen.getByText('Content for page heading section')).toBeInTheDocument()
    await user.click(btn)
    expect(screen.queryByText('Content for page heading section')).not.toBeInTheDocument()
  })

  it('shows content when defaultOpen=true', () => {
    render(
      <Accordion
        items={[
          { title: 'Open Section', content: 'Visible by default', defaultOpen: true },
        ]}
      />
    )
    expect(screen.getByText('Visible by default')).toBeInTheDocument()
  })

  it('sets aria-expanded correctly', async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} />)
    const btn = screen.getByRole('button', { name: /PAGE HEADING/ })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<Accordion items={ITEMS} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
