import { FastifySchema } from "fastify";
import { routePath } from "../services/server-routes";
import { registerController } from "../controllers/register-controller";

export const registerSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    },
    required: ["username", "password"]
  }
}

const register = routePath('/register');

export default register(
  "post",
  { schema: registerSchema },
  registerController
);



