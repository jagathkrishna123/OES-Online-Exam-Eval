import React, { useState, useEffect } from "react";
import { STUDENTDATA, DEPARTMENTDATAS } from "../../constants/constants";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [teacher, setTeacher] = useState({ id: "", name: "" });

  const [editFormData, setEditFormData] = useState({
    studentName: "",
    studentRoll: "",
    department: "",
    year: "",
  });

  const [availableYears, setAvailableYears] = useState([]);

  // Load teacher info and students
  useEffect(() => {
    const storedTeacher = JSON.parse(localStorage.getItem("teacher"));
    if (storedTeacher) {
      setTeacher(storedTeacher);
    }
    setStudents(STUDENTDATA);
    setFilteredStudents(STUDENTDATA);
  }, []);

  // Filter students by department
  useEffect(() => {
    let filtered = [...students];

    if (selectedDepartment) {
      filtered = filtered.filter(student => student.department === selectedDepartment);
    }

    // Sort by department
    filtered.sort((a, b) => {
      const deptA = a.department.toLowerCase();
      const deptB = b.department.toLowerCase();

      if (sortOrder === "asc") {
        return deptA.localeCompare(deptB);
      } else {
        return deptB.localeCompare(deptA);
      }
    });

    setFilteredStudents(filtered);
  }, [students, selectedDepartment, sortOrder]);

  // Handle department change for editing
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    const dept = DEPARTMENTDATAS.find((d) => d.name === department);
    setAvailableYears(dept ? Object.keys(dept.years) : []);

    setEditFormData({
      ...editFormData,
      department: department,
      year: "", // Reset year when department changes
    });
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Start editing a student
  const handleEdit = (student) => {
    setEditingStudent(student.id);
    const dept = DEPARTMENTDATAS.find((d) => d.name === student.department);
    setAvailableYears(dept ? Object.keys(dept.years) : []);

    setEditFormData({
      studentName: student.studentName,
      studentRoll: student.studentRoll,
      department: student.department,
      year: student.year,
    });
  };

  // Save edited student
  const handleSaveEdit = () => {
    if (!editFormData.studentName || !editFormData.studentRoll ||
        !editFormData.department || !editFormData.year) {
      setMessage("❌ Please fill all required fields.");
      return;
    }

    const updatedStudents = students.map(student =>
      student.id === editingStudent
        ? {
            ...student,
            studentName: editFormData.studentName,
            studentRoll: editFormData.studentRoll,
            department: editFormData.department,
            year: editFormData.year,
          }
        : student
    );

    setStudents(updatedStudents);
    setEditingStudent(null);
    setMessage("✅ Student updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setMessage("");
  };

  // Delete student
  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter(student => student.id !== studentId);
      setStudents(updatedStudents);
      setMessage("✅ Student deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100 w-full font-out">
      <div className="flex flex-col p-6 rounded-xl max-w-7xl w-full gap-4 mx-auto">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-500 text-center mb-6">
          Manage Students
        </h2>

        {/* Teacher Info */}
        <div className="bg-gray-50 border border-gray-300 p-3 rounded-lg mb-5">
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Teacher:</span> {teacher.name}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Teacher ID:</span> {teacher.id}
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div className="mb-5 p-3 text-sm rounded-lg text-center font-medium bg-blue-100 text-blue-700 border border-gray-300">
            {message}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-gray-500 font-medium mb-1">
              Filter by Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Departments</option>
              {DEPARTMENTDATAS.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={toggleSort}
              className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all font-semibold shadow-md"
            >
              <FaSort />
              Sort by Department ({sortOrder === "asc" ? "A-Z" : "Z-A"})
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Roll Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{student.id}</td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <input
                            type="text"
                            name="studentName"
                            value={editFormData.studentName}
                            onChange={handleEditChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        ) : (
                          student.studentName
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <input
                            type="text"
                            name="studentRoll"
                            value={editFormData.studentRoll}
                            onChange={handleEditChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        ) : (
                          student.studentRoll
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <select
                            name="department"
                            value={editFormData.department}
                            onChange={handleDepartmentChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="">Select Department</option>
                            {DEPARTMENTDATAS.map((dept) => (
                              <option key={dept.name} value={dept.name}>
                                {dept.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          student.department
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingStudent === student.id ? (
                          <select
                            name="year"
                            value={editFormData.year}
                            onChange={handleEditChange}
                            disabled={!editFormData.department}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="">Select Year</option>
                            {availableYears.map((yr) => (
                              <option key={yr} value={yr}>
                                {yr}
                              </option>
                            ))}
                          </select>
                        ) : (
                          student.year
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {editingStudent === student.id ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-all"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-all"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(student)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-all"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(student.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-all"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 text-center text-gray-500">
          Total Students: {filteredStudents.length} {selectedDepartment && `(Filtered by ${selectedDepartment})`}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
