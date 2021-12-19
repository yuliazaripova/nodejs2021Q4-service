import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../models/TaskDTO';
import tasks from './tasks.db';

export function getAll(boardId: string) {
  return new Promise((resolve) => {
    const board = tasks.filter(i => i.boardId === boardId);
    resolve(board);
  });
}

export function findById(boardId: string, taskId: string): Promise<ITask | undefined> {
    return new Promise((resolve) => {
      const task = tasks.find(i => i.id === taskId);
      resolve(task);
    });
}

export function createTask(boardId: string, task: ITask): Promise<ITask> {
  return new Promise((resolve) => {
    const newTask = { ...task, id: uuidv4(), boardId };
    tasks.push(newTask);
    resolve(newTask);
  });
}

export function updateTask(id: string, task: ITask): Promise<ITask> {
  return new Promise((resolve) => {
    const index = tasks.findIndex((_task) => _task.id === id);
    tasks[index] = { ...task, id };
    resolve(task);
  });
}

export function deleteTask(id: string): Promise<void> {
  return new Promise((resolve) => {
    const index = tasks.findIndex((i) => i.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    resolve();
  });
}
