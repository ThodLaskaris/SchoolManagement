import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddStudentForm from "./AddStudentForm";

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [placeholderText, setPlaceholderText] = useState("Search by name or ID");
    const [sortOrder, setSortOrder] = useState("asc");
    const [editingStudent, setEditingStudent] = useState(null);
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [editedStudentData, setEditedStudentData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        grade: "",
        date_of_birth: "",
        phone: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/students")
            .then((res) => {
                const studentsWithCourses = res.data.map(student => ({
                    ...student,
                    courses: student.courses?.map(c => ({
                        id: c.course_id,
                        name: c.name,
                        description: c.description,
                    })) || []
                }));

                setTimeout(() => {
                    setStudents(studentsWithCourses);
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.error("Error loading students", err);
                setLoading(false);
                toast.error("Failed to load students!");
            });
    }, []);

    const toggleExpand = (id) => {
        setExpanded((prev) => (prev === id ? null : id));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMouseEnter = () => {
        setPlaceholderText("Search...");
    };

    const handleMouseLeave = () => {
        setPlaceholderText("Search by name or ID");
    };

    const handleSort = () => {
        const sortedStudents = [...students];
        sortedStudents.sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

            return sortOrder === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
        setStudents(sortedStudents);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const filteredStudents = students.filter((student) =>
        `${student.firstName} ${student.lastName} ${student.id} ${student.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const calculateAverage = (grades) => {
        if (!grades || grades.length === 0) return "-";
        const sum = grades.reduce((total, grade) => total + parseFloat(grade.grade_value), 0);
        return (sum / grades.length).toFixed(2);
    };

    const handleEditClick = (student) => {
        setEditingStudent(student);
        setEditedStudentData({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            grades: student.grades,
            date_of_birth: student.date_of_birth,
            phone: student.phone || "",
        });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:3000/api/students/${editingStudent.id}`, editedStudentData);
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.student_id === editingStudent.student_id
                        ? { ...student, ...editedStudentData }
                        : student
                )
            );
            setEditingStudent(null);
            toast.success("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            toast.error("Error saving changes.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-it mb-6"
            >
                Students
            </motion.h1>

            <div className="mb-4 flex justify-between items-center">
                <button
                    onClick={() => setShowAddStudentForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
                >
                    + Add Student
                </button>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder={placeholderText}
                    className="p-2 border border-gray-300 rounded-lg w-49"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xl overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <ClipLoader color="#3B82F6" loading={loading} size={50} />
                    </div>
                ) : (
                    <motion.table
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="min-w-full table-auto"
                    >
                        <thead>
                            <tr className="text-center border-b text-gray-600">
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3 cursor-pointer" onClick={handleSort}>
                                    Full Name {sortOrder === "asc" ? "↑" : "↓"}
                                </th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Average Grades</th>
                                <th className="px-4 py-3">Class</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => {
                                const isOpen = expanded === student.student_id;

                                return (
                                    <React.Fragment key={student.student_id}>
                                        <motion.tr
                                            whileHover={{ scale: 1.01 }}
                                            className="border-b hover:bg-gray-50 cursor-pointer"
                                            onClick={() => toggleExpand(student.student_id)}
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 font-medium">
                                                {student.first_name} {student.last_name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{student.email || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{calculateAverage(student.studentGrades)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{student.class?.class_name || "-"}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    className="text-blue-500"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditClick(student);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </motion.tr>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.tr
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="bg-blue-50"
                                                >
                                                    <td colSpan="6" className="px-6 py-4 text-left text-gray-700">
                                                        <motion.div layout className="space-y-1">
                                                            <div><strong>Phone:</strong> {student.phone || "—"}</div>
                                                            <div><strong>Date of Birth:</strong> {student.date_of_birth?.slice(0, 10) || "—"}</div>
                                                            <div><strong>Gender:</strong> {student.gender}</div>
                                                            <div><strong>Student ID:</strong> {student.student_id}</div>
                                                            <div>
                                                                <strong>Grades:</strong>{" "}
                                                                {student.grades?.length > 0 ? (
                                                                    <div className="space-y-1 text-left text-sm">
                                                                        {student.grades.map((grade, index) => (
                                                                            <div key={index}>Grade {index + 1}: {grade.grade_value}(Course ID: {grade.course_id})</div>
                                                                        ))}
                                                                        <div className="font-semibold text-blue-600">
                                                                            Avg: {calculateAverage(student.grades)}
                                                                        </div>
                                                                    </div>
                                                                ) : "-"}
                                                            </div>
                                                        </motion.div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </motion.table>
                )}
            </div>

            <AnimatePresence>
                {showAddStudentForm && (
                    <>
                        {/* Background Gray */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" />

                        {/* Modal */}
                        <motion.div
                            key="add-student-modal"
                            className="fixed inset-0 flex justify-center items-center z-50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                scale: { type: "spring", stiffness: 500, damping: 60 },
                                opacity: { duration: 0.3 },
                            }}
                        >
                            <AddStudentForm
                                setShowAddStudentForm={setShowAddStudentForm}
                                setStudents={setStudents}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {editingStudent && (
                    <motion.div
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>

                            <div className="mb-1">
                                <input
                                    type="text"
                                    name="first_name"
                                    value={editedStudentData.first_name}
                                    readOnly
                                    onChange={handleChange}
                                    className="w-4/5 p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="mb-2">
                                <input
                                    type="text"
                                    name="last_name"
                                    value={editedStudentData.last_name}
                                    readOnly
                                    onChange={handleChange}
                                    className="w-4/5 p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="mb-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={editedStudentData.email}
                                    onChange={handleChange}
                                    className="w-4/5 p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="mb-1">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedStudentData.phone}
                                    onChange={handleChange}
                                    className="w-4/5 p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="flex justify-center space-x-4 mt-6">
                                <button
                                    onClick={() => setEditingStudent(null)}
                                    className="px-4 py-1 bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentsTable;