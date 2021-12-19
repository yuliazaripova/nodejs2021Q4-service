import { FastifyRequest } from 'fastify';
import { IUser } from './UserDTO';

 export type TRequestGetUser = FastifyRequest<{
    Params: { user: string }
  }>
  
export type TRequestPostUser = FastifyRequest<{
    Body: IUser
  }>
  
export  type TRequestPutUser = FastifyRequest<{
    Params: { user: string }
    Body: IUser
  }>
  
export type TRequestDeleteUser = TRequestGetUser