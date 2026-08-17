import { create } from "zustand";
import axios from 'axios';
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
    authUser: JSON.parse(localStorage.getItem("authUser")) || null,
    user: null,
    isAuth: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get('http://localhost:5000/api/user/me');
            set({ authUser: response.data, isAuth: true, isCheckingAuth: false });
            localStorage.setItem("authUser", JSON.stringify(response.data));
        } catch (error) {
            set({ authUser: null, isAuth: false, isCheckingAuth: false });
            localStorage.removeItem("authUser");
        }
    },
    login: async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', data);
            set({ authUser: response.data, isAuth: true });
            localStorage.setItem("authUser", JSON.stringify(response.data));
            toast.success('Login successful');
            return { success: true };
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Login failed');
            return { success: false, message: error.response?.data?.message };
        }
    },
    logout: async () => {
        try {
            await axios.post('http://localhost:5000/api/user/logout');
            set({ authUser: null, isAuth: false, isCheckingAuth: false });
            localStorage.removeItem("authUser");
            toast.success('Logged out successfully');
        } catch (error) {
            console.error("Logout error:", error);
            toast.error('Logout failed');
        }
    },
    signup: async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', data);
            set({ authUser: response.data, isAuth: true });
            localStorage.setItem("authUser", JSON.stringify(response.data));
            toast.success('Signup successful');
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
            return { success: false, message: error.response?.data?.message };
        }
    },
}))