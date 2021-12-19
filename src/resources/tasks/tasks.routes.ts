import { FastifyInstance } from "fastify"
import { getTasksHandler, getTaskHandler, postTaskHandler, putTaskHandler, deleteTaskHandler } from "./tasks.handlers"

/**
 * Create routes for tasks
 * @param fastify FastifyInstance
 * @returns Promise<void>
 */
async function tasksRoutes (fastify: FastifyInstance) {
    fastify.get('/boards/:board/tasks', getTasksHandler)
    fastify.get('/boards/:board/tasks/:task', getTaskHandler)
    fastify.post('/boards/:board/tasks', postTaskHandler)
    fastify.put('/boards/:board/tasks/:task', putTaskHandler)
    fastify.delete('/boards/:board/tasks/:task', deleteTaskHandler)
}
  

export default tasksRoutes