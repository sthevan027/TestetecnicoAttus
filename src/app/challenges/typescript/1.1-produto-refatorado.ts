/** Item 1.1 — exemplo refatorado (tipagem, busca segura, sem any). */

export interface Produto {
  readonly id: number;
  readonly descricao: string;
  readonly quantidadeEstoque: number;
}

export class Verdureira {
  private readonly produtos: readonly Produto[];

  constructor(seed: readonly Produto[]) {
    this.produtos = [...seed];
  }

  private buscarPorId(produtoId: number): Produto | undefined {
    return this.produtos.find((p) => p.id === produtoId);
  }

  getDescricaoProduto(produtoId: number): string {
    const produto = this.buscarPorId(produtoId);
    if (!produto) {
      return 'Produto não encontrado';
    }
    return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    const produto = this.buscarPorId(produtoId);
    return produto ? produto.quantidadeEstoque > 0 : false;
  }
}
