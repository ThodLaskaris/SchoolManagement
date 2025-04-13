import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EditForm = ({
  editingItem,
  setEditingItem,
  editedData,
  setEditedData,
  onSaveChanges,
  courses
}) => {
  const [formData, setFormData] = useState({ ...editedData });

  useEffect(() => {
    setFormData({ ...editingItem });
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveChanges(); // Κλήση για αποθήκευση των αλλαγών
  };

  return (
    <>
      {/* Background Gray */}
      <motion.div
        className="fixed inset-0 bg-gray-500 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Centered Form */}
      <motion.div
        className="fixed inset-0 flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{
          opacity: { duration: 0.3 },
          y: { type: "spring", stiffness: 500, damping: 60 },
        }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.3 } }}
        >
          <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>

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
                type="phone"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                value={formData.phone}
                className="p-2 border w-full rounded"
                required
              />
            </div>

            <div className="mb-4">
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                className="p-2 border w-full rounded"
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)} // Close form on cancel
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default EditForm;
