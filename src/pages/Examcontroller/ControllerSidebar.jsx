


import React from 'react'
import { BiNotification } from 'react-icons/bi'
import { CgAdd } from 'react-icons/cg'
import { GoReport } from 'react-icons/go'
import { GrDashboard } from 'react-icons/gr'
import { PiExam } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
// import { assets } from '../../assets/assets'

const ControllerSidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-400'>
        <NavLink end={true} to='/controller' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <GrDashboard/>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink  to='/controller/create-exam' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <CgAdd/>
            <p className='hidden md:inline-block'>Create Exam</p>
        </NavLink>

        <NavLink  to='/controller/manage-teacher' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <CgAdd/>
            <p className='hidden md:inline-block'>Manage Teacher</p>
        </NavLink>

        <NavLink  to='/controller/add-department' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <PiExam/>
            <p className='hidden md:inline-block'>Create Department</p>
        </NavLink>

        <NavLink  to='/controller/controllernotification' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <BiNotification/>
            <p className='hidden md:inline-block'>Notifications</p>
        </NavLink>
        <NavLink  to='/controller/resultsmanage-' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <BiNotification/>
            <p className='hidden md:inline-block'>Manage Result</p>
        </NavLink>
        <NavLink  to='/controller/reports' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <GoReport/>
            <p className='hidden md:inline-block'>report&Status</p>
        </NavLink>
    </div>
  )
}

export default ControllerSidebar