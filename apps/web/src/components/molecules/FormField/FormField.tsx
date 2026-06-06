import { useId } from 'react'
import { Input, Label } from '../../atoms'
import type { InputProps } from '../../atoms'

export interface FormFieldProps extends Omit<InputProps, 'id' | 'invalid'> {
  /** Text rendered in the field's label. */
  label: string
  /** Optional validation message; when present the input is marked invalid. */
  error?: string
}

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-vermelho">
          {error}
        </p>
      )}
    </div>
  )
}
