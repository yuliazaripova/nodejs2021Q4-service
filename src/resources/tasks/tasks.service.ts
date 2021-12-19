import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../models/TaskDTO';
import tasks from './tasks.db';


/**
 * Returns all tasks array for specific board
 * @param boardId string with board id
 * @returns Promise with all tasks array for specific board
 */
export function getAll(boardId: string):Promise<ITask[]> {
  return new Promise((resolve) => {
    const board = tasks.filter(i => i.boardId === boardId);
    resolve(board);
  });
}

/**
 * Find the task by id
 * @param taskId string with task id
 * @returns Promise<undefind> if task was not found or Promise with found task
 */
export function findById(taskId: string): Promise<ITask | undefined> {
    return new Promise((resolve) => {
      const task = tasks.find(i => i.id === taskId);
      resolve(task);
    });
}

/**
 * Create new task for specific board
 * @param boardId string with board id for which will be task created
 * @param task ITask object with task data
 * @returns Promise with created task
 */
export function createTask(boardId: string, task: ITask): Promise<ITask> {
  return new Promise((resolve) => {
    const newTask = { ...task, id: uuidv4(), boardId };
    tasks.push(newTask);
    resolve(newTask);
  });
}

/**
 * Update the task by id
 * @param id string with task id
 * @param task ITask object with task data
 * @returns Promise with updated task
 */
export function updateTask(id: string, task: ITask): Promise<ITask> {
  return new Promise((resolve) => {
    const index = tasks.findIndex((_task) => _task.id === id);
    tasks[index] = { ...task, id };
    resolve(task);
  });
}

/**
 * Delete the task by id
 * @param id string with task id
 * @returns Promise<void>
 */
export function deleteTask(id: string): Promise<void> {
  return new Promise((resolve) => {
    const index = tasks.findIndex((i) => i.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    resolve();
  });
}
