import Teacher from "../models/teacher.js";


export const createTecher = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, } = req.body;
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
    };
};

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        res.json(teachers);

    } catch (error) {
        console.error("Error fetching teachers...", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
export const getTeacherById = async (req,res) => {
    const {id} = req.params;
    try {
        const teacher = await Teacher.findByPk(id);
        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        return res.status(200).json(teacher);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        }); 
    }
};
export const updateTeacher = async (req,res) => {
    const {id} = req.params;
    const {first_name, last_name, email, phone, course_id} = req.body;
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
        return res.status(200).json(teacher);

    }catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export const deleteTeacher = async (req,res) => {
    const {id} = req.params;
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
    }catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};