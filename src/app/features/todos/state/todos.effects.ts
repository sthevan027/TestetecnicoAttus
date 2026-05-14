import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodosActions } from './todos.actions';
import { TodosService } from '../todos.service';

@Injectable()
export class TodosEffects {
  private readonly actions$ = inject(Actions);
  private readonly todosService = inject(TodosService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(() =>
        this.todosService.loadAll().pipe(
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError((err: Error) =>
            of(TodosActions.loadTodosFailure({ error: err.message ?? 'Erro ao carregar tarefas' })),
          ),
        ),
      ),
    ),
  );
}
