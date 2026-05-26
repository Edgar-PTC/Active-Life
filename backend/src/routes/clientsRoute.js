import express from "express"
import clientController from "../controller/clientsController.js"

const clientsRouter = express.Router();

clientsRouter.route("/")
.get(clientController.getClients);

clientsRouter.route("/:id")
.delete(clientController.deleteClients)
.put(clientController.updateClients)

export default clientsRouter;