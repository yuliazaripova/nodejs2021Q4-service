
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TRequestDeleteUser, TRequestGetUser, TRequestPostUser, TRequestPutUser } from '../../models/UserRoutes';

import * as User from './user.service';

async function userRoutes (fastify: FastifyInstance) {
    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const users = await User.getAll();
        reply.send(users)
    })
    fastify.get('/users/:user', async (request: TRequestGetUser, reply: FastifyReply) => {
        const user = await User.findById(request.params.user);
        reply.send(user); 
    })
    fastify.post('/users', async (request: TRequestPostUser, reply: FastifyReply) => {
        reply.code(201)
        const user = await User.createUser(request.body);
        reply.send(user); 
    })
    fastify.put('/users/:user', async (request: TRequestPutUser, reply: FastifyReply) => {
        const user = await User.updateUser(request.params.user, request.body);
        reply.send(user); 
    })
    fastify.delete('/users/:user', async (request: TRequestDeleteUser, reply: FastifyReply) => {
        reply.code(204)
        const user = await User.deleteUser(request.params.user);
        reply.send(user)
    })
}
  

export default userRoutes