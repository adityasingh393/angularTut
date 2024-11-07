import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask, deleteTask, updateTask } from './store/task.actions';
import { Task } from './store/task.model';
import { selectTasks } from './store/task.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent {
  tasks: Task[] = [];

  constructor(private store: Store) {
    this.store.select(selectTasks).subscribe((tasks) => {
      this.tasks = tasks;
      console.log('Updated tasks:', this.tasks);
    });
  }

  addNewTask() {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title: 'New Task',
      description: 'This is a new task.',
    };
    this.store.dispatch(addTask({ task: newTask }));
  }

  updateTask(task: Task) {
    const updatedTask: Task = {
      ...task,
      title: 'Updated Task',
      description: 'This task has been updated.',
    };
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }
}
