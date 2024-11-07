import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './task.reducer';

export const selectTaskState = createFeatureSelector<AppState>('tasks');
export const selectTasks = createSelector(
  selectTaskState,
  (state) => state.tasks,
);
