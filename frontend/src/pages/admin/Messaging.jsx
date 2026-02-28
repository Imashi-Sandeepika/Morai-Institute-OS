import React, { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';

const Messaging = () => {
    const [sendTo, setSendTo] = useState('All Classes');
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Here you would implement actual message sending via API
        alert(`Message sent to: ${sendTo}\nMessage: ${message}`);
        setMessage('');
    };

    return (
        <div className="space-y-6 fade-in w-full pb-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-[28px] font-[900] text-gray-900 tracking-tight leading-tight">Messaging</h1>
                    <p className="text-gray-500 font-bold text-[13px] mt-0.5">Send messages to students, parents, and teachers</p>
                </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 lg:p-12 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 mt-8 max-w-4xl">
                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-[900] text-gray-900 mb-3">Send To</label>
                        <div className="relative">
                            <select
                                value={sendTo}
                                onChange={(e) => setSendTo(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-200 rounded-xl py-4 pl-5 pr-12 font-[700] text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm cursor-pointer"
                            >
                                <option>All Classes</option>
                                <option>All Teachers</option>
                                <option>All Students</option>
                                <option>All Parents</option>
                                <option>Grade 10 - Mathematics</option>
                                <option>Grade 11 - Science</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-[900] text-gray-900 mb-3">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type Your Message Here....."
                            className="w-full bg-white border border-gray-200 rounded-2xl py-5 px-6 font-[600] text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 shadow-sm min-h-[180px] placeholder-gray-400"
                        ></textarea>
                    </div>

                    <button
                        onClick={handleSendMessage}
                        className="bg-[#3b82f6] hover:bg-blue-700 text-white flex items-center justify-center px-10 py-4 rounded-2xl text-[16px] font-bold transition-transform transform shadow-lg hover:-translate-y-1 active:scale-95 group"
                    >
                        Send Your Message
                        <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messaging;
