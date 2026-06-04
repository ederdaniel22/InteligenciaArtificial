import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible text rendered next to the checkbox. */
  label: string
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={'inline-flex cursor-pointer items-center gap-2 text-sm text-gray-300 ' + className}
    >
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-auth-border bg-auth-field text-auth-accent accent-auth-accent focus-visible:ring-2 focus-visible:ring-auth-accent"
        {...props}
      />
      {label}
    </label>
  )
}
