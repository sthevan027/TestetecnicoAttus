import { selectAllUsers, selectUsersCount, selectUsersError, selectUsersLoading } from './users.selectors';

describe('users selectors', () => {
  const state = {
    users: {
      users: [{ id: '1', name: 'A', email: 'a@a.com', cpf: '1', phone: '1', phoneType: 'mobile' as const }],
      loading: true,
      error: 'x',
    },
  };

  it('selectAllUsers', () => {
    expect(selectAllUsers(state as never).length).toBe(1);
  });

  it('selectUsersLoading', () => {
    expect(selectUsersLoading(state as never)).toBe(true);
  });

  it('selectUsersError', () => {
    expect(selectUsersError(state as never)).toBe('x');
  });

  it('selectUsersCount', () => {
    expect(selectUsersCount(state as never)).toBe(1);
  });
});
