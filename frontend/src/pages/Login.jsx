import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { School, ArrowRight, UserCircle, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.user, res.data.token);

            if (res.data.user.role === 'superadmin' || res.data.user.role === 'institute') {
                navigate('/admin/dashboard');
            } else {
                navigate(`/${res.data.user.role}/dashboard`);
            }
            toast.success('Login Successful');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden flex-col md:flex-row">

                {/* Left Side: Brand Context */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-12 md:w-1/2 flex flex-col justify-center items-start relative overflow-hidden">
                    <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <School size={48} className="mb-6 opacity-90" />
                        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Morai Institute OS</h1>
                        <p className="text-indigo-100 text-lg mb-8 max-w-sm">
                            The ultimate management system for modern educational institutions. Elevate your learning environment today.
                        </p>
                        <div className="space-y-3 font-medium text-sm text-indigo-100/80">
                            <p className="flex items-center"><UserCircle size={18} className="mr-2" /> Secure Role-Based Access</p>
                            <p className="flex items-center"><Lock size={18} className="mr-2" /> End-to-End Encrypted Passwords</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-12 md:w-1/2 bg-white flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-500 mb-8">Please sign in to your account to continue.</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50"
                                placeholder="admin@morai.edu"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600">
                                <input type="checkbox" className="mr-2 rounded text-indigo-600 focus:ring-indigo-500" />
                                Remember me
                            </label>
                            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold transition">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 group mt-6 shadow-md hover:shadow-lg"
                        >
                            Sign In
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-600 font-medium pb-2 border-b border-gray-200 mb-2 ">For Testing Purposes</p>
                        <p className="text-sm text-gray-500 mb-1">New Institute? Register your account to get started.</p>
                        <Link to="/register" className="text-indigo-600 font-semibold hover:underline text-sm inline-flex items-center gap-1">
                            Create Institute Account
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
