// controllers/studentController.js
import Student from "../models/student.js";
import Grades from "../models/grades.js";
// Δημιουργία νέου μαθητή
// export const createStudent = async (req, res) => {
//   try {
//     const { first_name, last_name, email, phone, date_of_birth, class_id } = req.body;
//     const student = await Student.create({
//       first_name,
//       last_name,
//       email,
//       phone,
//      class: class_id,
//       date_of_birth,
//     });
//     return res.status(201).json(student);
//   } catch (error) {
//     console.log("Error creating", error);
    
//     return res.status(500).json({ message: error.message });
//   }
// };
export const createStudent = async (req, res) => {
  const { first_name, last_name, email, phone, class_id, date_of_birth } = req.body;

  try {
      // Ελέγξτε ότι δεν υπάρχουν κενά πεδία
      if (!first_name || !last_name || !email || !phone || !class_id || !date_of_birth) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      // Δημιουργία νέου μαθητή χωρίς να καθορίσεις το student_id
      const newStudent = await Student.create({
          first_name,
          last_name,
          email,
          phone,
          class_id,
          date_of_birth,
      });

      return res.status(201).json(newStudent);
  } catch (err) {
      console.error("Error adding student:", err);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGenderStats = async (req, res) => {
  try {
      // Εκτέλεση του raw SQL query
      const genderStats = await Student.sequelize.query(
          `SELECT gender, COUNT(gender) AS count
          FROM students
          GROUP BY gender;`, 
          { type: Student.sequelize.QueryTypes.SELECT }
      );

      // Επιστροφή των δεδομένων στον client
      res.json(genderStats);
  } catch (error) {
      console.error("Error fetching gender stats:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

// Λήψη όλων των μαθητών
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Grades,
          as: "grades",
          attributes: ["grade"], // μπορείς να βάλεις κι άλλα αν θες
        },
      ],
    });
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Λήψη μαθητή με συγκεκριμένο ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Ενημέρωση μαθητή
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, student_id, date_of_birth } = req.body;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.first_name = first_name || student.first_name;
    student.last_name = last_name || student.last_name;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.student_id = student_id || student.student_id;
    student.date_of_birth = date_of_birth || student.date_of_birth;

    await student.save();
    return res.status(200).json(student);
  } catch (error) {
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
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
