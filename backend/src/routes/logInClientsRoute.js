import e from "express";

import logInClientsController from "../controller/logInClientsController.js";

const logInClientsRoute = e.Router();

logInClientsRoute.route("/").post(logInClientsController.login);

export default logInClientsRoute;