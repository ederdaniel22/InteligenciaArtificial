import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Checkbox } from '../../atoms'
import { FormField, SocialButton } from '../../molecules'

export interface SignupFormValues {
  name: string
  email: string
  password: string
  remember: boolean
}

export interface SignupFormProps {
  /** Called with the form values on submit. */
  onSubmit?: (values: SignupFormValues) => void
  /** Social provider handlers. */
  onGoogleSignup?: () => void
  onGithubSignup?: () => void
}

export function SignupForm({
  onSubmit,
  onGoogleSignup,
  onGithubSignup,
}: SignupFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.({ name, email, password, remember })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
      <header className="mb-2">
        <h1 className="text-2xl font-semibold text-white">Cadastro</h1>
        <p className="mt-1 text-sm text-auth-placeholder">
          Olá! Preencha seus dados.
        </p>
      </header>

      <FormField
        label="Nome"
        type="text"
        name="name"
        autoComplete="name"
        placeholder="Nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <FormField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <FormField
        label="Senha"
        type="password"
        name="password"
        autoComplete="new-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Checkbox
        id="remember"
        label="Lembrar-me"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />

      <Button type="submit" className="w-full">
        Cadastrar
        <img src="/login.svg" alt="" aria-hidden="true" className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-3 text-xs text-auth-placeholder">
        <span className="h-px flex-1 bg-auth-border" />
        ou entre com outras contas
        <span className="h-px flex-1 bg-auth-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialButton
          icon="/Github.png"
          label="Github"
          onClick={onGithubSignup}
        />
        <SocialButton
          icon="/Google.png"
          label="Gmail"
          onClick={onGoogleSignup}
        />
      </div>

      <p className="text-center text-sm text-auth-placeholder">
        Já tem conta?{' '}
        <a href="/login" className="font-medium text-auth-accent hover:underline">
          Faça seu login!
        </a>
      </p>
    </form>
  )
}
