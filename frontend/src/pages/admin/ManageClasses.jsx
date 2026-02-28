import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const dummyClasses = [
        { _id: '1', name: 'Mathematics', subject: 'Mathematics', teacher: 'Nimal Perera', students: 120, fee: 2500, schedule: '' },
        { _id: '2', name: 'Science', subject: 'Science', teacher: 'Kamala Silva', students: 98, fee: 2000, schedule: 'Tue, Thu, Sat - 4:00 PM' },
        { _id: '3', name: 'English', subject: 'English', teacher: 'Ruwan Fernando', students: 130, fee: 2000, schedule: 'Mon, Wed - 5:00 PM' },
        { _id: '4', name: 'Sinhala', subject: 'Sinhala', teacher: 'Sanduni Jey', students: 23, fee: 3500, schedule: 'Tue, Thu - 3:00 PM' }
    ];

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/api/admin/classes');
                if (res.data && res.data.length > 0) {
                    setClasses(res.data);
                } else {
                    setClasses(dummyClasses);
                }
            } catch (err) {
                console.error(err);
                setClasses(dummyClasses);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
        // eslint-disable-next-line
    }, []);

    if (loading) return <div className="h-full flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="space-y-6 fade-in w-full pb-10">

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Classes Management</h1>
                    <p className="text-gray-500 font-bold text-[13px] mt-0.5">Manage all Classes in your Institute</p>
                </div>
                <Link to="/admin/classes/add" className="bg-[#3b82f6] hover:bg-blue-700 text-white flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold transition-transform transform shadow-sm relative overflow-hidden group">
                    <span className="mr-2 text-lg leading-none">+</span> Add New Class
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
            </div>

            <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 mt-8">
                <div className="mb-8">
                    <div className="relative">
                        <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 stroke-[3px]" />
                        <input
                            type="text"
                            placeholder="Search By Class Name Or Subject....."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#f3f4f6] border-none rounded-full py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-bold text-sm text-gray-700 placeholder-gray-400 transition-shadow"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[18%] text-left pl-4">Class Name</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[15%] text-left">Subject</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[20%] text-left">Assigned Teacher</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[12%]">Number of Students</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[12%]">Monthly Fee</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[15%] text-left">Schedule</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide w-[8%]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.filter(c => c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.subject?.toLowerCase().includes(searchTerm.toLowerCase())).map((cls, index) => (
                                <tr key={cls._id || index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-bold text-gray-900 text-[14px] text-left pl-4">{cls.name || cls.subject}</td>
                                    <td className="py-5 font-semibold text-gray-600 text-[14px] text-left">{cls.subject}</td>
                                    <td className="py-5 font-semibold text-gray-600 text-[14px] text-left">{cls.teacher}</td>
                                    <td className="py-5 font-bold text-gray-900 text-[14px] text-center">{cls.students}</td>
                                    <td className="py-5 font-semibold text-gray-600 text-[14px] text-center">
                                        Rs {cls.fee ? cls.fee.toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="py-5 font-semibold text-gray-600 text-[13px] whitespace-nowrap text-left">{cls.schedule || ''}</td>
                                    <td className="py-5">
                                        <Link to={`/admin/classes/${cls._id || index}`} className="flex items-center justify-center gap-2 text-gray-900 font-bold text-sm hover:text-[#3b82f6] mx-auto transition-colors">
                                            <Eye size={18} className="stroke-[2.5px]" /> View
                                        </Link>
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

export default ManageClasses;
