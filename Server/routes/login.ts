import { loginController } from "../controllers/login-controller";
import { routePath } from "../services/server-routes"
import { registerSchema } from "./register";

const login = routePath('/login');

export default login(
  'post',
  {
    schema: registerSchema
  },
  loginController
)
