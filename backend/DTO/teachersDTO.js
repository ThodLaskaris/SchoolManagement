export const teacherDTO = teacher => {
    return {
        id: teacher.teacher_id,
        firstName: teacher.first_name,
        lastName: teacher.last_name,
        email: teacher.email,
        phone: teacher.phone,
        classId: teacher.class_id,
        createdAt: teacher.created_at,
        courses: teacher.courses?.map(c => ({
            id: c.course_id,
            name: c.name,
            description: c.description,
        })) || [],
    };
};
export const teachersListDTO = (teachers) => {
    return teachers.map((teacher) => teacherDTO(teacher))
};
