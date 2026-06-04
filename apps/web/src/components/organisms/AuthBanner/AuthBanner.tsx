export interface AuthBannerProps {
  /** Banner image source (login and signup pass different assets). */
  src: string
  /** Accessible description of the banner image. */
  alt: string
  className?: string
}

export function AuthBanner({ src, alt, className = '' }: AuthBannerProps) {
  return (
    <div className={'h-full w-full overflow-hidden ' + className}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}
