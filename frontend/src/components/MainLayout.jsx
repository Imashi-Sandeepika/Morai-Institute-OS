import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, UserCheck, CreditCard, Settings, Menu, Bell, Search, LogOut, ChevronLeft } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const getNavItems = () => {
        switch (user?.role) {
            case 'superadmin':
            case 'institute':
                return [
                    { path: '/admin/dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg> },
                    { path: '/admin/teachers', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
                    { path: '/admin/classes', icon: <BookOpen size={24} /> },
                    { path: '/admin/students', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg> },
                    { path: '/admin/fees', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> },
                    { path: '/admin/attendance', icon: <UserCheck size={24} /> },
                    { path: '/admin/messages', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg> },
                    { path: '/admin/reports', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg> },
                    { path: '/admin/settings', icon: <Settings size={24} /> },
                ];
            default: return [];
        }
    };

    const navItems = getNavItems();

    return (
        <aside className={`fixed inset-y-0 left-0 bg-[#3b82f6] text-white w-20 transform transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col items-center py-6 shadow-xl`}>

            <div className="text-xs font-bold tracking-widest uppercase mb-8 opacity-90 vertical-writing-mode-rl transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                {user?.name?.split(' ')[0] || 'SISULKA'}
            </div>

            <nav className="flex-1 space-y-4 w-full flex flex-col items-center mt-4">
                {navItems.map((item, index) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link key={index} to={item.path} className={`w-12 h-12 flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${isActive ? 'bg-[#5c98f7] shadow-inner text-white' : 'text-blue-100 hover:bg-[#4a8df7] hover:text-white'}`}>
                            {item.icon}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto w-full flex flex-col items-center pb-4">
                <button onClick={logout} className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-transparent transition-colors hover:bg-white/10 group">
                    <LogOut size={24} className="text-red-300 group-hover:text-red-400 group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>
        </aside>
    );
};

const Header = ({ setIsOpen }) => {
    const { user } = useAuth();
    // Get initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <header className="bg-white/80 md:bg-transparent backdrop-blur-md sticky top-0 z-10 md:pt-6 md:px-8">
            <div className="flex items-center justify-between px-6 py-4 md:px-0 md:py-0">
                <button onClick={() => setIsOpen(prev => !prev)} className="md:hidden text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-lg">
                    <Menu size={20} />
                </button>

                {/* Left side: In desktop, standard pages already have headings. We can show an M logo here if we matching the design purely. */}
                <div className="hidden md:flex items-center gap-3">
                    <div className="bg-indigo-900 text-emerald-400 font-extrabold text-2xl w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <span className="relative z-10 tracking-tighter shrink-0 flex items-center justify-center">
                            <span className="text-white">M</span>
                            <span className="absolute bottom-1 right-0 text-emerald-400 text-3xl opacity-80 rotate-12">v</span>
                        </span>
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900 leading-tight">Morai Institute OS</h1>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">Institute Management System</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 ml-auto">
                    {/* User Profile Block */}
                    <div className="flex items-center gap-3 text-right">
                        <div className="hidden sm:block">
                            <p className="font-bold text-gray-900 text-sm leading-tight">{user?.name || 'Administrator'}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{user?.email || 'admin@morai.edu'}</p>
                        </div>
                        {user?.profilePicture ? (
                            <img src={user.profilePicture} alt="Profile" className="w-11 h-11 rounded-full border-2 border-white shadow-sm object-cover" />
                        ) : (
                            <div className="bg-blue-600 text-white font-bold w-11 h-11 rounded-full flex items-center justify-center shadow-sm text-sm tracking-wide">
                                {getInitials(user?.name)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className={`flex-1 flex flex-col transition-all duration-300 md:ml-20 ${isSidebarOpen ? 'ml-20 bg-gray-900/50 md:bg-transparent absolute inset-0 z-0' : ''}`}>
                <Header setIsOpen={setIsSidebarOpen} />
                <main className="flex-1 p-6 md:p-8 overflow-auto h-[calc(100vh-73px)]">
                    <div className="max-w-7xl mx-auto animate-fadeIn">
                        {children}
                    </div>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-gray-900/50 z-10 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
            )}
        </div>
    );
};

export default MainLayout;
