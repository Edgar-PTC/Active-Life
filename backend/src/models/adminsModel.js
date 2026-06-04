import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
    },

    // Verificación de correo
    emailVerification: {
      type: Boolean,
      default: false,
    },

    // Estado activo/inactivo
    status: {
      type: Boolean,
      default: true,
    },

    // Intentos fallidos
    loginAttempts: {
      type: Number,
      default: 0,
    },

    // Tiempo de bloqueo
    timeOut: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model(
  "Admins",
  adminSchema,
  "admins"
);