import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

it('renders email, password, remember-me, forgot link and social buttons', () => {
  render(<LoginForm />)
  expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  expect(screen.getByRole('checkbox', { name: /lembrar-me/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /esqueci a senha/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /crie seu cadastro/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument()
})

it('submits the typed values', async () => {
  const onSubmit = vi.fn()
  render(<LoginForm onSubmit={onSubmit} />)

  await userEvent.type(screen.getByLabelText('Email ou usuário'), 'user@test.com')
  await userEvent.type(screen.getByLabelText('Senha'), 'secret')
  await userEvent.click(screen.getByRole('checkbox', { name: /lembrar-me/i }))
  await userEvent.click(screen.getByRole('button', { name: /^login$/i }))

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'user@test.com',
    password: 'secret',
    remember: true,
  })
})
