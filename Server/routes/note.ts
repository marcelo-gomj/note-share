import { FastifySchema } from "fastify";
import useAuthentification from "../middlewares/use-authentification";
import { routePath } from "../services/server-routes"
import { z } from "zod";
import prisma from "../services/prisma";
import { UserProfileMiddleware } from "../types/validation";

type ParamsWithAuth<T> = T & UserProfileMiddleware

const TEXT_FIELD = z.string().max(750).min(5);
const IS_PUBLIC_FIELD = z.coerce.boolean().default(true);

const createNoteBody = {
  body: z.object({
    text: TEXT_FIELD,
    is_public: IS_PUBLIC_FIELD
  })
}

const updateNoteParams = {
  params: z.object({
    noteId: z.string()
  }),
  body: z.object({
    text: TEXT_FIELD.optional(),
    is_public: IS_PUBLIC_FIELD.optional()
  })
}

const deleteNoteParams = {
  params: z.object({
    noteId: z.string()
  })
}

const optionsFastifyWithAuth = (
  schema?: FastifySchema
) => ({ preHandler: useAuthentification, schema })


const createNote = routePath('/note', 'POST', optionsFastifyWithAuth(createNoteBody),
  async (request, reply) => {
    const body = request.body as z.infer<typeof createNoteBody.body>;
    const { user_profile } = request.params as UserProfileMiddleware;

    const createdNote = await prisma.notes.create({
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

    reply.status(201).send(createdNote)
  }
);

const noteRouteWithId = routePath('/note/:noteId');

const updateNote = noteRouteWithId('PUT', optionsFastifyWithAuth(updateNoteParams),
  async (request, reply) => {
    const params = request.params as ParamsWithAuth<z.infer<typeof updateNoteParams.params>>;
    const body = request.body as z.infer<typeof updateNoteParams.body>;

    const updatedNote = await prisma.notes.update({
      where: {
        id: params.noteId,
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

type DeleteParams = z.infer<typeof deleteNoteParams.params> & UserProfileMiddleware;

const deleteNote = noteRouteWithId('DELETE', optionsFastifyWithAuth(deleteNoteParams),
  async (request, reply) => {
    const { user_profile, noteId } = request.params as DeleteParams;

    try {
      const deletedNote = await prisma.notes.delete({
        select: {
          id: true
        },
        where: {
          userId: user_profile.username,
          id: noteId
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