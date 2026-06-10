import express from "express";
import authController from "../controller/authController.js"

const router = express.Router();

router.route("/client").post(authController.client);

export default router;