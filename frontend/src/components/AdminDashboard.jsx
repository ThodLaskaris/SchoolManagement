import React, { useState, useEffect } from "react";
import axios from "axios"; // Εισαγωγή του axios
import ChartComponent from "./ChartComponent"; // Εισαγωγή του γραφήματος
import PieComponent from "./PieComponent";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newEnrollments, setNewEnrollments] = useState(0);
  const [maleStudents, setMaleStudents] = useState(0);
  const [femaleStudents, setFemaleStudents] = useState(0);
  const [enrollmentStats, setEnrollmentStats] = useState([]);  // Για τα δεδομένα του γράφημα

  useEffect(() => {
    // Ανάκτηση των μαθητών από το backend με Axios
    axios
      .get("http://localhost:3000/api/students")
      .then((response) => {
        console.log(response.data);  // Ελέγχουμε τα δεδομένα που επιστρέφονται
        setStudents(response.data); // Ορίζουμε τα δεδομένα στον state

        // Υπολογισμοί για τα cards
        const totalStudents = response.data.length;
        const males = response.data.filter(student => student.gender === "male").length;
        const females = response.data.filter(student => student.gender === "female").length;

        setMaleStudents(males);
        setFemaleStudents(females);
        setNewEnrollments(21); // Αντικατάστησε με την πραγματική τιμή των νέων εγγραφών
      })
      .catch((error) => {
        console.error("Error fetching students:", error); // Χειρισμός σφαλμάτων
      });

    // Ανάκτηση δεδομένων για το γράφημα από το backend
    axios
      .get("http://localhost:3000/api/enrollments-stats")  // API για το γράφημα
      .then((response) => {
        console.log("Enrollment Stats:", response.data);

        setEnrollmentStats(response.data);  // Αποθήκευση των δεδομένων στο state
      })
      .catch((error) => {
        console.error("Error fetching enrollment stats:", error); // Χειρισμός σφαλμάτων
      });
  }, []);  // Ενεργοποιείται μόλις το component φορτωθεί

  const totalStudents = students.length;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Administrator Dashboard</h1>
      </div>

      {/* Cards with statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Total Students</h3>
          <p className="text-2xl">{totalStudents}</p>
        </div>

        {/* New Enrollments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">New Enrollments for {currentYear}</h3>
          <p className="text-2xl">{newEnrollments}</p>
        </div>

        {/* Male Students */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Male Students</h3>
          <p className="text-2xl">{maleStudents}</p>
        </div>

        {/* Female Students */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Female Students</h3>
          <p className="text-2xl">{femaleStudents}</p>
        </div>
      </div>

      {/* Graphs */}
      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Το ChartComponent */}
        <div className="w-full h-72">
          <ChartComponent data={enrollmentStats} /> {/* Εδώ το γράφημα με τα δεδομένα από τη βάση */}
        </div>

        {/* Το PieComponent */}
        <div className="w-full h-72">
          <PieComponent data={enrollmentStats} /> {/* Το PieComponent παίρνει τα δεδομένα από το state */}
        </div>
      </div>




    </div>
  );
};

export default AdminDashboard;
