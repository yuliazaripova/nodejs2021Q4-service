import { FastifyInstance } from 'fastify';
import { getBoardsHandler, getBoardHandler, postBoardHandler, putBoardHandler, deleteBoardHandler } from './boards.handlers';

/**
 * Create routes for boards
 * @param fastify FastifyInstance
 * @returns Promise<void>
 */
async function boardsRoutes (fastify: FastifyInstance) {
    fastify.get('/boards', getBoardsHandler)
    fastify.get('/boards/:board', getBoardHandler)
    fastify.post('/boards', postBoardHandler)
    fastify.put('/boards/:board', putBoardHandler)
    fastify.delete('/boards/:board', deleteBoardHandler)
}
  

 export default boardsRoutes