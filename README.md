# Alura IA Workspace

Monorepo com frontend React e backend NestJS para o curso de Inteligência Artificial da Alura.

## Estrutura

```
.
├── apps/
│   ├── api/   # Backend — NestJS (porta 3000), auth JWT + PostgreSQL/TypeORM
│   └── web/   # Frontend — React + Vite
├── docker-compose.yml   # PostgreSQL com volume persistente
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+
- [Docker](https://www.docker.com/) (para o PostgreSQL)

## Instalação

```bash
pnpm install
```

## Banco de dados

A API persiste os usuários em **PostgreSQL** via **TypeORM**. Suba o banco com o
Docker Compose da raiz — ele já cria o volume nomeado `pgdata`, mantendo os dados
entre reinícios:

```bash
docker compose up -d
```

Configure a conexão da API copiando o exemplo e ajustando se necessário:

```bash
cp apps/api/.env.example apps/api/.env
```

| Variável      | Padrão      | Descrição                          |
|---------------|-------------|------------------------------------|
| `DB_HOST`     | `127.0.0.1` | Host do PostgreSQL                  |
| `DB_PORT`     | `5433`      | Porta mapeada pelo Docker Compose   |
| `DB_USER`     | `alura`     | Usuário do banco                    |
| `DB_PASSWORD` | `alura`     | Senha do banco                      |
| `DB_NAME`     | `alura_auth`| Nome do banco                       |
| `JWT_SECRET`  | `dev-secret`| Segredo de assinatura dos JWTs      |

> No Windows + Docker Desktop, use `DB_HOST=127.0.0.1` (e **não** `localhost`):
> o `localhost` pode resolver para IPv6 (`::1`) e a conexão com o container expira.
> A porta `5433` evita conflito com instalações locais do PostgreSQL na `5432`.

O schema é criado automaticamente pelo TypeORM (`synchronize`) ao subir a API —
adequado para desenvolvimento; em produção, use migrations.

## Desenvolvimento

Com o banco no ar (`docker compose up -d`), rode as duas apps simultaneamente
(em terminais separados):

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
| `pnpm test:web`   | Executa os testes do frontend    |

## Autenticação

A API expõe endpoints de autenticação com JWT:

| Método | Rota       | Descrição                                  |
|--------|------------|--------------------------------------------|
| `POST` | `/signup`  | Cadastra um usuário (senha com bcrypt)     |
| `POST` | `/login`   | Autentica e retorna um JWT                 |
| `GET`  | `/profile` | Dados do usuário autenticado (Bearer token)|
| `GET`  | `/users`   | Lista os usuários cadastrados (sem a senha)|

Documentação interativa (Swagger) em http://localhost:3000/docs.

## Tecnologias

| Camada    | Tecnologia                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19, Vite 8, TypeScript 6, axios           |
| Backend   | NestJS 11, TypeScript 5, JWT (Passport)         |
| Banco     | PostgreSQL 17, TypeORM, Docker Compose          |
| Workspace | pnpm workspaces                                 |
