import Class from './class.js';
import Student from './student.js';
import Teacher from './teacher.js';
import Course from './course.js';
import Grade from './grades.js'; // Εισαγωγή του Grade

export default function defineRelationships() {
  // Συσχετίσεις για το Class
  Class.hasMany(Student, {
    foreignKey: 'class_id',
    as: 'students',
  });
  Class.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    as: 'teacher',
  });
  Class.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course',
  });

  // Συσχετίσεις για το Student
  Student.belongsTo(Class, {
    foreignKey: 'class_id',
    as: 'class',
  });

  // Συσχετίσεις για το Teacher
  Teacher.hasMany(Class, {
    foreignKey: 'teacher_id',
    as: 'teacherClasses', // Alias για τη συσχέτιση
  });

  Teacher.hasMany(Course, {
    foreignKey: 'teacher_id',
    as: 'teacherCourses', // Alias για τη συσχέτιση
  });

  // Συσχετίσεις για το Course
  Course.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    as: 'teacher', // Alias για τη συσχέτιση
  });

  Course.hasMany(Class, {
    foreignKey: 'course_id',
    as: 'classes',
  });

  // Συσχετίσεις για το Grade
  Student.hasMany(Grade, {
    foreignKey: 'student_id',
    as: 'studentGrades', // Alias που χρησιμοποιείται για τη συσχέτιση
  });

  Grade.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student', // Alias για τη συσχέτιση
  });
  Grade.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course',
  });
  // Συσχετίσεις πολλών-προς-πολλά (Student <-> Course)
  Student.belongsToMany(Course, {
    through: 'studentcourses', // Όνομα του πίνακα συσχέτισης
    foreignKey: 'student_id',
    otherKey: 'course_id',
    as: 'courses', // Alias για τη συσχέτιση
  });

  Course.belongsToMany(Student, {
    through: 'studentcourses',
    foreignKey: 'course_id',
    otherKey: 'student_id',
    as: 'students', // Alias για τη συσχέτιση
  });
}