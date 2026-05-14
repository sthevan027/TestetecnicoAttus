import { UsersActions } from './users.actions';
import { usersReducer, UsersState } from './users.reducer';
import { User } from '../../../models/user.model';

describe('usersReducer', () => {
  const user: User = {
    id: '1',
    name: 'Teste',
    email: 't@test.com',
    cpf: '12345678901',
    phone: '11999999999',
    phoneType: 'mobile',
  };

  it('load define loading e limpa erro', () => {
    const s: UsersState = { users: [], loading: false, error: 'x' };
    const next = usersReducer(s, UsersActions.load());
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('loadSuccess preenche usuários', () => {
    const s: UsersState = { users: [], loading: true, error: null };
    const next = usersReducer(s, UsersActions.loadSuccess({ users: [user] }));
    expect(next.loading).toBe(false);
    expect(next.users.length).toBe(1);
  });

  it('saveSuccess atualiza usuário existente', () => {
    const s: UsersState = { users: [user], loading: false, error: null };
    const updated = { ...user, name: 'Novo' };
    const next = usersReducer(s, UsersActions.saveSuccess({ user: updated }));
    expect(next.users[0].name).toBe('Novo');
  });

  it('loadFailure define erro', () => {
    const s: UsersState = { users: [], loading: true, error: null };
    const next = usersReducer(s, UsersActions.loadFailure({ error: 'falhou' }));
    expect(next.loading).toBe(false);
    expect(next.error).toBe('falhou');
  });

  it('saveFailure define erro', () => {
    const s: UsersState = { users: [user], loading: false, error: null };
    const next = usersReducer(s, UsersActions.saveFailure({ error: 'ops' }));
    expect(next.error).toBe('ops');
  });

  it('saveSuccess adiciona novo usuário', () => {
    const s: UsersState = { users: [], loading: false, error: null };
    const next = usersReducer(s, UsersActions.saveSuccess({ user }));
    expect(next.users.length).toBe(1);
  });
});
