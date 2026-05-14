import { TodosActions } from './todos.actions';
import { todosReducer, TodosState } from './todos.reducer';
import { Todo } from '../../../models/todo.model';

describe('todosReducer', () => {
  const todo: Todo = { id: '1', title: 'A', completed: false };

  it('load define loading', () => {
    const s: TodosState = { todos: [], loading: false, error: null };
    const next = todosReducer(s, TodosActions.loadTodos());
    expect(next.loading).toBe(true);
  });

  it('loadTodosSuccess preenche lista', () => {
    const s: TodosState = { todos: [], loading: true, error: null };
    const next = todosReducer(s, TodosActions.loadTodosSuccess({ todos: [todo] }));
    expect(next.loading).toBe(false);
    expect(next.todos.length).toBe(1);
  });

  it('toggleTodoComplete alterna para concluído', () => {
    const s: TodosState = { todos: [todo], loading: false, error: null };
    const next = todosReducer(s, TodosActions.toggleTodoComplete({ id: '1' }));
    expect(next.todos[0].completed).toBe(true);
  });

  it('toggle volta para não concluído', () => {
    const doneTodo = { ...todo, completed: true };
    const s: TodosState = { todos: [doneTodo], loading: false, error: null };
    const next = todosReducer(s, TodosActions.toggleTodoComplete({ id: '1' }));
    expect(next.todos[0].completed).toBe(false);
  });

  it('loadTodosFailure define erro', () => {
    const s: TodosState = { todos: [todo], loading: true, error: null };
    const next = todosReducer(s, TodosActions.loadTodosFailure({ error: 'e' }));
    expect(next.loading).toBe(false);
    expect(next.error).toBe('e');
  });
});
