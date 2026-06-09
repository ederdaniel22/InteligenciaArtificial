import type { LabelHTMLAttributes, ReactNode } from 'react'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
}

export function Label({ className = '', children, ...props }: LabelProps) {
  return (
    <label
      className={'mb-1.5 block text-sm font-medium text-offwhite ' + className}
      {...props}
    >
      {children}
    </label>
  )
}
