import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized No token" });
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodeToken.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized No user" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export { protectRoute }