import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "emailjs-com";  // Εισαγωγή της βιβλιοθήκης emailjs
import ChartComponent from "./ChartComponent"; // Εισαγωγή του γραφήματος
import PieComponent from "./PieComponent";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]); // Θα προσθέσουμε το state για τους δασκάλους
  const [teachersCount, setTeachersCount] = useState(0); // Διορθώθηκε το state για δασκάλους
  const [enrollmentStats, setEnrollmentStats] = useState([]);

  useEffect(() => {
    // Ανάκτηση των μαθητών από το backend με Axios
    axios
      .get("http://localhost:3000/api/students")
      .then((response) => {
        setStudents(response.data);
        setNewEnrollments(response.data.filter(student => student.year === new Date().getFullYear()).length); // Υπολογισμός νέων εγγραφών
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });

    // Ανάκτηση των δασκάλων
    axios
      .get("http://localhost:3000/api/teachers")
      .then((response) => {
        setTeachers(response.data);
        setTeachersCount(response.data.length); // Αποθήκευση του αριθμού των δασκάλων
        console.log("Teachers:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });

    // Ανάκτηση δεδομένων για το γράφημα
    axios
      .get("http://localhost:3000/api/enrollments-stats")
      .then((response) => {
        setEnrollmentStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enrollment stats:", error);
      });
  }, []);

  const totalStudents = students.length;
  const currentYear = new Date().getFullYear();

  const handleSendMassEmailToStudents = () => {
    students.forEach(student => {
      const emailTemplateParams = {
        to_email: student.email, // Υποθέτουμε ότι κάθε student έχει email
        subject: "Important Update",
        message: "This is a message for students regarding new updates."
      };

      emailjs
        .send(
          "service_kfxioh4", // Το service ID από το EmailJS
          "template_lh03laj", // Το template ID από το EmailJS
          emailTemplateParams,
          "IyaEmFgUjm25uvEQl" // Το user ID από το EmailJS
        )
        .then((response) => {
          console.log(`Email sent successfully to ${student.email}:`, response);
        })
        .catch((error) => {
          console.error(`Error sending email to ${student.email}:`, error);
        });
    });
  };

  const handleSendMassEmailToTeachers = () => {
    teachers.forEach(teacher => {
      const emailTemplateParams = {
        to_email: teacher.email, // Υποθέτουμε ότι κάθε teacher έχει email
        subject: "Important Update",
        message: "This is a message for teachers regarding new updates."
      };

      emailjs
        .send(
          "service_kfxioh4", // Το service ID από το EmailJS
          "template_lh03laj", // Το template ID από το EmailJS
          emailTemplateParams,
          "IyaEmFgUjm25uvEQl" // Το user ID από το EmailJS
        )
        .then((response) => {
          console.log(`Email sent successfully to ${teacher.email}:`, response);
        })
        .catch((error) => {
          console.error(`Error sending email to ${teacher.email}:`, error);
        });
    });
  };

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

        {/* Teachers Count */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Teachers for {currentYear}</h3>
          <p className="text-2xl">{teachersCount}</p>
        </div>

        {/* Mass Mail Students */}
        <div
          onClick={handleSendMassEmailToStudents}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <h3 className="text-xl font-bold mb-2">Announce to Students</h3>
          <p className="text-lg">Click here to send mass emails to students.</p>
        </div>

        {/* Mass Mail Teachers */}
        <div
          onClick={handleSendMassEmailToTeachers}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <h3 className="text-xl font-bold mb-2">Announce to Teachers</h3>
          <p className="text-lg">Click here to send mass emails to teachers.</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Το ChartComponent */}
        <div className="w-full h-72">
          <ChartComponent data={enrollmentStats} />
        </div>

        {/* Το PieComponent */}
        <div className="w-full h-72">
          <PieComponent data={enrollmentStats} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
