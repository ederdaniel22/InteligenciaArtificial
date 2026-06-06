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
        <h1 className="text-2xl font-semibold text-offwhite">Login</h1>
        <p className="mt-1 text-sm text-cinza-medio">
          Boas-vindas! Faça seu login.
        </p>
      </header>

      <FormField
        label="Email ou usuário"
        type="text"
        name="email"
        autoComplete="username"
        placeholder="usuario123"
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
          className="text-sm text-verde-destaque hover:underline"
        >
          Esqueci a senha
        </a>
      </div>

      <Button type="submit" className="w-full">
        Login
        <img
          src="/login.svg"
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          loading="lazy"
          decoding="async"
          className="h-4 w-4"
        />
      </Button>

      <div className="flex items-center gap-3 text-xs text-cinza-medio">
        <span className="h-px flex-1 bg-verde-petroleo" />
        ou entre com outras contas
        <span className="h-px flex-1 bg-verde-petroleo" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialButton
          icon="/Github.png"
          label="Github"
          onClick={onGithubLogin}
        />
        <SocialButton
          icon="/Google.png"
          label="Gmail"
          onClick={onGoogleLogin}
        />
      </div>

      <p className="text-center text-sm text-cinza-medio">
        Ainda não tem conta?{' '}
        <a href="/signup" className="font-medium text-verde-destaque hover:underline">
          Crie seu cadastro
        </a>
      </p>
    </form>
  )
}
