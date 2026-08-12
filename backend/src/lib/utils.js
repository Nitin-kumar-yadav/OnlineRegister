import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("token", token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 });
    return token;
}