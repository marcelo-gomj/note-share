import { User } from "@prisma/client";
import { sign, verify, } from "jsonwebtoken"

function generateJwtToken(username: string) {
  return sign({ username }, process.env.SECRET_KEY ?? "")
}

function verifyAsync(authorization: string) {
  return new Promise((resolve) => {
    verify(authorization, String(process.env.SECRET_KEY), function (err, jwt) {
      resolve(err ? null : jwt);
    })
  })
}

export {
  generateJwtToken,
  verifyAsync
}