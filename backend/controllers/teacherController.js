import Teacher from "../models/teacher.js";
import { teacherDTO, teachersListDTO } from "../DTO/teachersDTO.js";
import Course from "../models/course.js"; // Εισαγωγή του μοντέλου Course
import Class from "../models/class.js";
import { TeacherDAO } from "../dao/teacherDAO.js";

// Δημιουργία νέου δασκάλου
// export const createTecher = async (req, res) => {
//     try {
//         const { first_name, last_name, email, phone, course_id } = req.body;
//         const teacher = await Teacher.create({
//             first_name,
//             last_name,
//             email,
//             phone,
//         });
//         return res.status(201).json(teacher);
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//         });
//     }
// };

export const createTecher = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, course_id } = req.body;

        // Δημιουργία του δασκάλου
        const teacher = await Teacher.create({
            first_name,
            last_name,
            email,
            phone,
        });

        // Αν έχει δοθεί ένα μάθημα, σύνδεσέ το με τον δάσκαλο
        if (course_id) {
            await teacher.addTeacherCourses([course_id]); // Χρησιμοποιούμε τη μέθοδο του Sequelize
        }

        // Επιστροφή του δασκάλου μαζί με το μάθημα
        const teacherWithCourse = await Teacher.findByPk(teacher.teacher_id, {
            include: [
                {
                    model: Course,
                    as: "teacherCourses",
                    attributes: ["course_id", "course_name", "course_description"],
                },
            ],
        });

        return res.status(201).json(teacherWithCourse);
    } catch (error) {
        console.error("Error creating teacher:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};
// Ανάκτηση όλων των δασκάλων
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            attributes: ["teacher_id", "first_name", "last_name", "email", "phone", "created_at"],
            include: [
                {
                    model: Class,
                    as: "teacherClasses",
                    attributes: ["class_name", "schedule"],
                },
                {
                    model: Course,
                    as: "teacherCourses", // Χρησιμοποιούμε το σωστό alias
                    attributes: ["course_id", "course_name", "course_description"],
                },
            ],
        });
        const teacherData = teachersListDTO(teachers);
        return res.status(200).json(teacherData);
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Ανάκτηση δασκάλου από το ID
export const getTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findByPk(id, {
            attributes: ["teacher_id", "first_name", "last_name", "email", "phone", "created_at"],
            include: [
                {
                    model: Course,
                    as: "teacherCourses", // Χρησιμοποιούμε το σωστό alias
                    attributes: ["course_id", "course_name", "course_description"],
                },
            ],
        });
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        const teacherData = teacherDTO(teacher);
        return res.status(200).json(teacherData);
    } catch (error) {
        console.error("Error fetching teacher:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Ενημέρωση δασκάλου
export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, course_id } = req.body;

    try {
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }

        // Ενημέρωση των πεδίων του δασκάλου
        
        teacher.email = email || teacher.email;
        teacher.phone = phone || teacher.phone;
        teacher.course_id = course_id || teacher.course_id;
        await teacher.save();

        // Αν έχει δοθεί ένα μάθημα, πρόσθεσέ το στον δάσκαλο
        if (course_id) {
            await teacher.addTeacherCourses([course_id]); // Προσθέτει το νέο μάθημα χωρίς να αφαιρεί τα υπάρχοντα
        }

        // Επιστροφή του δασκάλου μαζί με τα μαθήματα
        const updatedTeacher = await Teacher.findByPk(id, {
            include: [
                {
                    model: Course,
                    as: "teacherCourses",
                    attributes: ["course_id", "course_name", "course_description"],
                },
            ],
        });

        return res.status(200).json(teacherDTO(updatedTeacher));
    } catch (error) {
        console.error("Error updating teacher:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Διαγραφή δασκάλου
export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
        await teacher.destroy();
        return res.status(200).json({
            message: "Teacher has been deleted.",
        });
    } catch (error) {
        console.error("Error deleting teacher:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};