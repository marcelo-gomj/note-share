import { routePath } from "../services/server-routes";

const users = routePath('/users/:user')


export default users(
  'get',
  {}
)