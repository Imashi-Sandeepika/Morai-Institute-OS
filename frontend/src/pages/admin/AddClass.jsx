import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChevronDown } from 'lucide-react';

const AddClass = () => {
    const [formData, setFormData] = useState({
        className: '',
        subject: '',
        assignTeacher: '',
        numberOfStudent: '',
        monthlyFee: '',
        schedule: ''
    });
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/api/admin/teachers');
                setTeachers(res.data);
            } catch (err) {
                console.error('Failed to fetch teachers:', err);
            }
        };
        fetchTeachers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/api/admin/add-class', {
                className: formData.className,
                subject: formData.subject,
                teacher: formData.assignTeacher,
                numberOfStudent: Number(formData.numberOfStudent),
                monthlyFee: Number(formData.monthlyFee),
                schedule: formData.schedule
            });
            toast.success('Class Added Successfully');
            setFormData({ className: '', subject: '', assignTeacher: '', numberOfStudent: '', monthlyFee: '', schedule: '' });
        } catch (error) {
            toast.error('Failed to add class');
        }
    };

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-start mb-10 w-full">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Add New Class</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Class Name</label>
                        <input
                            type="text"
                            name="className"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Class Name"
                            value={formData.className}
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
                            placeholder="Enter Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Assign Teacher</label>
                        <div className="relative">
                            <select
                                name="assignTeacher"
                                required
                                value={formData.assignTeacher}
                                onChange={handleChange}
                                className="w-full appearance-none border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400 cursor-pointer"
                            >
                                <option value="" disabled>Select a Teacher</option>
                                {teachers.map((t) => (
                                    <option key={t.id || t._id} value={t.id || t._id}>{t.name} ({t.subject || 'No Subject'})</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Number Of Student</label>
                        <input
                            type="text"
                            name="numberOfStudent"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Number Of Student"
                            value={formData.numberOfStudent}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Monthly Fee</label>
                        <input
                            type="text"
                            name="monthlyFee"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Monthly Fee"
                            value={formData.monthlyFee}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[14px] font-[900] text-gray-900 uppercase tracking-wider">Schedule</label>
                        <input
                            type="text"
                            name="schedule"
                            required
                            className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4.5 bg-white focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/10 focus:border-[#3b82f6]/30 transition-all font-[700] text-gray-800 placeholder-gray-400"
                            placeholder="Enter Days and Time In Class"
                            value={formData.schedule}
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

export default AddClass;
