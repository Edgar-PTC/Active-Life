/*
  name,
  email,
  password,
  emailVerification,
  status,
  loginAttempts,
  TimeOut
*/

import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },

  // Verificación de correo
  emailVerification: { type: Boolean },

  // Estado activo/inactivo
  status: { type: Boolean },

  // Intentos fallidos
  loginAttempts: { type: Number },

  // Tiempo de bloqueo
  timeOut: { type: Date }
}, {
  timestamps: true,
  strict: false
});

export default model("Admins", adminSchema, "Admins");