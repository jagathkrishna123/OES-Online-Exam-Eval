export const teacherDashboard_data = {
  totalsubjects: 12,
  totalstudents: 3,
  evaluatedpapers: 9,
  pendingevaluation: 240,
  attendance: 180,
  notifications: 95
};

export const evaluationDashboard = [
  {
    id: 1,
    subject: "Advanced Calculus",
    department: "Dept. of Mathematics",
    pendingPapers: 87,
    totalPapers: 120,
    evaluatedPapers: 33,
    dueInDays: 5,
    status: "pending", // pending | completed
    action: "Start Evaluating",
  },
  {
    id: 2,
    subject: "Digital Signal Processing",
    department: "Electrical Engineering",
    pendingPapers: 112,
    totalPapers: 120,
    evaluatedPapers: 8,
    dueInDays: 2,
    status: "pending",
    action: "Continue",
  },
  {
    id: 3,
    subject: "Quantum Physics",
    department: "Dept. of Physics",
    pendingPapers: 45,
    totalPapers: 50,
    evaluatedPapers: 5,
    dueInDays: 15,
    status: "pending",
    action: "Start Evaluating",
  },
  {
    id: 4,
    subject: "Organic Chemistry",
    department: "Dept. of Chemistry",
    pendingPapers: 0,
    totalPapers: 75,
    evaluatedPapers: 75,
    dueInDays: null,
    status: "completed",
    action: "View Report",
  },
  {
    id: 5,
    subject: "Modern European History",
    department: "Dept. of History",
    pendingPapers: 23,
    totalPapers: 100,
    evaluatedPapers: 77,
    dueInDays: 11,
    status: "pending",
    action: "Continue",
  },
];



// export const studentsData = [
//   {
//     id: 1,
//     name: "Aarav Nair",
//     registerNo: "REG2024001",
//     department: "Computer Science",
//     semester: 5,
//     subject: "Data Structures",
//     totalMarks: 100,
//     scoredMarks: 78,
//     status: "Pass",
//     evaluationStatus: "Evaluated"
//   },
//   {
//     id: 2,
//     name: "Diya Varma",
//     registerNo: "REG2024002",
//     department: "Computer Science",
//     semester: 5,
//     subject: "Data Structures",
//     totalMarks: 100,
//     scoredMarks: 64,
//     status: "Pass",
//     evaluationStatus: "Evaluated"
//   },
//   {
//     id: 3,
//     name: "Noah Mathew",
//     registerNo: "REG2024003",
//     department: "Electrical Engineering",
//     semester: 3,
//     subject: "Circuit Theory",
//     totalMarks: 100,
//     scoredMarks: 0,
//     status: "Pending",
//     evaluationStatus: "Not Evaluated"
//   },
//   {
//     id: 4,
//     name: "Ananya Joseph",
//     registerNo: "REG2024004",
//     department: "Mechanical Engineering",
//     semester: 7,
//     subject: "Thermodynamics",
//     totalMarks: 100,
//     scoredMarks: 92,
//     status: "Pass",
//     evaluationStatus: "Evaluated"
//   },
//   {
//     id: 5,
//     name: "Rahul Menon",
//     registerNo: "REG2024005",
//     department: "Civil Engineering",
//     semester: 1,
//     subject: "Engineering Mathematics",
//     totalMarks: 100,
//     scoredMarks: 41,
//     status: "Pass",
//     evaluationStatus: "Evaluated"
//   },
//   {
//     id: 6,
//     name: "Sneha Raj",
//     registerNo: "REG2024006",
//     department: "Computer Science",
//     semester: 5,
//     subject: "Data Structures",
//     totalMarks: 100,
//     scoredMarks: 0,
//     status: "Pending",
//     evaluationStatus: "Not Evaluated"
//   },
//   {
//     id: 7,
//     name: "Vishnu S",
//     registerNo: "REG2024007",
//     department: "Mechanical Engineering",
//     semester: 7,
//     subject: "Thermodynamics",
//     totalMarks: 100,
//     scoredMarks: 56,
//     status: "Pass",
//     evaluationStatus: "Evaluated"
//   },
//   {
//     id: 8,
//     name: "Meera Ramesh",
//     registerNo: "REG2024008",
//     department: "Electrical Engineering",
//     semester: 3,
//     subject: "Circuit Theory",
//     totalMarks: 100,
//     scoredMarks: 33,
//     status: "Fail",
//     evaluationStatus: "Evaluated"
//   },
//   {
//     id: 9,
//     name: "Adithya Pillai",
//     registerNo: "REG2024009",
//     department: "Civil Engineering",
//     semester: 1,
//     subject: "Engineering Mathematics",
//     totalMarks: 100,
//     scoredMarks: 0,
//     status: "Pending",
//     evaluationStatus: "Not Evaluated"
//   },
//   {
//     id: 10,
//     name: "Kavya Krishna",
//     registerNo: "REG2024010",
//     department: "Computer Science",
//     semester: 5,
//     subject: "Data Structures",
//     totalMarks: 100,
//     scoredMarks: 88,
//     status: "Pass",
//     evaluationStatus: "Evaluated"
//   }
// ];


