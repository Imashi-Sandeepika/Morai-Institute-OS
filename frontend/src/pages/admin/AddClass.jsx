import React, { useState } from 'react';

const AddClass = () => {
    const [formData, setFormData] = useState({
        className: '',
        subject: '',
        assignTeacher: '',
        numberOfStudent: '',
        monthlyFee: '',
        schedule: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // create class post request logic
        console.log(formData);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 fade-in">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Add New Class</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-12">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2 mt-4">Class Name</label>
                        <input
                            type="text"
                            name="className"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Class Name"
                            value={formData.className}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2 mt-4">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Assign Teacher</label>
                        <input
                            type="text"
                            name="assignTeacher"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Teacher Name"
                            value={formData.assignTeacher}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Number Of Student</label>
                        <input
                            type="text"
                            name="numberOfStudent"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Number Of Student"
                            value={formData.numberOfStudent}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Monthly Fee</label>
                        <input
                            type="text"
                            name="monthlyFee"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Monthly Fee"
                            value={formData.monthlyFee}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Schedule</label>
                        <input
                            type="text"
                            name="schedule"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm placeholder-gray-400"
                            placeholder="Enter Days and Time In Class"
                            value={formData.schedule}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pt-8">
                    <button type="submit" className="bg-[#3b82f6] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl mt-4 shadow transition-transform active:scale-95">
                        Save Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;
