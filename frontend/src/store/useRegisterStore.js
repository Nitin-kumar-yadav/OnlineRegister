import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
export const useRegisterStore = create((set, get) => ({
    register: JSON.parse(localStorage.getItem("register")) || null,
    fields: null,
    entries: null,

    getAllRegister: async () => {
        set({ register: null });
        const response = await axios.get(`http://localhost:5000/api/register`);
        set({ register: response.data });
        localStorage.setItem("register", JSON.stringify(response.data));
    },

    CreateRegister: async (registerName) => {
        set({ register: null });
        const response = await axios.post(`http://localhost:5000/api/register/create`, { registerName });
        set({ register: response.data.register });
        localStorage.setItem("register", JSON.stringify(response.data.register));
        return response.data.register;
    },

    FieldSet: async (registerId, fields) => {
        set({ register: null });
        const response = await axios.post(`http://localhost:5000/api/register/${registerId}/fields`, { fields });
        set({ register: response.data.register });
        return response.data.register;
    },

    getFields: async (registerId) => {
        set({ fields: null });
        const response = await axios.get(`http://localhost:5000/api/register/${registerId}/fields`);
        set({ fields: response.data });
    },

    getEntries: async (registerId) => {
        set({ entries: null });
        const response = await axios.get(`http://localhost:5000/api/register/${registerId}/entries`);
        set({ entries: response.data });
    },

    addEntry: async (registerId, data) => {
        const response = await axios.post(`http://localhost:5000/api/register/${registerId}/entries`, { data });
        const updated = await axios.get(`http://localhost:5000/api/register/${registerId}/entries`);
        set({ entries: updated.data });
        return response.data;
    },
}))