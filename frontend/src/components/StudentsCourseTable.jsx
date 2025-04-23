import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentsCourseTable = ({ students, setStudents, searchTerm = "" }) => {
    const [editingGrade, setEditingGrade] = useState(null); // Track the grade being edited
    const [newGradeValue, setNewGradeValue] = useState(""); // Track the new grade value

    const handleEditClick = (studentId, gradeIndex, currentGrade) => {
        setEditingGrade({ studentId, gradeIndex });
        setNewGradeValue(currentGrade); // Set the current grade as the default value
    };

    const handleSaveClick = async (studentId, gradeIndex) => {
        try {
            // Update the grade in the backend
            const updatedStudents = [...students];
            const student = updatedStudents.find((s) => s.student_id === studentId);
            student.studentGrades[gradeIndex].grade_value = newGradeValue;

            // Send the updated grade to the backend
            await axios.put(`http://localhost:3000/api/grades/${studentId}`, {
                gradeIndex,
                grade_value: newGradeValue,
            });

            // Update the state
            setStudents(updatedStudents);
            setEditingGrade(null); // Exit editing mode
            toast.success("Grade updated successfully!");
        } catch (error) {
            console.error("Error updating grade:", error);
            toast.error("Failed to update grade. Please try again.");
        }
    };

    const handleBlur = (studentId, gradeIndex) => {
        setEditingGrade(null); // Exit editing mode
        handleSaveClick(studentId, gradeIndex);
    };

    const calculateAverage = (grades) => {
        if (!grades || grades.length === 0) return "N/A"; // If no grades, return "N/A"
        const total = grades.reduce((sum, grade) => sum + parseFloat(grade.grade_value || 0), 0);
        return (total / grades.length).toFixed(2); // Return average with 2 decimal places
    };

    // Φιλτράρισμα των μαθητών με βάση το searchTerm
    const filteredStudents = students.filter((student) =>
        `${student.first_name} ${student.last_name} ${student.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl overflow-x-auto">
    
            <motion.table
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-w-full table-auto"
            >
                <thead>
                    <tr className="text-center border-b text-gray-600">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3">Course</th>
                        <th className="px-4 py-3">Grades</th>
                        <th className="px-4 py-3">Average</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student, studentIndex) => (
                        <tr
                            key={student.student_id}
                            className="text-center border-b hover:bg-gray-50"
                        >
                            <td className="px-4 py-3">{studentIndex + 1}</td>
                            <td className="px-4 py-3 font-medium">
                                {student.first_name} {student.last_name}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                {student.studentGrades?.length > 0 ? (
                                    <div>
                                        {student.studentGrades.map((grade, gradeIndex) => (
                                            <div key={gradeIndex}>
                                                <span className="font-medium">Course:</span>{" "}
                                                {grade.course?.course_name || "Unknown"}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-gray-500">No courses available</span>
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                                {student.studentGrades?.length > 0 ? (
                                    <div>
                                        {student.studentGrades.map((grade, gradeIndex) => (
                                            <div key={gradeIndex}>
                                                {editingGrade &&
                                                editingGrade.studentId === student.student_id &&
                                                editingGrade.gradeIndex === gradeIndex ? (
                                                    <input
                                                        type="number"
                                                        value={newGradeValue}
                                                        onChange={(e) => setNewGradeValue(e.target.value)}
                                                        onBlur={() =>
                                                            handleBlur(student.student_id, gradeIndex)
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                handleSaveClick(student.student_id, gradeIndex);
                                                            }
                                                        }}
                                                        className="border border-gray-300 rounded px-2 py-1"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span
                                                        onClick={() =>
                                                            handleEditClick(
                                                                student.student_id,
                                                                gradeIndex,
                                                                grade.grade_value
                                                            )
                                                        }
                                                        className="cursor-pointer hover:underline"
                                                    >
                                                        {grade.grade_value || "N/A"}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-gray-500">No grades available</span>
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm font-bold text-gray-700">
                                {calculateAverage(student.studentGrades)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </motion.table>
        </div>
    );
};

export default StudentsCourseTable;