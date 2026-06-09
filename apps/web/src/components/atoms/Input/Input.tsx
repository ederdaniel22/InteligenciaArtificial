import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Marks the field as invalid for assistive technologies. */
  invalid?: boolean
}

export function Input({ invalid, className = '', ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={
        'w-full rounded-md border bg-verde-petroleo px-3 py-2.5 text-sm text-offwhite ' +
        'placeholder:text-cinza-medio focus:outline-none focus-visible:ring-2 ' +
        'focus-visible:ring-verde-destaque ' +
        (invalid ? 'border-vermelho ' : 'border-verde-petroleo ') +
        className
      }
      {...props}
    />
  )
}
