import React, { useState } from 'react';
import { ChevronDown, FileDown, BarChart3, Users, Landmark } from 'lucide-react';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('Unpaid Fees');

    const unpaidFeesData = [
        { id: 1, name: 'Kasuni Bandara', className: 'Grade 10 - Mathematics', month: 'February 2026', amount: 2500, phone: '0771111111' },
        { id: 2, name: 'Dilini Jayasinghe', className: 'Grade 11 - Science', month: 'February 2026', amount: 2000, phone: '0772222222' },
        { id: 3, name: 'Thisara Wickramasinghe', className: 'Grade 9 - English', month: 'February 2026', amount: 3000, phone: '0773333333' },
        { id: 4, name: 'Nethmi Gunasekara', className: 'Grade 8 - Sinhala', month: 'February 2026', amount: 3000, phone: '0774444444' },
        { id: 5, name: 'Sahan Mendis', className: 'Grade 10 - Mathematics', month: 'February 2026', amount: 3000, phone: '0775555555' },
        { id: 6, name: 'Amaya Fernando', className: 'Grade 8 - Sinhala', month: 'February 2026', amount: 2500, phone: '0778888888' },
    ];

    const monthlyIncomeData = [
        { id: 1, month: 'Jan', totalIncome: 125000, growth: '+0 %', growthColor: 'text-[#10b981]' },
        { id: 2, month: 'Feb', totalIncome: 98000, growth: '-21.6 %', growthColor: 'text-[#f87171]' },
    ];

    const attendanceReportData = [
        { id: 1, name: 'Dilini Jayasinghe', className: 'Grade 11 - Science', days: 4, percentage: '100.0%', status: 'Good' },
        { id: 2, name: 'Sahan Mendis', className: 'Grade 10 - Mathematics', days: 5, percentage: '100.0%', status: 'Good' },
        { id: 3, name: 'Amaya Fernando', className: 'Grade 8 - Sinhala', days: 0, percentage: '0.0%', status: 'Poor' },
    ];

    const teacherSalaryData = [
        { id: 1, name: 'Nimal Perera', className: 'Mathematics', month: 'February 2026', amount: 50000, status: 'Unpaid' },
        { id: 2, name: 'Kamala Silva', className: 'Science', month: 'February 2026', amount: 45000, status: 'Unpaid' },
        { id: 3, name: 'Ruwan Fernando', className: 'English', month: 'February 2026', amount: 40000, status: 'Unpaid' },
    ];

    const tabs = [
        { name: 'Unpaid Fees', icon: <Landmark size={18} className="mr-2" /> },
        { name: 'Monthly Income', icon: <BarChart3 size={18} className="mr-2" /> },
        { name: 'Attendance', icon: <Users size={18} className="mr-2" /> },
        { name: 'Teacher Salary', icon: <Landmark size={18} className="mr-2" /> },
    ];

    const renderTableHeader = () => {
        switch (activeTab) {
            case 'Unpaid Fees':
                return (
                    <tr className="border-b border-gray-50">
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left pl-10">Student Name</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left">Class</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider">Month</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider">Amount</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left pr-10">Parent Number</th>
                    </tr>
                );
            case 'Monthly Income':
                return (
                    <tr className="border-b border-gray-50">
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left pl-32">Month</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider">Total Income</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-right pr-32">Growth</th>
                    </tr>
                );
            case 'Attendance':
                return (
                    <tr className="border-b border-gray-50">
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left pl-10">Student Name</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left">Class</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider">Present Days</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider">Attendance %</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-right pr-10">Status</th>
                    </tr>
                );
            case 'Teacher Salary':
                return (
                    <tr className="border-b border-gray-50">
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left pl-10">Teacher Name</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-left">Class</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider">Month</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider">Amount</th>
                        <th className="py-5 font-[900] text-gray-800 text-[12px] uppercase tracking-wider text-right pr-10">Payment Status</th>
                    </tr>
                );
            default: return null;
        }
    };

    const renderTableBody = () => {
        switch (activeTab) {
            case 'Unpaid Fees':
                return unpaidFeesData.map((record) => (
                    <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors">
                        <td className="py-6 font-[800] text-gray-900 text-[14px] text-left pl-10">{record.name}</td>
                        <td className="py-6 font-[600] text-gray-600 text-[14px] text-left">{record.className}</td>
                        <td className="py-6 font-[600] text-gray-600 text-[14px]">{record.month}</td>
                        <td className="py-6 font-[900] text-gray-900 text-[15px]">Rs {record.amount.toLocaleString()}</td>
                        <td className="py-6 font-[600] text-gray-600 text-[14px] text-left pr-10">{record.phone}</td>
                    </tr>
                ));
            case 'Monthly Income':
                return monthlyIncomeData.map((record) => (
                    <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors">
                        <td className="py-6 font-[800] text-gray-900 text-[14px] text-left pl-32">{record.month}</td>
                        <td className="py-6 font-[800] text-gray-600 text-[14px]">Rs. {record.totalIncome.toLocaleString()}</td>
                        <td className={`py-6 font-[900] text-[14px] text-right pr-32 ${record.growthColor}`}>{record.growth}</td>
                    </tr>
                ));
            case 'Attendance':
                return attendanceReportData.map((record) => (
                    <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors">
                        <td className="py-6 font-[800] text-gray-900 text-[14px] text-left pl-10">{record.name}</td>
                        <td className="py-6 font-[600] text-gray-600 text-[14px] text-left">{record.className}</td>
                        <td className="py-6 font-[700] text-gray-800 text-[14px]">{record.days}</td>
                        <td className="py-6 font-[700] text-gray-800 text-[14px]">{record.percentage}</td>
                        <td className="py-6 text-right pr-10">
                            <span className={`px-5 py-1.5 rounded-full text-[11px] font-[900] uppercase tracking-wider shadow-sm ${record.status === 'Good' ? 'bg-[#10b981] text-white' : 'bg-[#f87171] text-white'}`}>
                                {record.status}
                            </span>
                        </td>
                    </tr>
                ));
            case 'Teacher Salary':
                return teacherSalaryData.map((record) => (
                    <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors">
                        <td className="py-6 font-[800] text-gray-900 text-[14px] text-left pl-10">{record.name}</td>
                        <td className="py-6 font-[600] text-gray-600 text-[14px] text-left">{record.className}</td>
                        <td className="py-6 font-[600] text-gray-600 text-[14px]">{record.month}</td>
                        <td className="py-6 font-[900] text-gray-900 text-[15px]">Rs {record.amount.toLocaleString()}</td>
                        <td className="py-6 text-right pr-10">
                            <span className="bg-[#f87171] text-white px-5 py-1.5 rounded-full text-[11px] font-[900] uppercase tracking-wider shadow-sm">
                                {record.status}
                            </span>
                        </td>
                    </tr>
                ));
            default: return null;
        }
    };

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Reports</h1>
                    <p className="text-gray-500 font-bold text-[13px] mt-0.5">View and export various reports</p>
                </div>
            </div>

            {/* Top Tabs */}
            <div className="bg-gray-100 p-1.5 rounded-[22px] flex items-center justify-between w-full max-w-4xl shadow-inner border border-gray-200/50">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center justify-center flex-1 py-3 px-6 rounded-[18px] text-[14px] font-[900] transition-all duration-300 ${activeTab === tab.name
                            ? 'bg-white text-gray-900 shadow-lg transform scale-[1.02]'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/30'}`}
                    >
                        {tab.icon}
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[24px] p-6 lg:p-10 shadow-[0px_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 mt-8 min-h-[550px]">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 w-full">
                    <div>
                        <h2 className="text-[22px] font-[900] text-gray-900 tracking-tight leading-tight mb-2">
                            {activeTab === 'Monthly Income' ? 'Attendance Report' : (activeTab === 'Attendance' ? 'Monthly Income Report' : `${activeTab} Report`)}
                        </h2>

                        {(activeTab !== 'Monthly Income') && (
                            <div className="mt-8">
                                <label className="block text-[12px] font-[900] text-gray-900 mb-3 uppercase tracking-wider">
                                    {activeTab === 'Teacher Salary' ? 'Filter By Month' : 'Filter By Class'}
                                </label>
                                <div className="relative max-w-sm">
                                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-4 flex items-center pl-5 pr-12 font-[800] text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer">
                                        <option>{activeTab === 'Teacher Salary' ? 'February 2026' : 'All Classes'}</option>
                                        <option>{activeTab === 'Teacher Salary' ? 'January 2026' : 'Grade 10 - Mathematics'}</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:mt-auto">
                        <button className="bg-[#3b82f6] hover:bg-blue-700 text-white flex items-center justify-center px-10 py-4 rounded-2xl text-[15px] font-[900] transition-transform shadow-[0_8px_20px_-5px_rgba(59,130,246,0.6)] hover:-translate-y-1 active:scale-95 group">
                            <FileDown size={20} className="mr-3 group-hover:translate-y-1 transition-transform" />
                            Export PDF
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-center table-auto">
                        <thead>
                            {renderTableHeader()}
                        </thead>
                        <tbody>
                            {renderTableBody()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
