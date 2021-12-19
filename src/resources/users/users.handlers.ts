import { FastifyReply, FastifyRequest } from 'fastify';
import { TRequestDeleteUser, TRequestGetUser, TRequestPostUser, TRequestPutUser } from '../../models/UserRoutes';

import * as User from './user.service';

/**
 * Create handler to return all users
 * @param _request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getUsersHandler = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const users = await User.getAll();
    reply.send(users)
}

/**
 * Create handler to find the user by id
 * @param request TRequestGetUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getUserHandler =  async (request: TRequestGetUser, reply: FastifyReply): Promise<void> => {
    const user = await User.findById(request.params.user);
    reply.send(user); 
}

/**
 * Create handler to create new user
 * @param request TRequestPostUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const postUserHandler =  async (request: TRequestPostUser, reply: FastifyReply): Promise<void> => {
    reply.code(201)
    const user = await User.createUser(request.body);
    reply.send(user); 
}

/**
 * Create handler to update the user by id
 * @param request TRequestPutUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const putUserHandler = async (request: TRequestPutUser, reply: FastifyReply): Promise<void> => {
    const user = await User.updateUser(request.params.user, request.body);
    reply.send(user); 
}

/**
 * Create handler to delete the user by id
 * @param request TRequestDeleteUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const deleteUserHandler = async (request: TRequestDeleteUser, reply: FastifyReply): Promise<void> => {
    reply.code(204)
    const user = await User.deleteUser(request.params.user);
    reply.send(user)
}