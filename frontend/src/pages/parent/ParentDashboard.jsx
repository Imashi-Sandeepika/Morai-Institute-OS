import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, FileText } from 'lucide-react';

const ParentDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-end pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Parent Portal</h1>
                    <p className="text-gray-500 text-sm mt-1">Track your children's progress and fees.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 text-center py-16">
                <Users size={48} className="mx-auto text-indigo-200 mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to Parent Portal</h2>
                <p className="text-gray-500 max-w-sm mx-auto">Your enrolled children's details, fee slips, and attendance will appear here once linked by the institute administrator.</p>
            </div>
        </div>
    );
};

export default ParentDashboard;
