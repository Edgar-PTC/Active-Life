/*
    name,
    price,
    discount,
    stock,
    category,
    image,
    image_id,
    description,
    supplierId
*/

import { Schema, model } from "mongoose";
//import suppliersModel from "./suppliersModel.js"

const productSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    discount: { type: Number },
    stock: { type: Number },
    category: { type: String },
    image: { type: String },
    image_id: { type: String },
    description: { type: String },
    /*supplierId:{ type: String }*/
}, {
    timestamps: true,
    strict: false
});

export default model("Products", productSchema, "Products");