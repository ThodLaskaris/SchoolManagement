import Course from "../models/course.js";

export const createCourse = async (req, res) => {
    try {
        const {name, description} = req.body;
        const course = await Course.create({
            name,
            description,
        });
        return res.status(201).json(course);
    } catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getAllCourses = async (req,res) => {
    try {
        const courses = await Course.findAll();
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getCourseById = async (req,res) => {
    const {id} = req.params;
    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateCourse = async (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        course.name = name || course_name;
        course.description = description || course_description;

        await course.save();
        return res.status(200).json(course);

    }catch(error) {
        return res.status(500).json({
            message: error.message
        });
    } 
};

export const deleteCourse = async (req,res) => {
    const {id} = req.params;
    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        await course.destroy();
        return res.status(200).json({
            message:"Course has been deleted"
        });
    }catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};