import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { FileUpload } from './file-upload'

describe('FileUpload', () => {
  it('renders label and dropzone prompt', () => {
    render(<FileUpload label="Hero image" onFileChange={() => undefined} />)
    expect(screen.getByText('Hero image')).toBeInTheDocument()
    expect(screen.getByText(/drag a file or click to upload/i)).toBeInTheDocument()
  })

  it('fires onFileChange when a file is chosen', async () => {
    const user = userEvent.setup()
    const onFileChange = vi.fn()
    render(<FileUpload label="Logo" onFileChange={onFileChange} />)
    const file = new File(['x'], 'logo.png', { type: 'image/png' })
    await user.upload(screen.getByLabelText('Logo'), file)
    expect(onFileChange).toHaveBeenCalled()
    const files = onFileChange.mock.calls[0][0] as FileList
    expect(files[0]?.name).toBe('logo.png')
  })

  it('shows the selected file name when provided', () => {
    render(
      <FileUpload
        label="Document"
        fileName="agreement.pdf"
        onFileChange={() => undefined}
      />,
    )
    expect(screen.getByText('agreement.pdf')).toBeInTheDocument()
  })

  it('shows an error message', () => {
    render(
      <FileUpload
        label="Logo"
        error="Please upload a JPG or PNG"
        onFileChange={() => undefined}
      />,
    )
    expect(screen.getByText('Please upload a JPG or PNG')).toBeInTheDocument()
  })

  it('is disabled when disabled prop passed', () => {
    render(<FileUpload label="Logo" disabled onFileChange={() => undefined} />)
    expect(screen.getByLabelText('Logo')).toBeDisabled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <FileUpload label="Hero image" onFileChange={() => undefined} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
