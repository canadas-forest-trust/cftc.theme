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

  it('renders species names in the legend', () => {
    render(<SpeciesGrid species={SPECIES} />)
    expect(screen.getByText(/Black Spruce/)).toBeInTheDocument()
    expect(screen.getByText(/Trembling Aspen/)).toBeInTheDocument()
    expect(screen.getByText(/Jack Pine/)).toBeInTheDocument()
  })

  it('renders the waffle grid', () => {
    const { container } = render(<SpeciesGrid species={SPECIES} />)
    expect(container.querySelector('[role="img"]')).toBeInTheDocument()
  })

  it('renders grid with default 100 cells', () => {
    const { container } = render(<SpeciesGrid species={SPECIES} />)
    const grid = container.querySelector('[role="img"]')
    // Buttons within the grid (some are empty cells with tabIndex=-1)
    expect(grid?.querySelectorAll('button').length).toBe(100)
  })

  it('shows the default hint text before selection', () => {
    render(<SpeciesGrid species={SPECIES} />)
    expect(screen.getByText('Select a species to learn more')).toBeInTheDocument()
  })

  it('clicking a legend item highlights species and shows detail', async () => {
    const user = userEvent.setup()
    render(<SpeciesGrid species={SPECIES} />)
    // The legend is outside the grid img; get all buttons with the name, find the one outside [role=img]
    const allButtons = screen.getAllByRole('button', { name: /Black Spruce/ })
    // The legend button is the one NOT inside the role=img grid
    const legendButton = allButtons.find(btn => !btn.closest('[role="img"]'))!
    await user.click(legendButton)
    expect(screen.getByText('Common boreal species')).toBeInTheDocument()
  })

  it('clicking legend item again deselects it', async () => {
    const user = userEvent.setup()
    render(<SpeciesGrid species={SPECIES} />)
    const allButtons = screen.getAllByRole('button', { name: /Black Spruce/ })
    const legendButton = allButtons.find(btn => !btn.closest('[role="img"]'))!
    await user.click(legendButton)
    expect(screen.getByText('Common boreal species')).toBeInTheDocument()
    await user.click(legendButton)
    expect(screen.queryByText('Common boreal species')).not.toBeInTheDocument()
    expect(screen.getByText('Select a species to learn more')).toBeInTheDocument()
  })

  it('shows fallback description for species without description', async () => {
    const user = userEvent.setup()
    const speciesNoDesc = [
      { name: 'Unknown Tree', color: '#aaa', percent: 100 },
    ]
    render(<SpeciesGrid species={speciesNoDesc} />)
    const allButtons = screen.getAllByRole('button', { name: /Unknown Tree/ })
    const legendButton = allButtons.find(btn => !btn.closest('[role="img"]'))!
    await user.click(legendButton)
    expect(screen.getByText('No description available for this species yet.')).toBeInTheDocument()
  })
})
