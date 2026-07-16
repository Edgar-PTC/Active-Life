/*
  name,
  price,
  discount,
  stock,
  category,
  image,
  description,
  supplierId
*/

import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  position: { type: String },
  status: { type: Boolean },
  loginAttempts: { type: Number },
  timeOut: { type: Date }
}, {
  timestamps: true,
    strict: false
});

export default model("Employees", employeeSchema, "Employees");