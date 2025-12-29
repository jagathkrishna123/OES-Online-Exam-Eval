// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { studentsData, evaluationDashboard } from "../constants/constants";

// const initialQuestions = [
//   { id: "Q1", label: "Q1 Marks", max: 10 },
//   { id: "Q2a", label: "Q2a Marks", max: 5 },
//   { id: "Q2b", label: "Q2b Marks", max: 5 },
//   { id: "Q3", label: "Q3 Marks", max: 15 },
//   { id: "Q4", label: "Q4 Marks", max: 20 },
//   { id: "Q5", label: "Q5 Marks", max: 15 },
//   { id: "Q6a", label: "Q6a Marks", max: 15 },
//   { id: "Q6b", label: "Q6b Marks", max: 15 }
// ];

// export default function StudentEvaluation() {
//   const { subjectId, studentId } = useParams();
//   const navigate = useNavigate();
//   const sid = Number(subjectId);
//   const stid = Number(studentId);

//   const students = studentsData[sid] || [];
//   const student = students.find(s => s.id === stid) || { id: stid, name: "Unknown", roll: "N/A", status: "Pending" };
//   const subject = evaluationDashboard.find(s => s.id === sid) || { subject: "Subject" };

//   const draftKey = `eval_draft_${sid}_${stid}`;
//   const [marks, setMarks] = useState(() => {
//     try {
//       const saved = localStorage.getItem(draftKey);
//       return saved ? JSON.parse(saved) : Object.fromEntries(initialQuestions.map(q => [q.id, ""]));
//     } catch {
//       return Object.fromEntries(initialQuestions.map(q => [q.id, ""]));
//     }
//   });

//   const [status, setStatus] = useState(student.status || "Pending");
//   const [zoomQP, setZoomQP] = useState(1);
//   const [zoomAS, setZoomAS] = useState(1);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       try { localStorage.setItem(draftKey, JSON.stringify(marks)); } catch {}
//     }, 300);
//     return () => clearTimeout(t);
//   }, [marks, draftKey]);

//   const handleChange = (qid, value) => {
//     if (value === "") {
//       setMarks(prev => ({ ...prev, [qid]: "" }));
//       return;
//     }
//     const cleaned = value.replace(/[^0-9]/g, "");
//     setMarks(prev => ({ ...prev, [qid]: cleaned }));
//   };

//   const totalMarks = Object.entries(marks).reduce((acc, [k, v]) => acc + (Number(v || 0)), 0);

//   const handleSaveDraft = () => {
//     try {
//       localStorage.setItem(draftKey, JSON.stringify(marks));
//       alert("Draft saved locally.");
//     } catch {
//       alert("Could not save draft.");
//     }
//   };

//   const handleSubmit = () => {
//     // basic validation and confirm if some empty
//     for (const q of initialQuestions) {
//       const v = marks[q.id];
//       if (v === "" || isNaN(Number(v))) {
//         if (!confirm(`Some marks are empty or invalid (question ${q.id}). Submit anyway?`)) return;
//         break;
//       }
//       if (Number(v) > q.max) {
//         if (!confirm(`${q.id} exceeds maximum marks (${q.max}). Submit anyway?`)) return;
//       }
//     }

//     try { localStorage.removeItem(draftKey); } catch {}
//     // In real app: call API to persist and update student's status
//     setStatus("Completed");
//     alert("Evaluation submitted. Total: " + totalMarks);

//     // Optionally redirect back to subject list after submit
//     navigate(`/subject/${sid}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-extrabold text-gray-800">Exam Evaluation Portal</h1>
//             <p className="text-sm text-gray-500">Subject: {subject.subject} — Student evaluation</p>
//           </div>
//         </header>

//         {/* viewers */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white rounded-2xl shadow-sm p-4 border">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="font-semibold text-gray-700">Question Paper</h3>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setZoomQP(z => Math.max(0.5, +(z - 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">-</button>
//                 <div className="text-sm">{Math.round(zoomQP * 100)}%</div>
//                 <button onClick={() => setZoomQP(z => Math.min(2, +(z + 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">+</button>
//                 <button onClick={() => setZoomQP(1)} className="px-2 py-1 rounded-md border text-sm">Reset</button>
//               </div>
//             </div>

