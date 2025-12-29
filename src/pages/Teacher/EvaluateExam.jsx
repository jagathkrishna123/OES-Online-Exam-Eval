import React from "react";
import { evaluationDashboard } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const EvaluateExam = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {evaluationDashboard.map((item) => {
        const percentage = Math.round(
          (item.evaluatedPapers / item.totalPapers) * 100
        );

        return (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            {/* Subject + Department */}
            <h2 className="text-xl font-semibold">{item.subject}</h2>
            <p className="text-sm text-gray-600">{item.department}</p>

            {/* Due Badge */}
            {item.status !== "completed" && (
              <div className="inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full mt-2">
                Due in {item.dueInDays} days
              </div>
            )}

            {item.status === "completed" && (
              <div className="inline-block bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full mt-2">
                Completed
              </div>
            )}

            {/* Pending Papers */}
            <p className="text-4xl font-bold mt-4">{item.pendingPapers}</p>
            <p className="text-sm text-gray-500">Papers Pending</p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>
                  {item.evaluatedPapers}/{item.totalPapers} Evaluated
                </span>
              </div>

              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    item.status === "completed" ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate(`/teacher/evaluation/${item.id}`)}
              className={`w-full mt-5 py-2 rounded-lg text-white font-medium ${
                item.status === "completed"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {item.action}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EvaluateExam;
