/** Item 1.2 — filtro + paginação genéricos, sem any. */

export interface PaginaParams {
  readonly page: number;
  readonly pageSize: number;
}

export interface Pagina<T> {
  readonly items: T[];
  readonly totalFiltered: number;
}

export function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams,
): Pagina<T> {
  const filtered = data.filter(filterFn);
  const start = (params.page - 1) * params.pageSize;
  const items = filtered.slice(start, start + params.pageSize);
  return { items, totalFiltered: filtered.length };
}

export interface Usuario {
  id: string;
  nome: string;
}

export function exemploUsuariosPorNome(): Pagina<Usuario> {
  const usuarios: Usuario[] = [
    { id: '1', nome: 'Maria Silva' },
    { id: '2', nome: 'João Santos' },
    { id: '3', nome: 'Maria Oliveira' },
  ];

  return filtrarEPaginar(
    usuarios,
    (u) => u.nome.toLowerCase().includes('maria'),
    { page: 1, pageSize: 10 },
  );
}
