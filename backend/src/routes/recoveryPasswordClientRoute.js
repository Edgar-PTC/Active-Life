import express from "express";
import recoveryPasswordClientController from "../controller/recoveryPasswordClientController.js";

const recoveryPasswordClientRoute = express.Router();

recoveryPasswordClientRoute.route("/requestCode").post(recoveryPasswordClientController.requestCode);
recoveryPasswordClientRoute.route("/verifyCode").post(recoveryPasswordClientController.verifyCode);
recoveryPasswordClientRoute.route("/newPassword").post(recoveryPasswordClientController.newPassword);

export default recoveryPasswordClientRoute;