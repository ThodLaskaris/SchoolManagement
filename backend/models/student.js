// models/student.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Grade from './grades.js';
import Course from './course.js';

// Ορισμός του μοντέλου Student
const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
  },
  phone: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  class: {
    type: DataTypes.TEXT,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'students',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

// Συσχέτιση με Grade (one-to-many)
Student.hasMany(Grade, {
  foreignKey: "student_id",
  as: "grades",
});

// Συσχέτιση με Course (many-to-many)
Student.belongsToMany(Course, {
  through: 'StudentCourses', // Όνομα του πίνακα συσχέτισης
  foreignKey: 'student_id',
  otherKey: 'course_id',
  as: 'courses',
});

export default Student;
