;

import React, { useState } from "react";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const AddDepartment = () => {
  const [departments, setDepartments] = useState([]);

  const [departmentName, setDepartmentName] = useState("");
  const [year, setYear] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);

  /* =========================
     ADD SUBJECT
     ========================= */
  const addSubject = () => {
    if (!subjectInput.trim()) return;

    if (subjects.includes(subjectInput.trim())) {
      alert("Subject already added");
      return;
    }

    setSubjects([...subjects, subjectInput.trim()]);
    setSubjectInput("");
  };

  /* =========================
     CREATE / UPDATE DEPARTMENT
     ========================= */
  const createDepartment = () => {
    if (!departmentName || !year || subjects.length === 0) {
      alert("Department, year and subjects are required");
      return;
    }

    setDepartments((prev) => {
      const updated = [...prev];
      const deptIndex = updated.findIndex(
        (d) => d.name === departmentName
      );

      if (deptIndex === -1) {
        // new department
        updated.push({
          id: Date.now(),
          name: departmentName,
          years: {
            [year]: subjects,
          },
        });
      } else {
        // existing department
        updated[deptIndex].years[year] = subjects;
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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">
          Manage Departments, Years & Subjects
        </h2>

        {/* FORM */}
        <div className="space-y-6">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Department Name
            </label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Computer Science Engineering"
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Academic Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border px-4 py-2 rounded bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Add Subject
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Data Structures"
                className="flex-1 border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={addSubject}
                className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* SUBJECT LIST */}
          {subjects.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Subjects Added</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {sub}
                    <button
                      onClick={() => removeSubject(index)}
                      className="text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CREATE BUTTON */}
          <button
            onClick={createDepartment}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save Department & Subjects
          </button>
        </div>
      </div>

      {/* DISPLAY SECTION */}
      <div className="max-w-5xl mx-auto mt-10 space-y-4">
        <h3 className="text-xl font-semibold">
          Created Departments
        </h3>

        {departments.length === 0 ? (
          <p className="text-gray-500">No data created yet.</p>
        ) : (
          departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h4 className="text-lg font-semibold mb-3">
                {dept.name}
              </h4>

              {Object.entries(dept.years).map(([year, subjects]) => (
                <div key={year} className="mb-3">
                  <p className="font-medium">{year}</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {subjects.map((sub, idx) => (
                      <li key={idx}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddDepartment;
