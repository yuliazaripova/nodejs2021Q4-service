import { FastifyRequest } from 'fastify';
import { ITask } from './TaskDTO';

export type TRequestGetTasks = FastifyRequest<{
    Params: { board: string }
  }>
  
  export type TRequestGetTask = FastifyRequest<{
    Params: { board: string, task: string}
  }>

export type TRequestPostTask = FastifyRequest<{
    Params: { board: string }
    Body: ITask
  }>
  
export  type TRequestPutTask = FastifyRequest<{
    Params: { task: string }
    Body: ITask
  }>
  
export type TRequestDeleteTask = TRequestGetTask