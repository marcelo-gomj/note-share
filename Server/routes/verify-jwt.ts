import { FastifySchema } from "fastify";
import { verifyAsync } from "../services/jwt";
import { routePath } from "../services/server-routes";
import { getUserByUsername } from "../services/database";
import prisma from "../services/prisma";
import { decode } from "jsonwebtoken";


const schema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      "token": { type: "string" }
    }
  }
}

const verifyToken = routePath('/verify-token', 'post', { schema });


export default verifyToken(async (req, res) => {
  const { token } = req.body as { token?: string };

  if (!token) {
    res.status(400).send('no token provided');
    return;
  }

  const isTokenValid = await verifyAsync(token) as { username: string, iat: number };

  if (!isTokenValid) {
    res.status(400).send("invalid token")
    return;
  }

  const { username } = isTokenValid;

  const user = await getUserByUsername(username);
  res.status(200).send(user)
})

