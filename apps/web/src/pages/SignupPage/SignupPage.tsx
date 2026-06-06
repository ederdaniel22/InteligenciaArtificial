import { useState } from 'react'
import { AuthTemplate } from '../../components/templates'
import { AuthBanner, SignupForm } from '../../components/organisms'
import type { SignupFormValues } from '../../components/organisms'
import { signup } from '../../services/auth'

export function SignupPage() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(values: SignupFormValues) {
    try {
      setError(null)
      setStatus('Cadastrando...')
      const response = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      setStatus(response.message)
    } catch (err) {
      setStatus(null)
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar usuário.')
    }
  }

  return (
    <AuthTemplate
      banner={<AuthBanner src="/Banner-Cadastro.svg" alt="Ilustração de cadastro" />}
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
        <SignupForm onSubmit={handleSubmit} />
      </div>
    </AuthTemplate>
  )
}
