import mongoose, { Schema,model} from "mongoose";
import clients from "../models/clientsModel.js";

const shoppingCartSchema = new Schema({ isla
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: clients
    },
    products [
        {
        
        }
    ],
});