import { server } from "../server"
import { generateJwtToken } from "../services/jwt"
import prisma from "../services/prisma";


// before create users in the database
const USERNAME_TEST = 'account.test';
const ANOTHER_USER = 'another.account'

function generateToken() {
  return generateJwtToken(USERNAME_TEST)
}

describe("Handle crud note routes", () => {
  const app = server();
  const headers = { authorization: generateToken() };
  let idNote: string;

  afterAll(async () => {
    app.close()
  })



  it("Create note", async () => {
    const createdNote = await app.inject({
      method: 'POST',
      headers,
      body: {
        text: 'Create text note',
        is_public: true,
        userId: USERNAME_TEST
      },
      url: 'http://localhost:3312/note'
    })

    const res = await createdNote.json();

    expect(createdNote.statusCode).toBe(201)
    expect(res).toHaveProperty('id');

    idNote = res.id;
  })


  it('PUT /note/:idNote - Update note', async () => {
    const noteUpdated = await app.inject({
      url: '/note/' + idNote,
      headers,
      method: 'PUT',
      body: {
        text: 'Test update note example',
        is_public: true,
        userId: USERNAME_TEST
      }
    })

    expect(noteUpdated.statusCode).toBe(200);
    expect(noteUpdated.json()).toHaveProperty('id');
  })

  it('DELETE /note/:idNote - no match user with note author', async () => {
    const noteDeleteError = await app.inject({
      url: '/note/' + idNote,
      headers: { authorization: generateJwtToken(ANOTHER_USER) },
      method: 'DELETE'
    })

    expect(noteDeleteError.json()).toBe(404);
  })

  it('DELETE /note/:idNote - Delete note', async () => {
    const noteDelete = await app.inject({
      url: '/note/' + idNote,
      headers,
      method: 'DELETE'
    })

    expect(noteDelete.statusCode).toBe(200);
    expect(noteDelete.json()).toHaveProperty('id');
  })

})