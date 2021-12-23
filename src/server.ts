import { FastifyReply, FastifyRequest } from 'fastify';
import CONFIG from './common/config';
import boardsRoutes from './resources/boards/boards.routes';
import userRoutes from './resources/users/user.routes';
import tasksRoutes from './resources/tasks/tasks.routes';
import initLogger from './logger/logger';

const logger = initLogger(CONFIG.LOGGER_LEVEL)
const fastify = require('fastify')({
  logger
})

fastify.addHook('preHandler', (req: FastifyRequest, _reply: FastifyReply, done: () => void) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
})

fastify.register(userRoutes)
fastify.register(boardsRoutes)
fastify.register(tasksRoutes)

/**
 * Start fastify app
 * @returns Promise<void>
 */
const start = async () => {
  try {
    await fastify.listen(CONFIG.PORT as string)
  
  } catch (err) {
  //  log.error(err)
    process.exit(1)
  }
}
start()
