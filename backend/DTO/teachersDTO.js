export const teacherDTO = (teacher) => ({
  id: teacher.teacher_id,
  name: `${teacher.first_name} ${teacher.last_name}`,
  email: teacher.email,
});

export const teachersListDTO = (teachers) => teachers.map(teacherDTO);