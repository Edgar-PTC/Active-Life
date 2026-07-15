import express from "express";
import authController from "../controller/authController.js"

const router = express.Router();

router.route("/client").post(authController.client);
router.route("/admin").post(authController.admin);

export default router;