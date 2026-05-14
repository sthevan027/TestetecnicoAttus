import { createSelector } from '@ngrx/store';
import { usersFeature } from './users.reducer';

export const selectAllUsers = usersFeature.selectUsers;

export const selectUsersLoading = usersFeature.selectLoading;

export const selectUsersError = usersFeature.selectError;

export const selectUsersCount = createSelector(selectAllUsers, (users) => users.length);
