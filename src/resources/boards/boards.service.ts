import { v4 as uuidv4 } from 'uuid';
import boards from './boards.db';
import tasks from '../tasks/tasks.db';
import { mutationFilter } from '../../common/utils';
import { IBoard } from '../../models/BoardDTO';
import { ITask } from '../../models/TaskDTO';

/**
 * Returns all boards array
 * @returns Promise with all boards array
 */
export function getAll(): Promise<IBoard[]> {
  return new Promise((resolve) => {
    resolve(boards);
  });
}

/**
 * Find the board by id
 * @param id string with board id
 * @returns Promise<undefind> if board was not found or Promise with found board
 */
export function findById(id: string): Promise<IBoard | undefined>{
    return new Promise((resolve) => {
      const board = boards.find((_boards) => _boards.id === id);
      resolve(board);
    });
}

/**
 * Create new board
 * @param board IBoard object with board data
 * @returns Promise with created board
 */
export function createBoard(board: IBoard): Promise<IBoard>  {
  return new Promise((resolve) => {
    const newBoard = { ...board, id: uuidv4() };
    boards.push(newBoard);
    resolve(newBoard);
  });
}

/**
 * Update the board by id
 * @param id string with board id
 * @param board IBoard object with board data
 * @returns Promise with updated board
 */
export function updateBoard(id: string, board: IBoard): Promise<IBoard> {
  return new Promise((resolve) => {
    const index = boards.findIndex((_board) => _board.id === id);
    boards[index] = { ...board, id };
    resolve(boards[index]);
  });
}

/**
 * Delete the board by id
 * @param id string with board id
 * @returns Promise<void
 */
export function deleteBoard(id: string): Promise<void> {
  return new Promise((resolve) => {
    const index = boards.findIndex((i) => i.id === id);
    if (index > -1) {
        boards.splice(index, 1);
    }
    mutationFilter(tasks, (task: ITask) => task.boardId !== id)
    resolve();
  });
}
