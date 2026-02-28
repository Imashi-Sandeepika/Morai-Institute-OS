import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, AlertCircle, PlusCircle, QrCode, BellRing } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalStudents: 5404, totalTeachers: 51, totalClasses: 34, unpaidFeePercentage: 20 });
    const [loading, setLoading] = useState(true);

    // Dummy Chart Data
    const monthlyIncome = [
        { name: 'October', income: 115000 },
        { name: 'November', income: 45000 },
        { name: 'December', income: 110000 },
        { name: 'January', income: 85000 },
        { name: 'February', income: 55000 },
    ];

    const feeStatusData = [
        { name: 'Paid', value: 85, color: '#34d399' },
        { name: 'Unpaid', value: 10, color: '#f87171' },
        { name: 'Partial', value: 5, color: '#fbbf24' },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/dashboard');
                if (res.data) {
                    setStats(prev => ({ ...prev, totalStudents: res.data.totalStudents || prev.totalStudents, totalTeachers: res.data.totalTeachers || prev.totalTeachers, totalClasses: res.data.totalClasses || prev.totalClasses }));
                }
            } catch (err) {
                console.error("Failed to load stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="h-full flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

    const statCards = [
        { title: 'Total\nStudent', value: stats.totalStudents, colorClass: 'text-[#10b981]', iconBg: 'bg-[#10b981]', icon: <Users size={18} className="text-white" /> },
        { title: 'Total\nClasses', value: stats.totalClasses, colorClass: 'text-[#3b82f6]', iconBg: 'bg-[#fbbf24]', icon: <BookOpen size={18} className="text-white" /> },
        { title: 'Total\nTeachers', value: stats.totalTeachers, colorClass: 'text-[#8b5cf6]', iconBg: 'bg-[#a855f7]', icon: <Users size={18} className="text-white" /> },
        { title: 'Unpaid\nFees', value: `${stats.unpaidFeePercentage}%`, colorClass: 'text-[#ef4444]', iconBg: 'bg-[#f43f5e]', icon: <AlertCircle size={18} className="text-white" /> },
    ];

    return (
        <div className="space-y-8 fade-in h-auto w-full pb-10">

            {/* Top Grid: Hero & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-none">

                {/* Hero Banner */}
                <div className="lg:col-span-7 bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden h-full min-h-[220px]">
                    <div className="flex justify-between items-start pt-2 h-full z-10 w-full relative">
                        <div className="w-2/3">
                            <h2 className="text-[26px] font-[900] text-gray-900 leading-tight">Hello, Good Morning, Admin <span className="inline-block text-3xl align-middle wave-animation">👋</span></h2>
                            <p className="text-gray-600 font-bold mt-2 text-lg">Welcome to Morai Institute OS</p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 shadow-sm rounded-xl font-bold text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                                    <span className="text-[#10b981]"><PlusCircle size={20} /></span> Add
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 shadow-sm rounded-xl font-bold text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                                    <span className="text-gray-700"><QrCode size={20} /></span> QR Code
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 shadow-sm rounded-xl font-bold text-sm text-gray-800 hover:bg-gray-50 transition-colors">
                                    <span className="text-[#3b82f6]"><BellRing size={20} /></span> Remeinder
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Admin Profile Picture Section */}
                    <div className="absolute right-8 bottom-0 top-0 flex items-center justify-end z-0">
                        <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-xl overflow-hidden relative group transition-transform duration-500 hover:scale-105">
                            <img
                                src="/assets/admin_pfp.jpg"
                                alt="Admin Profile"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
                        </div>
                        {/* Soft background glow */}
                        <div className="absolute w-48 h-48 bg-blue-100/50 rounded-full -z-10 blur-3xl right-0 translate-x-4"></div>
                    </div>
                </div>

                {/* Stat Cards - 2x2 Grid */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
                    {statCards.map((card, i) => (
                        <div key={i} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className={`absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg} shadow-sm`}>
                                {card.icon}
                            </div>
                            <div className="text-center mt-6">
                                <p className="text-sm font-bold text-gray-800 whitespace-pre-line leading-tight">{card.title}</p>
                                <h3 className={`text-2xl mt-1 font-extrabold ${card.colorClass}`}>{card.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Main Table */}
            <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-blue-100/60 w-full mb-8">
                <table className="w-full text-center table-fixed">
                    <thead className="bg-[#facc15]/10 text-gray-700">
                        <tr>
                            <th className="py-4 font-extrabold text-[#3b82f6] text-sm border-b border-r border-[#bfdbfe]/60 bg-[#eff6ff]">Class Name</th>
                            <th className="py-4 font-extrabold text-[#3b82f6] text-sm border-b border-r border-[#bfdbfe]/60 bg-[#eff6ff] w-1/4">Total Student</th>
                            <th className="py-4 font-extrabold text-[#3b82f6] text-sm border-b border-r border-[#bfdbfe]/60 bg-[#eff6ff] w-1/4">Unpaid</th>
                            <th className="py-4 font-extrabold text-[#3b82f6] text-sm border-b border-[#bfdbfe]/60 bg-[#eff6ff] w-1/4">Attendance</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-bold text-gray-700">
                        <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 border-b border-r border-blue-100/60">English Grade 11</td>
                            <td className="py-4 border-b border-r border-blue-100/60">100</td>
                            <td className="py-4 border-b border-r border-blue-100/60">(20%)</td>
                            <td className="py-4 border-b border-blue-100/60">87 - (87%)</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 border-b border-r border-blue-100/60 break-words whitespace-normal px-2">Geography Grade 13</td>
                            <td className="py-4 border-b border-r border-blue-100/60">34</td>
                            <td className="py-4 border-b border-r border-blue-100/60">(10%)</td>
                            <td className="py-4 border-b border-blue-100/60">97%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

                {/* Monthly Income Trend Chart */}
                <div className="w-full flex justify-between flex-col h-full">
                    <h3 className="text-lg font-extrabold text-gray-800 mb-4 px-1">Monthly Income Trend</h3>
                    <div className="rounded-[24px] border border-blue-100 p-6 flex items-end relative overflow-hidden h-[300px] shadow-sm bg-gradient-to-b from-[#60a5fa]/30 to-[#1e3a8a]/20">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyIncome} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.8} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }} />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.4)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }} />
                                <Bar dataKey="income" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Fee Status Overview Pie Chart */}
                <div className="w-full flex justify-between flex-col h-full">
                    <h3 className="text-lg font-extrabold text-gray-800 mb-4 px-1">Fee Status Overview</h3>
                    <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] h-[300px] flex flex-col justify-between items-center relative z-10">
                        {/* Legend row */}
                        <div className="flex items-center justify-center gap-6 w-full mb-2">
                            {feeStatusData.map(d => (
                                <div key={d.name} className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></div>
                                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">{d.name}</span>
                                </div>
                            ))}
                        </div>
                        {/* Pie Chart element */}
                        <div className="flex-1 w-full relative -mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={feeStatusData} cx="50%" cy="50%" innerRadius={0} outerRadius={90} paddingAngle={0} dataKey="value" stroke="white" strokeWidth={3}>
                                        {feeStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;
