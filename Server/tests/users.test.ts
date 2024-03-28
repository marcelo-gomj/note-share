import { server } from "../server"
import prisma from "../services/prisma";

describe("User login/register system", () => {
  const app = server();
  const USERNAME = 'userTestExp'

  beforeAll(async () => {
    await prisma.user.delete({
      where: {
        username: USERNAME
      }
    })
  })

  it("POST /register Register user", async () => {
    const userCreated = await app.inject({
      url: '/register',
      method: "POST",
      body: {
        username: USERNAME,
        password: 'test1235'
      }
    })


    expect(userCreated.statusCode).toBe(201);
    expect(userCreated.json()).toHaveProperty('token');
  })

  it("POST /register without password", async () => {
    const registeredUserNoPassoword = await app.inject({
      url: '/register',
      method: 'POST',
      body: {
        username: USERNAME
      }
    })

    expect(registeredUserNoPassoword.statusCode).toBe(400)
  })

  it("POST /register without password", async () => {
    const registeredUserNoUsername = await app.inject({
      url: '/register',
      method: 'POST',
      body: {
        password: 'test1235'
      }
    })

    expect(registeredUserNoUsername.statusCode).toBe(400)
  })

  it('POST /login get user in database', async () => {
    const user = await app.inject({
      url: '/login',
      method: 'POST',
      body: {
        username: USERNAME,
        password: 'test1235'
      }
    })


    expect(user.statusCode).toBe(200);
    expect(user.json()).toHaveProperty('token')
  })

  it('POST /register Check if user exist', async () => {
    const user = await app.inject({
      url: '/register',
      method: 'POST',
      body: {
        username: USERNAME,
        password: 'testpassword1234'
      }
    })

    expect(user.statusCode).toBe(400);
  })
})