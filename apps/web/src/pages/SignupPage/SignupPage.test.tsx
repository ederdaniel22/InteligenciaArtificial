import { render, screen } from '@testing-library/react'
import { SignupPage } from './SignupPage'

it('renders the signup form and the banner', () => {
  render(<SignupPage />)
  expect(
    screen.getByRole('button', { name: /^cadastrar$/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('img', { name: /ilustração de cadastro/i }),
  ).toBeInTheDocument()
})
