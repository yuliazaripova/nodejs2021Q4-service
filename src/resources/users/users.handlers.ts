import { FastifyReply, FastifyRequest } from 'fastify';
import { TRequestDeleteUser, TRequestGetUser, TRequestPostUser, TRequestPutUser } from '../../models/UserRoutes';

import * as User from './user.service';

/**
 * Create handler to returns all users
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getUsersHandler = async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await User.getAll();
    reply.send(users)
}

/**
 * Create handler to find the user by id
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getUserHandler =  async (request: TRequestGetUser, reply: FastifyReply) => {
    const user = await User.findById(request.params.user);
    reply.send(user); 
}

/**
 * Create handler to create new user
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const postUserHandler =  async (request: TRequestPostUser, reply: FastifyReply) => {
    reply.code(201)
    const user = await User.createUser(request.body);
    reply.send(user); 
}

/**
 * Create handler to update the user by id
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const putUserHandler = async (request: TRequestPutUser, reply: FastifyReply) => {
    const user = await User.updateUser(request.params.user, request.body);
    reply.send(user); 
}

/**
 * Create handler to delete the user by id
 * @param request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const deleteUserHandler = async (request: TRequestDeleteUser, reply: FastifyReply) => {
    reply.code(204)
    const user = await User.deleteUser(request.params.user);
    reply.send(user)
}