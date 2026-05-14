import { selectAllTodos, selectPendingTodos } from './todos.selectors';

describe('todos selectors', () => {
  const state = {
    todos: {
      todos: [
        { id: '1', title: 'A', completed: false },
        { id: '2', title: 'B', completed: true },
      ],
      loading: false,
      error: null,
    },
  };

  it('selectAllTodos retorna lista', () => {
    expect(selectAllTodos(state as never)).toHaveLength(2);
  });

  it('selectPendingTodos retorna apenas não concluídas', () => {
    expect(selectPendingTodos(state as never)).toHaveLength(1);
    expect(selectPendingTodos(state as never)[0].id).toBe('1');
  });
});
