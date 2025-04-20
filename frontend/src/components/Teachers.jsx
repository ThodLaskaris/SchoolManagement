import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddTeacherForm from "./AddTeacherForm";  // Assuming you have an AddTeacherForm

const TeachersTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editedTeacherData, setEditedTeacherData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    hire_date: "",
    subject: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teachers")  // Fetching data for teachers
      .then((res) => {
        setTimeout(() => {
          setTeachers(res.data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error loading teachers", err);
        setLoading(false);
        toast.error("Failed to load teachers!");
      });
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);


  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sortedTeachers = [...teachers];
    sortedTeachers.sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setTeachers(sortedTeachers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.first_name} ${teacher.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setEditedTeacherData({
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      email: teacher.email,
      phone: teacher.phone || "",
      hire_date: teacher.hire_date || "",
      subject: teacher.course_id || "",
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:3000/api/teachers/${editingTeacher.teacher_id}`, editedTeacherData);
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === editingTeacherid
            ? { ...teacher, ...editedTeacherData }
            : teacher
        )
      );
      setEditingTeacher(null);
      toast.success("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Error saving changes.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTeacherData((prevData) => ({
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
        Teachers
      </motion.h1>

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowAddTeacherForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
        >
          + Add Teacher
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="p-2 border border-gray-300 rounded-lg w-64"
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
                  Name {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => {
                const isOpen = expanded === teacher.id;

                return (
                  <React.Fragment key={teacher.id}>
                    <motion.tr
                      whileHover={{ scale: 1.01 }}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpand(teacher.id)}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">
                        {teacher.first_name} {teacher.last_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{teacher.email || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{teacher.phone || "-"}</td>
                      <td className="px-4 py-3 text-sm">{teacher.courses || "-"}</td>
                      <td className="px-4 py-3">
                        <button
                          className="text-blue-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(teacher);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </motion.tr>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-blue-50"
                        >
                          <td colSpan="6" className="px-6 py-4 text-left text-gray-700">
                            <div className="space-y-1">
                              <div><strong>Hire Date:</strong> {teacher.hire_date || "—"}</div>
                              <div><strong>Phone:</strong> {teacher.phone || "—"}</div>
                              <div>
                                <strong>Subject:</strong>{" "}
                                {console.log("Teacher ID:", teacher.teacher_id, "Course ID:", teacher.course_id, "Matched:", courses.find((c) => c.course_id === teacher.course_id))}
                                {courses.find((c) => c.course_id === teacher.course_id)?.name || "-"}

                              </div>
                            </div>
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

      {/* Add Teacher Form */}
      <AnimatePresence>
        {showAddTeacherForm && (
          <motion.div
            key="add-teacher-modal"
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              scale: { type: "spring", stiffness: 500, damping: 60 },
              opacity: { duration: 0.3 },
            }}
          >
            <AddTeacherForm
              setShowAddTeacherForm={setShowAddTeacherForm}
              setTeachers={setTeachers}
              courses={courses}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {/* Edit Teacher Form */}
        {editingTeacher && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>

              <div className="mb-1">
                <input
                  type="text"
                  name="first_name"
                  value={editedTeacherData.first_name}
                  readOnly
                  onChange={handleChange}
                  className="w-4/5 p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  name="last_name"
                  value={editedTeacherData.last_name}
                  readOnly
                  onChange={handleChange}
                  className="w-4/5 p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  value={editedTeacherData.email}
                  onChange={handleChange}
                  className="w-4/5 p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-1">
                <input
                  type="tel"
                  name="phone"
                  value={editedTeacherData.phone}
                  onChange={handleChange}
                  className="w-4/5 p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() => setEditingTeacher(null)}
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
          </div>
          
        )}
          </AnimatePresence>
    </div>
  );
};

export default TeachersTable;
