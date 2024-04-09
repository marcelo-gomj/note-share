import "dotenv/config";
import Fastify, { FastifyListenOptions } from "fastify";
import { serverRoutes } from "./services/server-routes";
import { ZodTypeProvider, validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import routes from "./routes/routes";
import cors from "@fastify/cors";

type CallbackServer = (port?: number) => () => void;

export function server(handler?: CallbackServer) {
  const fastify = Fastify();

  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.withTypeProvider<ZodTypeProvider>();
  fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })

  const PORT = Number(process.env.PORT) ?? 3001;

  serverRoutes(fastify, routes);

  try {
    fastify.listen(
      { port: PORT },
      (handler ? handler(PORT) : () => { })
    );
  } catch (err) {
    process.exit(0)
  }

  return fastify
}