import { preHandlerHookHandler } from "fastify"
import { verify } from "jsonwebtoken";
import prisma from "../services/prisma";
import { JwtFormatDecoded } from "../types/validation";
import { verifyAsync } from "../services/jwt";

const useAuthentification: preHandlerHookHandler = async (req, res, done) => {
  const jwtDecoded = await verifyAsync(req.headers?.authorization ?? "") as JwtFormatDecoded;

  if (!jwtDecoded) {
    res.send("JWT invalid")
    return;
  }

  const { username } = jwtDecoded;

  const user_profile = await prisma.user.findUnique({
    select: {
      id: true,
      username: true,
      role: true
    },
    where: {
      username
    }
  })

  if (!user_profile) {
    res.status(404).send("User incorrect for operation");
    return;
  }

  req.params = {
    //@ts-ignore
    ...req.params,
    user_profile
  };

  done()
}


export default useAuthentification;