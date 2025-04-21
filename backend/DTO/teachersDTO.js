export const teacherDTO = (teacher) => ({
  id: teacher.teacher_id,
  // name: `${teacher.first_name} ${teacher.last_name}`,
  first_name: teacher.first_name,
  last_name: teacher.last_name,
  email: teacher.email,
  phone: teacher.phone,
  hired_date: teacher.created_at,
});

export const teachersListDTO = (teachers) => teachers.map(teacherDTO);