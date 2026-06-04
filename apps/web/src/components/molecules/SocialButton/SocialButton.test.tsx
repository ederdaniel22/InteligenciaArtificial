import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialButton } from './SocialButton'

it('renders the icon and label', () => {
  render(<SocialButton icon="/Google.png" label="Entrar com Google" />)
  const button = screen.getByRole('button', { name: /entrar com google/i })
  expect(button).toBeInTheDocument()
  expect(button.querySelector('img')).toHaveAttribute('src', '/Google.png')
})

it('fires onClick when pressed', async () => {
  const onClick = vi.fn()
  render(
    <SocialButton icon="/Github.png" label="Entrar com GitHub" onClick={onClick} />,
  )
  await userEvent.click(screen.getByRole('button', { name: /github/i }))
  expect(onClick).toHaveBeenCalledOnce()
})
