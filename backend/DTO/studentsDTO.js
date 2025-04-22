export const studentDTO = (student) => ({
  id: student.student_id,
  name: `${student.first_name} ${student.last_name}`,
  email: student.email,
  class: student.class ? student.class.class_name : "No class assigned",
  grades: student.studentGrades ? student.studentGrades.map((grade) => ({
    grade_value: grade.grade_value,
    course_name: grade.course?.course.course_name || "Unknown course",
    grade_date: grade.grade_date,
  })) : [],

});

export const studentsListDTO = (students) => students.map(studentDTO);