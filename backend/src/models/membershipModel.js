import mongoose, {Schema, model} from "mongoose";
import gymModel from "./gymModel.js";

const membershipSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    gymId: {
        type: mongoose.Types.ObjectId,
        ref: gymModel
    },
    description: {
        type: String
    },
    paymentPeriod: {
        type: String
    }
}, {
    timestamps: true,
    new: true
})

export default model("memberShips", membershipSchema, "memberShips");