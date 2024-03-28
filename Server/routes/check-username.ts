import { FastifySchema } from "fastify"
import { routePath } from "../services/server-routes"
import prisma from "../services/prisma"
import { z } from "zod"

const schema: FastifySchema = {
  params: z.object({
    username: z.string().default('')
  })
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