import { createSelector } from '@ngrx/store';
import { todosFeature } from './todos.reducer';

const selectAllTodos = todosFeature.selectTodos;

export const selectPendingTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((t) => !t.completed),
);

export { selectAllTodos };
