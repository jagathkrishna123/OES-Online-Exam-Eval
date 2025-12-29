import React from "react";
import { FaUsers, FaSchool, FaBell, FaBook, FaClipboardCheck } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";

const ControllerDashboard = () => {
  const stats = [
    {
      title: "Total Teachers",
      value: 18,
      icon: <GiTeacher size={30} />,
      color: "bg-blue-600",
    },
    {
      title: "Total Departments",
      value: 5,
      icon: <FaSchool size={30} />,
      color: "bg-orange-500",
    },
    {
      title: "Total Students",
      value: 240,
      icon: <FaUsers size={30} />,
      color: "bg-green-600",
    },
    {
      title: "Total Subjects",
      value: 14,
      icon: <FaBook size={30} />,
      color: "bg-purple-600",
    },
    {
      title: "Pending Evaluations",
      value: 34,
      icon: <MdPendingActions size={30} />,
      color: "bg-red-600",
    },
    {
      title: "Evaluated Papers",
      value: 186,
      icon: <FaClipboardCheck size={30} />,
      color: "bg-teal-600",
    },
    {
      title: "Notifications",
      value: 7,
      icon: <FaBell size={30} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Controller Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-4 p-6 rounded-xl shadow-sm border-2 border-gray-200  text-gray-500'
          >
            <div className="p-4 bg-white bg-opacity-25 rounded-full">
              {item.icon}
            </div>

            <div>
              <h2 className="text-lg">{item.title}</h2>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>

        <ul className="space-y-3">
          <li className="p-3 border-b text-gray-700">New exam created for BSc CS</li>
          <li className="p-3 border-b text-gray-700">3 answer sheets uploaded in Physics</li>
          <li className="p-3 border-b text-gray-700">Teacher Asha evaluated 12 papers</li>
          <li className="p-3 text-gray-700">Department of Commerce added new subject</li>
        </ul>
      </div>
    </div>
  );
};

export default ControllerDashboard;
