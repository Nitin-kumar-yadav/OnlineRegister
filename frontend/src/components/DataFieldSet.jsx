import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroBg from '../assets/hero.png';
import { FaBook, FaTrash, FaPlus } from "react-icons/fa";
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useRegisterStore } from '../store/useRegisterStore';

const DataFieldSet = () => {

    const [fields, setFields] = useState([{ id: Date.now(), name: '', type: 'String' }]);

    const fieldTypes = ['String', 'Number', 'Date', 'Boolean'];

    const addField = (e) => {
        e.preventDefault();
        setFields([...fields, { id: Date.now(), name: '', type: 'String' }]);
    };

    const removeField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const handleNameChange = (id, newName) => {
        setFields(fields.map(field => field.id === id ? { ...field, name: newName } : field));
    };

    const handleTypeChange = (id, newType) => {
        setFields(fields.map(field => field.id === id ? { ...field, type: newType } : field));
    };
    const navigate = useNavigate();
    const { CreateRegister, FieldSet, register } = useRegisterStore();
    const handleCreateRegister = async () => {
        try {
            const result = await CreateRegister(registerName);
            if (result) {
                toast.success('Register created successfully');
            }
            setRegisterName("")
            const fieldsResponse = await FieldSet(result?._id, fields);
            console.log(fieldsResponse);
            if (fieldsResponse) {
                toast.success('Fields added successfully');
            }
            setFields([]);
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.message);
        }
    };

    const [registerName, setRegisterName] = useState('');

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
            <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl min-h-[40vh] max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="fixed inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl -z-10 pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-50"></div>
                <div className="relative z-20 flex flex-col items-center">

                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] tracking-wider mb-6 shadow-[0_0_15px_rgba(0,212,255,0.2)] " style={{ marginTop: '20px' }}>
                        HAL
                    </div>

                    <h2 className="text-2xl font-bold text-white tracking-wide mb-2" style={{ fontFamily: "var(--font-inter)", marginBottom: '20px' }}>
                        Create Register
                    </h2>

                    <div className='flex flex-col gap-5 w-full mt-6'>
                        <div className='flex items-center gap-3 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-1 focus-within:border-[#00D4FF]/50 focus-within:ring-1 focus-within:ring-[#00D4FF]/50 transition-all duration-300'>
                            <span className='text-gray-400'><FaBook className="w-5 h-5" /></span>
                            <input
                                type='text'
                                placeholder='Register Name'
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                                className='w-full bg-transparent text-white outline-none p-2 placeholder-gray-500 h-[30px]'
                            />
                        </div>
                        {fields.map((field, index) => (
                            <div key={field.id} className='flex items-center gap-3 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-1 focus-within:border-[#00D4FF]/50 focus-within:ring-1 focus-within:ring-[#00D4FF]/50 transition-all duration-300'>
                                <span className='text-gray-400'><FaBook className="w-5 h-5" /></span>
                                <input
                                    type="text"
                                    placeholder={`Data Field ${index}`}
                                    value={field.name}
                                    onChange={(e) => handleNameChange(field.id, e.target.value)}
                                    className='flex-1 bg-transparent text-white outline-none p-2 placeholder-gray-500 h-[30px]'
                                />
                                <select
                                    value={field.type}
                                    onChange={(e) => handleTypeChange(field.id, e.target.value)}
                                    className='bg-white/10 text-white text-xs border border-white/15 rounded-md px-2 py-1.5 outline-none cursor-pointer appearance-none focus:border-[#00D4FF]/50 transition-all duration-200'
                                    style={{ minWidth: '85px' }}
                                >
                                    {fieldTypes.map((t) => (
                                        <option key={t} value={t} className='bg-[#1a1a24] text-white'>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeField(field.id)}
                                        className="text-red-500 hover:text-red-400 p-1"
                                    >
                                        <FaTrash />
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end w-full">
                            <button
                                type="button"
                                onClick={addField}
                                className="flex items-center gap-2 text-sm text-[#00D4FF] hover:text-white transition-colors"
                            >
                                <FaPlus /> Add Field
                            </button>
                        </div>

                        <button onClick={handleCreateRegister} className='w-full mt-4 py-3.5 bg-[#00D4FF]/10 border border-[#00D4FF]/30 hover:bg-[#00D4FF]/20 hover:border-[#00D4FF]/50 text-[#00D4FF] font-semibold rounded-lg tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] h-[50px] cursor-pointer' style={{ marginBottom: '20px' }}>
                            Create
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DataFieldSet;
