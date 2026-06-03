# Alura IA Workspace

Monorepo com frontend React e backend NestJS para o curso de Inteligência Artificial da Alura.

## Estrutura

```
.
├── apps/
│   ├── api/   # Backend — NestJS (porta 3000)
│   └── web/   # Frontend — React + Vite
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+

## Instalação

```bash
pnpm install
```

## Desenvolvimento

Rodar as duas apps simultaneamente (em terminais separados):

```bash
# Backend
pnpm dev:api

# Frontend
pnpm dev:web
```

| App | URL                   |
|-----|-----------------------|
| web | http://localhost:5173 |
| api | http://localhost:3000 |

## Scripts disponíveis

| Comando           | Descrição                        |
|-------------------|----------------------------------|
| `pnpm dev:web`    | Inicia o frontend em modo watch  |
| `pnpm build:web`  | Gera o build de produção do web  |
| `pnpm preview:web`| Serve o build do web localmente  |
| `pnpm dev:api`    | Inicia a API em modo watch       |
| `pnpm build:api`  | Compila a API                    |
| `pnpm start:api`  | Sobe a API compilada             |
| `pnpm test:api`   | Executa os testes da API         |

## Tecnologias

| Camada    | Tecnologia                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite 8, TypeScript 6      |
| Backend   | NestJS 11, Node.js, TypeScript 5    |
| Workspace | pnpm workspaces                     |
