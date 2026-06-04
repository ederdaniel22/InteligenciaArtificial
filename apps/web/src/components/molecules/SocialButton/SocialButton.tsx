import { Button } from '../../atoms'
import type { ButtonProps } from '../../atoms'

export interface SocialButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
  /** Path to the provider icon (e.g. /Google.png). */
  icon: string
  /** Accessible/visible button text (e.g. "Entrar com Google"). */
  label: string
}

export function SocialButton({ icon, label, ...props }: SocialButtonProps) {
  return (
    <Button variant="social" className="w-full" {...props}>
      <img src={icon} alt="" aria-hidden="true" className="h-5 w-5" />
      {label}
    </Button>
  )
}
