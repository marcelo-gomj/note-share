import fastify, { FastifyInstance } from "fastify";
import "dotenv/config";
import { serverRoutes } from "./services/server-routes";
import routes from "./routes/routes";

function serverHandler() {
  console.log("SERVER RUNNING PORT : ", process.env.PORT);
}

function server(fastify: FastifyInstance) {
  const configFastify = {
    port: Number(process.env.PORT)
  }

  serverRoutes(fastify, routes);

  try {
    fastify.listen(configFastify, serverHandler);
  } catch (err) {
    process.exit(1)
  }
}

export default server(fastify())
