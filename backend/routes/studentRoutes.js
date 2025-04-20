import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getEnrollmentStats,
  getGenderStats,
} from "../controllers/studentController.js";
import { createGrade } from "../controllers/gradeController.js";
const router = express.Router();

// Στατιστικά φύλου
router.get("/gender-stats", getGenderStats);

// Στατιστικά εγγραφών
router.get("/enrollments-stats", getEnrollmentStats);
router.post("/grades", createGrade);

// Προϋπάρχοντα routes για μαθητές
router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;