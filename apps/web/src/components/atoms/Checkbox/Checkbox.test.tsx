import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

it('renders its label and toggles via onChange', async () => {
  const onChange = vi.fn()
  render(<Checkbox id="remember" label="Lembrar-me" onChange={onChange} />)
  const checkbox = screen.getByRole('checkbox', { name: /lembrar-me/i })
  expect(checkbox).toBeInTheDocument()
  await userEvent.click(checkbox)
  expect(onChange).toHaveBeenCalled()
})
