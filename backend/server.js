import express from "express";
import cors from "cors"; // Εισαγωγή του cors
import studentRoutes from "./routes/studentRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import sequelize from "./config/database.js";
import courseRoutes from "./routes/courseRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js"
import Student from "./models/student.js";
import Grade from "./models/grades.js";

const PORT = 3000;
Student.hasMany(Grade, {
  foreignKey: "student_id",
  as: "studentGrades",
});

Grade.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});


const app = express();

// Χρήση του CORS middleware
app.use(cors({
  origin: "http://localhost:5173"  // Επιτρέπει το frontend από localhost:5173
}));

app.use(express.json());
app.use("/api", studentRoutes);
app.use("/api", classRoutes);
app.use("/api", courseRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/grades", gradeRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established.");
  })
  .catch((error) => {
    console.log("Unable for connection", error);
  });

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
