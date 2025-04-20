import Course from "../models/course.js";
import Teacher from "../models/teacher.js"; // Εισαγωγή του Teacher για συσχετίσεις

// Δημιουργία μαθήματος
export const createCourse = async (req, res) => {
    try {
        const { course_name, course_description, teacher_id } = req.body;

        // Δημιουργία του μαθήματος
        const course = await Course.create({
            course_name,
            course_description,
            teacher_id,
        });

        // Εύρεση του μαθήματος μαζί με τον δάσκαλο
        const courseWithTeacher = await Course.findByPk(course.course_id, {
            include: [
                {
                    model: Teacher,
                    attributes: ["first_name", "last_name"],
                    as: "teacher",
                },
            ],
        });

        return res.status(201).json(courseWithTeacher);
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Ανάκτηση όλων των μαθημάτων
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [
                {
                    model: Teacher,
                    attributes: ["first_name", "last_name"],
                    as: "teacher",
                },
            ],
            attributes: ["course_id", "course_name", "course_description", "teacher_id"],
        });
        return res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Ανάκτηση μαθήματος με βάση το ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByPk(id, {
            include: [
                {
                    model: Teacher,
                    attributes: ["first_name", "last_name"],
                    as: "teacher",
                },
            ],
        });
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course by ID:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Ενημέρωση μαθήματος
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { course_name, course_description, teacher_id } = req.body;
    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        // Ενημέρωσε τα πεδία του μαθήματος
        course.course_name = course_name || course.course_name;
        course.course_description = course_description || course.course_description;
        course.teacher_id = teacher_id || course.teacher_id;

        await course.save();

        // Βρες το ενημερωμένο μάθημα μαζί με τον καθηγητή
        const updatedCourse = await Course.findByPk(id, {
            include: [
                {
                    model: Teacher,
                    attributes: ["first_name", "last_name"],
                    as: "teacher",
                },
            ],
        });

        return res.status(200).json(updatedCourse);
    } catch (error) {
        console.error("Error updating course:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Διαγραφή μαθήματος
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }
        await course.destroy();
        return res.status(200).json({
            message: "Course has been deleted",
        });
    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};