import { render } from '@testing-library/react'
import { axe } from '../../test/axe'
import { LoginPage } from './LoginPage'

it('não tem violações de acessibilidade (WCAG 2.1 AA)', async () => {
  const { container } = render(<LoginPage />)
  expect(await axe(container)).toHaveNoViolations()
})
