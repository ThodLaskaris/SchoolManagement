// controllers/gradeController.js
import Grade from "../models/grades.js";
import Student from "../models/student.js";

// Δημιουργία νέου βαθμού
export const createGrade = async (req, res) => {
  try {
    const { student_id, class_id, course_id, grade } = req.body;
    // Σιγουρευόμαστε ότι ο βαθμός είναι έγκυρος και εντός του επιτρεπόμενου εύρους
    if (grade < 0 || grade > 10) {
      return res.status(400).json({ message: "Grade must be between 0 and 10." });
    }
    const newGrade = await Grade.create({ student_id, class_id, course_id, grade });
    return res.status(201).json(newGrade);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Λήψη όλων των βαθμών
export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll({
      include: [
        {
          model: Student,
          as: "student", // αυτό πρέπει να ταιριάζει με το alias στο associate
        },
      ],
    });
    return res.status(200).json(grades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Λήψη βαθμών για έναν συγκεκριμένο φοιτητή
export const getGradesByStudentId = async (req, res) => {
  const { student_id } = req.params;
  try {
    const grades = await Grade.findAll({ where: { student_id } });
    if (!grades || grades.length === 0) {
      return res.status(404).json({ message: "No grades found for this student." });
    }
    return res.status(200).json(grades);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Ενημέρωση βαθμού
export const updateGrade = async (req, res) => {
  const { grade_id } = req.params;
  const { grade } = req.body;
  try {
    const gradeRecord = await Grade.findByPk(grade_id);
    if (!gradeRecord) {
      return res.status(404).json({ message: "Grade not found." });
    }
    
    // Έλεγχος για το εύρος του βαθμού πριν την αποθήκευση
    if (grade < 0 || grade > 10) {
      return res.status(400).json({ message: "Grade must be between 0 and 10." });
    }

    gradeRecord.grade = grade || gradeRecord.grade;
    await gradeRecord.save();
    return res.status(200).json(gradeRecord);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Διαγραφή βαθμού
export const deleteGrade = async (req, res) => {
  const { grade_id } = req.params;
  try {
    const gradeRecord = await Grade.findByPk(grade_id);
    if (!gradeRecord) {
      return res.status(404).json({ message: "Grade not found." });
    }
    await gradeRecord.destroy();
    return res.status(200).json({ message: "Grade deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
