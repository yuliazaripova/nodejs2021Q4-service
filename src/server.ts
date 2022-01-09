import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import CONFIG from './common/config';
import boardsRoutes from './resources/boards/boards.routes';
import userRoutes from './resources/users/user.routes';
import tasksRoutes from './resources/tasks/tasks.routes';
import initLogger from './logger/logger';
import { ELoggerTypes } from './logger/types';
import swagger from './common/swagger';

const logger = initLogger(CONFIG.LOGGER_LEVEL as ELoggerTypes)

const fastify = require('fastify')({
  logger
})

fastify.addHook('preHandler', (req: FastifyRequest, _reply: FastifyReply, done: () => void) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
})
fastify.setErrorHandler( async (error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
  logger.error(error)
  reply.status(error.statusCode || 500).send({ ok: false })
});

process.on('uncaughtException', (err, origin) => {
  logger.error(`Caught exception: ${err}\n` +
  `Exception origin: ${origin}`)
   process.exit(1)
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1)
});

fastify.register(userRoutes)
fastify.register(boardsRoutes)
fastify.register(tasksRoutes)

fastify.register(fastifySwagger, swagger)

/**
 * Start fastify app
 * @returns Promise<void>
 */
const start = async () => {
  try {
    await fastify.listen(CONFIG.PORT as string, '0.0.0.0')
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}
start()
