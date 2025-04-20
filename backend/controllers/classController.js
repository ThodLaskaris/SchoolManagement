import Class from "../models/class.js";
import Course from "../models/course.js";
import Teacher from "../models/teacher.js";

// Δημιουργία τάξης
export const createClass = async (req, res) => {
  try {
    const { class_name, course_id, teacher_id, class_type, schedule } = req.body;
    const newClass = await Class.create({
      class_name,
      course_id,
      teacher_id,
      class_type,
      schedule,
    });
    return res.status(201).json(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ανάκτηση όλων των τάξεων
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [
        {
          model: Course,
          attributes: ["course_name"],
          as: "course",
        },
        {
          model: Teacher,
          attributes: ["first_name", "last_name"],
          as: "teacher",
        },
      ],
    });
    return res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ανάκτηση τάξης με βάση το ID
export const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classData = await Class.findByPk(id, {
      include: [
        {
          model: Course,
          attributes: ["course_name"],
          as: "course",
        },
        {
          model: Teacher,
          attributes: ["first_name", "last_name"],
          as: "teacher",
        },
      ],
    });
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    return res.status(200).json(classData);
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Ενημέρωση τάξης
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { class_name, course_id, teacher_id, class_type, schedule } = req.body;
  try {
    const classData = await Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    classData.class_name = class_name || classData.class_name;
    classData.course_id = course_id || classData.course_id;
    classData.teacher_id = teacher_id || classData.teacher_id;
    classData.class_type = class_type || classData.class_type;
    classData.schedule = schedule || classData.schedule;

    await classData.save();
    return res.status(200).json(classData);
  } catch (error) {
    console.error("Error updating class:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Διαγραφή τάξης
export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classData = await Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    await classData.destroy();
    return res.status(200).json({ message: "Class has been deleted" });
  } catch (error) {
    console.error("Error deleting class:", error);
    return res.status(500).json({ message: error.message });
  }
};