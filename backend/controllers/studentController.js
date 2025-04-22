import Student from "../models/student.js";
import Class from "../models/class.js";
import Grade from "../models/grades.js";
import Course from "../models/course.js";
import { Op } from "sequelize";

// Στατιστικά φύλου
export const getGenderStats = async (req, res) => {
  try {
    const maleCount = await Student.count({
      where: { gender: "Male" },
    });

    const femaleCount = await Student.count({
      where: { gender: "Female" },
    });

    const otherCount = await Student.count({
      where: { gender: "Other" },
    });

    res.json({
      Male: maleCount,
      Female: femaleCount,
      Other: otherCount,
    });
  } catch (error) {
    console.error("Error fetching gender stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Στατιστικά εγγραφών
export const getEnrollmentStats = async (req, res) => {
  try {
    console.log("Fetching enrollment stats...");

    const currentYear = new Date().getFullYear();
    console.log(`Current Year: ${currentYear}`);

    const monthlyStats = [];

    for (let month = 1; month <= 12; month++) {
      try {
        console.log(`Fetching data for month: ${month}`);

        const count = await Student.count({
          where: {
            created_at: {
              [Op.gte]: new Date(currentYear, month - 1, 1),
              [Op.lt]: new Date(currentYear, month, 1),
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
};

// Δημιουργία μαθητή
export const createStudent = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, date_of_birth, gender, class_id } = req.body;
    const newStudent = await Student.create({
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      gender,
      class_id,
    });
    return res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ανάκτηση όλων των μαθητών
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Class,
          attributes: ["class_name"],
          as: "class",
        },
        {
          model: Grade,
          attributes: ["grade_value", "course_id", "grade_date"],
          as: "studentGrades",
          include: [
            {
              model: Course,
              attributes: ["course_name"], // Συμπεριλάβετε το course_name
              as: "course",
            },
          ],
        },
      ],
    });
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ανάκτηση μαθητή με βάση το ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id, {
      include: [
        {
          model: Class,
          attributes: ["class_name"],
          as: "class",
        },
        {
          model: Grade,
          attributes: ["grade_value", "course_id", "grade_date"], // Προσαρμόστε τα πεδία που θέλετε
          as: "grades",
        },
      ],
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ενημέρωση μαθητή
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, date_of_birth, gender, class_id } = req.body;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student.first_name = first_name || student.first_name;
    student.last_name = last_name || student.last_name;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.date_of_birth = date_of_birth || student.date_of_birth;
    student.gender = gender || student.gender;
    student.class_id = class_id || student.class_id;

    await student.save();
    return res.status(200).json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Διαγραφή μαθητή
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    await student.destroy();
    return res.status(200).json({ message: "Student has been deleted" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: error.message });
  }
};