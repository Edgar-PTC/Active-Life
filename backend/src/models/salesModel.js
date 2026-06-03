import mongoose, { Schema, model } from "mongoose";

const saleSchema = new Schema({
    shoppingCartId: {
        type: mongoose.Types.ObjectId,
        ref: 
    }
});