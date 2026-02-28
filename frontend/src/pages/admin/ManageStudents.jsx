import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const dummyStudents = [
        { _id: '1', studentId: 'SD001', name: 'Kasuni Bandara', className: 'Grade 10 - Mathematics', parent: 'Sunil Bandara', phone: '0771111111', status: 'Paid', profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299540-5187872.png' },
        { _id: '2', studentId: 'SD201', name: 'Dilini Jayasinghe', className: 'Grade 11 - Science', parent: 'Ranjith Jayasinghe', phone: '0772222222', status: 'Unpaid', profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299542-5187874.png' },
        { _id: '3', studentId: 'SD409', name: 'Thisara Wickramasinghe', className: 'Grade 9 - English', parent: 'Ajith Wickramasinghe', phone: '0773333333', status: 'Paid', profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/student-avatar-6299543-5187875.png' },
        { _id: '4', studentId: 'SD908', name: 'Nethmi Gunasekara', className: 'Grade 8 - Sinhala', parent: 'Kumara Gunasekara', phone: '0774444444', status: 'Partial', profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/boy-avatar-6299541-5187873.png' },
        { _id: '5', studentId: 'SD398', name: 'Sahan Mendis', className: 'Grade 10 - Mathematics', parent: 'Pradeep Mendis', phone: '0775555555', status: 'Unpaid', profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png' },
        { _id: '6', studentId: 'SD988', name: 'Kavindi Silva', className: 'Grade 11 - Science', parent: 'Chaminda Silva', phone: '0776666666', status: 'Paid', profilePicture: 'https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299540-5187872.png' }
    ];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/students');
                if (res.data && res.data.length > 0) {
                    setStudents(res.data);
                } else {
                    setStudents(dummyStudents);
                }
            } catch (err) {
                console.error(err);
                setStudents(dummyStudents);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
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
            <div className="flex justify-between items-start mb-6 w-full">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Student Management</h1>
                    <p className="text-gray-500 font-bold text-[13px] mt-0.5 tracking-wider">Manage all students in your Institute</p>
                </div>
                <Link to="/admin/students/add" className="bg-[#3b82f6] hover:bg-blue-700 text-white flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold transition-transform transform shadow-sm relative overflow-hidden group">
                    <span className="mr-2 text-lg leading-none">+</span> Add New Student
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
            </div>

            <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 mt-8">
                <div className="mb-8">
                    <div className="relative">
                        <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 stroke-[3px]" />
                        <input
                            type="text"
                            placeholder="Filter By Student Name"
                            className="w-full bg-[#f3f4f6] border-none rounded-full py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-bold text-sm text-gray-700 placeholder-gray-400 transition-shadow"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Profile</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Student ID</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Student Name</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Class</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Parent Name</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Parent Phone</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Fee Status</th>
                                <th className="py-4 font-bold text-gray-900 text-[13px] tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student._id || index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3">
                                        <div className="flex justify-center flex-col items-center">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                                                <img
                                                    src={student.profilePicture || `https://ui-avatars.com/api/?name=${student.name}&background=eff6ff&color=3b82f6`}
                                                    alt={student.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 font-semibold text-gray-700 text-[13px]">{student.studentId}</td>
                                    <td className="py-3 font-extrabold text-gray-900 text-[14px]">{student.name}</td>
                                    <td className="py-3 font-semibold text-gray-600 text-[13px] whitespace-nowrap">{student.className}</td>
                                    <td className="py-3 font-semibold text-gray-600 text-[13px]">{student.parent}</td>
                                    <td className="py-3 font-semibold text-gray-600 text-[13px]">{student.phone}</td>
                                    <td className="py-3">
                                        <div className="flex justify-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm inline-block min-w-[70px] text-center ${getStatusStyle(student.status)}`}>
                                                {student.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <Link to={`/admin/students/${student._id || index}`} className="flex items-center justify-center gap-2 text-gray-900 font-bold text-sm hover:text-[#3b82f6] mx-auto transition-colors">
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

export default ManageStudents;
