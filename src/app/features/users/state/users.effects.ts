import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersActions } from './users.actions';
import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        this.usersService.loadAll().pipe(
          map((users) => UsersActions.loadSuccess({ users })),
          catchError((err: Error) => of(UsersActions.loadFailure({ error: err.message ?? 'Erro ao carregar' }))),
        ),
      ),
    ),
  );

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.save),
      switchMap(({ draft }) =>
        this.usersService.save(draft).pipe(
          map((user) => UsersActions.saveSuccess({ user })),
          catchError((err: Error) => of(UsersActions.saveFailure({ error: err.message ?? 'Erro ao salvar' }))),
        ),
      ),
    ),
  );
}
