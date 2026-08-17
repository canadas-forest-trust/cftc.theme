import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { FileUpload } from './file-upload'

function dropzone() {
  return screen.getByText(/drag a file or click to upload/i).closest('label')!
}

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

  it('fires onFileChange when a file is dropped on the dropzone', () => {
    const onFileChange = vi.fn()
    render(<FileUpload label="Logo" onFileChange={onFileChange} />)
    const file = new File(['x'], 'logo.png', { type: 'image/png' })
    fireEvent.drop(dropzone(), {
      dataTransfer: { files: [file], types: ['Files'] },
    })
    expect(onFileChange).toHaveBeenCalled()
    const files = onFileChange.mock.calls[0][0] as FileList
    expect(files[0]?.name).toBe('logo.png')
  })

  it('prevents default on dragover so the browser allows drop', () => {
    render(<FileUpload label="Logo" onFileChange={() => undefined} />)
    const allowed = fireEvent.dragOver(dropzone(), {
      dataTransfer: { files: [], types: ['Files'] },
    })
    expect(allowed).toBe(false)
  })

  it('does not fire onFileChange when dropping while disabled', () => {
    const onFileChange = vi.fn()
    render(
      <FileUpload
        label="Logo"
        disabled
        onFileChange={onFileChange}
        prompt="Drag a file or click to upload"
      />,
    )
    const file = new File(['x'], 'logo.png', { type: 'image/png' })
    fireEvent.drop(dropzone(), {
      dataTransfer: { files: [file], types: ['Files'] },
    })
    expect(onFileChange).not.toHaveBeenCalled()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <FileUpload label="Hero image" onFileChange={() => undefined} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
