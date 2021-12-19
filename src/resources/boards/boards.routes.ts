import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TRequestGetBoard, TRequestPostBoard, TRequestPutBoard, TRequestDeleteBoard } from '../../models/BoardRoutesDTO';
import * as Board from './boards.service';


async function boardsRoutes (fastify: FastifyInstance) {
    fastify.get('/boards', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const boards = await Board.getAll();
        reply.send(boards)
    })
    fastify.get('/boards/:board', async (request: TRequestGetBoard, reply: FastifyReply): Promise<void> => {
        const board = await Board.findById(request.params.board);
        if (!board) {
            reply.callNotFound()
          } else {
            reply.send(board)
          }

    })
    fastify.post('/boards', async (request: TRequestPostBoard, reply: FastifyReply): Promise<void> => {
        reply.code(201)
        const board = await Board.createBoard(request.body);
        reply.send(board); 
    })
    fastify.put('/boards/:board', async (request: TRequestPutBoard, reply: FastifyReply): Promise<void> => {
        const board = await Board.updateBoard(request.params.board, request.body);
        if (!board) {
            reply.callNotFound()
          } else {
            reply.send(board)
          }
    })
    fastify.delete('/boards/:board', async (request: TRequestDeleteBoard, reply: FastifyReply): Promise<void> => {
        reply.code(204)
        const board = await Board.deleteBoard(request.params.board);

            reply.send(board)

         
    })
}
  

 export default boardsRoutes