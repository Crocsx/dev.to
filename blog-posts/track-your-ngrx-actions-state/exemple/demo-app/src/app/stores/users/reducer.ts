import { createReducer, on } from '@ngrx/store';

import * as UserActions from './action';

export const reducer = createReducer(
  [],
  on(UserActions.userAddSuccess, (state, payload) =>
    state.concat(payload.user)
  ),
  on(UserActions.userDeleteSuccess, (state, payload) =>
    state.filter((e) => e.id !== payload.id)
  ),
  on(UserActions.userListLoadSuccess, (state, payload) =>
    state.concat(state.concat(payload.users))
  )
);
