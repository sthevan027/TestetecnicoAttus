# Attus — Desafio técnico Front-End (Angular)

**Índice — estrutura do código e onde está cada resposta do desafio:** [docs/estrutura-e-respostas.md](docs/estrutura-e-respostas.md)

Aplicação em **Angular 19** com **Angular Material**, **NgRx** (usuários + to-dos), **RxJS**, **Signals** (demonstração do carrinho) e testes com **Jest** (`jest-preset-angular`).

## Pré-requisitos

- [Node.js](https://nodejs.org/) LTS
- [pnpm](https://pnpm.io/)

## Instalação

```bash
pnpm install
```

## Executar em desenvolvimento

```bash
pnpm start
```

Abra `http://localhost:4200/`. Os dados de usuários e to-dos são servidos por um **HttpInterceptor** mock (`src/app/mocks/mock-api.interceptor.ts`), sem backend externo.

## Build de produção

```bash
pnpm build
```

## Testes e cobertura

```bash
pnpm test
```

O relatório de cobertura é gerado em `coverage/`. O limite mínimo (60%) aplica-se ao conjunto de arquivos listado em `jest.config.cjs` (`collectCoverageFrom`): estado NgRx dos usuários e to-dos, validadores compartilhados, função `filtrarEPaginar` e o componente raiz.

## Rotas

| Rota            | Descrição                                      |
|-----------------|------------------------------------------------|
| `/`             | Listagem de usuários, filtro, modal criar/editar |
| `/todos`        | Lista de tarefas NgRx (load + toggle)         |
| `/challenges`   | Demos: busca reativa (2.3) e carrinho Signals (3.1) |

## Respostas para o documento Word

- **Estrutura do projeto + mapa de cada item:** [docs/estrutura-e-respostas.md](docs/estrutura-e-respostas.md)
- **Texto para colar no `.docx`:** [docs/respostas-desafio-attus.md](docs/respostas-desafio-attus.md)

## Código dos itens teóricos

- **1.1** — [src/app/challenges/typescript/1.1-produto-refatorado.ts](src/app/challenges/typescript/1.1-produto-refatorado.ts)
- **1.2** — [src/app/challenges/typescript/1.2-filtrar-epaginar.ts](src/app/challenges/typescript/1.2-filtrar-epaginar.ts)
- **2.2** (RxJS sem subscribe aninhado) — [src/app/challenges/typescript/2.2-rxjs-sem-nested-subscribe.ts](src/app/challenges/typescript/2.2-rxjs-sem-nested-subscribe.ts)
- **2.3** — componente e serviço em [src/app/challenges/reactive-search-demo/](src/app/challenges/reactive-search-demo/)

## Stack

Angular 19, Angular Material, NgRx Store/Effects/Devtools, RxJS, Jest, pnpm.
