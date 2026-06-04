import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

it('reflects typed value via onChange', async () => {
  const onChange = vi.fn()
  render(<Input placeholder="E-mail" onChange={onChange} />)
  await userEvent.type(screen.getByPlaceholderText('E-mail'), 'a')
  expect(onChange).toHaveBeenCalled()
})

it('exposes invalid state to assistive tech', () => {
  render(<Input placeholder="E-mail" invalid />)
  expect(screen.getByPlaceholderText('E-mail')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
})
