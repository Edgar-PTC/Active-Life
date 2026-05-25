import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URI); 

const conecction = mongoose.connection;

conecction.once("open", () => {
    console.log("La conexion a la base esta bien");
});

conecction.on("disconnected", () => {
    console.error("La conexion a la base de datos se ha perdido");
});

conecction.on("error", (err) => {
    console.log("Error en la conexion a la base de datos: " + err);
});