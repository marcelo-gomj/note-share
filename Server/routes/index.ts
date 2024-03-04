import { FastifySchema, RouteHandler } from "fastify";
import { routePath } from "../services/server-routes";

const index = routePath('/', 'GET', {});

const controllerIndex: RouteHandler = (req, res) => {
  res.send({ chegou: "aqui" })
}

export default index(controllerIndex);
