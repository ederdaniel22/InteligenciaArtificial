import { render, screen } from '@testing-library/react'
import { Label } from './Label'

it('renders text and associates with a control via htmlFor', () => {
  render(<Label htmlFor="email">E-mail</Label>)
  const label = screen.getByText('E-mail')
  expect(label).toBeInTheDocument()
  expect(label).toHaveAttribute('for', 'email')
})
