import React from 'react';
import { ArrowLeft, UserPlus, Eye, Calendar, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const navigate = useNavigate();

    const studentData = {
        name: 'Kasuni Bandara',
        studentId: 'SD001',
        className: 'Grade 10 - Mathematics',
        parentName: 'Sunil Bandara',
        parentPhone: '0771111111',
        feeStatus: 'Paid',
        profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299540-5187872.png'
    };

    const paymentHistory = [
        { month: 'February 2026', amount: 2500, status: 'Paid' }
    ];

    // Dummy Attendance Calendar data
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const attendance = {
        1: 'present', 2: 'present', 3: 'absent', 4: 'present', 5: 'late',
        6: 'present', 7: 'present', 8: 'present', 9: 'absent', 10: 'present',
        11: 'present', 12: 'present', 13: 'present', 14: 'present', 15: 'present',
        16: 'present', 17: 'present', 18: 'present', 19: 'present', 20: 'present',
        21: 'present', 22: 'present', 23: 'present', 24: 'present', 25: 'present',
        26: 'present', 27: 'present', 28: 'present'
    };

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <div>
                        <h1 className="text-[24px] font-[900] text-gray-900 leading-tight">Student Profile</h1>
                        <p className="text-gray-500 font-bold text-[13px]">{studentData.name}</p>
                    </div>
                </div>
                <button className="bg-[#3b82f6] hover:bg-blue-700 text-white flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold transition-transform shadow-sm">
                    <UserPlus size={18} className="mr-2" /> Add New Student
                </button>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <h3 className="text-sm font-[900] text-gray-900 mb-6 uppercase tracking-wider">Basic Information</h3>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 shadow-sm">
                        <img src={studentData.profilePicture} alt={studentData.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 flex-1">
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Full Name</p>
                            <p className="text-[14px] font-[700] text-gray-900">{studentData.name}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Student ID</p>
                            <p className="text-[14px] font-[700] text-gray-900">{studentData.studentId}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Class</p>
                            <p className="text-[14px] font-[700] text-gray-900">{studentData.className}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Parent Name</p>
                            <p className="text-[14px] font-[700] text-gray-900">{studentData.parentName}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Parent Phone</p>
                            <p className="text-[14px] font-[700] text-gray-900">{studentData.parentPhone}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-[900] text-gray-500 uppercase mb-1">Fee Status</p>
                            <span className="bg-[#10b981] text-white px-3 py-1 rounded-full text-[10px] font-[900] uppercase tracking-wider">
                                {studentData.feeStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-800">
                                <th className="py-4 font-[900] text-[12px] uppercase">Month</th>
                                <th className="py-4 font-[900] text-[12px] uppercase">Amount</th>
                                <th className="py-4 font-[900] text-[12px] uppercase">Payment Status</th>
                                <th className="py-4 font-[900] text-[12px] uppercase text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((p, i) => (
                                <tr key={i} className="border-b border-gray-50">
                                    <td className="py-5 font-[700] text-gray-600 text-[13px]">{p.month}</td>
                                    <td className="py-5 font-[700] text-gray-900 text-[13px]">Rs {p.amount.toLocaleString()}</td>
                                    <td className="py-5">
                                        <span className="bg-[#10b981] text-white px-4 py-1.5 rounded-lg text-[10px] font-[900] uppercase tracking-wider">
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-5 text-right font-[700] text-[13px]">
                                        <button className="flex items-center gap-1.5 ml-auto text-gray-900 hover:text-[#3b82f6] transition-colors">
                                            <Eye size={16} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Attendance Calendar */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-[900] text-gray-900 uppercase tracking-wider">Attendance Calendar - February 2026</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
                            <span className="text-[11px] font-[900] text-gray-500 uppercase px-1">Present</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#f87171]"></div>
                            <span className="text-[11px] font-[900] text-gray-500 uppercase px-1">Absent</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
                            <span className="text-[11px] font-[900] text-gray-500 uppercase px-1">Late</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="grid grid-cols-7 gap-3 mb-4 text-center">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-[11px] font-[900] text-gray-400 uppercase">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-3">
                        <div className="aspect-square"></div> {/* Empty days padding if needed */}
                        {days.map(day => (
                            <div
                                key={day}
                                className={`aspect-square flex items-center justify-center text-[13px] font-[800] rounded-xl relative group cursor-default transition-all duration-200 border border-gray-100 ${attendance[day] === 'present' ? 'bg-[#10b981]/10 text-[#10b981]' :
                                        attendance[day] === 'absent' ? 'bg-[#f87171]/10 text-[#f87171]' :
                                            'bg-[#f59e0b]/10 text-[#f59e0b]'
                                    }`}
                            >
                                {day}
                                <div className={`absolute -bottom-1 w-1 h-1 rounded-full ${attendance[day] === 'present' ? 'bg-[#10b981]' :
                                        attendance[day] === 'absent' ? 'bg-[#f87171]' :
                                            'bg-[#f59e0b]'
                                    }`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button className="flex-1 bg-[#3b82f6] hover:bg-blue-700 text-white py-3.5 rounded-xl font-[900] text-sm shadow-sm transition-transform active:scale-95">
                    Edit Student
                </button>
                <button className="flex-1 bg-[#f87171] hover:bg-red-600 text-white py-3.5 rounded-xl font-[900] text-sm shadow-sm transition-transform active:scale-95">
                    Delete Student
                </button>
                <button className="flex-1 bg-[#10b981] hover:bg-emerald-600 text-white py-3.5 rounded-xl font-[900] text-sm shadow-sm transition-transform active:scale-95">
                    Assign New Class
                </button>
            </div>
        </div>
    );
};

export default StudentProfile;
