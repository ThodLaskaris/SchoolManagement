import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import studentRoutes from "./routes/studentRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import defineRelationships from "./models/relationships.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Κλήση της συνάρτησης για τον ορισμό των συσχετίσεων
defineRelationships();

// Middleware για JSON
app.use(express.json());
app.use(cors())

// Συγχρονισμός της βάσης δεδομένων


// Routes
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/enrollments-stats", studentRoutes);
app.use("/api/students/gender-stats", studentRoutes);

// Σύνδεση με τη βάση δεδομένων και εκκίνηση του server
(async () => {
  try {
    // Έλεγχος σύνδεσης με τη βάση δεδομένων
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Εκκίνηση του server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();