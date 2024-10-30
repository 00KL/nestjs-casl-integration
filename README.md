# Projeto NestJS com Autenticação JWT e Tokens Opacos

Este projeto é uma API RESTful desenvolvida com **NestJS** que implementa autenticação baseada em **JWT** e **tokens opacos**. A API fornece controle de permissões e autorização utilizando o módulo **CASL** (Ability Based Authorization) para garantir o acesso seguro aos recursos.

## Requisitos

- **Node.js** (v14+)
- **NestJS** (v8+)
- **MongoDB**: É necessário configurar um banco de dados MongoDB para o armazenamento de usuários e tokens opacos.
- **Configurações do ambiente**: O projeto depende de variáveis de ambiente, incluindo a chave secreta do JWT e a URI do MongoDB.

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone git@github.com:00KL/nestjs-casl-integration.git
   cd nestjs-casl-integration
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configuração do Arquivo `.env`**:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```plaintext
   MONGO_URI=<sua_mongo_uri>
   JWT_SECRET=<sua_chave_secreta_para_jwt>
   ```

   Já existe um exemplo de `.env` já presente no sistema.

4. **Inicie o Servidor**:
   ```bash
   npm run start:dev
   ```

## Endpoints e Funcionalidades

### 1. **Articles Controller** (`/articles`)

- **POST `/articles`** - Criação de um artigo

  - **Guards**: `BearerTokenAuthGuard`, `PoliciesGuard`
  - **Políticas**: Requer permissão para `create` um `Article`
  - **Resposta**: `Article created`

- **GET `/articles`** - Listagem de artigos
  - **Guards**: `BearerTokenAuthGuard`, `PoliciesGuard`
  - **Políticas**: Requer permissão para `read` um `Article`
  - **Resposta**: `Articles list`

### 2. **Opaque Token Controller** (`/opaque-token`)

Este controller lida com a geração e gerenciamento de tokens opacos para acesso a recursos.

- **POST `/opaque-token/generate`** - Geração de token opaco

  - **Guards**: `BearerTokenAuthGuard`, `PoliciesGuard`
  - **Políticas**: Requer permissão para `create` um `OpaqueToken`
  - **Parâmetros**: `permissions` (no corpo da requisição)
  - **Resposta**: `{ token: <token_gerado> }`

- **POST `/opaque-token/:token/deactivate`** - Desativação de um token opaco

  - **Guards**: `BearerTokenAuthGuard`, `PoliciesGuard`
  - **Políticas**: Requer permissão para `deactivate` um `OpaqueToken`
  - **Parâmetros**: `token` (nos parâmetros da rota)
  - **Resposta**: `{ message: 'Token revogado com sucesso' }`

- **POST `/opaque-token/:token/permissions/update`** - Atualização de permissões do token opaco
  - **Guards**: `BearerTokenAuthGuard`, `PoliciesGuard`
  - **Políticas**: Requer permissão para `edit` um `OpaqueToken`
  - **Parâmetros**: `token` (nos parâmetros da rota), `permissions` (no corpo da requisição)
  - **Resposta**: `{ message: 'Permissões atualizadas com sucesso' }`

### 3. **Users Controller** (`/users`)

Este controller gerencia a criação e atualização de permissões dos usuários.

- **POST `/users`** - Criação de um novo usuário

  - **Parâmetros**: `username`, `password`, `permissions` (no corpo da requisição)
  - **Resposta**: `{ message: 'User created successfully', user: { username, permissions } }`
  - **Erro**: Se o `username` já existir, retorna `409 Conflict`.

- **POST `/users/:id/permissions/update`** - Atualização de permissões do usuário
  - **Parâmetros**: `id` (nos parâmetros da rota), `permissions` (no corpo da requisição)
  - **Resposta**: `{ message: 'Permissions updated successfully', user: { username, permissions } }`
  - **Erro**: Retorna `404 Not Found` se o usuário não for encontrado.

### 4. **Auth Controller** (`/auth`)

Este controller gerencia a autenticação e geração de tokens JWT para usuários.

- **POST `/auth/login`** - Autenticação do usuário e geração de JWT
  - **Parâmetros**: `username`, `password` (no corpo da requisição)
  - **Resposta**: `{ access_token: <token_jwt> }`
  - **Erro**: Retorna `Usuário ou senha incorretos` se as credenciais forem inválidas.

## Estrutura de Diretórios

```plaintext
src
├── auth
│   ├── auth.controller.ts          # Controller de autenticação
│   ├── auth.service.ts             # Serviço de autenticação
│   ├── bearer-token-auth.guard.ts  # Guard de autenticação com token Bearer
│   ├── bearer-token.strategy.ts    # Estratégia JWT
├── articles
│   ├── articles.controller.ts      # Controller de artigos
│   └── articles.service.ts         # Serviço de artigos
├── casl
│   ├── check-policies.decorator.ts # Decorador de políticas CASL
│   ├── casl-ability.factory.ts     # Fábrica de habilidades CASL
│   └── policies.guard.ts           # Guard de políticas CASL
├── opaque-token
│   ├── opaque-token.controller.ts  # Controller de tokens opacos
│   ├── opaque-token.service.ts     # Serviço de tokens opacos
│   └── opaque-token.schema.ts      # Schema para tokens opacos no MongoDB
├── users
│   ├── users.controller.ts         # Controller de usuários
│   ├── users.service.ts            # Serviço de usuários
│   └── user.schema.ts              # Schema de usuários no MongoDB
└── main.ts                         # Arquivo principal da aplicação
```

## Considerações Finais

Este projeto demonstra uma estrutura básica de autenticação com tokens JWT e tokens opacos no NestJS, incluindo controle de permissões com CASL.

Para mais detalhes sobre o NestJS, consulte a [documentação oficial](https://docs.nestjs.com/).
Para mais detalhes sobre o CASL, consulte a [documentação oficial](https://casl.js.org/v5/en/guide/intro)
Para mais detalhes sobre o Passport (lib de autorização), consulte [documentação oficial](https://www.passportjs.org/)
