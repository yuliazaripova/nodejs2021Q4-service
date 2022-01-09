import { FastifySwaggerOptions } from "fastify-swagger";

const swagger = {
    mode: "static",
    exposeRoute: true,
    routePrefix: "/swagger",
    specification: {
      path: `${__dirname}/../../doc/api.yaml`,
      postProcessor(swaggerObject: FastifySwaggerOptions) {
        return swaggerObject;
      },
      baseDir: "/doc", 
    }
}

export default swagger