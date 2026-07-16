import express from "express";
import adminsController from "../controller/adminsController.js";

const adminsRoute = express.Router();

adminsRoute
  .route("/")
  .get(adminsController.getAdmins);

adminsRoute
  .route("/:id")
  .get(adminsController.getAdminById)
  .delete(adminsController.deleteAdmin)
  .put(adminsController.updateAdmin);

export default adminsRoute;
