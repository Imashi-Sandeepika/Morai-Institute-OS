import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Building, Lock, Bell, Moon, Globe, Camera, Save, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('Profile');

    const tabs = [
        { name: 'Profile', icon: <User size={20} /> },
        { name: 'Institute', icon: <Building size={20} /> },
        { name: 'Security', icon: <Lock size={20} /> },
        { name: 'Notifications', icon: <Bell size={20} /> },
        { name: 'Preferences', icon: <Moon size={20} /> },
    ];

    return (
        <div className="space-y-8 fade-in pb-12">
            <div>
                <h1 className="text-[32px] font-[900] text-gray-900 tracking-tight leading-tight">Settings</h1>
                <p className="text-gray-500 font-bold mt-1 text-sm uppercase tracking-wider">Manage your account and institute preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === tab.name
                                ? 'bg-[#3b82f6] text-white shadow-[0_8px_20px_-5px_rgba(59,130,246,0.4)]'
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={activeTab === tab.name ? 'text-white' : 'text-gray-400 group-hover:text-[#3b82f6]'}>
                                    {tab.icon}
                                </span>
                                <span className="font-[800] text-[15px] tracking-tight">{tab.name}</span>
                            </div>
                            <ChevronRight size={18} className={activeTab === tab.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9 bg-white rounded-[32px] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="p-10">
                        {activeTab === 'Profile' && (
                            <div className="space-y-10">
                                <div className="flex items-center gap-8">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-blue-50 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                                            {user?.profilePicture ? (
                                                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (user?.role === 'admin' || user?.role === 'institute') ? (
                                                <img src="/assets/admin_pfp.jpg" alt="Admin Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-4xl font-[900] text-blue-600">{user?.name?.[0] || 'A'}</span>
                                            )}
                                        </div>
                                        <button className="absolute bottom-0 right-0 bg-[#3b82f6] text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform">
                                            <Camera size={18} strokeWidth={3} />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-[900] text-gray-900">Profile Picture</h3>
                                        <p className="text-gray-400 font-bold text-sm mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">Full Name</label>
                                        <input type="text" defaultValue={user?.name} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">Email Address</label>
                                        <input type="email" defaultValue={user?.email} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800" />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button className="flex items-center gap-2 bg-[#3b82f6] text-white font-[900] py-4 px-10 rounded-2xl shadow-[0_8px_20px_-5px_rgba(59,130,246,0.4)] hover:-translate-y-1 transition-all">
                                        <Save size={20} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Institute' && (
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">Institute Name</label>
                                        <input type="text" placeholder="Sisulka Institute" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">Contact Number</label>
                                        <input type="tel" placeholder="+94 77 123 4567" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">Institute Address</label>
                                        <textarea rows="3" placeholder="No. 123, Galle Road, Colombo" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800 resize-none"></textarea>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button className="flex items-center gap-2 bg-[#10b981] text-white font-[900] py-4 px-10 rounded-2xl shadow-[0_8px_20px_-5px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all">
                                        <Save size={20} />
                                        Update Details
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Security' && (
                            <div className="space-y-10">
                                <div className="bg-amber-50 rounded-[24px] p-6 border border-amber-100 flex items-start gap-4">
                                    <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
                                        <Lock size={20} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="text-amber-900 font-[900] text-[15px]">Security Tip</h4>
                                        <p className="text-amber-700 font-bold text-xs mt-0.5 leading-relaxed">Use a strong password with at least 12 characters, including numbers and symbols to protect your account.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">Current Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">New Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-[900] text-gray-900 uppercase tracking-wider block ml-1">Confirm New Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800" />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button className="bg-gray-900 text-white font-[900] py-4 px-10 rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'Notifications' || activeTab === 'Preferences') && (
                            <div className="h-64 flex flex-col items-center justify-center text-center opacity-50">
                                <div className="bg-gray-100 p-6 rounded-full mb-4">
                                    <Globe size={40} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-[900] text-gray-600">Coming Soon</h3>
                                <p className="text-gray-400 font-bold text-sm mt-1">We are working on bringing more customization options.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
