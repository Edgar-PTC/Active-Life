import express from "express";
import registerEmployeesController from "../controller/registerEmployeesController.js";

const registerEmployeesRoute =
  express.Router();

registerEmployeesRoute
  .route("/")
  .post(
    registerEmployeesController.register
  );

export default registerEmployeesRoute;