import { server } from "../server"


describe('Query notes', () => {
  const app = server();

  it("query note default", async () => {
    const res = await app.inject({
      url: '/notes',
      method: 'GET'
    })

    expect(res.json()).toBe([])
  })
})