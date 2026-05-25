import app from './app.js';
import "./database.js";
import { config } from "./config.js";

//creamos la funcion que se encargara de iniciar el servidor
async function main() {
  app.listen(config.server.PORT);
}

main();