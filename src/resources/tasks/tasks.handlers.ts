import { FastifyReply } from 'fastify';
import { TRequestGetTasks, TRequestPostTask, TRequestGetTask, TRequestPutTask, TRequestDeleteTask } from '../../models/TaskRoutesDTO';
import * as Task from './tasks.service';

/**
 * Create handler to returns all tasks for specific board
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getTasksHandler =  async (request: TRequestGetTasks, reply: FastifyReply) => {
    const tasks = await Task.getAll(request.params.board);
    reply.send(tasks)
}

/**
 * Create handler to find the task by id for specific board
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getTaskHandler =  async (request: TRequestGetTask, reply: FastifyReply) => {
    const task = await Task.findById(request.params.task);
    if (!task) {
        reply.callNotFound()
    } else {
        reply.send(task); 
    }
    
}

  /**
 * Create handler to create new task for specific board
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const postTaskHandler = async (request: TRequestPostTask, reply: FastifyReply) => {
    reply.code(201)
    const task = await Task.createTask(request.params.board, request.body);
    reply.send(task); 
}

  /**
 * Create handler to update the task by id for specific board
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const putTaskHandler =  async (request: TRequestPutTask, reply: FastifyReply) => {
    const task = await Task.updateTask(request.params.task, request.body);
    
    if (!task) {
        reply.callNotFound()
      } else {
        reply.send(task);
      }
     
}

 /**
 * Create handler to delete the task by id for specific board
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */ 
export const deleteTaskHandler =  async (request: TRequestDeleteTask, reply: FastifyReply) => {
    reply.code(204)
    const task = await Task.deleteTask(request.params.task);
    reply.send(task)
}