import { RouteHandler } from "fastify";
import prisma from "../services/prisma";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { BodyRegister } from "../types/validation";


export const registerController: RouteHandler = async (req, res) => {
  const { username, password: passwordRaw } = req.body as BodyRegister;

  const password = await hash(passwordRaw, 10);

  const existUser = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (existUser) {
    res.code(400).send({ UserTypeError: "User already exists" });
    return;
  }

  const token = sign({ username }, process.env.SECRET_KEY ?? "")

  const user = await prisma.user.create({
    data: {
      username,
      password
    }
  })

  res.code(201).send({
    ...user,
    token
  })
}
