import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignupForm } from './SignupForm'

it('renders name, email, password, remember-me, login link and social buttons', () => {
  render(<SignupForm />)
  expect(screen.getByLabelText('Nome')).toBeInTheDocument()
  expect(screen.getByLabelText('Email')).toBeInTheDocument()
  expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  expect(screen.getByRole('checkbox', { name: /lembrar-me/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /faça seu login/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument()
})

it('submits the typed values', async () => {
  const onSubmit = vi.fn()
  render(<SignupForm onSubmit={onSubmit} />)

  await userEvent.type(screen.getByLabelText('Nome'), 'Maria Silva')
  await userEvent.type(screen.getByLabelText('Email'), 'maria@test.com')
  await userEvent.type(screen.getByLabelText('Senha'), 'secret')
  await userEvent.click(screen.getByRole('checkbox', { name: /lembrar-me/i }))
  await userEvent.click(screen.getByRole('button', { name: /^cadastrar$/i }))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Maria Silva',
    email: 'maria@test.com',
    password: 'secret',
    remember: true,
  })
})
