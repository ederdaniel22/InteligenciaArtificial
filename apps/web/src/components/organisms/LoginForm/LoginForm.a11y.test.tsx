import { render } from '@testing-library/react'
import { axe } from '../../../test/axe'
import { LoginForm } from './LoginForm'

it('não tem violações de acessibilidade (WCAG 2.1 AA)', async () => {
  const { container } = render(<LoginForm />)
  expect(await axe(container)).toHaveNoViolations()
})
