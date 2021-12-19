import { FastifyInstance } from "fastify"
import { getUsersHandler, getUserHandler, postUserHandler, putUserHandler, deleteUserHandler } from "./users.handlers"

/**
 * Create routes for users
 * @param fastify FastifyInstance
 * @returns Promise<void>
 */
async function userRoutes (fastify: FastifyInstance) {
    fastify.get('/users', getUsersHandler)
    fastify.get('/users/:user', getUserHandler)
    fastify.post('/users', postUserHandler)
    fastify.put('/users/:user', putUserHandler)
    fastify.delete('/users/:user', deleteUserHandler)
}
  

export default userRoutes