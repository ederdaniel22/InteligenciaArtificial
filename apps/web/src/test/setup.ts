import '@testing-library/jest-dom'
import { expect } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'

// Habilita o matcher `toHaveNoViolations()` nos testes de acessibilidade.
// Os tipos vivem em ./vitest-axe.d.ts (augmentation compatível com Vitest 4).
expect.extend(axeMatchers)
