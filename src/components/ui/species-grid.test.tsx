import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { SpeciesGrid } from './species-grid'

const SPECIES = [
  { name: 'Black Spruce', color: '#2d6a4f', percent: 40, description: 'Common boreal species' },
  { name: 'Trembling Aspen', color: '#52b788', percent: 35, description: 'Deciduous forest tree' },
  { name: 'Jack Pine', color: '#95d5b2', percent: 25, description: 'Fire-adapted conifer' },
]

describe('SpeciesGrid', () => {
  it('renders without crashing', () => {
    const { container } = render(<SpeciesGrid species={SPECIES} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders species names in the list', () => {
    render(<SpeciesGrid species={SPECIES} />)
    expect(screen.getByText('Black Spruce')).toBeInTheDocument()
    expect(screen.getByText('Trembling Aspen')).toBeInTheDocument()
    expect(screen.getByText('Jack Pine')).toBeInTheDocument()
  })

  it('renders the waffle grid', () => {
    const { container } = render(<SpeciesGrid species={SPECIES} />)
    expect(
      container.querySelector('[aria-label="Species composition grid"]'),
    ).toBeInTheDocument()
  })

  it('renders grid with default 100 cells', () => {
    const { container } = render(<SpeciesGrid species={SPECIES} />)
    const grid = container.querySelector('[aria-label="Species composition grid"]')
    expect(grid?.querySelectorAll('button').length).toBe(100)
  })

  it('selects the first species by default and shows its description', () => {
    render(<SpeciesGrid species={SPECIES} />)
    expect(screen.getByText('Common boreal species')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Black Spruce, 40%/, pressed: true }),
    ).toBeInTheDocument()
  })

  it('clicking a list item selects that species', async () => {
    const user = userEvent.setup()
    render(<SpeciesGrid species={SPECIES} />)
    const aspen = screen.getByRole('button', { name: /Trembling Aspen, 35%/ })
    await user.click(aspen)
    expect(aspen).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Deciduous forest tree')).toBeInTheDocument()
    expect(screen.queryByText('Common boreal species')).not.toBeInTheDocument()
  })

  it('shows fallback description for species without description', async () => {
    const user = userEvent.setup()
    const speciesNoDesc = [{ name: 'Unknown Tree', color: '#aaa', percent: 100 }]
    render(<SpeciesGrid species={speciesNoDesc} />)
    expect(
      screen.getByText('No description available for this species yet.'),
    ).toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /Unknown Tree, 100%/ })
    await user.click(btn)
    expect(
      screen.getByText('No description available for this species yet.'),
    ).toBeInTheDocument()
  })
})
