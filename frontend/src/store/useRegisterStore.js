import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
export const useRegisterStore = create((set, get) => ({
    register: JSON.parse(localStorage.getItem("register")) || null,
    fields: null,
    entries: null,
    totalEntries: 0,
    totalPages: 1,
    currentPage: 1,

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

    getEntries: async (registerId, { page = 1, limit = 20, date = '' } = {}) => {
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('limit', limit);
        if (date) params.set('date', date);

        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/entries?${params.toString()}`
        );
        const { entries, totalEntries, totalPages, currentPage } = response.data;
        set({ entries, totalEntries, totalPages, currentPage });
    },

    getEntriesForExport: async (registerId, date = '') => {
        const params = date ? `?date=${date}` : '';
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/entries/all${params}`
        );
        return response.data;
    },

    addEntry: async (registerId, data) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}/entries`, { data });
        // Re-fetch current page
        const { currentPage } = get();
        await get().getEntries(registerId, { page: 1 });
        return response.data;
    },

    deleteEntry: async (entryId, registerId) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/register/entries/${entryId}`);
        const { currentPage } = get();
        await get().getEntries(registerId, { page: currentPage });
    },

    deleteRegister: async (registerId) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/register/${registerId}`);
        const updated = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/register`);
        set({ register: updated.data });
        localStorage.setItem("register", JSON.stringify(updated.data));
    },
}))