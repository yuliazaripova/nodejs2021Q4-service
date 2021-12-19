import { FastifyReply, FastifyRequest } from 'fastify';
import { TRequestGetBoard, TRequestPostBoard, TRequestPutBoard, TRequestDeleteBoard } from '../../models/BoardRoutesDTO';
import * as Board from './boards.service';

/**
 * Create handler to return all boards
 * @param _request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getBoardsHandler = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const boards = await Board.getAll();
    reply.send(boards);
}

/**
 * Create handler to find the board by id
 * @param request TRequestGetBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getBoardHandler = async (request: TRequestGetBoard, reply: FastifyReply): Promise<void> => {
    const board = await Board.findById(request.params.board);
    if (!board) {
        reply.callNotFound();
      } else {
        reply.send(board);
      }
}

/**
 * Create handler to create new board
 * @param request TRequestPostBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const  postBoardHandler = async (request: TRequestPostBoard, reply: FastifyReply): Promise<void> => {
    reply.code(201)
    const board = await Board.createBoard(request.body);
    reply.send(board); 
}

/**
 * Create handler to update the board by id
 * @param request TRequestPutBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const putBoardHandler =  async (request: TRequestPutBoard, reply: FastifyReply): Promise<void> => {
    const board = await Board.updateBoard(request.params.board, request.body);
    if (!board) {
        reply.callNotFound();
      } else {
        reply.send(board);
      }
}

/**
 * Create handler to delete the board by id
 * @param request TRequestDeleteBoard
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const deleteBoardHandler = async (request: TRequestDeleteBoard, reply: FastifyReply): Promise<void> => {
    reply.code(204);
    const board = await Board.deleteBoard(request.params.board);
    reply.send(board);
}