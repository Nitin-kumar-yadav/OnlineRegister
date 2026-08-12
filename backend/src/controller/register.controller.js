import { Register } from "../model/register.model.js";
import { Data } from "../model/data.model.js";
import mongoose from "mongoose";

export const createRegister = async (req, res) => {
    try {
        const { registerName } = req.body;
        if (!registerName) {
            return res.status(400).json({ message: "Register name is required" });
        }
        const register = await Register.create({ registerName });
        return res.status(201).json({ message: "Register created successfully", register });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "Register name already exists" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getRegisters = async (req, res) => {
    try {
        const registers = await Register.find();
        return res.status(200).json(registers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const setFields = async (req, res) => {
    try {
        const { registerId } = req.params;
        const { fields } = req.body;

        if (!mongoose.Types.ObjectId.isValid(registerId)) {
            return res.status(400).json({ message: "Invalid register ID" });
        }

        if (!fields || !Array.isArray(fields) || fields.length === 0) {
            return res.status(400).json({ message: "Fields array is required" });
        }

        const register = await Register.findById(registerId);
        if (!register) {
            return res.status(404).json({ message: "Register not found" });
        }
        if (register.fields && register.fields.length > 0) {
            return res.status(400).json({ message: "Fields are already set. Headers can only be set once." });
        }

        register.fields = fields;
        await register.save();

        return res.status(200).json({ message: "Fields set successfully", register });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFields = async (req, res) => {
    try {
        const { registerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(registerId)) {
            return res.status(400).json({ message: "Invalid register ID" });
        }

        const register = await Register.findById(registerId).select("fields registerName");
        if (!register) {
            return res.status(404).json({ message: "Register not found" });
        }

        return res.status(200).json(register);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Helper to reliably extract the client IP
const getClientIp = (req) => {
    // x-forwarded-for can contain a comma-separated list: "client, proxy1, proxy2"
    const forwarded = req.headers["x-forwarded-for"];
    let ip;

    if (forwarded) {
        ip = forwarded.split(",")[0].trim();
    } else {
        ip = req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || "unknown";
    }

    // Normalize IPv6-mapped IPv4 addresses (e.g. "::ffff:127.0.0.1" -> "127.0.0.1")
    if (ip && ip.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", "");
    }

    // Normalize IPv6 loopback
    if (ip === "::1") {
        ip = "127.0.0.1";
    }

    return ip;
};

export const addEntry = async (req, res) => {
    try {
        const { registerId } = req.params;
        const { data } = req.body;

        if (!mongoose.Types.ObjectId.isValid(registerId)) {
            return res.status(400).json({ message: "Invalid register ID" });
        }

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "Data is required" });
        }

        const register = await Register.findById(registerId);
        if (!register) {
            return res.status(404).json({ message: "Register not found" });
        }

        if (!register.fields || register.fields.length === 0) {
            return res.status(400).json({ message: "Set fields/headers first before adding data" });
        }

        const fieldNames = register.fields.map(f => f.name);
        const dataKeys = Object.keys(data);
        const invalidKeys = dataKeys.filter(key => !fieldNames.includes(key));

        if (invalidKeys.length > 0) {
            return res.status(400).json({
                message: `Invalid fields: ${invalidKeys.join(", ")}. Allowed fields: ${fieldNames.join(", ")}`
            });
        }

        const systemIP = getClientIp(req);

        const newEntry = await Data.create({ registerId, data, systemIP });
        return res.status(201).json({ message: "Entry added successfully", data: newEntry });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getEntries = async (req, res) => {
    try {
        const { registerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(registerId)) {
            return res.status(400).json({ message: "Invalid register ID" });
        }

        const entries = await Data.find({ registerId }).sort({ createdAt: -1 });
        return res.status(200).json(entries);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid entry ID" });
        }

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "Data is required" });
        }

        const existingEntry = await Data.findById(id);
        if (!existingEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        // Validate data keys against register headers
        const register = await Register.findById(existingEntry.registerId);
        if (register && register.fields && register.fields.length > 0) {
            const fieldNames = register.fields.map(f => f.name);
            const invalidKeys = Object.keys(data).filter(key => !fieldNames.includes(key));
            if (invalidKeys.length > 0) {
                return res.status(400).json({
                    message: `Invalid fields: ${invalidKeys.join(", ")}. Allowed fields: ${fieldNames.join(", ")}`
                });
            }
        }

        existingEntry.data = data;
        existingEntry.markModified("data");
        await existingEntry.save();

        return res.status(200).json({ message: "Entry updated successfully", data: existingEntry });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid entry ID" });
        }

        const deletedEntry = await Data.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        return res.status(200).json({ message: "Entry deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};