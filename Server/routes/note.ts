import { FastifySchema } from "fastify";
import useAuthentification from "../middlewares/use-authentification";
import { routePath } from "../services/server-routes"
import { z } from "zod";
import prisma from "../services/prisma";
import { UserProfileMiddleware } from "../types/validation";

const TEXT_FIELD = z.string().max(1000).min(1);
const IS_PUBLIC_FIELD = z.coerce.boolean();

const createNoteBody = {
  body: z.object({
    text: TEXT_FIELD,
    is_public: IS_PUBLIC_FIELD
  })
}

const updateNoteBody = {
  body: z.object({
    id: z.string(),
    text: TEXT_FIELD.optional(),
    is_public: IS_PUBLIC_FIELD.optional()
  })
}

const deleteNoteBody = {
  body: z.object({
    id: z.string()
  })
}

const optionsFastifyWithAuth = (
  schema?: FastifySchema
) => ({ preHandler: useAuthentification, schema })


const createNote = routePath('/note', 'POST', optionsFastifyWithAuth(createNoteBody),
  async (request, reply) => {
    const body = request.body as z.infer<typeof createNoteBody.body>;
    const { user_profile } = request.params as UserProfileMiddleware;

    const created = await prisma.notes.create({
      select: {
        id: true,
        is_public: true,
        created_at: true,
        userId: true
      },
      data: {
        ...body,
        userId: user_profile.username
      }
    })

    console.log(created)

    reply.status(201).send(created)
  }
);

const noteRouteWithId = routePath('/note');

const updateNote = noteRouteWithId('PUT', optionsFastifyWithAuth(updateNoteBody),
  async (request, reply) => {
    const params = request.params as UserProfileMiddleware;
    const body = request.body as z.infer<typeof updateNoteBody.body>;

    const updatedNote = await prisma.notes.update({
      where: {
        id: body.id,
        userId: params.user_profile.username
      },
      select: {
        id: true,
      },
      data: body
    })

    reply.status(200).send(updatedNote)
  }
);

const deleteNote = noteRouteWithId('DELETE', optionsFastifyWithAuth(deleteNoteBody),
  async (request, reply) => {
    const { user_profile } = request.params as UserProfileMiddleware;
    const body = request.body as z.infer<typeof deleteNoteBody.body>

    try {
      const deletedNote = await prisma.notes.delete({
        select: {
          id: true
        },
        where: {
          userId: user_profile.username,
          id: body.id
        }
      })

      reply.send(deletedNote)
    } catch (err) {
      reply.send(404).send("Note not found or user invalid for operation")
    }
  }
);


export default [
  createNote,
  updateNote,
  deleteNote
]