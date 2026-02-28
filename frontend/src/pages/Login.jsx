import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            login(res.data.user, res.data.token);
            toast.success('Login Successful');

            if (res.data.user.role === 'institute' || res.data.user.role === 'superadmin') {
                navigate('/admin/dashboard');
            } else {
                navigate(`/${res.data.user.role}/dashboard`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6">
            <div className="bg-white rounded-[32px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] w-full max-w-[480px] p-10 md:p-14 border border-gray-100/50">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-14 h-14 mb-4">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#1e3a8a]">
                            <path d="M12 3L4 9V21H20V9L12 3Z" fill="currentColor" opacity="0.1" />
                            <path d="M12 3L4 9V21H20V9L12 3Z" stroke="#0052cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 11V16M9 13.5H15" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="text-[26px] font-[900] text-gray-900 tracking-tight leading-tight">Morai Institute OS</h1>
                    <p className="text-gray-500 font-bold text-[13px] mt-1.5 uppercase tracking-wider">Login to your admin account</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-[13px] font-[900] text-gray-900 mb-2 uppercase tracking-wide">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#f3f4f6] border-none rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-bold text-sm text-gray-700 placeholder-gray-400 transition-shadow"
                            placeholder="Enter Email"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-[900] text-gray-900 mb-2 uppercase tracking-wide">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[#f3f4f6] border-none rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-bold text-sm text-gray-700 placeholder-gray-400 transition-shadow"
                            placeholder="Enter Password"
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-[#3b82f6] hover:bg-blue-700 text-white font-[900] py-4 rounded-xl shadow-[0_8px_20px_-5px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-0.5 active:scale-[0.98]">
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-[14px] font-[800] text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-[#3b82f6] font-[900] hover:underline transition-all ml-1">Register Here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
