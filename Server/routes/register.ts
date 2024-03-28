import { FastifySchema } from "fastify";
import { routePath } from "../services/server-routes";
import { registerController } from "../controllers/register-controller";
import { z } from "zod";

export const registerSchema: FastifySchema = {
  body: z.object({
    username: z.string().max(32).min(4),
    password: z.string({
      required_error: 'Without password'
    }).max(32).min(6)
  })
}

const register = routePath('/register');

export default register(
  "post",
  { schema: registerSchema },
  registerController
);



