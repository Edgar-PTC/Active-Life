import adminsModel from "../models/adminsModel.js";
import bcrypt from "bcryptjs";

const adminsController = {};

adminsController.getAdminById = async (req, res) => {
  try {
    const admin = await adminsModel.findById(req.params.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin no encontrado" });
    return res.status(200).json(admin);
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Obtener admins
adminsController.getAdmins =
  async (req, res) => {
    try {
      const admins =
        await adminsModel.find();

      return res
        .status(200)
        .json(admins);
    } catch (error) {
      console.log("Error: " + error);

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };

// Eliminar admin
adminsController.deleteAdmin =
  async (req, res) => {
    try {
      const deletedAdmin =
        await adminsModel.findByIdAndDelete(
          req.params.id
        );

      if (!deletedAdmin) {
        return res.status(404).json({
          message:
            "Admin no encontrado",
        });
      }

      return res.status(200).json({
        message:
          "Admin eliminado",
      });
    } catch (error) {
      console.log("Error: " + error);

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };

// Actualizar admin
adminsController.updateAdmin =
  async (req, res) => {
    try {
      let {
        name,
        email,
        role,
        status,
        password,
      } = req.body;

      name = name?.trim();
      email = email?.trim();

      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Correo inv\u00e1lido" });
      }

      if (password && password.length < 5) {
        return res.status(400).json({ message: "Contrase\u00f1a inv\u00e1lida" });
      }

      const adminFound =
        await adminsModel.findById(
          req.params.id
        );

      if (!adminFound) {
        return res.status(404).json({
          message:
            "Admin no encontrado",
        });
      }

      adminFound.name =
        name ?? adminFound.name;

      adminFound.email =
        email ?? adminFound.email;

      adminFound.role =
        role ?? adminFound.role;

      adminFound.status =
        status ??
        adminFound.status;

      if (password) adminFound.password = await bcrypt.hash(password, 10);

      await adminFound.save();

      return res.status(200).json({
        message:
          "Admin actualizado",
      });
    } catch (error) {
      console.log("Error: " + error);

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };

export default adminsController;
