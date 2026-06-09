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
      <img
        src={src}
        alt={alt}
        width={407}
        height={628}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
