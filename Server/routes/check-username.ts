import { FastifySchema } from "fastify"
import { routePath } from "../services/server-routes"
import prisma from "../services/prisma"

const schema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      }
    },
    required: ['username']
  }
}

const checkUsername = routePath('/check-username/:username', 'POST', { schema })

export default checkUsername(async (req, res) => {
  const { username } = req.params as { username: string }

  if (!username) {
    res.status(404).send()
    return;
  }

  const usernameExist = await prisma.user.count({
    where: {
      username
    }
  })

  res.send({ username: !!usernameExist })
})