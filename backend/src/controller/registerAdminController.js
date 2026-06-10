import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import adminsModel from "../models/adminsModel.js";
import registerEmail from "../utils/registerEmail.js";
import { config } from "../../config.js";

const registerAdminController = {};

registerAdminController.insertAdmin = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    // Validar campos
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Campos incompletos",
      });
    }

    // Validar nombre
    if (name.length < 3) {
      return res.status(400).json({
        message: "Nombre demasiado corto",
      });
    }

    // Verificar si ya existe
    const existAdmin = await adminsModel.findOne({ email });

    if (existAdmin) {
      return res.status(400).json({
        message: "Email ya registrado",
      });
    }

    // Validar contraseña
    if (password.length < 5) {
      return res.status(400).json({
        message: "Contraseña inválida",
      });
    }

    // Encriptar password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear admin
    const newAdmin = new adminsModel({
      name,
      email,
      password: passwordHash,
      emailVerification: false,
      status: true,
    });

    await newAdmin.save();

    // Generar código
    const verificationCode = crypto
      .randomBytes(3)
      .toString("hex");

    // Token
    const tokenCode = jsonwebtoken.sign(
      {
        email,
        verificationCode,
        userType: "admin",
      },
      config.jwt.secret,
      {
        expiresIn: "15m",
      }
    );

    // Guardar cookie
    res.cookie(
      "verificationTokenCookieAdmin",
      tokenCode,
      {
        maxAge: 15 * 60 * 1000,
      }
    );

    // Configurar correo
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.email.user_email,
          pass: config.email.user_password,
        },
      });

    // Opciones del correo
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: `Código de verificación: ${verificationCode}`,
      html: registerEmail(
        verificationCode,
        email
      ),
    };

    // Enviar correo
    transporter.sendMail(
      mailOptions,
      (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message:
              "Error al enviar correo",
          });
        }

        return res.status(200).json({
          message:
            "Admin registrado correctamente",
        });
      }
    );
  } catch (error) {
    console.log("Error: " + error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

registerAdminController.verifyCode =
  async (req, res) => {
    try {
      const {
        verificationCodeRequest,
      } = req.body;

      const token =
        req.cookies
          .verificationTokenCookieAdmin;

      const decoded =
        jsonwebtoken.verify(
          token,
          config.jwt.secret
        );

      const {
        email,
        verificationCode:
          storedCode,
      } = decoded;

      if (
        verificationCodeRequest !==
        storedCode
      ) {
        return res.status(400).json({
          message:
            "Código incorrecto",
        });
      }

      const admin =
        await adminsModel.findOne({
          email,
        });

      admin.emailVerification =
        true;

      await admin.save();

      res.clearCookie(
        "verificationTokenCookieAdmin"
      );

      return res.status(200).json({
        message:
          "Correo verificado correctamente",
      });
    } catch (error) {
      console.log("Error: " + error);

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };

export default registerAdminController;