import { v4 as uuidv4 } from 'uuid';
import boards from './boards.db';
import tasks from '../tasks/tasks.db';
import { mutationFilter } from '../../common/utils';
import { IBoard } from '../../models/BoardDTO';
import { ITask } from '../../models/TaskDTO';

export function getAll(): Promise<IBoard[]> {
  return new Promise((resolve) => {
    resolve(boards);
  });
}

export function findById(id: string): Promise<IBoard | undefined>{
    return new Promise((resolve) => {
      const board = boards.find((_boards) => _boards.id === id);
      resolve(board);
    });
}

export function createBoard(board: IBoard): Promise<IBoard>  {
  return new Promise((resolve) => {
    const newBoard = { ...board, id: uuidv4() };
    boards.push(newBoard);
    resolve(newBoard);
  });
}

export function updateBoard(id: string, board: IBoard): Promise<IBoard> {
  return new Promise((resolve) => {
    const index = boards.findIndex((_board) => _board.id === id);
    boards[index] =  board
  //  boards[index] = { id: id, ...board };
    resolve(boards[index]);
  });
}

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
