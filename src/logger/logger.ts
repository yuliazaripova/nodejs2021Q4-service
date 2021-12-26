import { FastifyRequest } from "fastify"
import pino from "pino"
import { ELoggerTypes } from "./types"

const initLogger = (level = ELoggerTypes.INFO) => pino({
    level,
    serializers: {
      req (request: FastifyRequest) {
        return { 
          method: request.method,
          url: request.url,
          params: request.params,
          hostname: request.hostname,
        }
      }
   },
    transport: {
      targets: [{
        level: 'trace',
        target: 'pino-pretty',
        options: {
                 colorize: true
              }
      }, {
        level: 'trace',
        target: 'pino/file',
        options: { destination: `${__dirname}/../../logs/all.log`, mkdir: true }
      },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: `${__dirname}/../../logs/error.log`, mkdir: true }
      }
    ]
    }
  })

  export default initLogger
