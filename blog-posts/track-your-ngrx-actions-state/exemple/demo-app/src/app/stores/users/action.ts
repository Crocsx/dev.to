import { createAction } from '@ngrx/store';

import { ActionState } from '../../models/action';
import { withLoader } from '../helper';
import { User } from './models';

export const userAddSetKey = '[User] User Add';
export const userAddRequest = createAction(
  '[User] User Add Request',
  function prepare(payload: { username: string }) {
    return withLoader({ [userAddSetKey]: ActionState.LOADING }, payload);
  }
);
export const userAddSuccess = createAction(
  '[User] User Add Success',
  function prepare(payload: {user: User}) {
    return withLoader({ [userAddSetKey]: ActionState.SUCCEEDED }, payload);
  }
);
export const userAddFailure = createAction(
  '[User] User Add Failure',
  function prepare(payload: { message: string }) {
    return withLoader({ [userAddSetKey]: ActionState.FAILED }, payload);
  }
);

export const userDeleteSetKey = '[User] User Delete';
export const userDeleteRequest = createAction(
  '[User] User Delete Request',
  function prepare(payload: { id: number }) {
    return withLoader({ [userDeleteSetKey]: ActionState.LOADING }, payload);
  }
);
export const userDeleteSuccess = createAction(
  '[User] User Delete Success',
  function prepare(payload: { id: number }) {
    return withLoader({ [userDeleteSetKey]: ActionState.SUCCEEDED }, payload);
  }
);
export const userDeleteFailure = createAction(
  '[User] User Delete Failure',
  function prepare(payload: { message: string }) {
    return withLoader({ [userDeleteSetKey]: ActionState.FAILED }, payload);
  }
);

export const userListLoadSetKey = '[User] User Load List';
export const userListLoadRequest = createAction(
  '[User] User Load List Request',
  function prepare() {
    return withLoader({ [userListLoadSetKey]: ActionState.LOADING });
  }
);
export const userListLoadSuccess = createAction(
  '[User] User Load List Success',
  function prepare(payload: { users: User[] }) {
    return withLoader({ [userListLoadSetKey]: ActionState.SUCCEEDED }, payload);
  }
);
export const userListLoadFailure = createAction(
  '[User] User Load List Failure',
  function prepare(payload: { message: string }) {
    return withLoader({ [userListLoadSetKey]: ActionState.LOADING }, payload);
  }
);
