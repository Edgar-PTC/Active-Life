import express from "express";
import recoveryPasswordAdminController from "../controller/recoveryPasswordAdminController.js";

const recoveryPasswordAdminRoute = express.Router();

recoveryPasswordAdminRoute.route("/requestCode").post(recoveryPasswordAdminController.requestCode);
recoveryPasswordAdminRoute.route("/verifyCode").post(recoveryPasswordAdminController.verifyCode);
recoveryPasswordAdminRoute.route("/newPassword").post(recoveryPasswordAdminController.newPassword);

export default recoveryPasswordAdminRoute;