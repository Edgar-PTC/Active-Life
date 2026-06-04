import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import adminsModel from "../models/adminsModel.js";
import { config } from "../../config.js";

const loginAdminController = {};

loginAdminController.login = async (
  req,
  res
) => {
  try {
    // 1. Obtener datos
    const { email, password } =
      req.body;

    // 2. Buscar admin
    const userFound =
      await adminsModel.findOne({
        email,
      });

    if (!userFound) {
      return res.status(404).json({
        message:
          "Email no encontrado",
      });
    }

    // 3. Verificar si cuenta está bloqueada
    if (
      userFound.timeOut &&
      userFound.timeOut >
        Date.now()
    ) {
      const time =
        userFound.timeOut -
        Date.now();

      return res.status(403).json({
        message:
          "Cuenta bloqueada",
        time,
      });
    }

    // 4. Comparar contraseña
    const isMatch =
      await bcrypt.compare(
        password,
        userFound.password
      );

    if (!isMatch) {
      userFound.loginAttempts =
        (userFound.loginAttempts ||
          0) + 1;

      // Bloquear después de 5 intentos
      if (
        userFound.loginAttempts >=
        5
      ) {
        userFound.timeOut =
          Date.now() +
          15 * 60 * 1000;

        userFound.loginAttempts = 0;

        await userFound.save();

        return res.status(403).json({
          message:
            "Cuenta bloqueada",
          time:
            15 * 60 * 1000,
        });
      }

      await userFound.save();

      return res.status(403).json({
        message:
          "Contraseña incorrecta",
      });
    }

    // 5. Verificar correo
    if (
      !userFound
        .emailVerification
    ) {
      return res.status(403).json({
        message:
          "Verifica tu correo primero",
      });
    }

    // 6. Reiniciar intentos
    userFound.loginAttempts = 0;
    userFound.timeOut = null;

    await userFound.save();

    // 7. Crear token
    const token =
      jsonwebtoken.sign(
        {
          id: userFound._id,
          userType: "admin",
        },
        config.jwt.secret,
        {
          expiresIn: "30d",
        }
      );

    // 8. Guardar cookie
    res.cookie(
      "authCookieAdmin",
      token
    );

    return res.status(200).json({
      message:
        "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.log(
      "Error: " + error
    );

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};

export default loginAdminController;