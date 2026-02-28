import React, { useState } from 'react';
import { ChevronDown, Calendar, X, ClipboardList } from 'lucide-react';

const ManageAttendance = () => {
    // Dummy Data to match the image accurately
    const attendanceRecords = [
        { id: 1, name: 'Kasuni Bandara', studentId: 'SD001', className: 'Grade 10 - Mathematics', date: '2026-02-20', status: 'Present', time: '' },
        { id: 2, name: 'Dilini Jayasinghe', studentId: 'SD201', className: 'Grade 11 - Science', date: '2026-02-20', status: 'Absent', time: '' },
        { id: 3, name: 'Thisara Wickramasinghe', studentId: 'SD409', className: 'Grade 9 - English', date: '2026-02-20', status: 'Present', time: '' },
        { id: 4, name: 'Nethmi Gunasekara', studentId: 'SD908', className: 'Grade 8 - Sinhala', date: '2026-02-20', status: 'Present', time: '' },
        { id: 5, name: 'Sahan Mendis', studentId: 'SD398', className: 'Grade 10 - Mathematics', date: '2026-02-20', status: 'Absent', time: '' },
        { id: 6, name: 'Kavindi Silva', studentId: 'SD988', className: 'Grade 11 - Science', date: '2026-02-20', status: 'Present', time: '3.07 PM' },
    ];

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Attendance Management</h1>
                    <p className="text-gray-500 font-bold text-[13px] mt-0.5">Monitor and manage student attendance</p>
                </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
                <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between">
                    <p className="text-[15px] font-[800] text-gray-900 mb-4">Total Present</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-3xl font-[900] text-[#10b981]">1020</h3>
                    </div>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between relative">
                    <p className="text-[15px] font-[800] text-gray-900 mb-4">Total Absent</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-3xl font-[900] text-[#f87171]">89</h3>
                    </div>
                    <X className="absolute right-6 bottom-6 text-[#f87171]" size={28} strokeWidth={3} />
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between relative">
                    <p className="text-[15px] font-[800] text-gray-900 mb-4">Attendance %</p>
                    <div className="flex justify-between items-end">
                        <h3 className="text-3xl font-[900] text-[#3b82f6]">92 %</h3>
                    </div>
                    <ClipboardList className="absolute right-6 bottom-6 text-[#3b82f6]" size={28} strokeWidth={2.5} />
                </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 mt-6">

                {/* Filters */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-[13px] font-[900] text-gray-900 mb-2">Filter By Class</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 font-[700] text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer">
                                <option>All Classes</option>
                                <option>Grade 10 - Mathematics</option>
                                <option>Grade 11 - Science</option>
                                <option>Grade 9 - English</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[13px] font-[900] text-gray-900 mb-2">Filter By Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                defaultValue="February 2026"
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 font-[700] text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none stroke-[2px]" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[13px] font-[900] text-gray-900 mb-2">Filter By Teacher</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 font-[700] text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer">
                                <option>All Teacher</option>
                                <option>Nimal Perera</option>
                                <option>Kamala Silva</option>
                                <option>Ruwan Fernando</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="py-4 font-bold text-gray-900 text-[12px] tracking-wide text-left pl-2 w-[18%]">Student Name</th>
                                <th className="py-4 font-bold text-gray-900 text-[12px] tracking-wide text-left w-[12%]">Student ID</th>
                                <th className="py-4 font-bold text-gray-900 text-[12px] tracking-wide text-left w-[22%]">Class</th>
                                <th className="py-4 font-bold text-gray-900 text-[12px] tracking-wide text-left w-[15%]">Date</th>
                                <th className="py-4 font-bold text-gray-900 text-[12px] tracking-wide w-[18%] text-left">Attendance Status</th>
                                <th className="py-4 font-bold text-gray-900 text-[12px] tracking-wide text-left w-[15%]">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords.map((record) => (
                                <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-[800] text-gray-900 text-[13px] text-left pl-2">{record.name}</td>
                                    <td className="py-5 font-[600] text-gray-700 text-[12px] text-left">{record.studentId}</td>
                                    <td className="py-5 font-[600] text-gray-600 text-[12px] text-left">{record.className}</td>
                                    <td className="py-5 font-[600] text-gray-600 text-[12px] text-left">{record.date}</td>
                                    <td className="py-5 text-left">
                                        <span className={`px-4 py-1.5 rounded-[10px] text-[11px] font-[800] shadow-sm inline-block min-w-[70px] text-center ${record.status === 'Present' ? 'bg-[#10b981] text-white' : 'bg-[#f87171] text-white'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="py-5 font-[800] text-gray-900 text-[12px] text-left">{record.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageAttendance;
