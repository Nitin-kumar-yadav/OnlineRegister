import { useRegisterStore } from '../store/useRegisterStore';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Card = () => {

    const { getAllRegister, register, deleteRegister } = useRegisterStore();
    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        getAllRegister();
    }, [getAllRegister]);

    if (!register || !Array.isArray(register)) {
        return <Loader />;
    }

    const viewRegister = (id) => {
        navigate(`/viewregister/${id}`);
    }

    const handleDelete = async (e, id, name) => {
        e.stopPropagation();

        if (confirmId !== id) {
            setConfirmId(id);
            return;
        }

        setDeletingId(id);
        setConfirmId(null);
        try {
            await deleteRegister(id);
            toast.success(`"${name}" and all its entries deleted`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete register');
        } finally {
            setDeletingId(null);
        }
    };

    const handleCancelConfirm = (e) => {
        e.stopPropagation();
        setConfirmId(null);
    };

    return (
        <>
            {register.map((item) => (
                <div
                    className="group relative w-48 h-64 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                    onClick={() => viewRegister(item._id)}
                    key={item._id}
                >
                    <div className="absolute w-32 h-32 bg-indigo-500/50 rounded-full blur-[40px] -left-8 -top-8 transition-transform duration-700 group-hover:translate-x-12 group-hover:translate-y-12"></div>
                    <div className="absolute w-32 h-32 bg-purple-500/50 rounded-full blur-[40px] -right-8 -bottom-8 transition-transform duration-700 group-hover:-translate-x-12 group-hover:-translate-y-12"></div>

                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 z-10 p-4 transition-colors duration-300 group-hover:bg-white/10 group-hover:border-white/30">

                        {/* Delete button - top right corner */}
                        <div className="absolute top-3 right-3">
                            {confirmId === item._id ? (
                                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={(e) => handleDelete(e, item._id, item.registerName)}
                                        disabled={deletingId === item._id}
                                        className="px-2 py-1 text-xs font-medium text-red-400 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 rounded transition-all duration-200 cursor-pointer disabled:opacity-50"
                                    >
                                        {deletingId === item._id ? '...' : 'Yes'}
                                    </button>
                                    <button
                                        onClick={handleCancelConfirm}
                                        className="px-2 py-1 text-xs font-medium text-gray-400 bg-white/10 border border-white/15 hover:bg-white/20 rounded transition-all duration-200 cursor-pointer"
                                    >
                                        No
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => handleDelete(e, item._id, item.registerName)}
                                    className="p-1.5 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
                                    title="Delete register"
                                >
                                    <FaTrash size={12} />
                                </button>
                            )}
                        </div>

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