import express from "express";
import registerAdminController from "../controller/registerAdminController.js";

const registerAdminRoute =
  express.Router();

registerAdminRoute
  .route("/")
  .post(
    registerAdminController.insertAdmin
  );

registerAdminRoute
  .route("/verifyCode")
  .post(
    registerAdminController.verifyCode
  );

export default registerAdminRoute;