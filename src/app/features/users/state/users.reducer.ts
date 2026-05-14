import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { UsersActions } from './users.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(UsersActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UsersActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UsersActions.saveFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.saveSuccess, (state, { user }) => ({
    ...state,
    error: null,
    users: state.users.some((u) => u.id === user.id)
      ? state.users.map((u) => (u.id === user.id ? user : u))
      : [...state.users, user],
  })),
);

export const usersFeature = createFeature({
  name: 'users',
  reducer,
});

export const {
  name: usersFeatureKey,
  reducer: usersReducer,
  selectUsersState,
  selectUsers,
  selectLoading,
  selectError,
} = usersFeature;
