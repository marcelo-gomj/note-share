import { routePath } from "../services/server-routes";
import prisma from "../services/prisma";
import { z } from "zod";
import { verifyAsync } from "../services/jwt";
import { User } from "@prisma/client";


const notes = routePath('/notes');

const querystring = z.object({
  user: z.string().optional().describe('notes by users'),
  page: z.coerce.number().default(1),
  filter: z.enum(['published', 'updated']).optional()
})

type QueryProps = z.infer<typeof querystring>

export default notes('GET', { schema: { querystring } }, async (req, res) => {
  const { user, page } = req.query as QueryProps;
  const { authorization } = req.headers
  const isCurrentUser = await getAuthorizationNotes(authorization, user);

  const query = await prisma.notes.findMany({
    where: {
      userId: user,
      ...(isCurrentUser ? null : { is_public: true })
    },
    skip: 20 * (page - 1),
    take: 20
  })

  res.send(query)
})


async function getAuthorizationNotes(authorization: string | undefined, username: string | undefined) {
  if (!authorization) return;

  const user = await verifyAsync(authorization) as User | null

  if (user) return user.username === username;

  return;
}