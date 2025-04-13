import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Teacher = sequelize.define('Teacher', {
  teacher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {  // Στήλη first_name
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {  // Στήλη last_name
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
   type: DataTypes.STRING,
    alluwNull: false,
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

export default Teacher;
