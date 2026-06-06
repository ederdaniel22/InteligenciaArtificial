import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'social'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. */
  variant?: ButtonVariant
  /** Shows a loading state and disables the button. */
  loading?: boolean
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ' +
  'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-verde-destaque ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-verde-destaque text-grafite hover:brightness-95',
  social:
    'border border-verde-petroleo bg-verde-petroleo text-offwhite hover:border-verde-destaque/60',
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? 'Carregando…' : children}
    </button>
  )
}
