import adminsModel from "../models/adminsModel.js";

const adminsController = {};

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
      } = req.body;

      name = name?.trim();
      email = email?.trim();

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