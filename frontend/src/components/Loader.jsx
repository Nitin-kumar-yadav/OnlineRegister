import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[150px]">
            <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 border-4 border-t-indigo-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                <div className="w-10 h-10 border-4 border-t-purple-500 border-l-indigo-500 border-b-transparent border-r-transparent rounded-full animate-[spin_1.5s_linear_reverse] drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            </div>
        </div>
    )
}

export default Loader