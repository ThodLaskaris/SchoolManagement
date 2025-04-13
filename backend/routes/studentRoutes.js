import express from "express";
import Student from "../models/student.js";
import { Op } from "sequelize";

import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// Προσθήκη του νέου endpoint για τα στατιστικά των εγγραφών
router.get("/enrollments-stats", async (req, res) => {
    try {
        console.log("Fetching enrollment stats...");

        const currentYear = new Date().getFullYear();
        console.log(`Current Year: ${currentYear}`);

        const monthlyStats = [];

        for (let month = 1; month <= 12; month++) {
            try {
                // Ελέγχουμε τα δεδομένα κάθε μήνα για τυχόν σφάλματα
                console.log(`Fetching data for month: ${month}`);

                // Χρήση του Op για να κάνεις queries με σύγκριση ημερομηνιών
                const count = await Student.count({
                    where: {
                        created_at: {
                            [Op.gte]: new Date(currentYear, month - 1, 1), // Έναρξη του μήνα
                            [Op.lt]: new Date(currentYear, month, 1), // Τέλος του μήνα
                        },
                    },
                });

                console.log(`Count for month ${month}: ${count}`);

                monthlyStats.push(count);
            } catch (monthError) {
                console.error(`Error fetching data for month ${month}: `, monthError);
            }
        }

        res.json(monthlyStats);
    } catch (error) {
        console.error("Error fetching enrollment stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Προϋπάρχοντα routes για μαθητές
router.post("/students", createStudent);

router.get("/students", getAllStudents);

router.get("/students/:id", getStudentById);

router.put("/students/:id", updateStudent);

router.delete("/students/:id", deleteStudent);

export default router;
