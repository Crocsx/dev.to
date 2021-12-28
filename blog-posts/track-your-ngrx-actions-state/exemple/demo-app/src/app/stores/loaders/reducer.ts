import { Action } from '@ngrx/store';

import { LOADER_KEY, WithLoader } from '../helper';

export function reducer(
  state = { actionState: [] },
  action: Action | WithLoader<Action>
) {
  if (Object.prototype.hasOwnProperty.call(action, LOADER_KEY)) {
    const loader = (action as WithLoader<Action>)[LOADER_KEY];
    return {
      ...state,
      actionState: {
        ...state.actionState,
        ...loader,
      },
    };
  }
  return state;
}
