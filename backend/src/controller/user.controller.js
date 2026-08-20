import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import { generateToken } from "../lib/utils.js";

export const userRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ username, password: hashPassword });
        generateToken(user._id, res);
        return res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            message: "User logged in successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const userLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}