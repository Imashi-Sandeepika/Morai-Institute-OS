import React, { useState, useEffect } from 'react';
import { ArrowLeft, UserPlus, Eye, ChevronDown, Calendar } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ClassDetails = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/api/admin/classes/${id}`);
                setClassInfo(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClassDetails();
    }, [id]);

    if (loading) return <div className="h-full flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

    if (!classInfo) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-700">Class Not Found</h2>
                <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">Go Back</button>
            </div>
        );
    }

    const studentList = [
        { name: 'Kasun Bandara', phone: '0771111111', feeStatus: 'Paid', attendanceStatus: 'Present' },
        { name: 'Sahan Mendis', phone: '0775555555', feeStatus: 'Unpaid', attendanceStatus: 'Present' }
    ];

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <div>
                        <h1 className="text-[24px] font-[900] text-gray-900 leading-tight">Class Details</h1>
                        <p className="text-gray-500 font-bold text-[13px]">{classInfo.name}</p>
                    </div>
                </div>
                <button className="bg-[#3b82f6] hover:bg-blue-700 text-white flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold transition-transform shadow-sm">
                    <UserPlus size={18} className="mr-2" /> Add New Teacher
                </button>
            </div>

            {/* Class Information */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <h3 className="text-sm font-[900] text-gray-900 mb-8 uppercase tracking-wider">Class Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-8">
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                        <p className="text-[12px] font-[900] text-gray-500 uppercase">Class Name</p>
                        <p className="text-[14px] font-[700] text-gray-900">{classInfo.name}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                        <p className="text-[12px] font-[900] text-gray-500 uppercase">Subject</p>
                        <p className="text-[14px] font-[700] text-gray-900">{classInfo.subject}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                        <p className="text-[12px] font-[900] text-gray-500 uppercase">Assigned Teacher</p>
                        <p className="text-[14px] font-[700] text-gray-900">{classInfo.teacher}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                        <p className="text-[12px] font-[900] text-gray-500 uppercase">Number of Students</p>
                        <p className="text-[14px] font-[700] text-gray-900">{classInfo.students}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                        <p className="text-[12px] font-[900] text-gray-500 uppercase">Monthly Fee</p>
                        <p className="text-[14px] font-[700] text-gray-900">Rs {classInfo.fee ? classInfo.fee.toLocaleString() : 'N/A'}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                        <p className="text-[12px] font-[900] text-gray-500 uppercase">Schedule</p>
                        <p className="text-[14px] font-[700] text-gray-900">{classInfo.schedule || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[13px] font-[900] text-gray-900 mb-3 uppercase tracking-wider">Filter Student</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-3.5 pl-5 pr-12 font-[800] text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer">
                                <option>All</option>
                                <option>Paid</option>
                                <option>Unpaid</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[13px] font-[900] text-gray-900 mb-3 uppercase tracking-wider">Select Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="YYYY-MM-DD"
                                className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-5 pr-12 font-[700] text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer"
                            />
                            <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-4">
                    <h3 className="text-[15px] font-[900] text-gray-900 px-1 flex items-center gap-4">
                        Student <span className="text-[#3b82f6] text-[18px]">{classInfo.students}</span>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-center table-auto">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="py-4 font-[900] text-gray-900 text-[11px] uppercase tracking-wide text-left pl-10">Student Name</th>
                                    <th className="py-4 font-[900] text-gray-900 text-[11px] uppercase tracking-wide">Parent Phone Number</th>
                                    <th className="py-4 font-[900] text-gray-900 text-[11px] uppercase tracking-wide">Fee Status</th>
                                    <th className="py-4 font-[900] text-gray-900 text-[11px] uppercase tracking-wide">Attendance Status (2026-02-20)</th>
                                    <th className="py-4 font-[900] text-gray-900 text-[11px] uppercase tracking-wide text-right pr-10">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((student, i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors">
                                        <td className="py-5 font-[800] text-gray-900 text-[13px] text-left pl-10">{student.name}</td>
                                        <td className="py-5 font-[700] text-gray-600 text-[13px]">{student.phone}</td>
                                        <td className="py-5">
                                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-[900] uppercase tracking-wider ${student.feeStatus === 'Paid' ? 'bg-[#10b981] text-white' : 'bg-[#f87171] text-white'}`}>
                                                {student.feeStatus}
                                            </span>
                                        </td>
                                        <td className="py-5">
                                            <span className="bg-[#10b981] text-white px-4 py-1.5 rounded-lg text-[10px] font-[900] uppercase tracking-wider">
                                                {student.attendanceStatus}
                                            </span>
                                        </td>
                                        <td className="py-5 text-right pr-10">
                                            <Link to={`/admin/students/S${i}`} className="flex items-center gap-1.5 ml-auto text-gray-900 hover:text-[#3b82f6] transition-colors font-[900] text-[12px]">
                                                <Eye size={16} /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
