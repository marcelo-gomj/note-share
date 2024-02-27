import { FastifyInstance, RouteHandler } from "fastify";
import * as R from "ramda";

type HttpMethods = "get" | "post";
type curryRoutes = (fastify: FastifyInstance) => void;

function routePath(path: string) {
  return R.curryN(3, (method: HttpMethods, handler: RouteHandler, fastify: FastifyInstance) => {
    fastify[method](path, handler);
  })
}

function serverRoutes(fastify: FastifyInstance, routes: curryRoutes[]) {
  for (const route of routes) {
    route(fastify)
  }
}


export {
  routePath,
  serverRoutes
}



