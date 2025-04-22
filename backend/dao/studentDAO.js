import Student from "../models/student.js";
import Grade from "../models/grades.js";
import Course from "../models/course.js";

export const StudentDAO = {
  // Ανάκτηση όλων των μαθητών με τις συσχετίσεις τους
  async findAll() {
    try {
      const students = await Student.findAll({
        include: [
          {
            model: Grade,
            as: "studentGrades", // Alias για τη συσχέτιση με το Grade
            attributes: ["grade_value", "course_id", "grade_date"], // Επιστροφή πεδίων από το Grade
            include: [
              {
                model: Course,
                as: "course", // Alias για τη συσχέτιση με το Course
                attributes: ["course_name"], // Επιστροφή του course_name
              },
            ],
          },
          {
            model: Course,
            as: "courses", // Alias για τη συσχέτιση με το Course
            attributes: ["name", "description"], // Επιστροφή συγκεκριμένων πεδίων
          },
        ],
      });
      console.log("Students:", students);
      return students;
    } catch (error) {
      console.error("Error in findAll:", error);
      throw error;
    }
  },

  // Ανάκτηση μαθητή με βάση το ID
  async findById(id) {
    try {
      const student = await Student.findByPk(id, {
        include: [
          {
            model: Grade,
            as: "studentGrades", // Alias για τη συσχέτιση με το Grade
            attributes: ["grade_value", "course_id", "grade_date"], // Επιστροφή πεδίων από το Grade
            include: [
              {
                model: Course,
                as: "course", // Alias για τη συσχέτιση με το Course
                attributes: ["course_name"], // Επιστροφή του course_name
              },
            ],
          },
          {
            model: Course,
            as: "courses", // Alias για τη συσχέτιση με το Course
            attributes: ["name", "description"], // Επιστροφή συγκεκριμένων πεδίων
          },
        ],
      });
      return student;
    } catch (error) {
      console.error("Error in findById:", error);
      throw error;
    }
  },

  // Δημιουργία νέου μαθητή
  async create(studentData) {
    try {
      return await Student.create(studentData);
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  },

  // Ενημέρωση μαθητή με βάση το ID
  async update(id, studentData) {
    try {
      const student = await Student.findByPk(id);
      if (!student) return null;

      return await student.update(studentData);
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  },

  // Διαγραφή μαθητή με βάση το ID
  async delete(id) {
    try {
      const student = await Student.findByPk(id);
      if (!student) return null;

      await student.destroy();
      return student;
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  },
};