import { FastifyInstance, HTTPMethods, RouteHandler, RouteOptions } from "fastify";
import * as R from "ramda";

type curryRoutes = (fastify: FastifyInstance) => void;

const routePath = R.curry((
  path: string,
  method: HTTPMethods,
  options: Partial<RouteOptions>,
  handler: RouteHandler,
  fastify: FastifyInstance
) => {
  fastify.route({
    ...options,
    url: path,
    method,
    handler,
  })
})


function serverRoutes(fastify: FastifyInstance, routes: (curryRoutes | curryRoutes[])[]) {
  const allRoutes = R.flatten(routes);


  for (const route of allRoutes) {
    route(fastify) // side-effects
  }
}

export {
  routePath,
  serverRoutes
}



