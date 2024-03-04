import prisma from "./prisma";

export function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    select: {
      role: true,
      username: true,
    },
    where: {
      username
    }
  })
}