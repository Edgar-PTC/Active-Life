import express from "express";
import loginAdminController from "../controller/loginAdminController.js";

const loginAdminRoute =
  express.Router();

loginAdminRoute
  .route("/")
  .post(
    loginAdminController.login
  );

export default loginAdminRoute;