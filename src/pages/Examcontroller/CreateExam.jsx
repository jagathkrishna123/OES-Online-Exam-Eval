import React, { useState } from "react";
import axios from "axios";
import { DEPARTMENTDATAS, STUDENTDATA } from "../../constants/constants";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const CreateExam = () => {
  const [loading, setLoading] = useState(false);

  const [exam, setExam] = useState({
    title: "",
    department: "",
    year: "",
    subject: "",
  });

  const [questionPaper, setQuestionPaper] = useState(null);

  const [students, setStudents] = useState([
    { studentId: "", rollNo: "", file: null },
  ]);

  /* ======================
     HANDLERS
     ====================== */

  const handleExamChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setExam({ ...exam, department: value, year: "", subject: "" });
      setStudents([{ studentId: "", rollNo: "", file: null }]);
    } else if (name === "year") {
      setExam({ ...exam, year: value, subject: "" });
      setStudents([{ studentId: "", rollNo: "", file: null }]);
    } else {
      setExam({ ...exam, [name]: value });
    }
  };

  const handleStudentChange = (index, studentId) => {
    const student = STUDENTDATA.find((s) => s.id === studentId);

    const updated = [...students];
    updated[index] = {
      ...updated[index],
      studentId,
      rollNo: student?.studentRoll || "",
    };

    setStudents(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...students];
    updated[index].file = file;
    setStudents(updated);
  };

  const addStudent = () => {
    setStudents([...students, { studentId: "", rollNo: "", file: null }]);
  };

  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  /* ======================
     FILTERED DATA
     ====================== */

  const selectedDepartment = DEPARTMENTDATAS.find(
    (d) => d.name === exam.department
  );

  const availableSubjects =
    selectedDepartment && exam.year
      ? selectedDepartment.years[exam.year]
      : [];

  const filteredStudents = STUDENTDATA.filter(
    (s) => s.department === exam.department && s.year === exam.year
  );

  /* ======================
     SUBMIT
     ====================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", exam.title);
    formData.append("department", exam.department);
    formData.append("year", exam.year);
    formData.append("subject", exam.subject);
    formData.append("questionPaper", questionPaper);

    students.forEach((student, index) => {
      formData.append(`students[${index}][studentId]`, student.studentId);
      formData.append(`students[${index}][rollNo]`, student.rollNo);
      formData.append(`students[${index}][file]`, student.file);
    });

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/exams/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Exam created successfully 🎉");
    } catch (err) {
      alert("Failed to create exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Create Exam</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Exam Fields */}
          <input
            name="title"
            value={exam.title}
            onChange={handleExamChange}
            placeholder="Exam Title"
            className="w-full border p-2 rounded"
            required
          />

          <select name="department" value={exam.department} onChange={handleExamChange} className="w-full border p-2 rounded">
            <option value="">Select Department</option>
            {DEPARTMENTDATAS.map((d) => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select name="year" value={exam.year} onChange={handleExamChange} disabled={!exam.department} className="w-full border p-2 rounded">
            <option value="">Select Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select name="subject" value={exam.subject} onChange={handleExamChange} disabled={!exam.year} className="w-full border p-2 rounded">
            <option value="">Select Subject</option>
            {availableSubjects.map((sub, i) => (
              <option key={i} value={sub}>{sub}</option>
            ))}
          </select>

          {/* Students */}
          <div className="space-y-4">
            <h3 className="font-semibold">Student Answer Sheets</h3>

            {students.map((student, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3">

                {/* Student Dropdown */}
                <select
                  value={student.studentId}
                  onChange={(e) => handleStudentChange(index, e.target.value)}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Select Student</option>
                  {filteredStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.studentName}
                    </option>
                  ))}
                </select>

                {/* Auto Roll No */}
                <input
                  value={student.rollNo}
                  readOnly
                  className="border p-2 rounded bg-gray-100"
                />

                {/* File */}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  required
                />

                {students.length > 1 && (
                  <button type="button" onClick={() => removeStudent(index)} className="text-red-500">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" onClick={addStudent} className="text-indigo-600 text-sm">
            + Add Another Student
          </button>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">
            {loading ? "Creating..." : "Create Exam"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateExam;
