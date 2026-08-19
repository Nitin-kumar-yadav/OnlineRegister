import React from 'react'

const Card = () => {
    return (
        <div
            className="group relative w-48 h-64 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
        >
            <div className="absolute w-32 h-32 bg-indigo-500/50 rounded-full blur-[40px] -left-8 -top-8 transition-transform duration-700 group-hover:translate-x-12 group-hover:translate-y-12"></div>
            <div className="absolute w-32 h-32 bg-purple-500/50 rounded-full blur-[40px] -right-8 -bottom-8 transition-transform duration-700 group-hover:-translate-x-12 group-hover:-translate-y-12"></div>

            <div className="relative w-full h-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 z-10 p-4 transition-colors duration-300 group-hover:bg-white/10 group-hover:border-white/30">
                <h3 className="text-white font-bold text-xl drop-shadow-lg tracking-widest">
                    CARD
                </h3>
            </div>
        </div>
    )
}

export default Card