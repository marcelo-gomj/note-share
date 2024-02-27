import { RouteHandler } from "fastify";
import { routePath } from "../services/server-routes";

const index = routePath('/');

const controllerIndex: RouteHandler = (req, res) => {

}

export default index('get', controllerIndex);