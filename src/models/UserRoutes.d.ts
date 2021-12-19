import { FastifyRequest } from 'fastify';

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