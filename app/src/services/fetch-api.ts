import { NotesResult, User } from "@/types/database";
import { curry } from "ramda";

type BodyProps = { [key: string]: any }
type HttpMethods = 'GET' | "POST" | "DELETE";
type HttpOptions = RequestInit & { method: HttpMethods, body?: BodyProps };
type LoginBody = { username: string, password: string };
type ModeUserHandler = 'login' | 'register';
type ReturnUserHandler = Promise<{ token: string } & User | null>;
type ReturnVerifyToken = Promise<User | null>;

const fetchApi = curry(async (
  path: string,
  token: string,
  body: BodyProps,
  httpOptions: HttpOptions
) => {
  const API_URL = 'http://localhost:3312';
  const res = await fetch(`${API_URL}${path}`, {
    ...httpOptions,
    headers: {
      ...httpOptions.headers,
      "Authorization": token,
      ...(body ? { 'Content-Type': 'application/json' } : null)
    },
    body: body ? JSON.stringify(body) : null,
  })

  if (res.ok) return res.json();

  return null
})

const loginAndRegisterUser = (
  mode: ModeUserHandler,
  body: LoginBody
) => fetchApi(
  '/' + mode,
  "", body,
  { method: "POST" }
) as ReturnUserHandler

const verifyToken = (
  token: string
) => fetchApi(
  '/verify-token',
  "",
  { token },
  { method: "POST" }
) as ReturnVerifyToken

const checkUsername = (username: string) => fetchApi(
  '/check-username/' + username,
  "",
  undefined,
  { method: 'POST' }
) as Promise<null | { username: boolean }>

const listNotesByUser = (username: string) => fetchApi(
  '/profile/' + username,
  "",
  undefined,
  { method: 'GET' }
) as Promise<null | NotesResult>

export {
  loginAndRegisterUser,
  verifyToken,
  checkUsername,
  listNotesByUser
}