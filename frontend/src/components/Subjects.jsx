import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CoursesTable = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [editingCourse, setEditingCourse] = useState(null);
    const [editedCourseData, setEditedCourseData] = useState({
        name: "",
        description: "",
        teacher_id: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/courses")
            .then((res) => {
                setTimeout(() => {
                    setCourses(res.data);
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.error("Error loading courses", err);
                setLoading(false);
                toast.error("Failed to load courses!");
            });
    }, []);

    const toggleExpand = (id) => {
        setExpanded((prev) => (prev === id ? null : id));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = () => {
        const sortedCourses = [...courses];
        sortedCourses.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            return sortOrder === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
        setCourses(sortedCourses);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (course) => {
        setEditingCourse(course);
        setEditedCourseData({
            name: course.name,
            description: course.description,
            teacher_id: course.teacher_id,
        });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:3000/api/courses/${editingCourse.course_id}`, editedCourseData);
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course.course_id === editingCourse.course_id
                        ? { ...course, ...editedCourseData }
                        : course
                )
            );
            setEditingCourse(null);
            toast.success("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            toast.error("Error saving changes.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />

            <h1 className="text-3xl font-it mb-6">Courses</h1>

            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by course name..."
                    className="p-2 border border-gray-300 rounded-lg"
                />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xl overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <ClipLoader color="#3B82F6" loading={loading} size={50} />
                    </div>
                ) : (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="text-center border-b text-gray-600">
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3 cursor-pointer" onClick={handleSort}>
                                    Course Name {sortOrder === "asc" ? "↑" : "↓"}
                                </th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Teacher ID</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCourses.map((course, index) => {
                                const isOpen = expanded === course.course_id;

                                return (
                                    <React.Fragment key={course.course_id}>
                                        <tr
                                            className="border-b hover:bg-gray-50 cursor-pointer"
                                            onClick={() => toggleExpand(course.course_id)}
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 font-medium">{course.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{course.description || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{course.teacher_id || "-"}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    className="text-blue-500"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditClick(course);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                        {isOpen && (
                                            <tr className="bg-blue-50">
                                                <td colSpan="5" className="px-6 py-4 text-sm text-gray-700">
                                                    <div className="space-y-1">
                                                        <div><strong>Teacher ID:</strong> {course.teacher_id || "—"}</div>
                                                        <div><strong>Course ID:</strong> {course.course_id}</div>
                                                        <div><strong>Teacher Details:</strong>{course.teacher_first_name}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Edit Form */}
            {editingCourse && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Course Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editedCourseData.name}
                                onChange={handleChange}
                                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                value={editedCourseData.description}
                                onChange={handleChange}
                                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Teacher ID</label>
                            <input
                                type="text"
                                name="teacher_id"
                                value={editedCourseData.teacher_id}
                                onChange={handleChange}
                                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="flex justify-center space-x-4 mt-6">
                            <button
                                onClick={() => setEditingCourse(null)}
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesTable;
