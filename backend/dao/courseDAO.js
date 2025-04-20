import Course from "../models/course.js";
import Teacher from "../models/teacher.js";

export const getAllCourses = async () => {
  return await Course.findAll({
    include: [
      {
        model: Teacher,
        attributes: ["first_name", "last_name"],
        as: "teacher",
      },
    ],
    attributes: ["course_id", "course_name", "course_description", "teacher_id"],
  });
};

export const getCourseById = async (id) => {
  return await Course.findByPk(id, {
    include: [
      {
        model: Teacher,
        attributes: ["first_name", "last_name"],
        as: "teacher",
      },
    ],
  });
};

export const createCourse = async (data) => {
  return await Course.create(data);
};

export const updateCourse = async (id, data) => {
  const course = await Course.findByPk(id);
  if (!course) {
    return null;
  }
  return await course.update(data);
};

export const deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) {
    return null;
  }
  await course.destroy();
  return course;
};