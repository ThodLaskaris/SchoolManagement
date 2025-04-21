import Teacher from "../models/teacher.js";

export const TeacherDAO = {
  async findAll() {
    return await Teacher.findAll({
      attributes: ["teacher_id", "first_name", "last_name", "email", "phone","created_at"],
    });
  },

  async findById(id) {
    return await Teacher.findByPk(id, {
      attributes: ["teacher_id", "first_name", "last_name", "email", "phone", "created_at"],
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