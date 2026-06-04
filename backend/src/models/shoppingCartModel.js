/*
    clientId
    products:
        productId
        amount
        subtotal
    total
    discount
*/

import mongoose, { Schema, model } from "mongoose";
import clients from "../models/clientsModel.js";
import products from "../models/productsModel.js";

const shoppingCartSchema = new Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: clients
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: products
            },
            amount: { type: Number },
            subtotal: { type: Number }
        }
    ],
    total: { type: Number },
    discount: { type: Number }
},
    {
        timestamps: true,
        strict: false
    });

export default model("shoppingCartModel", shoppingCartSchema);