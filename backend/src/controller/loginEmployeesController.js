import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import employeesModel from "../models/employeesModel.js";
import { config } from "../../config.js";

const loginEmployeesController = {};

loginEmployeesController.login = async (
  req,
  res
) => {
  try {
    // pedir datos
    const { email, password } = req.body;

    // buscar empleado
    const employeeFound =
      await employeesModel.findOne({
        email,
      });

    if (!employeeFound) {
      return res.status(404).json({
        message: "Email no encontrado",
      });
    }

    // verificar bloqueo
    if (
      employeeFound.timeOut &&
      employeeFound.timeOut > Date.now()
    ) {
      const time =
        employeeFound.timeOut - Date.now();

      return res.status(403).json({
        message: "Cuenta bloqueada",
        time,
      });
    }

    // comparar contraseña
    const isMatch =
      await bcrypt.compare(
        password,
        employeeFound.password
      );

    if (!isMatch) {
      // sumar intentos fallidos
      employeeFound.loginAttempts =
        (employeeFound.loginAttempts || 0) + 1;

      // bloquear a los 5 intentos
      if (
        employeeFound.loginAttempts >= 5
      ) {
        employeeFound.timeOut =
          Date.now() +
          15 * 60 * 1000;

        employeeFound.loginAttempts = 0;

        await employeeFound.save();

        return res.status(403).json({
          message: "Cuenta bloqueada",
          time: 15 * 60 * 1000,
        });
      }

      await employeeFound.save();

      return res.status(403).json({
        message:
          "Contraseña incorrecta",
      });
    }

    // login correcto
    employeeFound.loginAttempts = 0;
    employeeFound.timeOut = null;

    await employeeFound.save();

    // generar token
    const token =
      jsonwebtoken.sign(
        {
          id: employeeFound._id,
          userType: "employee",
        },
        config.jwt.secret,
        {
          expiresIn: "30d",
        }
      );

    // guardar cookie
    res.cookie(
      "authCookieEmployee",
      token,
      {
        httpOnly: true,
      }
    );

    return res.status(200).json({
      message:
        "Inicio de sesión exitoso",
      employee: {
        id: employeeFound._id,
        name: employeeFound.name,
        email: employeeFound.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error);

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};

export default loginEmployeesController;