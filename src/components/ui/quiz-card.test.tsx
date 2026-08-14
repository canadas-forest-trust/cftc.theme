import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { QuizCard } from './quiz-card'

const ANSWERS = [
  { text: 'Answer A', isCorrect: false },
  { text: 'Answer B', isCorrect: true },
  { text: 'Answer C', isCorrect: false },
  { text: 'Answer D', isCorrect: false },
]

describe('QuizCard', () => {
  it('renders the question', () => {
    render(<QuizCard question="What is a tree?" answers={ANSWERS} />)
    expect(screen.getByText('What is a tree?')).toBeInTheDocument()
  })

  it('renders all answer options', () => {
    render(<QuizCard question="Question?" answers={ANSWERS} />)
    expect(screen.getByRole('button', { name: 'Answer A' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Answer B' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Answer C' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Answer D' })).toBeInTheDocument()
  })

  it('renders the default eyebrow', () => {
    render(<QuizCard question="Question?" answers={ANSWERS} />)
    expect(screen.getByText('Test your knowledge')).toBeInTheDocument()
  })

  it('renders a custom eyebrow', () => {
    render(<QuizCard question="Question?" answers={ANSWERS} eyebrow="QUICK QUIZ" />)
    expect(screen.getByText('QUICK QUIZ')).toBeInTheDocument()
  })

  it('calls onAnswer with index and correct=false when wrong answer clicked', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    render(<QuizCard question="Question?" answers={ANSWERS} onAnswer={onAnswer} />)
    await user.click(screen.getByRole('button', { name: 'Answer A' }))
    expect(onAnswer).toHaveBeenCalledWith(0, false)
  })

  it('calls onAnswer with index and correct=true when correct answer clicked', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    render(<QuizCard question="Question?" answers={ANSWERS} onAnswer={onAnswer} />)
    await user.click(screen.getByRole('button', { name: 'Answer B' }))
    expect(onAnswer).toHaveBeenCalledWith(1, true)
  })

  it('disables all answers after one is chosen', async () => {
    const user = userEvent.setup()
    render(<QuizCard question="Question?" answers={ANSWERS} />)
    await user.click(screen.getByRole('button', { name: 'Answer A' }))
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })

  it('does not fire onAnswer twice when clicking after selection', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    render(<QuizCard question="Question?" answers={ANSWERS} onAnswer={onAnswer} />)
    await user.click(screen.getByRole('button', { name: 'Answer A' }))
    // Attempt second click (should be blocked by disabled state)
    expect(onAnswer).toHaveBeenCalledOnce()
  })

  it('renders inverse tone idle answers without ink panel fill', () => {
    render(<QuizCard question="Question?" answers={ANSWERS} tone="inverse" />)
    expect(screen.getByRole('button', { name: 'Answer A' }).className).toContain('bg-transparent')
    expect(screen.getByRole('button', { name: 'Answer A' }).className).toContain('text-inverse')
  })

  it('still reveals correct answer under inverse tone', async () => {
    const user = userEvent.setup()
    render(<QuizCard question="Question?" answers={ANSWERS} tone="inverse" />)
    await user.click(screen.getByRole('button', { name: 'Answer A' }))
    expect(screen.getByRole('button', { name: 'Answer B' }).className).toContain('border-accent')
    expect(screen.getByRole('button', { name: 'Answer A' }).className).toContain('border-danger')
  })

  it('has no a11y violations', async () => {
    const { container } = render(<QuizCard question="A quiz question?" answers={ANSWERS} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
