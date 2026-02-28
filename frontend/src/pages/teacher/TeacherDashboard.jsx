import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, CheckCircle } from 'lucide-react';

const TeacherDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-end pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Teacher Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Today's Classes</p>
                        <h3 className="text-2xl font-extrabold text-gray-800">4</h3>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Total Students</p>
                        <h3 className="text-2xl font-extrabold text-gray-800">120</h3>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Attendance Marked</p>
                        <h3 className="text-2xl font-extrabold text-gray-800">2/4</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 text-center mt-6">
                <BookOpen size={48} className="mx-auto text-indigo-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Schedule</h3>
                <p className="text-gray-500">Your upcoming classes and schedule will appear here.</p>
            </div>
        </div>
    );
};

export default TeacherDashboard;
