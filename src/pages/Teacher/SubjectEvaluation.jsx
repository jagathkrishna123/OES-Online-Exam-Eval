// // import React from "react";
// // import { useParams } from "react-router-dom";
// // import { evaluationDashboard, studentsData } from "../../constants/constants";

// // const SubjectEvaluation = () => {
// //   const { subjectId } = useParams();

// //   // get the subject data using the id
// //   const subject = evaluationDashboard.find(s => s.id === Number(subjectId));

// //   // get students for this subject
// //   const students = studentsData[subjectId] || [];

// //   const completed = students.filter(s => s.status === "Completed").length;

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold">
// //         Evaluation: {subject.subject} - Final Exam
// //       </h1>
// //       <p className="text-gray-500 mb-6">
// //         Select a student to begin the evaluation process.
// //       </p>

// //       {/* Top stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
// //         <div className="bg-white p-4 shadow rounded-lg border">
// //           <p className="text-gray-600 text-sm">Total Students</p>
// //           <p className="text-3xl font-bold">{students.length}</p>
// //         </div>

// //         <div className="bg-white p-4 shadow rounded-lg border">
// //           <p className="text-gray-600 text-sm">Evaluations Completed</p>
// //           <p className="text-3xl font-bold">{completed}</p>
// //         </div>

// //         <div className="bg-white p-4 shadow rounded-lg border">
// //           <p className="text-gray-600 text-sm">Pending Evaluations</p>
// //           <p className="text-3xl font-bold">{students.length - completed}</p>
// //         </div>
// //       </div>

// //       {/* Student table */}
// //       <div className="bg-white p-4 shadow rounded-lg border overflow-x-auto">
// //         <table className="w-full text-sm">
// //           <thead className="border-b">
// //             <tr>
// //               <th className="py-2 text-left">Student Name</th>
// //               <th className="py-2 text-left">Roll Number</th>
// //               <th className="py-2 text-left">Status</th>
// //               <th className="py-2 text-left">Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {students.map((std) => (
// //               <tr key={std.id} className="border-b">
// //                 <td className="py-3">{std.name}</td>
// //                 <td>{std.roll}</td>

// //                 {/* Status badge */}
// //                 <td>
// //                   {std.status === "Pending" && (
// //                     <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">
// //                       Pending
// //                     </span>
// //                   )}
// //                   {std.status === "Completed" && (
// //                     <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
// //                       Completed
// //                     </span>
// //                   )}
// //                   {std.status === "In Progress" && (
// //                     <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
// //                       In Progress
// //                     </span>
// //                   )}
// //                 </td>

// //                 {/* Action button */}
// //                 <td className="text-red-500 font-semibold cursor-pointer">
// //                   {std.status === "Completed" ? "View" :
// //                    std.status === "In Progress" ? "Continue" :
// //                    "Evaluate"}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SubjectEvaluation;

// //============================================================================================================================================
// // import React from "react";
// // import { useParams } from "react-router-dom";
// // import { evaluationDashboard, studentsData } from "../../constants/constants";

// // const SubjectEvaluation = () => {
// //   const { subjectId } = useParams();

// //   const subject = evaluationDashboard.find(s => s.id === Number(subjectId));

// //   const students = studentsData[subjectId] || [];

// //   const completed = students.filter(s => s.status === "Completed").length;

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <div className="max-w-7xl mx-auto">

// //         {/* Page Header */}
// //         <h1 className="text-3xl font-bold text-gray-800 mb-2">
// //           Evaluation: {subject.subject} – Final Exam
// //         </h1>
// //         <p className="text-gray-600 mb-8">
// //           Select a student to begin the evaluation process.
// //         </p>

// //         {/* Top Stats */}
// //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
// //           <div className="bg-white rounded-xl shadow-sm border p-6">
// //             <p className="text-gray-600 text-sm">Total Students</p>
// //             <p className="text-4xl font-bold text-gray-800">{students.length}</p>
// //           </div>

// //           <div className="bg-white rounded-xl shadow-sm border p-6">
// //             <p className="text-gray-600 text-sm">Evaluations Completed</p>
// //             <p className="text-4xl font-bold text-gray-800">{completed}</p>
// //           </div>

// //           <div className="bg-white rounded-xl shadow-sm border p-6">
// //             <p className="text-gray-600 text-sm">Pending Evaluations</p>
// //             <p className="text-4xl font-bold text-gray-800">
// //               {students.length - completed}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Student Table */}
// //         <div className="bg-white rounded-xl shadow-sm border p-6 overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="border-b bg-gray-50 text-gray-700">
// //                 <th className="py-3 text-left font-medium">Student Name</th>
// //                 <th className="py-3 text-left font-medium">Roll Number</th>
// //                 <th className="py-3 text-left font-medium">Status</th>
// //                 <th className="py-3 text-left font-medium">Action</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {students.map((std) => (
// //                 <tr key={std.id} className="border-b hover:bg-gray-50">
// //                   <td className="py-3">{std.name}</td>
// //                   <td>{std.roll}</td>

