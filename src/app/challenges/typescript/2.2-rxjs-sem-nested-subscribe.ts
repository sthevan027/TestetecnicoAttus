/**
 * Item 2.2 — elimina subscribe aninhado com switchMap + forkJoin (alternativa: concatMap).
 * Exemplo ilustrativo (não acoplado ao app).
 */
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Pessoa {
  id: number;
  nome: string;
}

export interface PessoaServiceLike {
  buscarPorId(id: number): Observable<Pessoa>;
  buscarQuantidadeFamiliares(id: number): Observable<number>;
}

export function montarTextoFamiliares(
  svc: PessoaServiceLike,
  pessoaId: number,
): Observable<string> {
  return svc.buscarPorId(pessoaId).pipe(
    switchMap((pessoa) =>
      svc.buscarQuantidadeFamiliares(pessoaId).pipe(
        map((qtd) => `Nome: ${pessoa.nome} | familiares: ${qtd}`),
      ),
    ),
  );
}

export function demo(): Observable<string> {
  const svc: PessoaServiceLike = {
    buscarPorId: (id) => of({ id, nome: 'João' }),
    buscarQuantidadeFamiliares: () => of(3),
  };
  return montarTextoFamiliares(svc, 1);
}
