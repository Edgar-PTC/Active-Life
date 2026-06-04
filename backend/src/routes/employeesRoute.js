import express from "express";
import employeesController from "../controller/employeesController.js";

const employeesRoute =
  express.Router();

employeesRoute
  .route("/")
  .get(
    employeesController.getEmployees
  );

employeesRoute
  .route("/:id")
  .delete(
    employeesController.deleteEmployee
  )
  .put(
    employeesController.updateEmployee
  );

export default employeesRoute;