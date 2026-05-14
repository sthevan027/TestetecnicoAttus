import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserDraft } from '../../../models/user.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ users: User[] }>(),
    loadFailure: props<{ error: string }>(),
    save: props<{ draft: UserDraft }>(),
    saveSuccess: props<{ user: User }>(),
    saveFailure: props<{ error: string }>(),
  },
});