export const studentsData = {
  1: [ // Advanced Calculus
    {
      id: 1,
      name: "Aarav Nair",
      roll: "AC001",
      status: "Pending"
    },
    {
      id: 2,
      name: "Diya Varma",
      roll: "AC002",
      status: "Completed"
    },
    {
      id: 3,
      name: "Kavya Krishna",
      roll: "AC003",
      status: "In Progress"
    }
  ],

  2: [ // Digital Signal Processing
    {
      id: 4,
      name: "Noah Mathew",
      roll: "DSP001",
      status: "Pending"
    },
    {
      id: 5,
      name: "Meera Ramesh",
      roll: "DSP002",
      status: "Completed"
    }
  ],

  3: [ // Quantum Physics
    {
      id: 6,
      name: "Ananya Joseph",
      roll: "QP001",
      status: "Pending"
    }
  ],

  4: [ // Organic Chemistry
    {
      id: 7,
      name: "Vishnu S",
      roll: "OC001",
      status: "Completed"
    },
    {
      id: 8,
      name: "Sneha Raj",
      roll: "OC002",
      status: "Completed"
    }
  ],

  5: [ // Modern European History
    {
      id: 9,
      name: "Rahul Menon",
      roll: "HIS001",
      status: "Pending"
    },
    {
      id: 10,
      name: "Adithya Pillai",
      roll: "HIS002",
      status: "In Progress"
    }
  ]
};

export const DEPARTMENTDATAS = [
  {
    name: "CSE",
    years: {
      "1st Year": ["Engineering Mathematics", "C Programming", "Digital Logic"],
      "2nd Year": ["Data Structures", "Operating Systems", "DBMS"],
      "3rd Year": ["Computer Networks", "AI", "Web Technologies"],
      "4th Year": ["Machine Learning", "Cloud Computing", "Cyber Security"],
    },
  },
  {
    name: "ECE",
    years: {
      "1st Year": ["Engineering Mathematics", "Basic Electronics"],
      "2nd Year": ["Analog Circuits", "Digital Electronics"],
      "3rd Year": ["Communication Systems", "VLSI Design"],
      "4th Year": ["Embedded Systems", "IoT"],
    },
  },
  {
    name: "EEE",
    years: {
      "1st Year": ["Engineering Mathematics", "Basic Electrical Engineering"],
      "2nd Year": ["Electrical Machines", "Measurements"],
      "3rd Year": ["Power Systems", "Control Systems"],
      "4th Year": ["Renewable Energy", "Smart Grid"],
    },
  },
  {
    name: "ME",
    years: {
      "1st Year": ["Engineering Mathematics", "Engineering Mechanics"],
      "2nd Year": ["Thermodynamics", "Fluid Mechanics"],
      "3rd Year": ["Machine Design", "Manufacturing Technology"],
      "4th Year": ["CAD/CAM", "Robotics"],
    },
  },
  {
    name: "CE",
    years: {
      "1st Year": ["Engineering Mathematics", "Engineering Drawing"],
      "2nd Year": ["Structural Analysis", "Geotechnical Engineering"],
      "3rd Year": ["Transportation Engineering", "Environmental Engineering"],
      "4th Year": ["Concrete Technology", "Construction Planning"],
    },
  },
  {
    name: "IT",
    years: {
      "1st Year": ["Programming Fundamentals", "Discrete Mathematics"],
      "2nd Year": ["Object Oriented Programming", "DBMS"],
      "3rd Year": ["Software Engineering", "Web Development"],
      "4th Year": ["Big Data Analytics", "Cloud Services"],
    },
  },
  {
    name: "AI & DS",
    years: {
      "1st Year": ["Linear Algebra", "Python Programming"],
      "2nd Year": ["Data Structures", "Probability & Statistics"],
      "3rd Year": ["Machine Learning", "Data Mining"],
      "4th Year": ["Deep Learning", "AI Ethics"],
    },
  },
  {
    name: "AI & ML",
    years: {
      "1st Year": ["Mathematics for AI", "Python"],
      "2nd Year": ["Data Structures", "Statistics"],
      "3rd Year": ["Machine Learning", "Neural Networks"],
      "4th Year": ["Natural Language Processing", "Computer Vision"],
    },
  },
  {
    name: "CSBS",
    years: {
      "1st Year": ["Business Mathematics", "Programming Basics"],
      "2nd Year": ["Data Structures", "Business Analytics"],
      "3rd Year": ["AI for Business", "Financial Technology"],
      "4th Year": ["Digital Transformation", "Enterprise Systems"],
    },
  },
  {
    name: "MECHATRONICS",
    years: {
      "1st Year": ["Engineering Mathematics", "Basic Electronics"],
      "2nd Year": ["Mechanical Systems", "Sensors & Actuators"],
      "3rd Year": ["Control Systems", "Embedded Systems"],
      "4th Year": ["Industrial Automation", "Robotics"],
    },
  },
];
