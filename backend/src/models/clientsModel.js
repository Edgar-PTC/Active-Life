/*
    name,
    birthDate,
    email,
    password,
    emailVerification,
    status,
    loginAttemps,
    timeOut
*/

import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    name: { type: String },
    birthDate: { type: Date },
    email: { type: String },
    password: { type: String },
    emailVerification: { type: Boolean },
    status: { type: Boolean },
    loginAttemps: { type: Number },
    timeOut: { type: Date }
}, {
    timestamps: true,
    strict: false
});

export default model("Clients", clientSchema, "clients");