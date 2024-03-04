import "dotenv/config";
import Fastify, { FastifyListenOptions } from "fastify";
import { serverRoutes } from "./services/server-routes";
import routes from "./routes/routes";
import { curry } from "ramda";
import cors from "@fastify/cors";

const serverHandler = (port: number) => () => {
  console.log("SERVER RUNNING PORT : ", port);
}

function server() {
  const fastify = Fastify();
  fastify.register(cors, {
    origin: true
  })

  const PORT = Number(process.env.PORT) ?? 3001;

  serverRoutes(fastify, routes);

  try {
    fastify.listen(
      { port: PORT },
      serverHandler(PORT)
    );
  } catch (err) {
    process.exit(0)
  }
}

server()