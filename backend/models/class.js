import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Σύνδεση με τη βάση δεδομένων
import Teacher from './teacher.js'; // Εισαγωγή του μοντέλου Teacher
import Course from './course.js';

const Class = sequelize.define('Class', {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  class_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teacher_id: {  // Ονομάζουμε το πεδίο αυτό όπως είναι στον πίνακα classes
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Teacher,
      key: 'teacher_id'  // Αντιστοιχεί στο teacher_id στον πίνακα teachers
    }
  },
  class_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'classes',
  createdAt: 'created_at',
  updatedAt: false,
});

// Σχέση: Μια τάξη ανήκει σε έναν καθηγητή
Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Class.belongsTo(Course, { foreignKey: "course_id"});

export default Class;
