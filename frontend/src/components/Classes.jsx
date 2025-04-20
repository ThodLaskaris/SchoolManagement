import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClassesTable = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3000/api/classes"),
      axios.get("http://localhost:3000/api/students"),
    ])
      .then(([classesRes, studentsRes]) => {
        setClasses(classesRes.data);
        setStudents(studentsRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data", err);
        toast.error("Failed to load data!");
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const getStudentCount = (classId) => {
    return students.filter((student) => student.class_id === classId).length;
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl  mb-6"
      >
        Classes
      </motion.h1>

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
                <th className="px-4 py-3">Class Name</th>
                <th className="px-4 py-3">Class ID</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Students Count</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem, index) => {
                const isOpen = expanded === classItem.class_id;

                return (
                  <React.Fragment key={classItem.class_id}>
                    <motion.tr
                      whileHover={{ scale: 1.01 }}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleExpand(classItem.class_id)}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{classItem.class_name}</td>
                      <td className="px-4 py-3">{classItem.class_id}</td>
                      <td className="px-4 py-3">
                        {classItem.course ? classItem.course.course_name : "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {classItem.teacher
                          ? `${classItem.teacher.first_name} ${classItem.teacher.last_name}`
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3">{classItem.schedule || "N/A"}</td>
                      <td className="px-4 py-3">{getStudentCount(classItem.class_id)}</td>
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
                          <td colSpan="7" className="px-6 py-4 text-left text-gray-700">
                            <motion.div layout className="space-y-1">
                              <div>
                                <strong>Class Type:</strong> {classItem.class_type}
                              </div>
                              <div>
                                <strong>Course:</strong>{" "}
                                {classItem.course ? classItem.course.course_name : "N/A"}
                              </div>
                              <div>
                                <strong>Teacher:</strong>{" "}
                                {classItem.teacher
                                  ? `${classItem.teacher.first_name} ${classItem.teacher.last_name}`
                                  : "N/A"}
                              </div>
                              <div>
                                <strong>Schedule:</strong> {classItem.schedule || "N/A"}
                              </div>
                              <div>
                                <strong>Students Count:</strong>{" "}
                                {getStudentCount(classItem.class_id)}
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
    </div>
  );
};

export default ClassesTable;