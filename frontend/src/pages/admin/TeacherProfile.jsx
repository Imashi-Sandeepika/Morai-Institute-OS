import React from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherProfile = () => {
    const navigate = useNavigate();

    const teacherData = {
        name: 'Nimal Perera',
        nic: '154567890V',
        phone: '0771234567',
        email: 'nimal@example.com',
        subject: 'Mathematics',
        salary: 50000,
        status: 'Active',
        address: 'Colombo 07',
        profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png'
    };

    const classData = [
        { name: 'Grade 10 - Mathematics', schedule: 'Mon, Wed, Fri - 3:00 PM', students: 120, fee: 2500 }
    ];

    const salaryHistory = [
        { month: 'January 2026', amount: 50000, status: 'Paid', date: '2026-01-31' },
        { month: 'February 2026', amount: 50000, status: 'Unpaid', date: '-' }
    ];

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <button className="bg-[#3b82f6] hover:bg-blue-700 text-white flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold transition-transform shadow-sm">
                    <UserPlus size={18} className="mr-2" /> Add New Teacher
                </button>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <h3 className="text-sm font-[900] text-gray-900 mb-6 uppercase tracking-wider">Basic Information</h3>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 shadow-sm">
                        <img src={teacherData.profilePicture} alt={teacherData.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 flex-1">
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Full Name</p>
                            <p className="text-[14px] font-[700] text-gray-900">{teacherData.name}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">NIC</p>
                            <p className="text-[14px] font-[700] text-gray-900">{teacherData.nic}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Phone Number</p>
                            <p className="text-[14px] font-[700] text-gray-900">{teacherData.phone}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Email</p>
                            <p className="text-[14px] font-[700] text-gray-900">{teacherData.email}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Subject</p>
                            <p className="text-[14px] font-[700] text-gray-900">{teacherData.subject}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Monthly Salary</p>
                            <p className="text-[14px] font-[700] text-gray-900">Rs {teacherData.salary.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Status</p>
                            <span className="bg-[#10b981] text-white px-3 py-1 rounded-full text-[10px] font-[900] uppercase tracking-wider">
                                {teacherData.status}
                            </span>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Address</p>
                            <p className="text-[14px] font-[700] text-gray-900">{teacherData.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Classes */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide text-left">Class Name</th>
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide">Schedule</th>
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide">Number of Students</th>
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide text-right">Monthly Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classData.map((cls, i) => (
                                <tr key={i} className="border-b border-gray-50">
                                    <td className="py-5 font-[700] text-gray-900 text-[13px] text-left">{cls.name}</td>
                                    <td className="py-5 font-[700] text-gray-600 text-[13px]">{cls.schedule}</td>
                                    <td className="py-5 font-[700] text-gray-900 text-[13px]">{cls.students}</td>
                                    <td className="py-5 font-[700] text-gray-900 text-[13px] text-right">Rs. {cls.fee.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Salary Payment History */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <h3 className="text-sm font-[900] text-gray-900 mb-6 uppercase tracking-wider text-left">Salary Payment History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide text-left">Month</th>
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide text-left">Salary Amount</th>
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide">Payment Status</th>
                                <th className="py-4 font-[900] text-gray-900 text-[12px] uppercase tracking-wide text-right">Payment Dates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryHistory.map((history, i) => (
                                <tr key={i} className="border-b border-gray-50">
                                    <td className="py-5 font-[700] text-gray-900 text-[13px] text-left">{history.month}</td>
                                    <td className="py-5 font-[700] text-gray-900 text-[13px] text-left">Rs {history.amount.toLocaleString()}</td>
                                    <td className="py-5">
                                        <span className={`px-4 py-1.5 rounded-lg text-[10px] font-[900] uppercase tracking-wider ${history.status === 'Paid' ? 'bg-[#10b981] text-white' : 'bg-[#f87171] text-white'}`}>
                                            {history.status}
                                        </span>
                                    </td>
                                    <td className="py-5 font-[700] text-gray-600 text-[13px] text-right">{history.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button className="flex-1 bg-[#3b82f6] hover:bg-blue-700 text-white py-3.5 rounded-xl font-[900] text-sm shadow-sm transition-transform active:scale-95">
                    Edit Teacher
                </button>
                <button className="flex-1 bg-[#f87171] hover:bg-red-600 text-white py-3.5 rounded-xl font-[900] text-sm shadow-sm transition-transform active:scale-95">
                    Delete Teacher
                </button>
            </div>
        </div>
    );
};

export default TeacherProfile;
