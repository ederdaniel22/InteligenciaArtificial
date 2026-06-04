import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Checkbox } from '../../atoms'
import { FormField, SocialButton } from '../../molecules'

export interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export interface LoginFormProps {
  /** Called with the form values on submit. */
  onSubmit?: (values: LoginFormValues) => void
  /** Social provider handlers. */
  onGoogleLogin?: () => void
  onGithubLogin?: () => void
}

export function LoginForm({
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.({ email, password, remember })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white">Bem-vindo de volta</h1>
        <p className="mt-1 text-sm text-auth-placeholder">
          Entre na sua conta para continuar
        </p>
      </header>

      <FormField
        label="E-mail"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <FormField
        label="Senha"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox
          id="remember"
          label="Lembrar-me"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <a
          href="/forgot-password"
          className="text-sm text-auth-accent hover:underline"
        >
          Esqueci a senha
        </a>
      </div>

      <Button type="submit" className="w-full">
        Entrar
        <img src="/login.svg" alt="" aria-hidden="true" className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-3 text-xs text-auth-placeholder">
        <span className="h-px flex-1 bg-auth-border" />
        ou
        <span className="h-px flex-1 bg-auth-border" />
      </div>

      <div className="flex flex-col gap-3">
        <SocialButton
          icon="/Google.png"
          label="Entrar com Google"
          onClick={onGoogleLogin}
        />
        <SocialButton
          icon="/Github.png"
          label="Entrar com GitHub"
          onClick={onGithubLogin}
        />
      </div>
    </form>
  )
}
