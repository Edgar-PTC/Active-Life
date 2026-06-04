import express from "express";
import loginEmployeesController from "../controller/loginEmployeesController.js";

const loginEmployeesRoute =
  express.Router();

loginEmployeesRoute
  .route("/")
  .post(
    loginEmployeesController.login
  );

export default loginEmployeesRoute;