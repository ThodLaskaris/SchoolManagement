export const studentDTO = (student) => ({
  id: student.student_id,
  name: `${student.first_name} ${student.last_name}`,
  email: student.email,
  class: student.class ? student.class.class_name : "No class assigned",
});

export const studentsListDTO = (students) => students.map(studentDTO);