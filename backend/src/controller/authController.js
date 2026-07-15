import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import clientsModel from "../models/clientsModel.js";
import adminsModel from "../models/adminsModel.js";

import { config } from "../../config.js"

const authController = {};

authController.client = async(req, res) => {
    try {
        const cookie = req.cookies.authCookieClient;
        if(!cookie){
            return res.status(404).json({ message: "Sin inicio de sesion" });
        }

        const decoded = jsonwebtoken.verify(cookie, config.jwt.secret);
        const { id } = decoded;

        const client = await clientsModel.findById(id);

        const json = {
            "Nombre": client.name,
            "Id": client.id
        }

        return res.status(200).json(json);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

authController.admin = async(req, res) => {
    try {
        const cookie = req.cookies.authCookieAdmin;
        if(!cookie){
            return res.status(404).json({ message: "Sin inicio de sesion" });
        }

        const decoded = jsonwebtoken.verify(cookie, config.jwt.secret);
        const { id } = decoded;

        const admin = await adminsModel.findById(id);

        const json = {
            "Nombre": admin.name,
            "Id": admin.id
        }

        return res.status(200).json(json);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default authController;