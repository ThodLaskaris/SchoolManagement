import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AddStudentForm = ({ setShowAddStudentForm, setStudents }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    class_id: '',
    date_of_birth: ''
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/classes');
        setClasses(response.data);
      } catch (err) {
        console.error('Error fetching classes:', err);
        toast.error('Error loading classes.');
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, email, phone, class_id, date_of_birth } = formData;

    try {
      const res = await axios.post('http://localhost:3000/api/students', {
        first_name,
        last_name,
        email,
        phone,
        class_id,
        date_of_birth
      });

      if (res.status === 201 || res.status === 200) {
        toast.success('Student added successfully!');
        setTimeout(() => {
          setStudents((prev) => [...prev, res.data]);  // Update the students list
          setShowAddStudentForm(false);  // Close the form after adding the student
        }, 5000);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      console.error('Error adding student', err);
      toast.error('Error adding student.');
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-gray-500 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
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
          <h2 className="text-xl font-bold mb-4">Add Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.first_name}
                className="p-2 border w-full rounded"
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
                className="p-2 border w-full rounded"
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
                className="p-2 border w-full rounded"
                required
                
              />
              
            </div>

            <div className="mb-2">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={formData.phone}
                className="p-2 border w-full rounded"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="date"
                name="date_of_birth"
                placeholder="Date of Birth"
                onChange={handleChange}
                value={formData.date_of_birth}
                className="p-2 border w-full rounded"
              />
            </div>

            <div className="mb-4">
              <select
                name="class_id"
                value={formData.class_id}
                onChange={handleChange}
                className="p-2 border w-full rounded"
                required
              >
                <option value="">Select Class</option>
                {classes.length > 0 ? (
                  classes.map((cls) => (
                    <option key={cls.class_id} value={cls.class_id}>
                      {`${cls.class_name} - ${cls.class_type} (${cls.Teacher?.first_name} ${cls.Teacher?.last_name})`}
                    </option>
                  ))
                ) : (
                  <option value="">Loading Classes...</option>
                )}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddStudentForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Student
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddStudentForm;
