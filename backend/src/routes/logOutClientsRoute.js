import e from "express";

import logInClientsController from "../controller/logInClientsController.js";

const logOutClientsRoute = e.Router();

logOutClientsRoute.route("/").post(logInClientsController.logout);

export default logOutClientsRoute;