//             <div className="border rounded-lg overflow-hidden bg-gray-100">
//               <div style={{ transform: `scale(${zoomQP})`, transformOrigin: 'top left' }} className="p-6">
//                 <div className="h-56 w-full bg-white rounded shadow-inner flex items-center justify-center text-gray-300">
//                   <div className="text-center">
//                     <div className="text-2xl font-semibold text-gray-400">Question Paper</div>
//                     <div className="text-sm mt-2">(PDF/Image viewer placeholder)</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-4 border">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="font-semibold text-gray-700">Student Answer Script</h3>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setZoomAS(z => Math.max(0.5, +(z - 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">-</button>
//                 <div className="text-sm">{Math.round(zoomAS * 100)}%</div>
//                 <button onClick={() => setZoomAS(z => Math.min(2, +(z + 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">+</button>
//                 <button onClick={() => setZoomAS(1)} className="px-2 py-1 rounded-md border text-sm">Reset</button>
//               </div>
//             </div>

//             <div className="border rounded-lg overflow-hidden bg-gray-100">
//               <div style={{ transform: `scale(${zoomAS})`, transformOrigin: 'top left' }} className="p-6">
//                 <div className="h-56 w-full bg-white rounded shadow-inner flex items-center justify-center text-gray-300">
//                   <div className="text-center">
//                     <div className="text-2xl font-semibold text-gray-400">Student Answer</div>
//                     <div className="text-sm mt-2">(Scanned script placeholder)</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* marks entry */}
//         <div className="mt-6 bg-white rounded-2xl p-6 border shadow-sm">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div>
//               <div className="text-sm text-gray-500">Student ID: <span className="font-medium text-gray-800">{student.id}</span></div>
//               <div className="text-sm text-gray-500">Student Name: <span className="font-medium text-gray-800">{student.name}</span></div>
//               <div className="text-sm text-gray-500">Roll Number: <span className="font-medium text-gray-800">{student.roll}</span></div>
//             </div>

//             <div className="text-right">
//               <div className="text-sm text-gray-500">Status</div>
//               <div className={`inline-block px-3 py-1 rounded-full font-medium ${status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : status === 'In Progress' ? 'bg-sky-100 text-sky-800' : 'bg-green-100 text-green-800'}`}>
//                 {status}
//               </div>
//             </div>

//             <div className="ml-auto text-2xl font-extrabold text-red-600">Total Marks: {totalMarks} / 100</div>
//           </div>

//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {initialQuestions.map(q => (
//               <div key={q.id} className="p-3 bg-gray-50 rounded-lg border">
//                 <label className="text-sm text-gray-600 block mb-1">{q.label} <span className="text-xs text-gray-400">(max {q.max})</span></label>
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   value={marks[q.id]}
//                   onChange={(e) => handleChange(q.id, e.target.value)}
//                   className="w-full bg-white border rounded-md px-3 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200"
//                   placeholder="0"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 flex items-center justify-between">
//             <div className="text-sm text-gray-400">Draft saved automatically</div>
//             <div className="flex items-center gap-3">
//               <button onClick={handleSaveDraft} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Save as Draft</button>
//               <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Submit Evaluation</button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentsData, evaluationDashboard } from "../../constants/constants";

const initialQuestions = [
  { id: "Q1", label: "Q1 Marks", max: 10 },
  { id: "Q2a", label: "Q2a Marks", max: 5 },
  { id: "Q2b", label: "Q2b Marks", max: 5 },
  { id: "Q3", label: "Q3 Marks", max: 15 },
  { id: "Q4", label: "Q4 Marks", max: 20 },
  { id: "Q5", label: "Q5 Marks", max: 15 },
  { id: "Q6a", label: "Q6a Marks", max: 15 },
  { id: "Q6b", label: "Q6b Marks", max: 15 }
];

