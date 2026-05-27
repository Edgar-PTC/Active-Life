import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import clientsModel from "../models/clientsModel.js";

import { config } from "../../config.js";

const logInClientsController = {}

logInClientsController.login = async(req, res) => {
    try {
        //#1 solicitar los datos
        const {email, password} = req.body;

        //#2 Ese correo existe?
        const userFound = await clientsModel.findOne({email});
        if(!userFound){
            return res.status(404).json({message: "Email not found"});
        }

        //#2.5 verificar si la cuenta esta bloqueada
        if(userFound.timeOut && userFound.timeOut > Date.now()){
            const time = userFound.timeOut - Date.now();
            return res.status(403).json({message: "Cuenta bloqueada", time: time})
        }

        //#3 Verificar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch){
            //si se equivoco
            //Sumamos un intento fallido
            userFound.loginAttemps = (userFound.loginAttemps || 0) + 1

            //Bloquear la cuenta despues de 5 intentos fallidos
            if(userFound.loginAttemps >= 5){
                userFound.timeOut = Date.now() + 15 * 60  * 1000
                userFound.loginAttemps = 0;

                await userFound.save();
                return res.status(403).json({message: "Cuenta bloqueada", time: 15 * 60  * 1000})
            }

            await userFound.save();

            return res.status(403).json({message: "Contraseña incorrecta"})
        }

        //Si escribio bien la contraseña
        userFound.loginAttemps = 0;
        userFound.timeOut = null;
        await userFound.save();

        const token = jsonwebtoken.sign(
            {id: userFound._id, userType: "client"},
            config.jwt.secret,
            {expiresIn: "30d"}
        )

        //Guardamos el token en una cookie
        res.cookie("authCookieClient", token);
        
        return res.status(200).json({message: "Inicio de sesion exitoso"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default logInClientsController;