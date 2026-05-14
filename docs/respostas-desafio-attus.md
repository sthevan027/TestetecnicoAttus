# Respostas — Desafio técnico Attus (Front-End Angular)

**Onde está cada arquivo do desafio (árvore + tabela):** [estrutura-e-respostas.md](estrutura-e-respostas.md)

Copie as seções abaixo para o documento Word de entrega. Comandos e stack: [README](../README.md).


---

## 1.1 Refatoração (TypeScript)

**Problemas do código original:** uso de `any`, laços manuais repetidos, ausência de tratamento quando o produto não existe (risco de `produto` indefinido), comparação solta com `==`, retorno booleano verboso.

**Melhorias aplicadas:** interfaces/tipos explícitos (`Produto` imutável com `readonly`), busca encapsulada em `buscarPorId`, retorno seguro em `getDescricaoProduto` com mensagem quando não encontrado, `hasEstoqueProduto` com optional chaining implícito via checagem, eliminação de `else` desnecessário após `return`.

**Referência no repositório:** `src/app/challenges/typescript/1.1-produto-refatorado.ts`.

---

## 1.2 `filtrarEPaginar<T>`

Implementação genérica com `Pagina<T>` e `PaginaParams`, sem `any`, mais exemplo com usuários e filtro por nome.

**Referência:** `src/app/challenges/typescript/1.2-filtrar-epaginar.ts`.

---

## 2.1 Change Detection e OnPush

**Problema:** com `ChangeDetectionStrategy.OnPush`, o Angular só marca o componente para verificação quando referências de `@Input()` mudam, eventos do template disparam, observáveis do `async` pipe emitem, ou quando a zona sinaliza (ex.: `markForCheck` / `detectChanges`). O `subscribe` do `PessoaService.buscarPorId` roda após o `delay`, mas **não** garante uma nova rodada de detecção para o template, porque o `Observable` não está ligado ao `async` pipe e o `setInterval` atualiza `contador` sem marcar o componente como “sujo” para fins de exibição do `texto`.

**Correção (mantendo OnPush, sem alterar o serviço e sem remover o `setInterval`):** injetar `ChangeDetectorRef` e, dentro do `subscribe` após atribuir `this.texto`, chamar `this.cdr.markForCheck()` (ou `detectChanges()`). Assim o nome passa a ser renderizado.

---

## 2.2 RxJS — eliminando subscriptions aninhadas

**Problema:** dois `subscribe` encadeados dificultam composição, tratamento de erro e cancelamento; aumenta risco de *memory leaks* se o componente for destruído entre chamadas.

**Solução:** compor com `switchMap` (ou `mergeMap`/`concatMap` conforme semântica) a partir do primeiro `Observable`, mantendo um único fluxo. Exemplo no repositório: `src/app/challenges/typescript/2.2-rxjs-sem-nested-subscribe.ts`. Para liberar recursos, usar `takeUntilDestroyed()` ou `take(1)` quando fizer sentido.

---

## 2.4 Performance — OnPush e `trackBy`

**`trackBy` / `@for` com identidade estável:** o Angular reconcilia a lista pelo identificador; itens não alterados reutilizam nós DOM e reduzem trabalho de diff. Sem isso, listas grandes podem recriar DOM e estado interno desnecessariamente.

**OnPush:** limita detecção de mudanças na subárvore do componente a cenários específicos (inputs por referência, eventos, `async`, marcação manual), reduzindo ciclos em listas longas quando os dados não mudam a cada tick.

**Estratégia `Default`:** verifica o componente (e frequentemente filhos) em muito mais ciclos globais; em listas com centenas de itens isso tende a custar CPU perceptível comparado a OnPush + `trackBy`.

---

## Observação sobre o item 2.3

A demonstração completa (debounce 500 ms, `switchMap`, loading, `async pipe`, sem *leak*) está implementada na rota **Desafios → Busca reativa** (`src/app/challenges/reactive-search-demo/`).

---

## 3.1 e 3.2

- **3.1 Signals:** rota **Desafios → Carrinho (Signals)** — `src/app/challenges/cart-signals/cart-signals-demo.component.ts`.
  O componente usa `signal<CartItem[]>` para a lista, `computed` para o total e `effect(() => this.totalChanged.emit(this.total()))` para emitir o `output()` automaticamente sempre que o total mudar.
- **3.2 NgRx To-do:** rota `/todos` — actions, reducer, selectors e effect em `src/app/features/todos/state/`.

---

## Entrega GitHub

https://github.com/sthevan027/TestetecnicoAttus
