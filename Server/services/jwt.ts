import { JwtPayload, sign, verify, } from "jsonwebtoken"
import { decode } from "punycode";

function generateJwtToken(username: string) {
  return sign({ username }, process.env.SECRET_KEY ?? "")
}

function verifyAsync(authorization: string) {
  return new Promise((resolve, reject) => {
    verify(authorization, String(process.env.SECRET_KEY), function (err, jwt) {
      resolve(err ? null : jwt);
    })
  })
}

export {
  generateJwtToken,
  verifyAsync
}