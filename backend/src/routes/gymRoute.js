import express from "express"
import gymController from "../controller/gymController.js"
import upload from "../utils/cloudinaryConfig.js"

const gymRoute = express.Router();

gymRoute.route("/")
    .get(gymController.getAll)
    .post(upload.array("images"), gymController.insertGym)

gymRoute.route("/:id")
    .get(gymController.getByid)
    .put(upload.array("images"), gymController.updateGym)
    .delete(gymController.deleteGym);

gymRoute.route("/paginate")
    .post(gymController.getPaginate);

gymRoute.route("/searchByName")
    .post(gymController.getByName);

export default gymRoute;