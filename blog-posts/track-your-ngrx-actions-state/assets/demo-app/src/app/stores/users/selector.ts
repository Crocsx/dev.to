import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './models';

export const getUsersState = createFeatureSelector<User[]>('users');

export const getUsers = createSelector(getUsersState, (state: User[]) => state);
