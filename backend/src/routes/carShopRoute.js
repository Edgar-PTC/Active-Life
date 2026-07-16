import express from "express";
import carShopController from "../controller/carShopController.js";

const router = express.Router();

router.route("/")
.get(carShopController.getAllCarts)
.post(carShopController.insertCart)

router.route("/:id")
.get(carShopController.getById)
.put(carShopController.updateCart)
.delete(carShopController.deleteCart)

router.route("/searchByClient").post(carShopController.getByCliente)
router.route("/calculate").post(carShopController.calculateCart)
router.route("/sync").post(carShopController.syncCart)

export default router;