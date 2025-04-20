import Class from "../models/class.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";

export const ClassDAO = {
  async findAll() {
    return await Class.findAll({
      include: [
        {
          model: Teacher,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Student,
          as: "students",
          attributes: ["student_id"],
        },
      ],
    });
  },

  async findById(id) {
    return await Class.findOne({
      where: { class_id: id },
      include: [
        {
          model: Teacher,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Student,
          as: "students",
          attributes: ["student_id"],
        },
      ],
    });
  },

  async create(classData) {
    return await Class.create(classData);
  },

  async update(id, classData) {
    const classToUpdate = await Class.findByPk(id);
    if (!classToUpdate) return null;

    return await classToUpdate.update(classData);
  },

  async delete(id) {
    const classToDelete = await Class.findByPk(id);
    if (!classToDelete) return null;

    await classToDelete.destroy();
    return classToDelete;
  },
};