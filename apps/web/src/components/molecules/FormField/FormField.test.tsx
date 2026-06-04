import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

it('associates the label with the input', () => {
  render(<FormField label="E-mail" placeholder="seu@email.com" />)
  expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
})

it('shows an error message and marks the input invalid', () => {
  render(<FormField label="E-mail" error="Campo obrigatório" />)
  expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true')
})
