import { FastifySchema, RouteHandler } from "fastify";
import { routePath } from "../services/server-routes";
import prisma from "../services/prisma";
import { User } from "@prisma/client";
import { z } from "zod";

const users = routePath('/profile/:user')

const controller: RouteHandler = async (req, res) => {
  const params = req.params as { user: string, user_profile: Partial<User> };
  const query = req.query as { page: number };

  const notes = await prisma.notes.findMany({
    where: {
      userId: params.user,
      is_public: true
    },
    take: 20,
    skip: (query.page || 1) - 1
  })

  res.send({ notes })
}

const schema: FastifySchema = {
  querystring: z.object({
    page: z.coerce.number().default(1)
  })
}

export default users(
  'get',
  {
    schema,
    // preHandler: useAuthentification
  },
  controller
)