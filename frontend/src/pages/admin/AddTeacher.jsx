import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UploadCloud } from 'lucide-react';

const AddTeacher = () => {
    const [formData, setFormData] = useState({
        teacherName: '',
        phoneNumber: '',
        subject: '',
        monthlySalary: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/add-teacher', {
                name: formData.teacherName,
                phoneNumber: formData.phoneNumber,
                subject: formData.subject,
                monthlySalary: Number(formData.monthlySalary)
            });
            toast.success('Teacher Added Successfully');
            setFormData({ teacherName: '', phoneNumber: '', subject: '', monthlySalary: '' });
        } catch (error) {
            toast.error('Failed to add teacher');
        }
    };

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-start mb-10 w-full">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Add New Teacher</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Upload Profile Picture */}
                <div className="w-full">
                    <label className="flex items-center gap-2 text-[14px] font-[900] text-gray-900 mb-4 uppercase tracking-wider">
                        <div className="bg-[#3b82f6] text-white rounded p-0.5">
                            <UploadCloud size={18} strokeWidth={3} />
                        </div>
                        Upload Profile Picture
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-[28px] bg-white flex flex-col items-center justify-center py-16 px-4 cursor-pointer hover:border-[#3b82f6]/50 hover:bg-gray-50/50 transition-all group">
                        <div className="bg-[#3b82f6] text-white rounded-xl p-2.5 mb-4 shadow-[0_8px_20px_-5px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform">
                            <UploadCloud size={24} strokeWidth={2.5} />
                        </div>
                        <p className="text-[15px] font-[900] text-gray-900">Click to upload</p>
                        <p className="text-[13px] font-[700] text-gray-500 mt-1">or drag and drop your file here</p>
                        <p className="text-[12px] font-[600] text-gray-400 mt-0.5">JPG, PNG or PDF (max. 5MB)</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Teacher Name</label>
                        <input
                            type="text"
                            name="teacherName"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Teacher Name"
                            value={formData.teacherName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Subject Name"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Monthly Salary</label>
                        <input
                            type="text"
                            name="monthlySalary"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Salary Amount"
                            value={formData.monthlySalary}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button type="submit" className="bg-[#3b82f6] hover:bg-blue-700 text-white font-[900] py-4.5 px-12 rounded-2xl shadow-[0_8px_25px_-5px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1 active:scale-[0.98] text-[15px]">
                        Save Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTeacher;
