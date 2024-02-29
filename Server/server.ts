import "dotenv/config";
import fastify, { FastifyInstance } from "fastify";
import { serverRoutes } from "./services/server-routes";
import routes from "./routes/routes";
import fastifyJwt from "@fastify/jwt";

function serverHandler() {
  console.log("SERVER RUNNING PORT : ", process.env.PORT);
}

function server(fastify: FastifyInstance) {
  const configFastify = { port: Number(process.env.PORT) ?? 3001 };

  fastify.register(fastifyJwt, { secret: process.env.SECRET_KEY ?? "" })
  serverRoutes(fastify, routes);

  try {
    fastify.listen(configFastify, serverHandler);
  } catch (err) {
    process.exit(1)
  }
}

export default server(fastify())
