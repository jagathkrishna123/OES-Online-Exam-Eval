import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaSchool, FaCalendarAlt, FaBook, FaSave, FaEdit } from "react-icons/fa";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const AddDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [departmentName, setDepartmentName] = useState("");
  const [year, setYear] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);

  // Load departments from localStorage on component mount
  useEffect(() => {
    try {
      const savedDepartments = localStorage.getItem("departments");
      if (savedDepartments) {
        const parsedDepartments = JSON.parse(savedDepartments);
        if (Array.isArray(parsedDepartments)) {
          setDepartments(parsedDepartments);
          console.log("✅ Loaded departments from localStorage:", parsedDepartments.length);
        } else {
          console.warn("⚠️ Invalid departments data in localStorage, resetting to empty array");
          setDepartments([]);
        }
      } else {
        console.log("ℹ️ No departments found in localStorage, starting with empty array");
        setDepartments([]);
      }
    } catch (error) {
      console.error("❌ Error loading departments from localStorage:", error);
      setDepartments([]);
    }
  }, []);

  // Save departments to localStorage whenever departments change
  useEffect(() => {
    try {
      localStorage.setItem("departments", JSON.stringify(departments));
      console.log("💾 Saved departments to localStorage:", departments.length);
    } catch (error) {
      console.error("❌ Error saving departments to localStorage:", error);
    }
  }, [departments]);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  /* =========================
     ADD SUBJECT
     ========================= */
  const addSubject = () => {
    if (!subjectInput.trim()) {
      showMessage("❌ Please enter a subject name.", "error");
      return;
    }

    if (subjects.includes(subjectInput.trim())) {
      showMessage("⚠️ Subject already added to this year.", "warning");
      return;
    }

    setSubjects([...subjects, subjectInput.trim()]);
    setSubjectInput("");
    showMessage(`✅ Subject "${subjectInput.trim()}" added!`, "success");
  };

  /* =========================
     CREATE / UPDATE DEPARTMENT
     ========================= */
  const createDepartment = () => {
    if (!departmentName.trim() || !year || subjects.length === 0) {
      showMessage("❌ Please fill in department name, select a year, and add at least one subject.", "error");
      return;
    }

    setDepartments((prev) => {
      const updated = [...prev];
      const deptIndex = updated.findIndex(
        (d) => d.name.toLowerCase() === departmentName.trim().toLowerCase()
      );

      if (deptIndex === -1) {
        // new department
        updated.push({
          id: Date.now().toString(),
          name: departmentName.trim(),
          years: {
            [year]: [...subjects],
          },
        });
        showMessage(`✅ Department "${departmentName.trim()}" created successfully!`, "success");
      } else {
        // existing department
        if (!updated[deptIndex].years[year]) {
          updated[deptIndex].years[year] = [...subjects];
          showMessage(`✅ Year "${year}" added to "${departmentName.trim()}" with subjects!`, "success");
        } else {
          updated[deptIndex].years[year] = [...subjects];
          showMessage(`✅ Subjects updated for "${departmentName.trim()}" - "${year}"!`, "success");
        }
      }

      return updated;
    });

    // reset
    setYear("");
    setSubjects([]);
    setSubjectInput("");
  };

  /* =========================
     REMOVE SUBJECT
     ========================= */
  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaSchool className="text-blue-600" />
          Manage Departments & Subjects
        </h1>
        <p className="text-gray-600">
          Create and manage academic departments with their respective subjects and years.
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
          messageType === "success"
            ? "bg-green-100 text-green-700 border border-green-300"
            : messageType === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-yellow-100 text-yellow-700 border border-yellow-300"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Department Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaPlus className="text-green-600" />
            Create Department
          </h2>

          <div className="space-y-6">
            {/* Department Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaSchool className="text-blue-500" />
                Department Name
              </label>
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="e.g., Computer Science Engineering"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500" />
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              >
                <option value="">Select Year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaBook className="text-green-500" />
                Add Subject
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  placeholder="e.g., Data Structures & Algorithms"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && addSubject()}
                />
                <button
                  type="button"
                  onClick={addSubject}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-medium"
                >
                  <FaPlus className="inline mr-2" />
                  Add
                </button>
              </div>
            </div>

            {/* Subjects List */}
            {subjects.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Subjects Added ({subjects.length})</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                    >
                      <span className="text-gray-700 font-medium">{subject}</span>
                      <button
                        onClick={() => removeSubject(index)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={createDepartment}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all duration-300 font-medium"
            >
              <FaSave />
              Save Department & Subjects
            </button>
          </div>
        </div>

        {/* Departments Display */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaSchool className="text-blue-600" />
            Created Departments ({departments.length})
          </h2>

          {departments.length === 0 ? (
            <div className="text-center py-12">
              <FaSchool className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Departments Created</h3>
              <p className="text-gray-600">
                Start by creating your first department with subjects and academic years.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaSchool className="text-blue-500" />
                    {dept.name}
                  </h3>

                  {Object.entries(dept.years).map(([yearKey, yearSubjects]) => (
                    <div key={yearKey} className="mb-3 last:mb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCalendarAlt className="text-purple-500" />
                        <span className="font-medium text-gray-700">{yearKey}</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {yearSubjects.length} subject{yearSubjects.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="ml-6 space-y-1">
                        {yearSubjects.map((subject, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <FaBook className="text-green-500 text-xs" />
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
