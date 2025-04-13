import express from "express";

import {
    getClasses,
    createClass,
    getClassById,
    updateClass,
    deleteClass,
} from "../controllers/classController.js"

const router = express.Router();

// Routes for classes.

router.get("/classes", getClasses);
router.post("/classes", createClass);
router.get("/classes/:id", getClassById);
router.put("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);

export default router; 