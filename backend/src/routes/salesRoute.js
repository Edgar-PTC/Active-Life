import express from "express";
import salesController from "../controller/salesController.js";

const salesRoute = express.Router();

salesRoute.route("/")
    .get(salesController.getAllSales)
    .post(salesController.createSale);

salesRoute.route("/salesClient").post(salesController.buscarPorCliente);

salesRoute.route("/:id").put(salesController.updateStatus);

export default salesRoute;
