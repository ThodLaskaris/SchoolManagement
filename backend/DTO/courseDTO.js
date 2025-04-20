export const courseDTO = (course) => {
    return {
      course_id: course.course_id,
      course_name: course.course_name,
      course_description: course.course_description,
      teacher: course.teacher
        ? {
            first_name: course.teacher.first_name,
            last_name: course.teacher.last_name,
          }
        : null,
    };
  };
  
  export const courseListDTO = (courses) => {
    return courses.map((course) => courseDTO(course));
  };