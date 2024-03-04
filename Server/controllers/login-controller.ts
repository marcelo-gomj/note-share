import { RouteHandler } from "fastify";
import { BodyRegister } from "../types/validation";
import prisma from "../services/prisma";
import { compare } from "bcrypt";
import { generateJwtToken } from "../services/jwt";

export const loginController: RouteHandler = async (req, res) => {
  const { username, password } = req.body as BodyRegister;
  const firstCheckUser = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!firstCheckUser) {
    res.code(400).send("username not exist");
    return;
  }

  const { password: HashPassword } = firstCheckUser;
  const checkPassword = await compare(password, HashPassword);

  if (!checkPassword) {
    res.code(400).send("password incorrect");
    return;
  }

  res.send({
    ...firstCheckUser,
    token: generateJwtToken(username)
  })
} 