// //                   <td>
// //                     {std.status === "Pending" && (
// //                       <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
// //                         Pending
// //                       </span>
// //                     )}
// //                     {std.status === "Completed" && (
// //                       <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
// //                         Completed
// //                       </span>
// //                     )}
// //                     {std.status === "In Progress" && (
// //                       <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
// //                         In Progress
// //                       </span>
// //                     )}
// //                   </td>

// //                   <td className="text-blue-600 font-semibold cursor-pointer">
// //                     {std.status === "Completed"
// //                       ? "View"
// //                       : std.status === "In Progress"
// //                       ? "Continue"
// //                       : "Evaluate"}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default SubjectEvaluation;


// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { evaluationDashboard, studentsData } from "../constants/constants";

// const SubjectEvaluation = () => {
//   const { subjectId } = useParams();
//   // fallback to first subject if param is undefined
//   const sId = subjectId ?? String(evaluationDashboard[0].id);

//   const subject = evaluationDashboard.find(s => s.id === Number(sId)) || evaluationDashboard[0];
//   const students = studentsData[subject.id] || [];
//   const completed = students.filter(s => s.status === "Completed").length;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Evaluation: {subject.subject} – Final Exam
//         </h1>
//         <p className="text-gray-600 mb-8">Select a student to begin the evaluation process.</p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <p className="text-gray-600 text-sm">Total Students</p>
//             <p className="text-4xl font-bold text-gray-800">{students.length}</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <p className="text-gray-600 text-sm">Evaluations Completed</p>
//             <p className="text-4xl font-bold text-gray-800">{completed}</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <p className="text-gray-600 text-sm">Pending Evaluations</p>
//             <p className="text-4xl font-bold text-gray-800">{students.length - completed}</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border p-6 overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b bg-gray-50 text-gray-700">
//                 <th className="py-3 text-left font-medium">Student Name</th>
//                 <th className="py-3 text-left font-medium">Roll Number</th>
//                 <th className="py-3 text-left font-medium">Status</th>
//                 <th className="py-3 text-left font-medium">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((std) => (
//                 <tr key={std.id} className="border-b hover:bg-gray-50">
//                   <td className="py-3">{std.name}</td>
//                   <td>{std.roll}</td>

//                   <td>
//                     {std.status === "Pending" && (
//                       <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pending</span>
//                     )}
//                     {std.status === "Completed" && (
//                       <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span>
//                     )}
//                     {std.status === "In Progress" && (
//                       <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">In Progress</span>
//                     )}
//                   </td>

//                   <td>
//                     {/* Link to evaluation page for that student */}
//                     <Link
//                       to={`/evaluate/${subject.id}/${std.id}`}
//                       className="text-blue-600 font-semibold"
//                     >
//                       {std.status === "Completed" ? "View" : std.status === "In Progress" ? "Continue" : "Evaluate"}
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SubjectEvaluation;


import React from "react";
import { useParams, Link } from "react-router-dom";
import { evaluationDashboard, studentsData } from "../../constants/constants";

const SubjectEvaluation = () => {
  const { subjectId } = useParams();
  // fallback to first subject if param is undefined
  const sId = subjectId ?? String(evaluationDashboard[0].id);

  const subject = evaluationDashboard.find(s => s.id === Number(sId)) || evaluationDashboard[0];
  const students = studentsData[subject.id] || [];
  const completed = students.filter(s => s.status === "Completed").length;

  return (
    <div className="min-h-screen max-w-7xl w-full mx-auto bg-gray-100 p-6">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-600 mb-2">
          Evaluation: {subject.subject} – Final Exam
        </h1>
        <p className="text-gray-400 mb-8 font-semibold">Select a student to begin the evaluation process.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 max-w-[230px]">
            <p className="text-gray-500 text-sm font-bold">Total Students</p>
            <p className="text-4xl font-bold text-gray-600">{students.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 max-w-[230px]">
            <p className="text-gray-500 text-sm font-bold">Evaluations Completed</p>
            <p className="text-4xl font-bold text-gray-600">{completed}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 max-w-[230px]">
            <p className="text-gray-500 text-sm font-bold">Pending Evaluations</p>
            <p className="text-4xl font-bold text-gray-600">{students.length - completed}</p>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl shadow-sm border border-gray-300 p-6 overflow-x-auto max-w-7xl w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-200 text-gray-700">
                <th className="py-3 text-left font-medium">Student Name</th>
                <th className="py-3 text-left font-medium">Roll Number</th>
                <th className="py-3 text-left font-medium">Status</th>
                <th className="py-3 text-left font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((std) => (
                <tr key={std.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="py-3">{std.name}</td>
                  <td>{std.roll}</td>

                  <td>
                    {std.status === "Pending" && (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pending</span>
                    )}
                    {std.status === "Completed" && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span>
                    )}
                    {std.status === "In Progress" && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">In Progress</span>
                    )}
                  </td>

                  <td>
                    {/* Link to evaluation page for that student under /teacher */}
                    <Link
                      to={`/teacher/evaluation/${subject.id}/${std.id}`}
                      className="text-blue-600 font-semibold"
                    >
                      {std.status === "Completed" ? "View" : std.status === "In Progress" ? "Continue" : "Evaluate"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default SubjectEvaluation;
