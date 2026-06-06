import { AuthTemplate } from '../../components/templates'
import { AuthBanner, SignupForm } from '../../components/organisms'
import type { SignupFormValues } from '../../components/organisms'

export function SignupPage() {
  function handleSubmit(values: SignupFormValues) {
    // TODO: integrar com a API de cadastro
    console.log('signup', values)
  }

  return (
    <AuthTemplate
      banner={<AuthBanner src="/Banner-Cadastro.svg" alt="Ilustração de cadastro" />}
    >
      <SignupForm onSubmit={handleSubmit} />
    </AuthTemplate>
  )
}
