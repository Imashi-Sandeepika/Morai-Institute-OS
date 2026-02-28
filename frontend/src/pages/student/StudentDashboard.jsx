import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, CreditCard, Bell } from 'lucide-react';

const StudentDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-end pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Student Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Overview of your academic and fee status.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl flex items-center gap-6 relative overflow-hidden">
                    <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <img src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=fff&color=4f46e5`} alt="Profile" className="w-24 h-24 rounded-full border-4 border-indigo-400 shadow-md relative z-10" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-extrabold">{user?.name}</h2>
                        <p className="text-indigo-200 font-medium">Class: 10th Grade</p>
                        <p className="text-indigo-200 font-medium">Roll No: STU-2026-001</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Calendar size={18} /> Attendance</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-5xl font-black text-emerald-500">92%</span>
                        <span className="text-sm font-bold text-gray-600 mb-2">Present this month</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 mt-4 overflow-hidden">
                        <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
