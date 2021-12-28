import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionState } from '../../models/action';

export const getLoadersState = createFeatureSelector<{
  actionState: Record<string, ActionState>;
}>('loaders');

export const getIsSucceeded = (actions: string[] = []) =>
  createSelector(getLoadersState, (state) => {
    if (actions.length === 1) {
      return state.actionState[actions[0]] === ActionState.SUCCEEDED;
    }
    return actions.some((action) => {
      return state.actionState[action] === ActionState.SUCCEEDED;
    });
  });

export const getIsLoading = (actions: string[] = []) =>
  createSelector(getLoadersState, (state) => {
    if (actions.length === 1) {
      return state.actionState[actions[0]] === ActionState.LOADING;
    }
    return actions.some((action) => {
      return state.actionState[action] === ActionState.LOADING;
    });
  });

export const getIsFailed = (actions: string[] = []) =>
  createSelector(getLoadersState, (state) => {
    if (actions.length === 1) {
      return state.actionState[actions[0]] === ActionState.FAILED;
    }
    return actions.some((action) => {
      return state.actionState[action] === ActionState.FAILED;
    });
  });

export const getLoadingState = (actions: string[] = []) =>
  createSelector(
    getLoadersState,
    getIsLoading(actions),
    getIsFailed(actions),
    getIsSucceeded(actions),
    (_, loading, failed, succeded) => {
      if (loading) {
        return ActionState.LOADING;
      }
      if (failed) {
        return ActionState.FAILED;
      }
      if (succeded) {
        return ActionState.SUCCEEDED;
      }
      return ActionState.INIT;
    }
  );
