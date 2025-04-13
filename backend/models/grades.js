import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Grade = sequelize.define("Grade", {
  grade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grade: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
}, {
  timestamps: true, // Ενεργοποιεί τα timestamps
});
// Σχέσει
// ς
export default Grade;