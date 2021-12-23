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
        level: 'info',
        target: 'pino-pretty',
        options: {
                 colorize: true
              }
      }, {
        level: 'info',
        target: 'pino/file',
        options: { destination: `${__dirname}/../logs/info.log` }
      },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: `${__dirname}/../logs/error.log` }
      }
    ]
    }
  })

  export default initLogger
