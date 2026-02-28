import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';

const ManageFees = () => {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    const dummyFees = [
        { _id: '1', studentName: 'Kasuni Bandara', studentId: 'SD001', className: 'Grade 10 - Mathematics', month: 'February 2026', amount: 2500, status: 'Paid' },
        { _id: '2', studentName: 'Dilini Jayasinghe', studentId: 'SD201', className: 'Grade 11 - Science', month: 'February 2026', amount: 2000, status: 'Unpaid' },
        { _id: '3', studentName: 'Thisara Wickramasinghe', studentId: 'SD409', className: 'Grade 9 - English', month: 'February 2026', amount: 3000, status: 'Paid' },
        { _id: '4', studentName: 'Nethmi Gunasekara', studentId: 'SD908', className: 'Grade 8 - Sinhala', month: 'February 2026', amount: 3000, status: 'Partial' },
        { _id: '5', studentName: 'Sahan Mendis', studentId: 'SD398', className: 'Grade 10 - Mathematics', month: 'February 2026', amount: 1500, status: 'Unpaid' },
        { _id: '6', studentName: 'Kavindi Silva', studentId: 'SD988', className: 'Grade 11 - Science', month: 'February 2026', amount: 2200, status: 'Paid' }
    ];

    useEffect(() => {
        const fetchFees = async () => {
            try {
                // Adjust route later based on actual backend
                const res = await axios.get('http://localhost:5000/api/admin/fees');
                if (res.data && res.data.length > 0) {
                    setFees(res.data);
                } else {
                    setFees(dummyFees);
                }
            } catch (err) {
                console.error(err);
                setFees(dummyFees);
            } finally {
                setLoading(false);
            }
        };
        fetchFees();
        // eslint-disable-next-line
    }, []);

    if (loading) return <div className="h-full flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Paid': return 'bg-[#10b981] text-white';
            case 'Unpaid': return 'bg-[#f87171] text-white';
            case 'Partial': return 'bg-[#f59e0b] text-white';
            default: return 'bg-gray-400 text-white';
        }
    };

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Fee Management</h1>
                    <p className="text-gray-500 font-bold text-[13px] mt-0.5">Manage and Monitor student payments</p>
                </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 mt-8">

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-[900] text-gray-900 mb-2">Filter By Class</label>
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
                        <label className="block text-sm font-[900] text-gray-900 mb-2">Filter By Month</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 font-[700] text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer">
                                <option>February 2026</option>
                                <option>January 2026</option>
                                <option>December 2025</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-[900] text-gray-900 mb-2">Filter By Status</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 font-[700] text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer">
                                <option>All Status</option>
                                <option>Paid</option>
                                <option>Unpaid</option>
                                <option>Partial</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide text-left pl-4 w-[18%]">Student Name</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[12%]">Student ID</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide text-left w-[25%]">Class</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Month</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Amount</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee, index) => (
                                <tr key={fee._id || index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-extrabold text-gray-900 text-[14px] text-left pl-4">{fee.studentName}</td>
                                    <td className="py-5 font-semibold text-gray-700 text-[13px]">{fee.studentId}</td>
                                    <td className="py-5 font-semibold text-gray-600 text-[13px] text-left">{fee.className}</td>
                                    <td className="py-5 font-semibold text-gray-600 text-[13px]">{fee.month}</td>
                                    <td className="py-5 font-bold text-gray-600 text-[14px]">
                                        Rs {fee.amount ? fee.amount.toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="py-5">
                                        <div className="flex justify-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm inline-block min-w-[70px] text-center ${getStatusStyle(fee.status)}`}>
                                                {fee.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageFees;
