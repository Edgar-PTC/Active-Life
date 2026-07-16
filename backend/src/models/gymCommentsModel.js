import mongoose, {Schema, model} from "mongoose";
import gymModel from "./gymModel.js";
import clientModel from "./clientsModel.js";

const gymCommentsSchema = new Schema ({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: clientModel,
    },
    starRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comments: {
        type: String,
        required: true
    },
    gymId: {
        type: mongoose.Types.ObjectId,
        ref: gymModel
    }
},{
    timestamps: true,
    new: true
})

export default model ("gymRating", gymCommentsSchema, "gymRating");

