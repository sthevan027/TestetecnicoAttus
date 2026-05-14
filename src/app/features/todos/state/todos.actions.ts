import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../../models/todo.model';

export const TodosActions = createActionGroup({
  source: 'Todos API',
  events: {
    loadTodos: emptyProps(),
    loadTodosSuccess: props<{ todos: Todo[] }>(),
    loadTodosFailure: props<{ error: string }>(),
    toggleTodoComplete: props<{ id: string }>(),
  },
});
