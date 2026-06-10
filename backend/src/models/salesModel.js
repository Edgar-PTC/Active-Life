/*
    shoppingCartId
    deliveryAddress
    paymentMethod
    status
*/

import mongoose, { Schema, model } from "mongoose";
import shoppingCart from "../models/shoppingCartModel.js";

const saleSchema = new Schema({
    shoppingCartId: {
        type: mongoose.Types.ObjectId,
        ref: shoppingCart
    },
    deliveryAddress: { type: String },
    paymentMethod: { type: String },
    status: { type: String }
}, {
    timestamps: true,
    strict: false
});

export default model("salesModel", saleSchema);