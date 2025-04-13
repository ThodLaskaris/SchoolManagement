import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Add = ({ entity, onAddSuccess }) => {
  // Κατάσταση για τα δεδομένα του νέου στοιχείου (Student ή Teacher)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    // Ανάλογα με το entity, μπορείς να προσθέσεις και άλλες πληροφορίες
    class: entity === "student" ? "" : undefined, // Αν είναι student, προσθήκη της τάξης
    course: entity === "teacher" ? "" : undefined, // Αν είναι teacher, προσθήκη του μαθήματος
  });

  // Συνάρτηση χειρισμού της υποβολής της φόρμας
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl =
      entity === "student"
        ? "http://localhost:3000/api/students"
        : "http://localhost:3000/api/teachers";

    try {
      const response = await axios.post(apiUrl, formData);
      toast.success(`${entity === "student" ? "Student" : "Teacher"} added successfully!`);
      if (onAddSuccess) onAddSuccess(response.data); // Καλεί την callback συνάρτηση από το γονικό component
    } catch (error) {
      toast.error(`Error adding ${entity === "student" ? "student" : "teacher"}`);
    }
  };

  // Χειριστής για τις αλλαγές στο input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold text-center mb-4">
        {entity === "student" ? "Add Student" : "Add Teacher"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {entity === "student" && (
          <div>
            <label className="block text-gray-700">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        )}

        {entity === "teacher" && (
          <div>
            <label className="block text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md"
        >
          Add {entity === "student" ? "Student" : "Teacher"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Add;
