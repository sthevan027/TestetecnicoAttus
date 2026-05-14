# Estrutura do projeto e mapa das respostas do desafio

Use este arquivo como **índice**: ele aponta para pastas e arquivos do enunciado Attus.

---

## Árvore resumida

```
src/app/
├── app.config.ts          # HTTP mock, animações, NgRx, locale pt-BR
├── app.routes.ts          # Rotas /, /todos, /challenges/...
├── app.component.*        # Apenas <router-outlet />
├── models/                # user.model.ts, todo.model.ts
├── mocks/                 # mock-api.interceptor.ts, mock-api.constants.ts
├── shared/                # validators.ts (e-mail, CPF, telefone)
├── features/
│   ├── users/             # Desafio prático (listagem + modal) + NgRx users
│   │   ├── state/         # actions, reducer, selectors, effects
│   │   ├── user-list-page.*
│   │   ├── user-form-dialog.*
│   │   └── users.service.ts
│   └── todos/             # Item 3.2 — NgRx To-do
│       ├── state/
│       ├── todo-page.*
│       └── todos.service.ts
└── challenges/            # Demos dos itens teóricos
    ├── typescript/        # 1.1, 1.2, 2.2 (código)
    ├── reactive-search-demo/   # 2.3
    ├── cart-signals/      # 3.1
    └── challenges-layout.*

docs/
├── estrutura-e-respostas.md   # Este arquivo (índice)
└── respostas-desafio-attus.md # Texto para colar no Word (1.1, 2.1, 2.2, 2.4…)

Documento desafio tecnico/
└── desafio_frontend_attus.docx  # Enunciado original
```

---

## Mapa: cada item do desafio → onde está

| Item | Conteúdo | Onde |
|------|-----------|------|
| **1.1** | Refatoração Produto/Verdureira | Código: `src/app/challenges/typescript/1.1-produto-refatorado.ts` |
| **1.2** | `filtrarEPaginar<T>` + exemplo | Código: `src/app/challenges/typescript/1.2-filtrar-epaginar.ts` · Teste: `1.2-filtrar-epaginar.spec.ts` |
| **2.1** | OnPush / nome não aparece | Texto: `docs/respostas-desafio-attus.md` (seção 2.1) |
| **2.2** | RxJS sem subscribe aninhado | Código: `src/app/challenges/typescript/2.2-rxjs-sem-nested-subscribe.ts` · Texto: `docs/respostas-desafio-attus.md` |
| **2.3** | Debounce, switchMap, loading, async pipe | `src/app/challenges/reactive-search-demo/` · Rota **`/challenges/search`** |
| **2.4** | trackBy, OnPush, Default | Texto: `docs/respostas-desafio-attus.md` · `@for (…; track u.id)` em `user-list-page.component.html` |
| **3.1** | Carrinho Signals + output | `src/app/challenges/cart-signals/` · Rota **`/challenges/cart`** |
| **3.2** | NgRx To-do (actions, reducer, selectors, effect) | `src/app/features/todos/state/` + `todos.service.ts` · Rota **`/todos`** |
| **4** | App listagem + modal | `src/app/features/users/` · Mock HTTP `src/app/mocks/mock-api.interceptor.ts` · Rota **`/`** |
| **Word** | Respostas para colar no .docx | `docs/respostas-desafio-attus.md` |

---

## Rotas rápidas

| URL | O que abre |
|-----|------------|
| `/` | Listagem de usuários (desafio 4) |
| `/todos` | To-dos NgRx (item 3.2) |
| `/challenges/search` | Busca reativa (item 2.3) |
| `/challenges/cart` | Carrinho Signals (item 3.1) |

---

## Leitura sugerida

1. Este arquivo (`docs/estrutura-e-respostas.md`) — **índice**.
2. `docs/respostas-desafio-attus.md` — texto das perguntas **dissertativas** para o Word.
3. `README.md` — como instalar, rodar e testar o projeto.
