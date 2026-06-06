import 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'

// vitest-axe 0.1.0 augmenta o namespace `Vi` legado, que não mescla no
// Vitest 4. Reaplicamos o matcher no formato de module augmentation atual.
declare module 'vitest' {
  interface Assertion<T = unknown> extends AxeMatchers {
    _axe?: T
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
