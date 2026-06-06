import { useState } from 'react'
import { AuthTemplate } from '../../components/templates'
import { AuthBanner, LoginForm } from '../../components/organisms'
import type { LoginFormValues } from '../../components/organisms'
import { login } from '../../services/auth'

export function LoginPage() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(values: LoginFormValues) {
    try {
      setError(null)
      setStatus('Entrando...')
      const response = await login({
        email: values.email,
        password: values.password,
      })
      setStatus(response.message)
    } catch (err) {
      setStatus(null)
      setError(err instanceof Error ? err.message : 'Erro ao fazer login.')
    }
  }

  return (
    <AuthTemplate
      banner={<AuthBanner src="/Login2.svg" alt="Ilustração de boas-vindas" />}
    >
      <div className="flex w-full max-w-sm flex-col gap-5">
        {status ? (
          <div className="rounded-xl border border-verde-petroleo bg-grafite p-4 text-sm text-offwhite">
            {status}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-xl border border-red-500 bg-[#2c1219] p-4 text-sm text-red-300">
            {error}
          </div>
        ) : null}
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </AuthTemplate>
  )
}
