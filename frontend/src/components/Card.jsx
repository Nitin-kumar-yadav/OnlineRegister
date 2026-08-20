import React from 'react'
import { useRegisterStore } from '../store/useRegisterStore';
import { useEffect } from 'react';
import Loader from './Loader';
import toast from 'react-hot-toast';

const Card = () => {

    const { getAllRegister, register } = useRegisterStore();

    useEffect(() => {
        getAllRegister();
    }, [getAllRegister]);

    console.log(register)

    const buttonListner = (id) => {
        toast.success(id)
    }

    if (!register || !Array.isArray(register)) {
        return <Loader />;
    }

    return (
        <>
            {register.map((item) => (
                < div
                    className="group relative w-48 h-64 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                    onClick={() => buttonListner(item._id)}
                    key={item._id}
                >
                    <div className="absolute w-32 h-32 bg-indigo-500/50 rounded-full blur-[40px] -left-8 -top-8 transition-transform duration-700 group-hover:translate-x-12 group-hover:translate-y-12"></div>
                    <div className="absolute w-32 h-32 bg-purple-500/50 rounded-full blur-[40px] -right-8 -bottom-8 transition-transform duration-700 group-hover:-translate-x-12 group-hover:-translate-y-12"></div>

                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 z-10 p-4 transition-colors duration-300 group-hover:bg-white/10 group-hover:border-white/30">
                        <h3 className="text-white font-bold text-xl drop-shadow-lg tracking-widest">
                            {item.registerName}
                        </h3>
                        <div className="flex flex-col items-center gap-1 mt-auto w-full pt-3 border-t border-white/10 self-center">
                            <p className="text-gray-300 text-xs font-medium">Created: <span className="text-white">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</span></p>
                            <p className="text-gray-400 text-xs font-medium">Updated: <span className="text-white">{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "N/A"}</span></p>
                        </div>
                    </div>
                </div >))}
        </>
    )
}

export default Card