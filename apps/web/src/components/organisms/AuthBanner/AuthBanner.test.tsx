import { render, screen } from '@testing-library/react'
import { AuthBanner } from './AuthBanner'

it('renders an image with the given src and alt', () => {
  render(<AuthBanner src="/Login2.svg" alt="Ilustração de login" />)
  const img = screen.getByRole('img', { name: 'Ilustração de login' })
  expect(img).toHaveAttribute('src', '/Login2.svg')
})
