import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Class = sequelize.define('Class', {
  class_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  class_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  class_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'classes',
  createdAt: 'created_at',
  updatedAt: false,
});

export default Class;