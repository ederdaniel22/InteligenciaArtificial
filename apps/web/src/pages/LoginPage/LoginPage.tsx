import { AuthTemplate } from '../../components/templates'
import { AuthBanner, LoginForm } from '../../components/organisms'
import type { LoginFormValues } from '../../components/organisms'

export function LoginPage() {
  function handleSubmit(values: LoginFormValues) {
    // TODO: integrar com a API de autenticação
    console.log('login', values)
  }

  return (
    <AuthTemplate
      banner={<AuthBanner src="/Login2.svg" alt="Ilustração de boas-vindas" />}
    >
      <LoginForm onSubmit={handleSubmit} />
    </AuthTemplate>
  )
}
