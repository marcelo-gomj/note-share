export type BodyRegister = {
  username: string,
  password: string
};

export type JwtFormatDecoded = {
  iat: number,
  username: string
}
