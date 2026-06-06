import { render } from '@testing-library/react'
import { axe } from '../../../test/axe'
import { SignupForm } from './SignupForm'

it('não tem violações de acessibilidade (WCAG 2.1 AA)', async () => {
  const { container } = render(<SignupForm />)
  expect(await axe(container)).toHaveNoViolations()
})
