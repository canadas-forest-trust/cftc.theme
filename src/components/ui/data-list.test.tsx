import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DataList } from './data-list'

const COLUMNS = [
  { key: 'location', label: 'Location' },
  { key: 'trees', label: 'Trees', align: 'right' as const },
  { key: 'co2', label: 'CO₂', align: 'right' as const },
]

const ROWS = [
  { location: 'Boreal Forest', trees: '1,200', co2: '85 kg' },
  { location: 'Pacific Rainforest', trees: '3,400', co2: '210 kg' },
]

describe('DataList', () => {
  it('renders column headers', () => {
    render(<DataList columns={COLUMNS} rows={ROWS} layout="table" />)
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Trees')).toBeInTheDocument()
    expect(screen.getByText('CO₂')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<DataList columns={COLUMNS} rows={ROWS} layout="table" />)
    expect(screen.getByText('Boreal Forest')).toBeInTheDocument()
    expect(screen.getByText('1,200')).toBeInTheDocument()
    expect(screen.getByText('Pacific Rainforest')).toBeInTheDocument()
  })

  it('renders clickable rows when onRowClick provided', () => {
    const onRowClick = vi.fn()
    render(<DataList columns={COLUMNS} rows={ROWS} onRowClick={onRowClick} layout="table" />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('fires onRowClick with correct index', async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()
    render(<DataList columns={COLUMNS} rows={ROWS} onRowClick={onRowClick} layout="table" />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(onRowClick).toHaveBeenCalledWith(0)
  })

  it('renders non-interactive rows when no onRowClick', () => {
    render(<DataList columns={COLUMNS} rows={ROWS} layout="table" />)
    // With no onRowClick, rows render as divs (not buttons)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('truncates long cell text without overlapping adjacent columns', () => {
    const longTitle =
      'Complete_with_Docusign - Scouts Canada and CFT (updated April 1 2024).pdf'
    const { container } = render(
      <DataList
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'filename', label: 'Filename' },
          { key: 'size', label: 'Size', align: 'right' },
          { key: 'actions', label: '' },
        ]}
        rows={[
          {
            title: longTitle,
            filename: longTitle,
            size: '258.8 KB',
            actions: 'Open',
          },
        ]}
        layout="table"
      />,
    )

    const titleCell = container.querySelector('[data-list-row] span')
    expect(titleCell).toHaveClass('truncate')
    expect(titleCell).toHaveAttribute('title', longTitle)
  })
})
