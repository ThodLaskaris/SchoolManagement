export const classCoursesDTO = (classCourse) => {
    return {
        classId: classCourse.class_id,
        courseId: classCourse.course_id,
        className: classCourse.class_name,
        courseName: classCourse.course_name,
    };
};

export const classCoursesListDTO = (classCoursesList) => {
    return classCoursesList.map(classCourse => classCoursesDTO(classCourse));
};
