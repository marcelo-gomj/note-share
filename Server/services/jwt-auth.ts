import { sign, verify, } from "jsonwebtoken"

function generateJwtToken(username: string) {
  return sign({ username }, process.env.SECRET_KEY ?? "")
}

function verifyJwtToken(token: string) {
  return verify(token, process.env.SECRET_KEY ?? "")
}


export {
  generateJwtToken,
}