import { createReducer, on } from '@ngrx/store';
import { addTask, updateTask, deleteTask } from './task.actions';
import { Task } from './task.model';

export interface AppState {
  tasks: Task[];
}

export const initialState: AppState = {
  tasks: [],
};
export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => {
    console.log('Adding task:', task); // Log here
    return { ...state, tasks: [...state.tasks, task] };
  }),
  on(updateTask, (state, { task }) => {
    console.log('Updating task:', task); // Log here
    return {
      ...state,
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    };
  }),
  on(deleteTask, (state, { id }) => {
    console.log('Deleting task with id:', id); // Log here
    return { ...state, tasks: state.tasks.filter((task) => task.id !== id) };
  }),
);
