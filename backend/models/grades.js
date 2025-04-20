// import { DataTypes } from "sequelize";
// import sequelize from "../config/database.js";

// const Grade = sequelize.define(
//   "Grade",
//   {
//     grade_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     student_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     class_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     course_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     grade: {
//       type: DataTypes.NUMERIC,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "grade", // Ορισμός του ονόματος του πίνακα
//     timestamps: true, // Ενεργοποιεί τα timestamps
//   }
// );

// export default Grade;
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Grade = sequelize.define(
  "Grade",
  {
    grade_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grade_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "grades",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Grade;