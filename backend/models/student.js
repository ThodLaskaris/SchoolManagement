import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Εισαγωγή της σύνδεσης με τη βάση
import Grade from './grades.js';

// Ορισμός του μοντέλου Student
const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Αν το student_id είναι αυτόματο
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY, // Για τύπο DATE στην PostgreSQL
  },
  phone: {
    type: DataTypes.STRING, // Για τύπο character varying στην PostgreSQL
  },
  first_name: {
    type: DataTypes.TEXT, // Για τύπο text στην PostgreSQL
  },
  last_name: {
    type: DataTypes.TEXT, // Για τύπο text στην PostgreSQL
  },
  email: {
    type: DataTypes.TEXT, // Για τύπο text στην PostgreSQL
  },
  class: {
    type: DataTypes.TEXT, // Για τύπο text στην PostgreSQL
  },
}, {
  tableName: 'students', // Δηλώνουμε ότι ο πίνακας είναι ήδη δημιουργημένος
  timestamps: true, // Προσθήκη createdAt και updatedAt
  createdAt: 'created_at', // Χρησιμοποιούμε το πεδίο created_at αντί για createdAt
  updatedAt: false, // Δεν χρησιμοποιούμε το πεδίο updated_at
});

Student.hasMany(Grade, {
  foreignKey: "student_id",
  as: "grades",
});

export default Student;
