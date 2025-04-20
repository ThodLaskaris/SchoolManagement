import Class from './class.js';
import Student from './student.js';
import Teacher from './teacher.js';
import Course from './course.js';
import defineRelationships from './relationships.js';

// Ορισμός των σχέσεων
defineRelationships();

// Έλεγχος των συσχετίσεων
console.log(Student.associations);
console.log(Course.associations);

export { sequelize, Teacher, Class, Course, Grade, Student };