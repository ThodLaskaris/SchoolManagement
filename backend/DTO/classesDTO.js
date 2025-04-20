export const classDTO = (classItem) => ({
  id: classItem.class_id,
  name: classItem.class_name,
  teacher: classItem.Teacher
    ? `${classItem.Teacher.first_name} ${classItem.Teacher.last_name}`
    : "No teacher assigned",
  studentCount: classItem.students ? classItem.students.length : 0,
});

export const classesListDTO = (classes) => classes.map(classDTO);