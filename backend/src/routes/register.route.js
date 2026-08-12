import express from "express";
import {
    createRegister,
    getRegisters,
    setFields,
    getFields,
    addEntry,
    getEntries,
    updateEntry,
    deleteEntry
} from "../controller/register.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

// Register routes
router.post("/", createRegister);
router.get("/", getRegisters);


router.post("/:registerId/fields", protectRoute, setFields);
router.get("/:registerId/fields", protectRoute, getFields);

router.post("/:registerId/entries", addEntry);
router.get("/:registerId/entries", getEntries);
router.put("/entries/:id", updateEntry);
router.delete("/entries/:id", protectRoute, deleteEntry);

export default router;
