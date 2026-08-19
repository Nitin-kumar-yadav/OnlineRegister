import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
export const useRegisterStore = create((set, get) => ({
    register: JSON.parse(localStorage.getItem("register")) || null,

    getAllRegister: async () => {
        set({ register: null });
        const response = await axios.get(`http://localhost:5000/api/register`);
        set({ register: response.data });
        localStorage.setItem("register", JSON.stringify(response.data));
    },
}))