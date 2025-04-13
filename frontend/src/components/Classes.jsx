import React, { useEffect, useState } from "react";
import axios from "axios";

const ClassesTable = () => {
  const [classes, setClasses] = useState([]);  // Αποθηκεύουμε τις τάξεις στον state
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3000/api/classes"),
      axios.get("http://localhost:3000/api/students")
    ])
      .then(([classesRes, studentsRes]) => {
        console.log("Classes:", classesRes.data);
        console.log("Students:", studentsRes.data);
        console.log("Sample student:", studentsRes.data[0]);


        setClasses(classesRes.data);  // Αποθηκεύουμε τις τάξεις
        setStudents(studentsRes.data);  // Αποθηκεύουμε τους μαθητές
        setLoading(false);  // Όταν και τα δύο ολοκληρωθούν, κάνουμε το loading false
      })
      .catch((err) => {
        console.error("Error loading data", err);  // Διαχείριση σφαλμάτων
        setLoading(false);  // Κλείνουμε το loading αν υπάρχει σφάλμα
      });
  }, []);

  // Συνάρτηση για να υπολογίσουμε πόσοι μαθητές υπάρχουν για κάθε τάξη
  const getStudentCount = (classId) => {
    console.log("Class ID:", classId, "Student Class ID:", students.class_id);
    // Φιλτράρουμε τους μαθητές με βάση το class_id και υπολογίζουμε τον αριθμό τους
    const count = students.filter(student => student.class_id === classId).length;
    console.log("Class ID:", classId, "Student Class ID:", students.class_id);
    return count;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full border-t-2 border-blue-600 w-12 h-12"></div>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-center border-b">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Class Name</th>
                <th className="px-4 py-2">Class ID</th>
                <th className="px-4 py-2">Class Course</th>
                <th className="px-4 py-2">Teacher ID</th>
                <th className="px-4 py-2">Teacher Name</th>
                <th className="px-4 py-2">Schedule</th>
                <th className="px-4 py-2">Students Count</th> {/* Στήλη για τον αριθμό των μαθητών */}
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem, index) => (
                <tr key={classItem.class_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{classItem.class_name}</td>
                  <td className="px-4 py-2">{classItem.class_id}</td>
                  <td className="px-4 py-2">{classItem.class_type}</td>
                  <td className="px-4 py-2">{classItem.teacher_id}</td>
                  <td className="px-4 py-2">{classItem.Teacher.first_name} {classItem.Teacher.last_name}</td>
                  <td className="px-4 py-2">{classItem.schedule}</td>
                  <td className="px-4 py-2">{getStudentCount(classItem.class_id)}</td> {/* Εδώ εμφανίζεται ο αριθμός των μαθητών */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClassesTable;
