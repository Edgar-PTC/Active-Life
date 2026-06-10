/*
    customerId
    products:{
        productId,
        quantity,
        subtotal
    }
    total
    status
*/

import mongoose, { model, Schema } from "mongoose";
import Customer from "./clientsModel.js";
import Product from "./productsModel.js";

const  cartSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer,
    },
    products:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
            },
            quantity: {
                type: Number
            },
            subtotal: {
                type: Number
            }
        }
    ],
    total: {
        type: Number,
    },
    status: {
        type: String,
    }
},{
    timestamps: true,
    new: true
});

export default model("Cart", cartSchema)