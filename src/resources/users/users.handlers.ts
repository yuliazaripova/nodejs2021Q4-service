import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User'
import { TRequestDeleteUser, TRequestGetUser, TRequestPostUser, TRequestPutUser } from '../../models/UserRoutes';
import { omitPassword } from '../../common/utils';

/**
 * Create handler to return all users
 * @param _request FastifyRequest
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getUsersHandler = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    reply.send(users)
}

/**
 * Create handler to find the user by id
 * @param request TRequestGetUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const getUserHandler =  async (request: TRequestGetUser, reply: FastifyReply): Promise<void> => {
    const userRepository = getRepository(User);
    const user = await userRepository.find({ id: request.params.user });
    if (user[0]) {     
        const _user = user && omitPassword(user[0])
        reply.send(_user);
    } else {
        reply.send()
    }
    
   
}

/**
 * Create handler to create new user
 * @param request TRequestPostUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const postUserHandler =  async (request: TRequestPostUser, reply: FastifyReply): Promise<void> => {
    const userRepository = getRepository(User);
    reply.code(201)
    const user = await userRepository.save(request.body);
    reply.headers({'content-type': 'application/json'})
 
    const _user = user && omitPassword(user)
       
    reply.send(_user);
}

/**
 * Create handler to update the user by id
 * @param request TRequestPutUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const putUserHandler = async (request: TRequestPutUser, reply: FastifyReply): Promise<void> => {
    const userRepository = getRepository(User);
    const user = await userRepository.find({ id: request.params.user });
    if (user) {
        await userRepository.update(request.params.user, request.body);
    }
    
    reply.headers({'content-type': 'application/json'})
    reply.send(); 
}

/**
 * Create handler to delete the user by id
 * @param request TRequestDeleteUser
 * @param reply FastifyReply
 * @returns Promise<void>
 */
export const deleteUserHandler = async (request: TRequestDeleteUser, reply: FastifyReply): Promise<void> => {
    const userRepository = getRepository(User);
    reply.code(204)
    const user = await userRepository.find({ id: request.params.user });
    await userRepository.remove(user)
    reply.send()
}