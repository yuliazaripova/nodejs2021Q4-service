import Fastify from 'fastify';
import CONFIG from './common/config';
import boardsRoutes from './resources/boards/boards.routes';
import userRoutes from './resources/users/user.routes';
import tasksRoutes from './resources/tasks/tasks.routes';

const fastify = Fastify({
  logger: true
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
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
