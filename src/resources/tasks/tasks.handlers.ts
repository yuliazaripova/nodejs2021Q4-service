import { FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';
import { TRequestGetTasks, TRequestPostTask, TRequestGetTask, TRequestPutTask, TRequestDeleteTask } from '../../models/TaskRoutesDTO';
import { Task } from '../../entity/Task'

/**
 * Create handler to return all tasks for specific board
 * @param request TRequestGetTasks
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getTasksHandler =  async (request: TRequestGetTasks, reply: FastifyReply): Promise<void> => {
    const taskRepository = getRepository(Task);
    const tasks = await taskRepository.find();
    reply.send(tasks)
}

/**
 * Create handler to find the task by id for specific board
 * @param request TRequestGetTask
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getTaskHandler =  async (request: TRequestGetTask, reply: FastifyReply): Promise<void> => {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.find({ id: request.params.task });
    if (task[0]) {
        reply.send(task[0]); 
      } else {
        reply.code(404)
        reply.send()
      }
    
}

  /**
 * Create handler to create new task for specific board
 * @param request TRequestPostTask
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const postTaskHandler = async (request: TRequestPostTask, reply: FastifyReply): Promise<void> => {
    const taskRepository = getRepository(Task);
    reply.code(201)
    const task = await taskRepository.save({...request.body, boardId: request.params.board});
    reply.send(task); 
}

  /**
 * Create handler to update the task by id for specific board
 * @param request TRequestPutTask
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const putTaskHandler =  async (request: TRequestPutTask, reply: FastifyReply): Promise<void> => {
    const taskRepository = getRepository(Task);
  //  if (task === undefined) return undefined
    const task = await taskRepository.update(request.params.task, request.body);
    reply.send(task); 
     
}

 /**
 * Create handler to delete the task by id for specific board
 * @param request TRequestDeleteTask
 * @param reply FastifyReply
 * @returns Promise<void>
 */ 
export const deleteTaskHandler =  async (request: TRequestDeleteTask, reply: FastifyReply): Promise<void> => {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.find({ id: request.params.task });
   
    if (task[0]) {
        await taskRepository.remove(task)
        reply.code(204)
        reply.send()
      } else {
        reply.code(404)
      }
}