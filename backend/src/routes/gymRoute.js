import express from "express"
import gymController from "../controller/gymController.js"
import upload from "../utils/cloudinaryConfig.js"

const gymRoute = express.Router();

gymRoute.route("/")
    .get(gymController.getAll)
    .post(upload.single("image"), gymController.insertGym)

gymRoute.route("/:id")
    .get(gymController.getByid)
    .put(upload.single("image"), gymController.updateGym)
    .delete(gymController.deleteGym);

gymRoute.route("/paginate")
    .post(gymController.getPaginate);

export default gymRoute;