import React, { useState, useEffect } from "react";
import { DEPARTMENTDATAS } from "../../constants/constants";

const AddStudent = () => {
  const [teacher, setTeacher] = useState({ id: "", name: "" });

  const [message, setMessage] = useState("");

  const [availableYears, setAvailableYears] = useState([]);

  const [formData, setFormData] = useState({
    studentName: "",
    studentRoll: "",
    department: "",
    year: "",
    teacherId: "",
  });

  /* =========================
     LOAD TEACHER INFO
     ========================= */
  useEffect(() => {
    const storedTeacher = JSON.parse(localStorage.getItem("teacher"));

    if (storedTeacher) {
      setTeacher(storedTeacher);
      setFormData((prev) => ({
        ...prev,
        teacherId: storedTeacher.id,
      }));
    }
  }, []);

  /* =========================
     HANDLE CHANGE
     ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset year when department changes
    if (name === "department") {
      const dept = DEPARTMENTDATAS.find((d) => d.name === value);
      setAvailableYears(dept ? Object.keys(dept.years) : []);

      setFormData({
        ...formData,
        department: value,
        year: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  /* =========================
     SUBMIT
     ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.studentRoll ||
      !formData.department ||
      !formData.year
    ) {
      setMessage("❌ Please fill all required fields.");
      return;
    }

    // Later: send to backend
    console.log("Student Added:", formData);

    setMessage("✅ Student added successfully!");

    setFormData({
      studentName: "",
      studentRoll: "",
      department: "",
      year: "",
      teacherId: teacher.id,
    });

    setAvailableYears([]);
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-10 bg-gray-100 w-full font-out">
      <div className="flex flex-col p-6 rounded-xl max-w-7xl w-full gap-4">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-500 text-center mb-6">
          Add Student
        </h2>

        {/* Status Message */}
        {message && (
          <div className="mb-5 p-3 text-sm rounded-lg text-center font-medium
            bg-blue-100 text-blue-700 border border-gray-300">
            {message}
          </div>
        )}

        {/* Teacher Info */}
        <div className="bg-gray-50 border border-gray-300 p-3 rounded-lg mb-5">
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Teacher:</span> {teacher.name}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Teacher ID:</span> {teacher.id}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Student Name */}
          <div>
            <label className="block text-gray-500 font-medium mb-1">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter student name"
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-gray-500 font-medium mb-1">
              Roll Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="studentRoll"
              value={formData.studentRoll}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter roll number"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-500 font-medium mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg bg-white
              focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Department</option>
              {DEPARTMENTDATAS.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-500 font-medium mb-1">
              Year <span className="text-red-500">*</span>
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              disabled={!formData.department}
              className="w-full px-4 py-3 border border-gray-300 text-gray-500 rounded-lg bg-white
              focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Year</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-lg text-lg 
            hover:bg-gray-700 transition-all font-semibold shadow-md"
          >
            Add Student
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddStudent;
