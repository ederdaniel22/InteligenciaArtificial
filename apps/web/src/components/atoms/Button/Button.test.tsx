import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

it('renders its label', () => {
  render(<Button>Entrar</Button>)
  expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
})

it('calls onClick when pressed', async () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Entrar</Button>)
  await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
  expect(onClick).toHaveBeenCalledOnce()
})

it('is disabled and shows loading text when loading', () => {
  render(<Button loading>Entrar</Button>)
  const button = screen.getByRole('button')
  expect(button).toBeDisabled()
  expect(button).toHaveTextContent(/carregando/i)
})

it('does not fire onClick when disabled', async () => {
  const onClick = vi.fn()
  render(
    <Button disabled onClick={onClick}>
      Entrar
    </Button>,
  )
  await userEvent.click(screen.getByRole('button'))
  expect(onClick).not.toHaveBeenCalled()
})
