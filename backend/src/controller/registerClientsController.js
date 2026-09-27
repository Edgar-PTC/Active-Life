import crypto from "crypto"//
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"

import clientsModel from "../models/clientsModel.js";
import registerEmail from "../utils/registerEmail.js";
import sendEmail from "../utils/sendEmail.js";

import { config, cookieOptions } from "../../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const registerClientController = {};

registerClientController.insertClients = async (req, res) => {
    try {
        let {name, birthDate, email, password} = req.body;

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if(!name || !email || !password){
            return res.status(400).json({message: "Campos incompletos"})
        }

        if(!birthDate || isNaN(new Date(birthDate)) || new Date(birthDate) >= Date.now()){
            return res.status(400).json({message: "Fecha invalida"})
        }

        if(name.length < 3){
            return res.status(400).json({message: "name too short"})
        }

        //Validar si ya hay registro con este correo
        const existClient = await clientsModel.findOne({email})
        if(existClient){
            return res.status(400).json({message: "email already in use"})
        }

        if(password.length < 5){
            return res.status(400).json({message: "Password invalid"})
        }

        //encriptar contraseña
        const passwordHash = await bcrypts.hash(password, 10);

        const newClient = clientsModel({name, birthDate, email, password: passwordHash, emailVerification: false, status: true});
        await newClient.save()

        //generar codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //guardamos este codigo en un token
        const tokenCode = jsonwebtoken.sign(
            //#1 que vamos a guardar?
            {email, verificationCode},
            //#2 secret key
            config.jwt.secret,
            //#3 cuando expira?
            {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {...cookieOptions, maxAge: 15 * 60 * 1000})

        //Enviar el correo con Mailjet
        try {
            await sendEmail({
                to: email,
                subject: `Paso final! Codigo de verificacion: ${verificationCode}`,
                html: registerEmail(verificationCode, email)
            });
        } catch (error) {
            console.log(error);
            //Si el correo no salio, borramos el cliente para que pueda volver a registrarse
            await clientsModel.deleteOne({_id: newClient._id});
            return res.status(500).json({message: "error al enviar el correo"});
        }

        return res.status(200).json({message: "email sent"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

registerClientController.verifyCode = async (req, res) => {
    try {
        //1- solicitamos el codigo
        const {verificationCodeRequest} = req.body;
        
        //2- obtenemos codigo en cookie
        const token = req.cookies.verificationTokenCookie
        if(!token){
            return res.status(400).json({message: "Codigo expirado, solicita uno nuevo"})
        }

        //3- extraer token
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, verificationCode: storedCode } = decoded;

        //4- comparar
        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const client = await clientsModel.findOne({email});
        client.emailVerification = true;
        await client.save();

        res.clearCookie("verificationTokenCookie", cookieOptions)

        return res.status(200).json({message: "Email verified successfully"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default registerClientController;