import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Ορισμός του Teacher χωρίς να χρησιμοποιήσεις το Course ακόμα
const Teacher = sequelize.define('Teacher', {
  teacher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'teachers',
});

// Χρησιμοποίηση του sequelize.models για να αποφύγεις κυκλικές εξαρτήσεις
Teacher.belongsToMany(sequelize.models.Course, {
  through: "TeacherCourses", // Το όνομα του πίνακα συσχέτισης
  foreignKey: "teacher_id",
  otherKey: "course_id",
  as: "courses",  
});

export default Teacher;
