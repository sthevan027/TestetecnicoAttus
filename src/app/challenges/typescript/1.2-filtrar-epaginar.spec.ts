import { exemploUsuariosPorNome, filtrarEPaginar } from './1.2-filtrar-epaginar';

describe('filtrarEPaginar', () => {
  it('filtra e pagina', () => {
    const data = [1, 2, 3, 4, 5, 6];
    const res = filtrarEPaginar(data, (n) => n % 2 === 0, { page: 1, pageSize: 2 });
    expect(res.totalFiltered).toBe(3);
    expect(res.items).toEqual([2, 4]);
  });

  it('exemplo de usuários retorna itens filtrados', () => {
    const page = exemploUsuariosPorNome();
    expect(page.totalFiltered).toBeGreaterThan(0);
  });
});
