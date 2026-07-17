/**
Name,
description, 
address,
city,
Images [
image,
image_id
] 
*/

import {Schema, model} from "mongoose";

const gymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    address: {
        type: String,
    },
    city: {
        type: String
    },
    municipio: {
        type: String
    },
    images: [
        {
            image:{
                type: String
            },
            public_id: {
                type: String
            }
        }
    ]
}, {
    timestamps: true,
    new: false
})

export default model("gyms", gymSchema, "gyms")