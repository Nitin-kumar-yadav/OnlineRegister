import express from "express"
import { userLogin, userLogout, userRegister } from "../controller/user.controller.js";


const router = express.Router();

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router
