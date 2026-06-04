import { render, screen } from '@testing-library/react'
import { LoginPage } from './LoginPage'

it('renders the login form and the banner', () => {
  render(<LoginPage />)
  expect(screen.getByRole('button', { name: /^entrar$/i })).toBeInTheDocument()
  expect(
    screen.getByRole('img', { name: /ilustração de boas-vindas/i }),
  ).toBeInTheDocument()
})
