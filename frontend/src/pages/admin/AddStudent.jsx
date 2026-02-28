import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UploadCloud, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AddStudent = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: 'Student@123',
        className: '',
        parentName: '',
        parentNumber: '',
        studentId: ''
    });
    const [file, setFile] = useState(null);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/api/admin/classes');
                setClasses(res.data);
            } catch (err) {
                console.error('Failed to fetch classes:', err);
            }
        };
        fetchClasses();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (file) data.append('profilePicture', file);
            data.append('instituteId', user.instituteId);

            await axios.post('http://127.0.0.1:5000/api/admin/add-student', data);

            toast.success('Student Added Successfully');
            setFormData({ name: '', email: '', password: 'Student@123', className: '', parentName: '', parentNumber: '', studentId: '' });
            setFile(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add student');
        }
    };

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-start mb-10 w-full">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Add New Student</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="w-full">
                    <label className="flex items-center gap-2 text-[14px] font-[900] text-gray-900 mb-4 uppercase tracking-wider cursor-pointer">
                        <div className="bg-[#3b82f6] text-white rounded p-0.5">
                            <UploadCloud size={18} strokeWidth={3} />
                        </div>
                        Upload Profile Picture
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-[28px] bg-white flex flex-col items-center justify-center py-10 px-4 cursor-pointer hover:border-[#3b82f6]/50 transition-all group relative">
                        {file ? (
                            <p className="text-blue-600 font-bold">{file.name}</p>
                        ) : (
                            <>
                                <UploadCloud size={24} className="text-gray-400 mb-2" />
                                <p className="text-[13px] font-[700] text-gray-500">JPG, PNG or PDF (max. 5MB)</p>
                            </>
                        )}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Student Name</label>
                        <input type="text" name="name" required className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 transition-all font-[700] text-gray-800" placeholder="Enter Student Name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Student ID</label>
                        <input type="text" name="studentId" required className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 transition-all font-[700] text-gray-800" placeholder="Enter Student ID" value={formData.studentId} onChange={handleChange} />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Email Address</label>
                        <input type="email" name="email" required className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 transition-all font-[700] text-gray-800" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Class</label>
                        <div className="relative">
                            <select
                                name="className"
                                required
                                value={formData.className}
                                onChange={handleChange}
                                className="w-full appearance-none border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 transition-all font-[700] text-gray-800 cursor-pointer"
                            >
                                <option value="" disabled>Select a Class</option>
                                {classes.map((c) => (
                                    <option key={c.id || c._id} value={c.id || c._id}>{c.name || c.className}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Parent Name</label>
                        <input type="text" name="parentName" required className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 transition-all font-[700] text-gray-800" placeholder="Enter Parent Name" value={formData.parentName} onChange={handleChange} />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Parent Number</label>
                        <input type="tel" name="parentNumber" required className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 transition-all font-[700] text-gray-800" placeholder="Enter Parent Number" value={formData.parentNumber} onChange={handleChange} />
                    </div>
                </div>

                <div className="pt-6">
                    <button type="submit" className="bg-[#3b82f6] hover:bg-blue-700 text-white font-[900] py-4.5 px-12 rounded-2xl shadow-lg transition-all text-[15px]">
                        Save Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
