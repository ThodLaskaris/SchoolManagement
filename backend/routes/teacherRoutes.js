import express from "express";
import {
    createTecher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", getAllTeachers);
router.post("/", createTecher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;