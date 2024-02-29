import { FastifyInstance, RouteHandler, RouteOptions } from "fastify";
import * as R from "ramda";

type HttpMethods = "get" | "post" | 'delete';
type curryRoutes = (fastify: FastifyInstance) => void;

function routePath(path: string) {
  return R.curryN(4, (
    method: HttpMethods,
    options: Partial<RouteOptions>,
    handler: RouteHandler,
    fastify: FastifyInstance
  ) => {
    fastify[method](path, options, handler); // side-effects
  })
}

function serverRoutes(fastify: FastifyInstance, routes: curryRoutes[]) {
  for (const route of routes) {
    route(fastify) // side-effects
  }
}

export {
  routePath,
  serverRoutes
}



