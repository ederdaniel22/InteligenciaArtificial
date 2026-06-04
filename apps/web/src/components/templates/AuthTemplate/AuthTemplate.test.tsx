import { render, screen } from '@testing-library/react'
import { AuthTemplate } from './AuthTemplate'

it('renders the banner and the form content', () => {
  render(
    <AuthTemplate banner={<div>banner-slot</div>}>
      <p>form-slot</p>
    </AuthTemplate>,
  )
  expect(screen.getByText('banner-slot')).toBeInTheDocument()
  expect(screen.getByText('form-slot')).toBeInTheDocument()
})
