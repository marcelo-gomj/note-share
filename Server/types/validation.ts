import { User } from "@prisma/client";

export type BodyRegister = {
  username: string,
  password: string
};

export type JwtFormatDecoded = {
  iat: number,
  username: string
}

export type UserProfileMiddleware = {
  user_profile: Omit<User, 'password'>
}

