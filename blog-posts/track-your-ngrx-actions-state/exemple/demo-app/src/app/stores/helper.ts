import { ActionState } from '../models/action';

export const LOADER_KEY = '@ngrx-custom-loader';

export type WithLoader<T> = T & {
  [LOADER_KEY]: { [k: string]: ActionState };
};

export function withLoader<T>(
  loader: Partial<{ [k: string]: ActionState }>,
  payload?: T
) {
  return Object.assign(payload || {}, {
    [LOADER_KEY]: loader,
  }) as WithLoader<T>;
}
