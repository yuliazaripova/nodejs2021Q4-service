import { FastifyInstance, FastifyReply } from 'fastify';
import { TRequestGetTasks, TRequestPostTask, TRequestGetTask, TRequestPutTask, TRequestDeleteTask } from '../../models/TaskRoutesDTO';
import * as Task from './tasks.service';

async function tasksRoutes (fastify: FastifyInstance) {
    fastify.get('/boards/:board/tasks', async (request: TRequestGetTasks, reply: FastifyReply) => {
        const tasks = await Task.getAll(request.params.board);
        reply.send(tasks)
    })
    fastify.get('/boards/:board/tasks/:task', async (request: TRequestGetTask, reply: FastifyReply) => {
        const task = await Task.findById(request.params.board, request.params.task);
        if (!task) {
            reply.callNotFound()
          } else {
            reply.send(task); 
          }
        
    })
    fastify.post('/boards/:board/tasks', async (request: TRequestPostTask, reply: FastifyReply) => {
        reply.code(201)
        const task = await Task.createTask(request.params.board, request.body);
        reply.send(task); 
    })
    fastify.put('/boards/:board/tasks/:task', async (request: TRequestPutTask, reply: FastifyReply) => {
        const task = await Task.updateTask(request.params.task, request.body);
        
        if (!task) {
            reply.callNotFound()
          } else {
            reply.send(task);
          }
         
    })
    fastify.delete('/boards/:board/tasks/:task', async (request: TRequestDeleteTask, reply: FastifyReply) => {
        reply.code(204)
        const task = await Task.deleteTask(request.params.task);
            reply.send(task)

        
    })
}
  

export default tasksRoutes