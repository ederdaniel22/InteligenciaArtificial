# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the **repository root** using pnpm workspaces.

### Install dependencies
```bash
pnpm install
```

### Development (watch mode)
```bash
pnpm dev:api   # NestJS API on http://localhost:3000
pnpm dev:web   # React/Vite on http://localhost:5173
```

### Build
```bash
pnpm build:api
pnpm build:web
```

### Tests
```bash
pnpm test:api              # API unit tests (Jest)
pnpm test:web              # Web unit tests (Vitest, run once)
pnpm web -- test           # Web tests in watch mode
pnpm web -- test:ui        # Web tests with Vitest UI
pnpm api -- test --testPathPattern=app  # single API test file by pattern
pnpm api -- test:e2e       # API end-to-end tests
pnpm api -- test:cov       # API coverage report
```

### Lint & format (API)
```bash
pnpm api -- lint     # ESLint + auto-fix
pnpm api -- format   # Prettier
```

### Lint (web)
```bash
pnpm web -- lint
```

## Architecture

This is a **pnpm monorepo** with two apps under `apps/`:

```
apps/
  api/   NestJS 11 — REST backend, TypeScript 5, compiles to dist/
  web/   React 19 + Vite 8 + Tailwind CSS 4 — frontend, TypeScript 6, ESM-only
```

### Workspace scripts

Root `package.json` delegates to each app via `pnpm --filter <name>`. To run an arbitrary script inside one app:

```bash
pnpm api -- <script>   # runs inside apps/api
pnpm web -- <script>   # runs inside apps/web
```

---

## Frontend conventions (`apps/web`)

### Atomic Design

Components are organised under `src/components/` following Atomic Design:

```
src/
  components/
    atoms/       # Basic, indivisible UI elements (Button, Input, Label…)
    molecules/   # Combinations of atoms (FormField, SearchBar…)
    organisms/   # Complex sections composed of molecules/atoms (Header, Card…)
    templates/   # Page layouts — positioning, no business logic
  pages/         # Route-level components; assemble templates + organisms
```

- Every component lives in its own folder: `atoms/Button/Button.tsx` + `atoms/Button/Button.test.tsx`
- Export from an `index.ts` barrel only at the atom/molecule/organism level, not across levels

### Tailwind CSS v4

Tailwind is loaded via the `@tailwindcss/vite` plugin (no `tailwind.config.*` file needed). The import is at the top of `src/index.css`:

```css
@import "tailwindcss";
```

Use Tailwind utility classes directly on JSX elements. Custom design tokens go in the `@theme` block inside `index.css`.

### Component tests

Every component must have a test file (`*.test.tsx`) covering its essential usage. Tests use **Vitest** + **React Testing Library**:

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

it('renders label', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
})
```

- Test setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`)
- `globals: true` is set in `vite.config.ts` — no need to import `describe`/`it`/`expect`
- Prefer queries by role (`getByRole`) or accessible label over test IDs

---

## Backend conventions (`apps/api`)

### NestJS module pattern

- `src/app.module.ts` — root module; register feature modules here via `imports: []`
- `src/app.controller.ts` / `src/app.service.ts` — root controller and service
- `src/main.ts` — bootstrap; listens on `process.env.PORT ?? 3000`

New features: `nest g module <name>` → import into `AppModule`. Tests live alongside source as `*.spec.ts`; e2e tests in `test/`.

TypeScript: `emitDecoratorMetadata` + `experimentalDecorators` enabled (NestJS DI requirement). `noImplicitAny` **off**, `strictNullChecks` **on**.

### REST principles

Follow these rules for every endpoint:

| Concern | Rule |
|---|---|
| **Resources** | Noun-based plural paths (`/users`, `/orders/:id`) — never verbs |
| **HTTP methods** | `GET` read, `POST` create, `PUT` full replace, `PATCH` partial update, `DELETE` remove |
| **Status codes** | `200` OK, `201` Created (POST), `204` No Content (DELETE), `400` Bad Request, `401` Unauthenticated, `403` Forbidden, `404` Not Found, `422` Unprocessable Entity, `500` Server Error |
| **Request body** | Only on `POST`/`PUT`/`PATCH`; never on `GET`/`DELETE` |
| **Response envelope** | Return the resource directly; avoid wrapping in `{ data: … }` unless pagination requires it |
| **Pagination** | Use query params: `?page=1&limit=20`; respond with `{ data: [], meta: { total, page, limit } }` |
| **Versioning** | Prefix routes with `/v1/` when breaking changes are needed |
| **Idempotency** | `GET`, `PUT`, `DELETE` must be idempotent |

---

## Git — Conventional Commits

All commits in this repository must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

### Types

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change that is neither a fix nor a feature |
| `test` | Adding or correcting tests |
| `chore` | Build, tooling, dependency updates |
| `docs` | Documentation only |
| `style` | Formatting (no logic change) |
| `perf` | Performance improvement |
| `ci` | CI/CD configuration |

### Scopes

Use the app name or module as scope: `api`, `web`, `auth`, `users`, etc.

### Examples

```
feat(web): add Button atom with loading state
fix(api): return 404 when user is not found
refactor(api): extract UserService from AppService
chore(web): install Tailwind CSS v4
test(web): add Button component test
```

- Summary in **imperative mood**, lowercase, no period at the end
- Breaking changes: append `!` after the type/scope (`feat(api)!:`) and add `BREAKING CHANGE:` in the footer
