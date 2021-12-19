import { FastifyRequest } from 'fastify';
import { IBoard } from './BoardDTO';

export type TRequestGetBoard = FastifyRequest<{
    Params: { board: string }
  }>
  
export type TRequestPostBoard = FastifyRequest<{
    Body: IBoard
  }>
  
export  type TRequestPutBoard = FastifyRequest<{
    Params: { board: string }
    Body: IBoard
  }>
  
export type TRequestDeleteBoard = TRequestGetBoard