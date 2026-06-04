import express from "express";
import adminsController from "../controller/adminsController.js";

const adminsRoute = express.Router();

adminsRoute
  .route("/")
  .get(adminsController.getAdmins);

adminsRoute
  .route("/:id")
  .delete(adminsController.deleteAdmin)
  .put(adminsController.updateAdmin);

export default adminsRoute;