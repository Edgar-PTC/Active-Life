/*
    name
    price
    stock
    category
    image
    description
    supplierId
*/

import { Schema, model } from "mongoose";
//import suppliersModel from "./suppliersModel.js"

const productSchema = new Schema({
    name:{
        type: String
    },
    price:{
        type: Number
    },
    stock:{
        type: Number
    },
    category:{
        type: String
    },
    image:{
        type: String
    },
    image_id: {
        type: String
    },
    description:{
        type: String
    },
    /*supplierId:{
        type: String
    }*/
},{
    timestamps: true,
    new: false
});

export default model("products", productSchema, "products")