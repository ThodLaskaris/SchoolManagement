// models/course.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Teacher from './teacher.js';


const Course = sequelize.define('Course', {
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Αύξηση του ID αυτόματα
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Δεν επιτρέπεται να είναι κενό
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, // Μπορεί να είναι κενό
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Teacher,
            key: "teacher_id"
        }
    },
}, {
    timestamps: false, // Δεν χρησιμοποιούνται createdAt/updatedAt
    tableName: 'courses', // Το όνομα του πίνακα
});

export default Course;
