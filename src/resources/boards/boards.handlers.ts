import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { TRequestGetBoard, TRequestPostBoard, TRequestPutBoard, TRequestDeleteBoard } from '../../models/BoardRoutesDTO';
import { Board } from '../../entity/Board';
import { Task } from '../../entity/Task';

/**
 * Create handler to return all boards
 * @param _request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getBoardsHandler = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const boardsRepository = getRepository(Board);
  const boards = await boardsRepository.find();
  reply.send(boards)
}

/**
 * Create handler to find the board by id
 * @param request TRequestGetBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getBoardHandler = async (request: TRequestGetBoard, reply: FastifyReply): Promise<void> => {
    const boardRepository = getRepository(Board);
    const board = await boardRepository.find({ id: request.params.board });
    if (board[0]) {
      reply.send(board[0]); 
    } else {
      reply.code(404)
      reply.send()
    }
}

/**
 * Create handler to create new board
 * @param request TRequestPostBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const  postBoardHandler = async (request: TRequestPostBoard, reply: FastifyReply): Promise<void> => {
  const boardRepository = getRepository(Board);
    reply.code(201)
    const board = await boardRepository.save(request.body);
    reply.send(board); 
}

/**
 * Create handler to update the board by id
 * @param request TRequestPutBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const putBoardHandler =  async (request: TRequestPutBoard, reply: FastifyReply): Promise<void> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.update(request.params.board, request.body);
  reply.send(board); 

}

/**
 * Create handler to delete the board by id
 * @param request TRequestDeleteBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const deleteBoardHandler = async (request: TRequestDeleteBoard, reply: FastifyReply): Promise<void> => {
  const boardRepository = getRepository(Board);
  const taskRepository = getRepository(Task)

  
  
  const board = await boardRepository.find({ id: request.params.board });
  if (board[0]) {
    await boardRepository.remove(board)
    const tasks = await taskRepository.find({boardId: request.params.board})
    await taskRepository.remove(tasks)
    reply.code(204)
    reply.send()
  } else {
    reply.code(404)
  }
}