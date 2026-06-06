import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Tags WCAG nível AA (o "segundo nível"): regras dos níveis A e AA das
 * versões 2.0 e 2.1. Mesmo conjunto usado nos testes jsdom, mas aqui rodando
 * em navegador real — então `color-contrast` e foco visível também são avaliados.
 */
const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

const pages = [
  { name: 'Login', path: '/login' },
  { name: 'Cadastro', path: '/signup' },
]

for (const { name, path } of pages) {
  test(`${name} (${path}) — sem violações WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(path)

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_AA_TAGS)
      .analyze()

    // Log legível das violações para "levantar os problemas".
    if (results.violations.length > 0) {
      console.log(`\n=== Violações em ${name} (${path}) ===`)
      for (const v of results.violations) {
        console.log(
          `\n[${v.impact}] ${v.id}: ${v.help}\n  ${v.helpUrl}\n  ` +
            v.nodes.map((n) => n.target.join(' ')).join('\n  '),
        )
      }
    }

    expect(results.violations).toEqual([])
  })
}
