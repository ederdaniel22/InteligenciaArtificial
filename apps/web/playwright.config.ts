import { defineConfig, devices } from '@playwright/test'

/**
 * Auditoria de acessibilidade em navegador real (Chromium).
 *
 * Complementa os testes jsdom (`*.a11y.test.tsx`) cobrindo as regras WCAG AA
 * que exigem layout/render real — principalmente `color-contrast` (1.4.3) e
 * foco visível — que o jsdom não consegue avaliar.
 *
 * Sobe o dev server do Vite automaticamente e roda as specs de `e2e/`.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
