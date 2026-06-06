import type { ReactNode } from 'react'

export interface AuthTemplateProps {
  /** Banner panel (left side). Login and signup pass different banners. */
  banner: ReactNode
  /** Form content (right side). */
  children: ReactNode
}

/**
 * Base layout for authentication pages (login/signup): a full-screen dark page
 * with a centered card split into a banner panel and a content panel. Holds no
 * business logic — only positioning — so it can be reused across auth flows.
 */
export function AuthTemplate({ banner, children }: AuthTemplateProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-grafite p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-cinza-escuro shadow-2xl md:grid-cols-2">
        <div className="hidden md:block">{banner}</div>
        <div className="flex items-center justify-center p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}
