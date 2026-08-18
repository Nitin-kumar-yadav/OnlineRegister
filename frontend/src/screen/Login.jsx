import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroBg from '../assets/hero.png';
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi2';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleLogin = (e) => {
        e.preventDefault();
        const res = login(formData);
        if (res.success) {
            navigate('/dashboard');
        }
    };

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-[2px]"></div>
            <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl overflow-hidden h-[35vh]">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl "></div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-50"></div>
                <div className="relative z-20 flex flex-col items-center">

                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] tracking-wider mb-6 shadow-[0_0_15px_rgba(0,212,255,0.2)] " style={{ marginTop: '20px' }}>
                        HAL
                    </div>

                    <h2 className="text-2xl font-bold text-white tracking-wide mb-2" style={{ fontFamily: "var(--font-inter)", marginBottom: '20px' }}>
                        Login
                    </h2>

                    <form className='flex flex-col gap-5 w-[80%] mt-6'>
                        <div className='flex items-center gap-3 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-1 focus-within:border-[#00D4FF]/50 focus-within:ring-1 focus-within:ring-[#00D4FF]/50 transition-all duration-300'>
                            <span className='text-gray-400'><HiOutlineUser className="w-5 h-5" /></span>
                            <input type="text" placeholder='Username' className='w-full bg-transparent text-white outline-none p-2 placeholder-gray-500 h-[30px]' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        </div>

                        <div className='flex items-center gap-3 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-1 focus-within:border-[#00D4FF]/50 focus-within:ring-1 focus-within:ring-[#00D4FF]/50 transition-all duration-300'>
                            <span className='text-gray-400'><HiOutlineLockClosed className="w-5 h-5" /></span>
                            <input type="password" placeholder='Password' className='w-full bg-transparent text-white outline-none p-2 placeholder-gray-500 h-[30px]' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>

                        <button onClick={handleLogin} type='submit' className='w-full mt-4 py-3.5 bg-[#00D4FF]/10 border border-[#00D4FF]/30 hover:bg-[#00D4FF]/20 hover:border-[#00D4FF]/50 text-[#00D4FF] font-semibold rounded-lg tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] h-[50px] cursor-pointer' style={{ marginBottom: '20px' }}>
                            Authenticate
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-4 text-xs" style={{ marginTop: '10px' }}>
                        <Link to="/" className="text-gray-400 hover:text-[#00D4FF] transition-colors cursor-pointer">
                            Return Home
                        </Link>
                        <span className="text-gray-600">|</span>
                        <Link to="/signup" className="text-gray-400 hover:text-[#00D4FF] transition-colors cursor-pointer">
                            Request Access
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
