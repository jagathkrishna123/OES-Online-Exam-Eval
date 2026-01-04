import React, { useState } from "react";
import axios from "axios";
import { DEPARTMENTDATAS, STUDENTDATA, EXAMDATA, addNewExam } from "../../constants/constants";
import { FaPlus, FaTrash, FaUpload, FaFileAlt, FaBook, FaUsers, FaKey } from "react-icons/fa";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const CreateExam = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [exam, setExam] = useState({
    title: "",
    department: "",
    year: "",
    subject: "",
  });

  const [questionPaper, setQuestionPaper] = useState(null);
  const [answerKey, setAnswerKey] = useState(null);

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
     MESSAGE HANDLER
     ====================== */

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  /* ======================
     SUBMIT
     ====================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!exam.title || !exam.department || !exam.year || !exam.subject) {
      showMessage("❌ Please fill in all required exam details.", "error");
      return;
    }

    if (!questionPaper) {
      showMessage("❌ Please upload the question paper.", "error");
      return;
    }

    if (!answerKey) {
      showMessage("❌ Please upload the answer key.", "error");
      return;
    }

    if (students.length === 0 || students.some(s => !s.studentId || !s.file)) {
      showMessage("❌ Please add at least one student with their answer sheet.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", exam.title);
    formData.append("department", exam.department);
    formData.append("year", exam.year);
    formData.append("subject", exam.subject);
    formData.append("questionPaper", questionPaper);
    formData.append("answerKey", answerKey);

    students.forEach((student, index) => {
      formData.append(`students[${index}][studentId]`, student.studentId);
      formData.append(`students[${index}][rollNo]`, student.rollNo);
      formData.append(`students[${index}][file]`, student.file);
    });

    try {
      setLoading(true);

      // For demo purposes, we'll simulate API success and add to local EXAMDATA
      // In a real application, this would be handled by the backend
      const newExamId = `EXAM${String(EXAMDATA.length + 1).padStart(3, '0')}`;

      const newExam = {
        id: newExamId,
        title: exam.title,
        department: exam.department,
        year: exam.year,
        subject: exam.subject,
        questionPaper: questionPaper?.name || "question_paper.pdf",
        answerKey: answerKey?.name || "answer_key.pdf",
        createdAt: new Date().toISOString(),
        status: "active",
        students: students.map(student => ({
          studentId: student.studentId,
          studentName: STUDENTDATA.find(s => s.id === student.studentId)?.studentName || "Unknown",
          rollNo: student.rollNo,
          answerSheet: student.file?.name || "answer_sheet.pdf",
          submittedAt: new Date().toISOString(),
          status: "pending"
        }))
      };

      // Add to dynamic exam data (in real app, this would be handled by backend)
      addNewExam(newExam);

      // Uncomment below for actual API call:
      /*
      await axios.post("http://localhost:5000/api/exams/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      */

      showMessage("✅ Exam created successfully! All files have been uploaded.", "success");

      // Reset form
      setExam({
        title: "",
        department: "",
        year: "",
        subject: "",
      });
      setQuestionPaper(null);
      setAnswerKey(null);
      setStudents([{ studentId: "", rollNo: "", file: null }]);

    } catch (err) {
      console.error("Error creating exam:", err);
      showMessage("❌ Failed to create exam. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 font-out">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaBook className="text-blue-600" />
            Create New Exam
          </h1>
          <p className="text-gray-600">
            Set up a new examination with question paper, answer key, and student answer sheets.
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Exam Details Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaFileAlt className="text-blue-600" />
              Exam Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exam Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={exam.title}
                  onChange={handleExamChange}
                  placeholder="e.g., Mid-term Examination 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={exam.department}
                  onChange={handleExamChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  required
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTDATAS.map((d) => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={exam.year}
                  onChange={handleExamChange}
                  disabled={!exam.department}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={exam.subject}
                  onChange={handleExamChange}
                  disabled={!exam.year}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Subject</option>
                  {availableSubjects.map((sub, i) => (
                    <option key={i} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* File Uploads Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaUpload className="text-blue-600" />
              File Uploads
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question Paper */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Question Paper <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setQuestionPaper(e.target.files[0])}
                    className="hidden"
                    id="questionPaper"
                    required
                  />
                  <label
                    htmlFor="questionPaper"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="text-center">
                      <FaFileAlt className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {questionPaper ? questionPaper.name : "Click to upload question paper"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Answer Key */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Answer Key <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setAnswerKey(e.target.files[0])}
                    className="hidden"
                    id="answerKey"
                    required
                  />
                  <label
                    htmlFor="answerKey"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <div className="text-center">
                      <FaKey className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {answerKey ? answerKey.name : "Click to upload answer key"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Student Answer Sheets Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FaUsers className="text-blue-600" />
                Student Answer Sheets
              </h2>
              <button
                type="button"
                onClick={addStudent}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 text-sm font-medium"
              >
                <FaPlus size={14} />
                Add Student
              </button>
            </div>

            <div className="space-y-4">
              {students.map((student, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Student {index + 1}</h3>
                    {students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStudent(index)}
                        className="flex items-center gap-2 px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm"
                      >
                        <FaTrash size={12} />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Student Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Student <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={student.studentId}
                        onChange={(e) => handleStudentChange(index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm"
                        required
                      >
                        <option value="">Choose student</option>
                        {filteredStudents.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.studentName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Roll Number (Auto-filled) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value={student.rollNo}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm"
                        placeholder="Auto-filled"
                      />
                    </div>

                    {/* Answer Sheet Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer Sheet <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(index, e.target.files[0])}
                          className="hidden"
                          id={`answerSheet-${index}`}
                          required
                        />
                        <label
                          htmlFor={`answerSheet-${index}`}
                          className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm"
                        >
                          <div className="text-center">
                            {student.file ? (
                              <span className="text-green-600 font-medium">{student.file.name}</span>
                            ) : (
                              <span className="text-gray-500">Upload answer sheet</span>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FaUsers className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No students added yet. Click "Add Student" to get started.</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Exam...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaUpload />
                  Create Exam
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
