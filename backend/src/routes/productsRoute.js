import express from "express"
import productsController from "../controller/productsController.js"
import upload from "../utils/cloudinaryConfig.js"

const productRoute = express.Router();

productRoute.route("/")
.get(productsController.getAll)
.post(upload.single("image"), productsController.insert)

productRoute.route("/:id")
.get(productsController.getById)
.delete(productsController.delete)
.put(upload.single("image"), productsController.update)

export default productRoute;