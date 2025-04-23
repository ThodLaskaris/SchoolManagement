import Grade from "../models/grades.js";
import Student from "../models/student.js";
import Course from "../models/course.js";

// Δημιουργία βαθμού
export const createGrade = async (req, res) => {
  try {
    const { student_id, course_id, grade_value, grade_date } = req.body;
    const newGrade = await Grade.create({
      student_id,
      course_id,
      grade_value,
      grade_date,
    });
    return res.status(201).json(newGrade);
  } catch (error) {
    console.error("Error creating grade:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ανάκτηση όλων των βαθμών
export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll({
      include: [
        {
          model: Student,
          attributes: ["first_name", "last_name"],
          as: "student",
        },
        {
          model: Course,
          attributes: ["course_name"],
          as: "course",
        },
      ],
    });
    return res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ανάκτηση βαθμού με βάση το ID
export const getGradeById = async (req, res) => {
  const { id } = req.params;
  try {
    const grade = await Grade.findByPk(id, {
      include: [
        {
          model: Student,
          attributes: ["first_name", "last_name"],
          as: "student",
        },
        {
          model: Course,
          attributes: ["course_name"],
          as: "course",
        },
      ],
    });
    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    return res.status(200).json(grade);
  } catch (error) {
    console.error("Error fetching grade by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ενημέρωση βαθμού
export const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { grade_value, grade_date } = req.body;
  try {
    const grade = await Grade.findByPk(id, {
      include: [
        {
          model: Student,
          attributes: ["first_name", "last_name"],
          as: "student",
        },
        {
          model: Course,
          attributes: ["course_name"],
          as: "course",
        },
      ],
    });

    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }

    // Ενημέρωση των πεδίων του βαθμού
    grade.grade_value = grade_value || grade.grade_value;
    grade.grade_date = grade_date || grade.grade_date;

    await grade.save();

    // Επιστροφή του ενημερωμένου βαθμού
    const updatedGrade = await Grade.findByPk(id, {
      include: [
        {
          model: Student,
          attributes: ["first_name", "last_name"],
          as: "student",
        },
        {
          model: Course,
          attributes: ["course_name"],
          as: "course",
        },
      ],
    });

    return res.status(200).json(updatedGrade);
  } catch (error) {
    console.error("Error updating grade:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Διαγραφή βαθμού
export const deleteGrade = async (req, res) => {
  const { id } = req.params;
  try {
    const grade = await Grade.findByPk(id);
    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    await grade.destroy();
    return res.status(200).json({ message: "Grade has been deleted" });
  } catch (error) {
    console.error("Error deleting grade:", error);
    return res.status(500).json({ message: error.message });
  }
};