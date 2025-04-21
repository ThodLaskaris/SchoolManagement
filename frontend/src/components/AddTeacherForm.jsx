import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
const AddTeacherForm = ({ setShowAddTeacherForm, setTeachers, courses }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    course_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/teachers', formData);

      if (res.status === 201 || res.status === 200) {
        toast.success('Teacher added successfully!');
        setTeachers((prev) => [...prev, res.data]);
        setShowAddTeacherForm(false);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      console.error('Error adding teacher', err);
      toast.error('Error adding teacher.');
    }
  };

  return (
    <>
      {/* Background Gray */}
      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{
          opacity: { duration: 0.3 },
          y: { type: 'spring', stiffness: 500, damping: 60 }
        }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.3 } }}
        >
          <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.first_name}
                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.last_name}
                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={formData.phone}
                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-2">
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                className="w-4/5 p-2 border border-gray-300 rounded-lg"
                required
              >
                {/* <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.name}
                  </option>
                ))} */}
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name} - Taught by {course.teacher.first_name} {course.teacher.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddTeacherForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Teacher
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddTeacherForm;