import { createFeature, createReducer, on } from '@ngrx/store';
import { Todo } from '../../../models/todo.model';
import { TodosActions } from './todos.actions';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(TodosActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),
  on(TodosActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodosActions.toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    ),
  })),
);

export const todosFeature = createFeature({
  name: 'todos',
  reducer,
});

export const {
  name: todosFeatureKey,
  reducer: todosReducer,
  selectTodos,
  selectLoading: selectTodosLoading,
  selectError: selectTodosError,
} = todosFeature;
