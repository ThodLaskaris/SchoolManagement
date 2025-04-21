import Teacher from "../models/teacher.js";
import { teacherDTO, teachersListDTO } from "../DTO/teachersDTO.js";
import Course from "../models/course.js"; // Εισαγωγή του μοντέλου Course
import Class from "../models/class.js";
import { TeacherDAO } from "../dao/teacherDAO.js";

// Δημιουργία νέου δασκάλου
export const createTecher = async (req, res) => {
    try {
        const { first_name, last_name, email, phone } = req.body;
        const teacher = await Teacher.create({
            first_name,
            last_name,
            email,
            phone,
        });
        return res.status(201).json(teacher);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Ανάκτηση όλων των δασκάλων
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await TeacherDAO.findAll({
            attributes: ["teacher_id", "first_name", "last_name", "email",],
            include: [
                {
                    model: Class,   // Βεβαιώσου ότι το Course είναι εισαγμένο σωστά
                    as: "teacherClasses",
                    attributes: ["class_name", "schedule"],
                },
            ],
        });
        const teacherData = teachersListDTO(teachers);
        return res.status(200).json(teacherData);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Ανάκτηση δασκάλου από το ID
export const getTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await TeacherDAO.findByPk(id, {
            include: [
                {
                    model: Course,   // Εδώ επίσης το μοντέλο Course πρέπει να είναι εισαγμένο
                    as: "courses",
                    attributes: ["name"],
                },
            ],
        });
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        const teacherData = teacherDTO(teacher);
        return res.status(200).json(teacherData);
    } catch (error) {
        return res.status(500).json({
            message: error.message
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
                message: "Teacher not found"
            });
        }
        teacher.first_name = first_name || teacher.first_name;
        teacher.last_name = last_name || teacher.last_name;
        teacher.email = email || teacher.email;
        teacher.phone = phone || teacher.phone;
        teacher.course_id = course_id || teacher.course_id;
        await teacher.save();
        return res.status(200).json(teacherDTO(teacher));
    } catch (error) {
        return res.status(500).json({
            message: error.message
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
                message: "Teacher not found"
            });
        }
        await teacher.destroy();
        return res.status(200).json({
            message: "Teacher has been deleted."
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