export default function StudentEvaluation() {
  const { subjectId, studentId } = useParams();
  const navigate = useNavigate();
  const sid = Number(subjectId);
  const stid = Number(studentId);

  const students = studentsData[sid] || [];
  const student = students.find(s => s.id === stid) || { id: stid, name: "Unknown", roll: "N/A", status: "Pending" };
  const subject = evaluationDashboard.find(s => s.id === sid) || { subject: "Subject" };

  const draftKey = `eval_draft_${sid}_${stid}`;
  const [marks, setMarks] = useState(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      return saved ? JSON.parse(saved) : Object.fromEntries(initialQuestions.map(q => [q.id, ""]));
    } catch {
      return Object.fromEntries(initialQuestions.map(q => [q.id, ""]));
    }
  });

  const [status, setStatus] = useState(student.status || "Pending");
  const [zoomQP, setZoomQP] = useState(1);
  const [zoomAS, setZoomAS] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(draftKey, JSON.stringify(marks)); } catch {}
    }, 300);
    return () => clearTimeout(t);
  }, [marks, draftKey]);

  const handleChange = (qid, value) => {
    if (value === "") {
      setMarks(prev => ({ ...prev, [qid]: "" }));
      return;
    }
    const cleaned = value.replace(/[^0-9]/g, "");
    setMarks(prev => ({ ...prev, [qid]: cleaned }));
  };

  const totalMarks = Object.entries(marks).reduce((acc, [k, v]) => acc + (Number(v || 0)), 0);

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(draftKey, JSON.stringify(marks));
      alert("Draft saved locally.");
    } catch {
      alert("Could not save draft.");
    }
  };

  const handleSubmit = () => {
    // basic validation and confirm if some empty
    for (const q of initialQuestions) {
      const v = marks[q.id];
      if (v === "" || isNaN(Number(v))) {
        if (!confirm(`Some marks are empty or invalid (question ${q.id}). Submit anyway?`)) return;
        break;
      }
      if (Number(v) > q.max) {
        if (!confirm(`${q.id} exceeds maximum marks (${q.max}). Submit anyway?`)) return;
      }
    }

    try { localStorage.removeItem(draftKey); } catch {}
    // In real app: call API to persist and update student's status
    setStatus("Completed");
    alert("Evaluation submitted. Total: " + totalMarks);

    // Redirect back to teacher subject evaluation list
    navigate(`/teacher/evaluation/${sid}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Exam Evaluation Portal</h1>
            <p className="text-sm text-gray-500">Subject: {subject.subject} — Student evaluation</p>
          </div>
        </header>

        {/* viewers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Question Paper</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoomQP(z => Math.max(0.5, +(z - 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">-</button>
                <div className="text-sm">{Math.round(zoomQP * 100)}%</div>
                <button onClick={() => setZoomQP(z => Math.min(2, +(z + 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">+</button>
                <button onClick={() => setZoomQP(1)} className="px-2 py-1 rounded-md border text-sm">Reset</button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-gray-100">
              <div style={{ transform: `scale(${zoomQP})`, transformOrigin: 'top left' }} className="p-6">
                <div className="h-56 w-full bg-white rounded shadow-inner flex items-center justify-center text-gray-300">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-400">Question Paper</div>
                    <div className="text-sm mt-2">(PDF/Image viewer placeholder)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Student Answer Script</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoomAS(z => Math.max(0.5, +(z - 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">-</button>
                <div className="text-sm">{Math.round(zoomAS * 100)}%</div>
                <button onClick={() => setZoomAS(z => Math.min(2, +(z + 0.1).toFixed(1)))} className="px-2 py-1 rounded-md border text-sm">+</button>
                <button onClick={() => setZoomAS(1)} className="px-2 py-1 rounded-md border text-sm">Reset</button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-gray-100">
              <div style={{ transform: `scale(${zoomAS})`, transformOrigin: 'top left' }} className="p-6">
                <div className="h-56 w-full bg-white rounded shadow-inner flex items-center justify-center text-gray-300">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-400">Student Answer</div>
                    <div className="text-sm mt-2">(Scanned script placeholder)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* marks entry */}
        <div className="mt-6 bg-white rounded-2xl p-6 border shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Student ID: <span className="font-medium text-gray-800">{student.id}</span></div>
              <div className="text-sm text-gray-500">Student Name: <span className="font-medium text-gray-800">{student.name}</span></div>
              <div className="text-sm text-gray-500">Roll Number: <span className="font-medium text-gray-800">{student.roll}</span></div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">Status</div>
              <div className={`inline-block px-3 py-1 rounded-full font-medium ${status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : status === 'In Progress' ? 'bg-sky-100 text-sky-800' : 'bg-green-100 text-green-800'}`}>
                {status}
              </div>
            </div>

            <div className="ml-auto text-2xl font-extrabold text-red-600">Total Marks: {totalMarks} / 100</div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialQuestions.map(q => (
              <div key={q.id} className="p-3 bg-gray-50 rounded-lg border">
                <label className="text-sm text-gray-600 block mb-1">{q.label} <span className="text-xs text-gray-400">(max {q.max})</span></label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={marks[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="w-full bg-white border rounded-md px-3 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">Draft saved automatically</div>
            <div className="flex items-center gap-3">
              <button onClick={handleSaveDraft} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Save as Draft</button>
              <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Submit Evaluation</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

