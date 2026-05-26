import express from "express"
import registerClientController from "../controller/registerClientsController.js";

const registerClientRoute = express.Router();

registerClientRoute.route("/").post(registerClientController.insertClients);

registerClientRoute.route("/verifyCode").post(registerClientController.verifyCode);

export default registerClientRoute;