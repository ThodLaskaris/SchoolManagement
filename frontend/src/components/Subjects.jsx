import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const nameA = a.course_name.toLowerCase();
      const nameB = b.course_name.toLowerCase();

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setCourses(sortedCourses);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setEditedCourseData({
      name: course.course_name,
      description: course.course_description,
      teacher_id: course.teacher_id,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/courses/${editingCourse.course_id}`,
        editedCourseData
      );
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

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Courses
      </motion.h1>

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
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-w-full table-auto"
          >
            <thead>
              <tr className="text-center border-b text-gray-600">
                <th className="px-4 py-3">#</th>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={handleSort}
                >
                  Course Name {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => {
                const isOpen = expanded === course.course_id;

                return (
                  <React.Fragment key={course.course_id}>
                    <motion.tr
                      whileHover={{ scale: 1.01 }}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpand(course.course_id)}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">
                        {course.course_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {course.course_description || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {course.teacher
                          ? `${course.teacher.first_name} ${course.teacher.last_name}`
                          : "N/A"}
                      </td>
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
                          <td
                            colSpan="5"
                            className="px-6 py-4 text-sm text-gray-700"
                          >
                            <motion.div layout className="space-y-1">
                              <div>
                                <strong>Course ID:</strong> {course.course_id}
                              </div>
                              <div>
                                <strong>Teacher:</strong>{" "}
                                {course.teacher
                                  ? `${course.teacher.first_name} ${course.teacher.last_name}`
                                  : "N/A"}
                              </div>
                              <div>
                                <strong>Description:</strong>{" "}
                                {course.course_description || "-"}
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
        {editingCourse && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesTable;