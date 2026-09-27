import crypto from "crypto"//
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"
import recoveryPasswordEmail from "../utils/recoveryPasswordEmail.js"
import sendEmail from "../utils/sendEmail.js"

import { config, cookieOptions } from "../../config.js";

import adminsModel from "../models/adminsModel.js";

const recoveryPasswordAdminController = {}

recoveryPasswordAdminController.requestCode = async (req, res) => {
    try {
        const { email } = req.body;

        //Validamos que el correo existe
        const userFound = await adminsModel.findOne({email});
        if(!userFound){
            return res.status(404).json({message: "user not found"})
        }

        //Generar el numero aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //Guardamos en un token
        const token = jsonwebtoken.sign(
            //Que se guarda
            {email, randomCode, userType: "admin", verified: false},

            //Llave secreta
            config.jwt.secret,

            //Cuando expira
            {expiresIn: "15m"}
        );

        res.cookie("recoveryCookie", token, {...cookieOptions, maxAge: 15 * 60 * 1000});

        //Enviar por correo con Mailjet (el codigo vence en 15 minutos)
        try {
            await sendEmail({
                to: email,
                subject: `${randomCode}. Codigo de recuperación de contraseña`,
                html: recoveryPasswordEmail(randomCode, email)
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "error al enviar el correo"});
        }

        return res.status(200).json({message: "email sent"})

    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

recoveryPasswordAdminController.verifyCode = async (req, res) => {
    try {
        //1- solicitamos el codigo
        const { code } = req.body;
        
        //2- obtenemos codigo en cookie
        const token = req.cookies.recoveryCookie
        if(!token){
            return res.status(400).json({message: "Codigo expirado, solicita uno nuevo"})
        }

        //3- extraer token
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);

        //4- comparar
        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, userType: "admin", verified: true},
            config.jwt.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", newToken, {...cookieOptions, maxAge: 15 * 60 * 1000});

        return res.status(200).json({ message: "Code verified sucessfully" })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

recoveryPasswordAdminController.newPassword = async(req, res) => {
    try {
        //1. Solicito los datos
        const { newPassword, comfirmedPassword } = req.body;

        //Comparar
        if(newPassword !== comfirmedPassword){
            return res.status(400).json({message: "Passwords doesn't match"})
        }

        //vamos a comprobar que el token ya esta verificado
        const token = req.cookies.recoveryCookie;
        if(!token){
            return res.status(400).json({message: "Codigo expirado, solicita uno nuevo"})
        }
        const decoded = jsonwebtoken.verify(token, config.jwt.secret)

        if(!decoded.verified){
            return res.status(400).json({message: "code not verified"})
        }

        const passwordHash = await bcrypts.hash(newPassword, 10);

        //Encriptar la nueva contraseña
        await adminsModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true}
        )

        res.clearCookie("recoveryCookie", cookieOptions);

        return res.status(200).json({message: "Password updated"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default recoveryPasswordAdminController;