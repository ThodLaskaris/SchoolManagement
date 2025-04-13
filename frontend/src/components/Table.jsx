import React from "react";
import { ClipLoader } from "react-spinners";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Table = ({
  data,
  loading,
  columns,
  onEditClick,
  searchTerm,
  setSearchTerm,
  handleSort,
  sortOrder,
  expanded,
  toggleExpand,
  getCourseByTeacherId
}) => {
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
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
              {columns.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 cursor-pointer"
                  onClick={header.sortable ? handleSort : undefined}
                >
                  {header.label}{" "}
                  {header.sortable && (sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />)}
                </th>
              ))}

            </tr>
            
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              const isOpen = expanded === item[columns.idField];

              return (
                <React.Fragment key={item[columns.idField]}>
                  <motion.tr
                    whileHover={{ scale: 1.01 }}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(item[columns.idField])}
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">
                      {item.first_name} {item.last_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.email || "-"}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {getCourseByTeacherId(item[columns.idField])}
                    </td>
              
 
               
                    <td className="px-4 py-3">
                      <button
                        className="text-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                        
                          onEditClick(item);
                          console.log("Edit button clicked for item:", item );
                          
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
                        <td colSpan="7" className="px-6 py-4 text-sm text-gray-700">
                          <div className="space-y-1">
                            <div><strong>Phone:</strong> {item.phone || "—"}</div>
                            <div><strong>ID:</strong> {item[columns.idField]}</div>
                            <div><strong>Class:</strong> {item.class}</div>
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
  );
};

export default Table;
