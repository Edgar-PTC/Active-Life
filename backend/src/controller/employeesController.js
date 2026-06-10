import employeesModel from "../models/employeesModel.js";

const employeesController = {};

// Obtener todos
employeesController.getEmployees =
  async (req, res) => {
    try {
      const employees =
        await employeesModel.find();

      return res
        .status(200)
        .json(employees);
    } catch (error) {
      console.log("Error: " + error);

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };

// Eliminar empleado
employeesController.deleteEmployee =
  async (req, res) => {
    try {
      const deletedEmployee =
        await employeesModel.findByIdAndDelete(
          req.params.id
        );

      if (!deletedEmployee) {
        return res.status(404).json({
          message:
            "Empleado no encontrado",
        });
      }

      return res.status(200).json({
        message:
          "Empleado eliminado",
      });
    } catch (error) {
      console.log("Error: " + error);

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };

// Actualizar empleado
employeesController.updateEmployee =
  async (req, res) => {
    try {
      let {
        name,
        email,
        phone,
        position,
        status,
      } = req.body;

      name = name?.trim();
      email = email?.trim();
      phone = phone?.trim();

      const employeeFound =
        await employeesModel.findById(
          req.params.id
        );

      if (!employeeFound) {
        return res.status(404).json({
          message:
            "Empleado no encontrado",
        });
      }

      employeeFound.name =
        name ?? employeeFound.name;

      employeeFound.email =
        email ?? employeeFound.email;

      employeeFound.phone =
        phone ?? employeeFound.phone;

      employeeFound.position =
        position ??
        employeeFound.position;

      employeeFound.status =
        status ??
        employeeFound.status;

      await employeeFound.save();

      return res.status(200).json({
        message:
          "Empleado actualizado",
      });
    } catch (error) {
      console.log("Error: " + error);

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  };

export default employeesController;