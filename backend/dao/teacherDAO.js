import Teacher from "../models/teacher.js";

export const TeacherDAO = {
  async findAll() {
    return await Teacher.findAll({
      attributes: ["teacher_id", "first_name", "last_name", "email", "phone","created_at"],
      include: [
        {
          model: Model,
          as: "teacherCourses",
          attributes: ["course_id", "course_name", "course_description"],
        },
      ],
    });
  },

  async findById(id) {
    return await Teacher.findByPk(id, {
      attributes: ["teacher_id", "first_name", "last_name", "email", "phone", "created_at"],
      include: [
        {
          model: Model,
          as: "teacherCourses",
          attributes: ["course_id", "course_name", "course_description"],
        },
      ],
    });
  },

  async create(teacherData) {
    return await Teacher.create(teacherData);
  },

  async update(id, teacherData) {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return null;

    return await teacher.update(teacherData);
  },

  async delete(id) {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return null;

    await teacher.destroy();
    return teacher;
  },
};