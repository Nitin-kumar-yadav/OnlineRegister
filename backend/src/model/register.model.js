import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    registerName: {
        type: String,
        require: [true, "Register Name is required"],
        unique: true
    },
    fields: [{
        name: { type: String, required: true },
        type: { type: String, enum: ["String", "Number", "Date", "Boolean"], default: "String" }
    }]
}, { timestamps: true })

export const Register = mongoose.model("Register", registerSchema)