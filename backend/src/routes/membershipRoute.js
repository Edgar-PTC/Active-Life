import express from "express";
import membershipController from "../controller/membershipController.js";

const membershipRoute = express.Router();

membershipRoute.route("/")
.get(membershipController.getAll)
.post(membershipController.insertgym)

membershipRoute.route("/:id")
.get(membershipController.getById)
.put(membershipController.updateMembership)
.delete(membershipController.deleteMembership)

export default membershipRoute;