import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Table from "./Table";
import { ToastContainer, toast } from "react-toastify";
import EditForm from "./EditForm";
import AddTeacherForm from "./AddTeacherForm"; // Ας υποθέσουμε ότι έχεις δημιουργήσει τη φόρμα προσθήκης

const TeachersTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [courses, setCourses] = useState([]);  // Προσθήκη του useState για τα μαθήματα
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false); // Για να ελέγξουμε αν θα εμφανίζεται η φόρμα προσθήκης

  const columns = {
    tableTitle: "Teachers",
    headers: [
      { label: "#", sortable: true },
      { label: "Name", sortable: false },
      { label: "Email", sortable: false },
      { label: "Course", sortable: false },
      { label: "Actions", sortable: false },
    ],
    searchBy: "first_name",  // Χρησιμοποιούμε το first_name για αναζήτηση
    idField: "teacher_id",   // ID για κάθε εγγραφή (Teacher ID)
    mode: "teachers",  // Λειτουργία για δασκάλους
  };

  useEffect(() => {
    // Φόρτωμα δασκάλων
    axios
      .get("http://localhost:3000/api/teachers")
      .then((res) => {
        setTimeout(() => {
          setTeachers(res.data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error loading teachers", err);
        setLoading(false);
      });

    // Φόρτωμα μαθημάτων
    axios
      .get("http://localhost:3000/api/courses")
      .then((res) => {
        setCourses(res.data);  // Αποθήκευση των μαθημάτων στο state
      })
      .catch((err) => {
        console.error("Error loading courses", err);
      });
  }, []);

  const getCourseByTeacherId = (teacher_id) => {
    const course = courses.find(course => course.teacher_id === teacher_id);
    return course ? course.name : "No course";
  }

  const onSaveChanges = () => {
    axios
      .put(`http://localhost:3000/api/teachers/${editingItem.teacher_id}`, editedData)
      .then((res) => {
        console.log("Teacher data updated successfully", res.data);
        
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher.teacher_id === editingItem.teacher_id ? res.data : teacher
          )
        );
        setEditingItem(null);  // Κλείσιμο της φόρμας μετά την αποθήκευση
        toast.success("Teacher data updated successfully!");  // Επιτυχία
      })
      .catch((err) => {
        console.error("Error saving teacher data", err);
        toast.error("Error saving teacher data.");  // Σφάλμα
      });
  };

  // const toggleExpand = (id) => {
  //   setExpandedId((prev) => (prev === id ? null : id));
  // };

  const toggleExpand = (id) => {
    console.log("Toggling expand for ID:", id);
    setExpandedId((prev) => {
      const newId = prev === id ? null : id;
      console.log("Updated expandedId:", newId);
      return newId;
    });
  };


  const handleEdit = (teacher) => {
    setEditingItem(teacher);
    setEditedData(teacher);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-gray-100 p-6 rounded-2xl shadow-xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-it mb-6"
        >
          Teachers
        </motion.h1>

        {/* Flex container για το κουμπί και το search box */}
        <div className="flex items-center justify-between mb-4 space-x-4">
          {/* Κουμπί "Add Teacher" */}
          <button
            onClick={() => setShowAddTeacherForm(true)}

            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
          >
           + Add Teacher
          </button>

          {/* Πεδίο αναζήτησης */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name..."
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Φόρμα προσθήκης δασκάλου */}
        {showAddTeacherForm && (
          <AddTeacherForm
            setShowAddTeacherForm={setShowAddTeacherForm}
            setTeachers={setTeachers}
            teachers={teachers}
            courses={courses}
          />
        )}

        <Table
          data={filteredTeachers}
          columns={columns}
          loading={loading}
          onEditClick={handleEdit}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSort={handleSort}
          sortOrder={sortOrder}
          expanded={expandedId}
          toggleExpand={toggleExpand}
          getCourseByTeacherId={getCourseByTeacherId}
        />
      </div>


      {/* Εμφάνιση της φόρμας επεξεργασίας δασκάλου */}
      {editingItem && (
        <EditForm
          // Λειτουργία επεξεργασίας
          editingItem={editingItem}
          setEditingItem={setEditingItem}  // Για να κλείσεις τη φόρμα
          editedData={editedData}
          setEditedData={setEditedData}
          onSaveChanges={onSaveChanges} // Συνάρτηση αποθήκευσης αλλαγών
          courses={courses} // Αν είναι απαραίτητο για τη φόρμα
          title="Teacher"
        />
      )}

    </>
  );
};

export default TeachersTable;
