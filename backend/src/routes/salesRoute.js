import express from "express";
import salesController from "../controller/salesController.js";

const salesRoute = express.Router();

salesRoute.route("/")
    .get(salesController.getAllSales)
    .post(salesController.createSale);

salesRoute.route("/salesClient").post(salesController.buscarPorCliente);

export default salesRoute;
