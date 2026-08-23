import express from "express";
import {
    createRegister,
    getRegisters,
    setFields,
    getFields,
    addEntry,
    getEntries,
    updateEntry,
    deleteEntry,
    deleteRegister
} from "../controller/register.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

// Register routes
router.post("/create", createRegister);
router.get("/", getRegisters);
router.delete("/:registerId", deleteRegister);


router.post("/:registerId/fields", setFields);
router.get("/:registerId/fields", getFields);

router.post("/:registerId/entries", addEntry);
router.get("/:registerId/entries", getEntries);
router.put("/entries/:id", updateEntry);
router.delete("/entries/:id", deleteEntry);


export default router;
