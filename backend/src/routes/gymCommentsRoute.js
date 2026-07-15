import gymCommentsController from "../controller/gymCommentsController.js";
import express from "express";

const gymComments = express.Router();

gymComments.route("/")
    .get(gymCommentsController.getAll)
    .post(gymCommentsController.insertComment);

gymComments.route("/:id")
    .get(gymCommentsController.getById)
    .put(gymCommentsController.updateComment)
    .delete(gymCommentsController.deleteComment);

gymComments.route("/paginate")
    .post(gymCommentsController.getPaginate);

export default gymComments;