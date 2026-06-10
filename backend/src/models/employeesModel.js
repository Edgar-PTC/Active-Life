import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
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

    phone: {
      type: String,
    },

    position: {
      type: String,
      default: "employee",
    },

    status: {
      type: Boolean,
      default: true,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

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
  "Employees",
  employeeSchema,
  "employees"
);