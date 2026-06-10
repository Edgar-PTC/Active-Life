import bcrypt from "bcryptjs";
import employeesModel from "../models/employeesModel.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (
  req,
  res
) => {
  try {
    let {
      name,
      email,
      password,
      phone,
      position,
    } = req.body;

    // limpiar espacios
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    phone = phone?.trim();

    // validar campos
    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "Campos incompletos",
      });
    }

    // validar nombre
    if (name.length < 3) {
      return res.status(400).json({
        message: "Nombre muy corto",
      });
    }

    // validar contraseña
    if (password.length < 5) {
      return res.status(400).json({
        message: "Contraseña muy corta",
      });
    }

    // verificar email repetido
    const existEmployee =
      await employeesModel.findOne({
        email,
      });

    if (existEmployee) {
      return res.status(400).json({
        message:
          "Este correo ya existe",
      });
    }

    // encriptar password
    const passwordHash =
      await bcrypt.hash(password, 10);

    // crear employee
    const newEmployee =
      new employeesModel({
        name,
        email,
        password: passwordHash,
        phone,
        position,
        status: true,
      });

    await newEmployee.save();

    return res.status(200).json({
      message:
        "Empleado registrado correctamente",
    });
  } catch (error) {
    console.log("Error: " + error);

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};

export default registerEmployeesController;