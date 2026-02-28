import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        className: '',
        parentName: '',
        parentNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Upload logic here 
        console.log(formData);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 fade-in">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Add New Student</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Upload Profile Picture */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                        <div className="bg-indigo-500 text-white rounded p-0.5">
                            <UploadCloud size={16} />
                        </div>
                        Upload Profile Picture
                    </label>
                    <div className="border-2 border-dashed border-indigo-300 rounded-xl bg-white flex flex-col items-center justify-center py-10 px-4 cursor-pointer hover:bg-indigo-50/50 transition-colors">
                        <div className="bg-indigo-500 text-white rounded p-1 mb-2">
                            <UploadCloud size={18} />
                        </div>
                        <p className="text-sm font-bold text-gray-900">Click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">or drag and drop your file here</p>
                        <p className="text-xs text-gray-400 mt-0.5">JPG, PNG or PDF (max. 5MB)</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Student Name</label>
                        <input
                            type="text"
                            name="studentName"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Student Name"
                            value={formData.studentName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Class</label>
                        <input
                            type="text"
                            name="className"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Class"
                            value={formData.className}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Parent Name</label>
                        <input
                            type="text"
                            name="parentName"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Parent Name"
                            value={formData.parentName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Parent Number</label>
                        <input
                            type="tel"
                            name="parentNumber"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Parent Phone Number"
                            value={formData.parentNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="bg-[#3b82f6] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow mt-4 transition-transform active:scale-95">
                        Save Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
