import Class from "../models/class.js";
import Teacher from "../models/teacher.js";

// GET - Ανάκτηση όλων των τάξεων με τα στοιχεία του καθηγητή
// GET - Ανάκτηση όλων των τάξεων με τα στοιχεία του καθηγητή
export const getClasses = async (req, res) => {
  try {
    // Επιστρέφουμε τις τάξεις μαζί με τα δεδομένα του καθηγητή
    const classes = await Class.findAll({
      include: [{
        model: Teacher,
        attributes: ['first_name', 'last_name'], // Φέρνουμε τα πρώτα και επώνυμα του καθηγητή
        required: false, // Δεν είναι υποχρεωτικό να υπάρχει καθηγητής
      }],
    });

    // Αντικαθιστούμε το teacher_id με το teacher_name (first_name και last_name)
    const updatedClasses = classes.map(classItem => {
      if (classItem.Teacher) {
        // Αν υπάρχει καθηγητής, επιστρέφουμε το όνομα
        classItem.teacher_name = `${classItem.Teacher.first_name} ${classItem.Teacher.last_name}`;
      } else {
        // Αν δεν υπάρχει καθηγητής, εμφανίζουμε "No teacher"
        classItem.teacher_name = "No teacher";
      }

      // Διαγράφουμε το πεδίο Teacher από το τελικό αποτέλεσμα για καθαρότητα
      delete classItem.Teacher;
      return classItem;
    });

    // Επιστρέφουμε την ενημερωμένη λίστα τάξεων
    res.json(updatedClasses);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};


// GET - Ανάκτηση τάξης με βάση το ID
export const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classFound = await Class.findOne({
      where: { class_id: id },
      include: [{
        model: Teacher,
        attributes: ["first_name", "last_name"],
      }],
    });

    if (!classFound) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json(classFound);
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};

// POST - Δημιουργία νέας τάξης
export const createClass = async (req, res) => {
  const { class_name, course_name, teacher_id, class_type, schedule } = req.body;
  
  try {
    const newClass = await Class.create({
      class_name,
      course_name,
      teacher_id,
      class_type,
      schedule,
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};

// PUT - Ενημέρωση μιας τάξης
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { class_name, course_name, teacher_id, class_type, schedule } = req.body;

  try {
    const classToUpdate = await Class.findOne({ where: { class_id: id } });

    if (!classToUpdate) {
      return res.status(404).json({ error: "Class not found" });
    }

    classToUpdate.class_name = class_name || classToUpdate.class_name;
    classToUpdate.course_name = course_name || classToUpdate.course_name;
    classToUpdate.teacher_id = teacher_id || classToUpdate.teacher_id;
    classToUpdate.class_type = class_type || classToUpdate.class_type;
    classToUpdate.schedule = schedule || classToUpdate.schedule;

    await classToUpdate.save();
    res.json(classToUpdate);
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};

// DELETE - Διαγραφή μιας τάξης
export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const classToDelete = await Class.findOne({ where: { class_id: id } });

    if (!classToDelete) {
      return res.status(404).json({ error: "Class not found" });
    }

    await classToDelete.destroy();
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};

export default {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
