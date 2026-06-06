import { configureAxe } from 'vitest-axe'

/**
 * Instância do axe-core pré-configurada para auditar **WCAG 2.1 nível AA**
 * (o "segundo nível"). Roda apenas as regras dos níveis A e AA das versões
 * 2.0 e 2.1, que é o conjunto necessário para conformidade AA.
 *
 * Uso:
 * ```ts
 * const { container } = render(<Componente />)
 * expect(await axe(container)).toHaveNoViolations()
 * ```
 *
 * Limitação conhecida: a regra `color-contrast` depende de layout/render real
 * e é ignorada no jsdom. Contraste de cor (WCAG 1.4.3) precisa ser auditado
 * num runner com navegador real (ex.: Playwright + @axe-core/playwright).
 */
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  },
})
