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
        'w-full rounded-md border bg-auth-field px-3 py-2.5 text-sm text-white ' +
        'placeholder:text-auth-placeholder focus:outline-none focus-visible:ring-2 ' +
        'focus-visible:ring-auth-accent ' +
        (invalid ? 'border-red-500 ' : 'border-auth-border ') +
        className
      }
      {...props}
    />
  )
}
