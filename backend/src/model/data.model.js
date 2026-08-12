import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
    registerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
        required: true
    },
    data: {
        type: Object,
        default: {}
    },
    systemIP: {
        type: String,
        required: true,

    }
}, { timestamps: true })

export const Data = mongoose.model("Data", dataSchema)
