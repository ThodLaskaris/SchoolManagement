export const studentDTO = student => {
    return {
        id: student.student_id,
        firstName: student.first_name,
        lastName: student.last_name,
        email: student.email,
        phone: student.phone,
        dateOfBirth: student.date_of_birth,
        classId: student.class,
        gender: student.gender,
        createdAt: student.created_at,
        grades: student.grades?.map(g => ({
            id: g.grade_id,
            value: g.grade,
        })) || [],
        courses: student.courses?.map(c => ({
            id: c.course_id,
            name: c.name,
            description: c.description,
        })) || [],
    };
};

export const studentsListDTO = (students) => {
    return students.map((student) => studentDTO(student));
};
