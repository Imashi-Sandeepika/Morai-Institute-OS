import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { School, Building, Phone, MapPin, Mail, Lock } from 'lucide-react';

const RegisterInstitute = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register-institute', formData);
            login(res.data.user, res.data.token);
            toast.success('Institute Registered Successfully');
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration Failed');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2669&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm mix-blend-multiply"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-xl z-10 relative">
                <School className="mx-auto h-16 w-16 text-white bg-indigo-600 rounded-full p-3 shadow-xl border-4 border-white/20 mb-4" />
                <h2 className="text-center text-4xl font-extrabold text-white text-shadow tracking-tight">Register Your Institute</h2>
                <p className="mt-2 text-center text-indigo-100 max-w-sm mx-auto font-medium">Create your Super Admin account and set up your institute workspace.</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl z-10 relative">
                <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border border-gray-100">
                    <form className="space-y-6" onSubmit={handleRegister}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Institute Name */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700">Institute Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="text" name="name" required
                                        className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors border outline-none" placeholder="Oxford Academy"
                                        value={formData.name} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="email" name="email" required
                                        className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors border outline-none" placeholder="admin@institute.edu"
                                        value={formData.email} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="tel" name="phone" required
                                        className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors border outline-none" placeholder="+1 234 567 890"
                                        value={formData.phone} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700">Admin Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input type="password" name="password" required
                                        className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors border outline-none" placeholder="••••••••"
                                        value={formData.password} onChange={handleChange} />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Minimum 8 characters with numbers and symbols</p>
                            </div>

                            {/* Address */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700">Full Address</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea name="address" required rows="3"
                                        className="pl-10 block w-full border-gray-300 rounded-lg py-3 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition-colors border outline-none" placeholder="123 Education Ave, City, Country"
                                        value={formData.address} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-indigo-500/30 transform hover:-translate-y-0.5">
                                Register Institute Workspace
                            </button>
                        </div>

                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Log in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterInstitute;
