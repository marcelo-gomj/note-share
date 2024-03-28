import { server } from "./server";

server(() => () => {
  console.log("SERVER RUNNING PORT : ", process.env.PORT);
})