import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
export const useRegisterStore = create((set, get) => ({
    register: JSON.parse(localStorage.getItem("register")) || null,
    fields: null,
    entries: null,

    getAllRegister: async () => {
        set({ register: null });
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/register`);
        set({ register: response.data });
        localStorage.setItem("register", JSON.stringify(response.data));
    },

    CreateRegister: async (registerName) => {
        set({ register: null });
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register/create`, { registerName });
        set({ register: response.data.register });
        localStorage.setItem("register", JSON.stringify(response.data.register));
        return response.data.register;
    },

    FieldSet: async (registerId, fields) => {
        set({ register: null });
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/fields`, { fields });
        set({ register: response.data.register });
        return response.data.register;
    },

    getFields: async (registerId) => {
        set({ fields: null });
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/fields`);
        set({ fields: response.data });
    },

    getEntries: async (registerId) => {
        set({ entries: null });
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/entries`);
        set({ entries: response.data });
    },

    addEntry: async (registerId, data) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/entries`, { data });
        const updated = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/entries`);
        set({ entries: updated.data });
        return response.data;
    },

    deleteEntry: async (entryId, registerId) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/register/entries/${entryId}`);
        const updated = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/entries`);
        set({ entries: updated.data });
    },

    deleteRegister: async (registerId) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}`);
        const updated = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/register`);
        set({ register: updated.data });
        localStorage.setItem("register", JSON.stringify(updated.data));
    },
}))